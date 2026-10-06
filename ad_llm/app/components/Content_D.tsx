

export default function Content_D() {
  return (
    <div className="p-3 h-full bg-gray-100">
        <div className="w-full rounded-2xl border-2 border-blue-200 bg-white shadow-lg z-50 w-full h-full flex flex-col items-center gap-2.5 pt-5 pb-5">
            <div className="flex justify-between pl-5 w-full h-[5%]">
                <div className="flex items-center gap-2">
                    <svg className="p-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl" xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#FFFFFF"><path d="M160-40v-240h100v-80H160v-240h100v-80H160v-240h280v240H340v80h100v80h120v-80h280v240H560v-80H440v80H340v80h100v240H160Zm80-80h120v-80H240v80Zm0-320h120v-80H240v80Zm400 0h120v-80H640v80ZM240-760h120v-80H240v80Zm60-40Zm0 320Zm400 0ZM300-160Z"/></svg>
                    <h1 className="text-lg font-bold">Diagram</h1>
                </div>
                <div className="pr-5 flex items-center gap-2">
                    <button className="p-1 border-2 border-green-400 rounded-2xl bg-green-300" >
                        <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#FFFFFF"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>

                    </button>
                    <button className="p-1 border-2 border-blue-400 rounded-2xl bg-blue-300" >
                        <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#FFFFFF"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>

                    </button>
                </div>
            </div>
            <div className="border-2 border-purple-200 w-[95%] h-[95%] rounded-2xl">

            </div>
        </div>
    </div>
  )
}