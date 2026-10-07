package main

import (
	"bytes"
	_ "embed"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"regexp"
	"strings"
	"time"
)

//go:embed plantuml_prompt.txt
var plantumlPromptTemplate string

var thinkRe = regexp.MustCompile(`(?s)<think>.*?</think>`)

var httpClient = &http.Client{Timeout: 5 * time.Minute}

type GenerateRequest struct {
	Process string `json:"process"`
}

type GenerateResponse struct {
	Extraction string `json:"extraction"`
	PlantUML   string `json:"plantuml"`
}

type OllamaRequest struct {
	Model     string                 `json:"model"`
	Prompt    string                 `json:"prompt"`
	Stream    bool                   `json:"stream"`
	KeepAlive string                 `json:"keep_alive"`
	Think     bool                   `json:"think"`
	Options   map[string]interface{} `json:"options,omitempty"`
}

type OllamaResponse struct {
	Response string `json:"response"`
}

func buildPlantUMLPrompt(extraction string) string {
	return strings.Replace(plantumlPromptTemplate, "{process_extraction}", extraction, 1)
}

func extractPlantUML(raw string) string {
	start := strings.Index(raw, "@startuml")
	end := strings.LastIndex(raw, "@enduml")
	if start == -1 || end == -1 || end < start {
		return strings.TrimSpace(raw)
	}
	return strings.TrimSpace(raw[start : end+len("@enduml")])
}

func buildExtractionPrompt(processDescription string) string {

	return fmt.Sprintf(`
		Role: คุณคือผู้เชี่ยวชาญการวิเคราะห์กระบวนการตามมาตรฐาน UML 2.5.1 (Activity Diagram Specialist) และทฤษฎีการประมวลผลภาษาธรรมชาติ (NLP-Based Information Extraction)

		Task:
		อ่าน Process Description ที่ได้รับเป็น Input แล้วสกัดองค์ประกอบของกระบวนการให้อยู่ในรูปแบบ Structured Text ตามกฎ UML 2.5.1 ร่วมกับหลักการ Linguistic Parsing อย่างเคร่งครัด

		ต้องสกัดองค์ประกอบออกมาให้ครบถ้วน 4 ส่วน ได้แก่:

		1. PARTITIONS (Activity Partitions - UML 15.6)
		2. ACTIONS (Action Nodes - UML 15.2)
		3. OBJECTS (Object Nodes & Flows - UML 15.4)
		4. CONTROL_NODES (Control Nodes & Edges - UML 15.3 & 15.5)

		====================================================================
		STRICT EXTRACTION RULES
		====================================================================

		1. Grounding & Evidence-Based Constraints:

		- ใช้เฉพาะข้อมูลจาก Process Description ที่ป้อนให้เท่านั้น
		- ห้ามสมมติ เติมแต่ง หรือใช้ความรู้ภายนอกเด็ดขาด
		- หากไม่มีข้อมูลในส่วนใด ให้ระบุเครื่องหมาย -
		- ห้ามใส่คำเกริ่น คำนำ บทสรุป หรือข้อความทักทาย
		- ให้ตอบเฉพาะ [PROCESS EXTRACTION]

		2. Partition Extraction Rules:

		- Partition ต้องเป็น Active Agent เท่านั้น
		- ได้แก่ คน หรือระบบซอฟต์แวร์หลัก
		- ห้ามใช้สถานที่เป็น Partition
		- ห้ามใช้อุปกรณ์หรือ Hardware เป็น Partition
		- หากพบการกระทำที่อุปกรณ์ ให้ใช้ผู้ใช้งานอุปกรณ์เป็น Partition
		- ในภาษาไทย หากมีคำเชื่อม เช่น เพื่อ และ จากนั้น ให้ถือว่า Action ทั้งหมดเป็นของประธานเดิม จนกว่าจะพบประธานใหม่
		- ทุก Action ต้องระบุ [Px]

		3. Object Extraction Rules:

		สกัดเฉพาะคำนามที่เป็น:
		- เอกสาร
		- บัตร
		- ข้อมูล
		- แบบฟอร์ม
		- สิทธิ์
		- คิว

		INPUTS:
		ใช้เมื่อ Action มีการดึงข้อมูล อ่าน ตรวจสอบ หรือรับ Object

		OUTPUTS:
		ใช้เมื่อ Action มีการสร้าง พิมพ์ บันทึก หรือส่งออก Object

		4. Action Extraction Rules:

		สกัดแก่นคำกริยาแสดงการกระทำ
		ตัดคำเชื่อมและวลีขยายส่วนเกินออก

		5. Decision & Control Node Rules:

		- หากมี Decision มากกว่า 1 จุด ให้แยกเป็น D1, D2, D3 ตามลำดับ
		- Conditions ต้องเป็น State/Attribute Noun
		- ห้ามใส่กริยาซ้ำซ้อน
		- ทุก Decision ต้องมี Merge คู่กัน
		- ห้ามใช้ FORK/JOIN หากไม่มีคำบ่งชี้การทำงานพร้อมกัน
		- ใช้ FORK/JOIN เมื่อพบคำว่า พร้อมกัน, ขนานกัน, ในเวลาเดียวกัน, ขณะเดียวกัน หรือ in parallel
		- ใช้ LOOP เฉพาะเมื่อมีคำบ่งชี้การทำซ้ำ

		====================================================================
		OUTPUT FORMAT
		====================================================================

		[PROCESS EXTRACTION]

		PARTITIONS:
		- <partition_id>: <partition_name>

		OBJECTS:
		- <object_id>: <object_name>

		ACTIONS:
		- <action_id> [<partition_id>]: <action_name> [INPUTS: <object_id>] [OUTPUTS: <object_id>]

		CONTROL_NODES:
		- INITIAL: I1
		- DECISION: <id> (Type: Multi-choice/Binary, Conditions: [...])
		- MERGE: <id>
		- FORK: -
		- JOIN: -
		- LOOP: -
		- ACTIVITY_FINAL: AF1
		- FLOW_FINAL: -

		====================================================================
		FEW-SHOT EXAMPLES
		====================================================================

		ตัวอย่างที่ 1:

		Process Description:
		ลูกค้าส่งคำสั่งซื้อเข้ามา ระบบตรวจสอบสต็อกสินค้า ถ้าสินค้ามีพอ ระบบจะยืนยันคำสั่งซื้อ แต่ถ้าสินค้าไม่พอ ระบบจะแจ้งลูกค้าว่าสินค้าหมด

		Output:

		[PROCESS EXTRACTION]

		PARTITIONS:
		- P1: ลูกค้า
		- P2: ระบบ

		OBJECTS:
		- O1: คำสั่งซื้อ

		ACTIONS:
		- A1 [P1]: ส่งคำสั่งซื้อ [OUTPUTS: O1]
		- A2 [P2]: ตรวจสอบสต็อกสินค้า [INPUTS: O1]
		- A3 [P2]: ยืนยันคำสั่งซื้อ
		- A4 [P2]: แจ้งลูกค้าว่าสินค้าหมด

		CONTROL_NODES:
		- INITIAL: I1
		- DECISION: D1 (Conditions: [สินค้ามีพอ], [สินค้าไม่พอ])
		- MERGE: M1
		- FORK: -
		- JOIN: -
		- LOOP: -
		- ACTIVITY_FINAL: AF1
		- FLOW_FINAL: -

		ตัวอย่างที่ 2:

		Process Description:
		พนักงานตรวจเอกสารทีละใบจนกว่าจะครบทุกใบ เมื่อครบแล้ว ระบบจะส่งอีเมลแจ้งเตือนและบันทึกลงฐานข้อมูลพร้อมกัน

		Output:

		[PROCESS EXTRACTION]

		PARTITIONS:
		- P1: พนักงาน
		- P2: ระบบ

		OBJECTS:
		- O1: เอกสาร

		ACTIONS:
		- A1 [P1]: ตรวจเอกสารทีละใบ [INPUTS: O1]
		- A2 [P2]: ส่งอีเมลแจ้งเตือน
		- A3 [P2]: บันทึกลงฐานข้อมูล

		CONTROL_NODES:
		- INITIAL: I1
		- DECISION: D1 (Conditions: [ครบทุกใบ], [ยังไม่ครบทุกใบ])
		- MERGE: M1
		- FORK: FK1
		- JOIN: J1
		- LOOP: L1 (Condition: [ยังไม่ครบทุกใบ])
		- ACTIVITY_FINAL: AF1
		- FLOW_FINAL: -

		====================================================================

		Process Description:
		%s

		[Process Extraction Output]:
		`, processDescription)
	}


	func callQwen(prompt string) (string, error) {
	requestBody := OllamaRequest{
		Model:     "qwen3.5:9b",
		Prompt:    prompt,
		Stream:    false,
		KeepAlive: "10m", 
		Think:     false,
		Options: map[string]interface{}{"temperature": 0, "num_ctx": 8192},
	}

	jsonData, err := json.Marshal(requestBody)
	if err != nil {
		return "", err
	}

	response, err := httpClient.Post(
		"http://localhost:11434/api/generate",
		"application/json",
		bytes.NewBuffer(jsonData),
	)
	if err != nil {
		return "", err
	}
	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(response.Body)
		return "", fmt.Errorf("Ollama returned status %d: %s", response.StatusCode, string(body))
	}

	var result OllamaResponse
	if err := json.NewDecoder(response.Body).Decode(&result); err != nil {
		return "", err
	}

	return strings.TrimSpace(thinkRe.ReplaceAllString(result.Response, "")), nil
}


