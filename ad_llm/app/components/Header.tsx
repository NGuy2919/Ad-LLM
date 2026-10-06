import Image from 'next/image' 
import LogoDDGram from '@/public/Logo_DDGram.png'

export default function Header() {
  return (
    <div className="col-span-3 flex p-3">
        <div className="bg-white flex items-center w-full h-full rounded-2xl border border-gray-200 shadow-lg z-50 pl-3 pr-3">
          <Image src={LogoDDGram} alt="DDGram Logo" className="h-auto w-45 object-contain object-left" priority />
        </div>
    </div>
  )
}