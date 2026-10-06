import Image from "next/image"
import Logo_Input from '@/public/Logo_Input.png'

export default function SideBarL() {
  return (
    <div className="p-3">
        <div className="bg-white rounded-2xl border-2 border-blue-200 shadow-lg z-50 w-full h-[80%] flex items-center flex-col gap-2.5 pt-5">
            <div className="flex items-center gap-2 w-full pl-5 h-10">
                <svg className="p-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl" xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#FFFF"><path d="M360-240h440v-107H360v107ZM160-613h120v-107H160v107Zm0 187h120v-107H160v107Zm0 186h120v-107H160v107Zm200-186h440v-107H360v107Zm0-187h440v-107H360v107ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Z"/></svg>
                <h1 className="text-lg font-bold ">Creation Process</h1>
            </div>
            <div className="p-2.5 w-full">
                <div className="w-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-3xl flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFF"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                    <h1 className="text-sm font-medium text-white">Input Process Description</h1>
                </div>
                <div className="ml-4 w-2 h-5 bg-gray-200"></div>
                <div className="w-full bg-gray-200 rounded-3xl flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFF"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                    <h1 className="text-sm font-medium text-gray-600">Verify DSL validity</h1>
                </div>
                <div className="ml-4 w-2 h-5 bg-gray-200"></div>
                <div className="w-full bg-gray-200 rounded-3xl flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFF"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                    <h1 className="text-sm font-medium text-gray-600">Diagram created successfully</h1>
                </div>
            </div>
            <div className="mt-15">
                <Image src={Logo_Input} alt="DDGram Logo" className="h-auto w-50 object-contain object-left" priority />
                <h1 className="text-sm text-gray-600 mt-3">Turn your idea activity diagram</h1>
            </div>
        </div>
    </div>
  )
}