func generateProcessExtraction(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {
		return
	}

	// =========================
	// รับข้อมูลจาก Next.js
	// =========================

	var req GenerateRequest

	err := json.NewDecoder(r.Body).Decode(&req)

	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	if req.Process == "" {
		http.Error(w, "Process description is empty", http.StatusBadRequest)
		return
	}

		// Prompt 1: สกัดองค์ประกอบ
	extraction, err := callQwen(buildExtractionPrompt(req.Process))
	if err != nil {
		log.Println("Extraction error:", err)
		http.Error(w, "Failed to generate process extraction", http.StatusInternalServerError)
		return
	}

	// Prompt 2: แปลงเป็น PlantUML
	rawUML, err := callQwen(buildPlantUMLPrompt(extraction))
	if err != nil || strings.TrimSpace(rawUML) == "" {
		log.Println("PlantUML error:", err, "raw:", rawUML)
		http.Error(w, "Failed to generate PlantUML", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(GenerateResponse{
		Extraction: extraction,
		PlantUML:   extractPlantUML(rawUML),
	})
}


func main() {

	if strings.TrimSpace(plantumlPromptTemplate) == "" {
		log.Fatal("plantuml prompt template is empty")
	}

	http.HandleFunc(
		"/api/generate",
		generateProcessExtraction,
	)

	log.Println(
		"Go backend running on http://localhost:8080",
	)

	log.Fatal(
		http.ListenAndServe(":8080", nil),
	)
}