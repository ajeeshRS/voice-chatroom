import { names } from "@/app/utils/data";
import { AudioLines, Hand, LogOut, Mic, MicOff } from "lucide-react";

export default function Page() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-5/6 h-5/6 border rounded-2xl py-20 px-10 flex items-start justify-between">
        <div className="w-5/6 h-full grid grid-cols-4 px-5 gap-5 items-start overflow-y-scroll ">
          {names.map((name, i) => (
            <div key={i} className="flex flex-col items-center space-y-1 ">
              <p className="relative rounded-full w-10 h-10 flex items-center justify-center px-2 p-3 bg-black text-white">
                {name.charAt(0).toUpperCase()}
                {/* <MicOff className="w-4 h-4 absolute -bottom-1 -right-3 text-purple-500" /> */}
                {/* <AudioLines className="w-4 h-4 absolute -bottom-1 -right-3 text-purple-500" /> */}
              </p>
              <p className="text-neutra-800 text-xs">{name}</p>
            </div>
          ))}
        </div>
        <div className="w-1/4 h-full flex flex-col items-start justify-between pb-10 space-y-2 px-5 border-l">
          <div className="flex flex-col items-start space-y-2">
            <h4 className="text-4xl font-bold text-neutral-800">Motohub</h4>
            <p className="text-neutral-800 font-semibold text-xs">
              #45234t23-43534bhjb-dsf
            </p>
            <p className="text-sm text-neutral-600">4 Participants</p>
            <p className="text-sm text-neutral-500">Hosted by ajeesh</p>
          </div>
          <div className="flex items-center justify-center w-full space-x-5">
            <button className="rounded-full p-3 border text-black hover:bg-neutral-50">
              <Hand className="w-5 h-5" />
            </button>
            <button className="rounded-full p-3 border text-black hover:bg-neutral-50">
              <Mic className="w-5 h-5" />
            </button>
            <button className="rounded-full p-3 bg-red-500 hover:bg-red-600 text-white">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
