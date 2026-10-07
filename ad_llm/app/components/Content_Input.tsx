"use client";
import { useState } from "react";

type Props = {
  onDslChange: (dsl: string) => void;
  onLoadingChange: (loading: boolean) => void;
};


export default function Content_Input({ onDslChange, onLoadingChange }: Props) {

    const [processText, setProcessText] = useState("");
    const [extractionResult, setExtractionResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerateDSL = async () => {
        if (!processText.trim()) {
        alert("Please enter a process description.");
        return;
        }

        setLoading(true);
        onLoadingChange(true);
        setExtractionResult("");
        onDslChange("");

        try {
        const response = await fetch("http://localhost:8080/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ process: processText }),
        });

        if (!response.ok) {
            throw new Error("Failed to generate");
        }

        const data = await response.json();

        setExtractionResult(data.extraction);
        onDslChange(data.plantuml);   
        } catch (error) {
        console.error("Error:", error);
        alert("Cannot connect to backend.");
        } finally {
        setLoading(false);
        onLoadingChange(false);
        }
    };
    
  return (
    <div className="p-3 ">
        <div className="bg-white rounded-2xl border-2 border-purple-200 shadow-lg z-50 w-full h-full flex items-center flex-col gap-2.5 pt-5">
            <div className="flex items-center gap-2 w-full pl-5 h-10">
                <svg className="p-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl" xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#FFFF"><path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/></svg>
                <h1 className="text-lg font-bold ">Creation Process</h1>
            </div>
            <div className="pl-5 w-full">
                <h1 className="text-sm text-gray-500 w-[70%]">Enter a natural language description of the process you want to create an activity diagram for Be as detailed as possible</h1>
            </div>
            <div className="w-full">
                <textarea
                value={processText}
                onChange={(e) => setProcessText(e.target.value)}
                className="w-[95%] h-40 p-4 border border-gray-300 rounded-xl ml-5 mr-5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Describe your process here..."
                />
            </div>
            <div className="w-[95%] flex justify-between items-start">
                <div className="w-[45%] bg-purple-100 p-3 rounded-xl">
                    <div className="flex gap-1.5 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#C084FC"><path d="M480-80q-26 0-47-12.5T400-126q-33 0-56.5-23.5T320-206v-142q-59-39-94.5-103T190-590q0-121 84.5-205.5T480-880q121 0 205.5 84.5T770-590q0 77-35.5 140T640-348v142q0 33-23.5 56.5T560-126q-12 21-33 33.5T480-80Zm-80-126h160v-36H400v36Zm0-76h160v-38H400v38Zm-8-118h58v-108l-88-88 42-42 76 76 76-76 42 42-88 88v108h58q54-26 88-76.5T690-590q0-88-61-149t-149-61q-88 0-149 61t-61 149q0 63 34 113.5t88 76.5Zm88-162Zm0-38Z"/></svg>
                        <h1 className="text-base text-purple-400 font-bold">Trips</h1>
                    </div>
                    <ul className="list-disc pl-3 pr-3 text-purple-400">
                        <li className="text-sm pb-1">Be specific about the steps and conditions</li>
                        <li className="text-sm pb-1">use clear and simple language</li>
                        <li className="text-sm pb-1">Mention dicision point (if/else) if any</li>
                    </ul>
                </div>
                <button className="flex justify-center items-center cursor-pointer gap-1.5 w-50 h-10 p-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl" onClick={handleGenerateDSL}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg>
                    <h1 className="text-white font-bold">Generate DSL</h1>
                </button>
            </div>
            <div className="w-[95%] h-40 bg-gray-100 border border-gray-300 rounded-xl mt-1 overflow-auto flex justify-center flex-col">
                <div className="flex gap-1.5 pl-3 pr-3 pt-2 pb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#C084FC"><path d="m438-298 226-226-57-57-169 169-85-85-57 57 142 142Zm-98.5 189.5q-65.5-28.5-114-77t-77-114Q120-365 120-440t28.5-140.5q28.5-65.5 77-114t114-77Q405-800 480-800t140.5 28.5q65.5 28.5 114 77t77 114Q840-515 840-440t-28.5 140.5q-28.5 65.5-77 114t-114 77Q555-80 480-80t-140.5-28.5ZM480-440ZM224-866l56 56-170 170-56-56 170-170Zm512 0 170 170-56 56-170-170 56-56ZM480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720q-117 0-198.5 81.5T200-440q0 117 81.5 198.5T480-160Z"/></svg>
                    <h1 className="text-purple-400">Extraction result</h1>
                </div>

                {loading ? (
                    <p className="w-full h-full text-gray-400 rounded-xl p-3 text-sm whitespace-pre-wrap overflow-auto">Extracting...</p>
                ) : extractionResult ? (
                    <pre className="w-full h-full  rounded-xl p-3 text-sm whitespace-pre-wrap overflow-auto">
                    {extractionResult}
                    </pre>
                ) : (
                    <p className="w-full h-full text-gray-400 rounded-xl p-3 text-sm whitespace-pre-wrap overflow-auto">
                    Extraction result will appear here...
                    </p>
                )}
            </div>
        </div>
    </div>
  )
}