

type Props = {
  dsl: string;
  loading: boolean;
};

export default function SideBarR_T({ dsl, loading }: Props) {
  return (
    <div className="p-3">
        <div className="bg-gray-700 rounded-2xl border-2 border-green-200 shadow-lg z-50 w-full h-full flex items-center flex-col gap-2.5 pt-5 pb-5">
            <div className="flex w-full items-center pl-3 gap-2 h-[10%]">
                <svg className="p-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl" xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#FFFFFF"><path d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z"/></svg>
                <h1 className="text-lg font-bold text-white">Generate DSL</h1>
            </div>
            <div className="h-[80%] w-[95%] bg-black rounded-2xl p-4 overflow-auto">
                {loading ? (
                    <p className="text-gray-400 text-sm">Generating...</p>
                ) : dsl ? (
                    <pre className="text-green-300 text-sm font-mono whitespace-pre-wrap">
                    {dsl}
                    </pre>
                ) : (
                    <p className="text-gray-500 text-sm">
                    DSL code will appear here...
                    </p>
                )}
            </div>
            <div className="flex h-[10%] items-center w-full pl-3 pr-3">
                <div className="flex items-center w-50% gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M508.5-291.5Q520-303 520-320t-11.5-28.5Q497-360 480-360t-28.5 11.5Q440-337 440-320t11.5 28.5Q463-280 480-280t28.5-11.5ZM440-440h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                    <h1 className="text-sm text-white">Please review the code carefully before confirming.</h1>
                </div>
                <button className="flex justify-center items-center cursor-pointer gap-1.5 w-50 h-10 p-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                    <h1 className="text-white font-bold">Confirm DSL</h1>
                </button>
            </div>
        </div>
    </div>
  )
}