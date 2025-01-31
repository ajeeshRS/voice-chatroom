import { names } from "@/app/utils/data";
import { AudioLines, Hand, LogOut, Mic, MicOff } from "lucide-react";

export default function Page() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="md:w-5/6 w-full h-5/6 md:border rounded-2xl md:py-20 py-10 px-10 flex md:flex-row flex-col items-start justify-between">
        {/* participants */}
        <div className="md:w-5/6 w-full h-full grid md:grid-cols-4 grid-cols-3 md:px-5 md:pb-0 pb-4 gap-5 items-start overflow-y-scroll ">
          {names.map((name, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center space-y-1 "
            >
              <p className="relative rounded-full w-10 h-10 flex items-center justify-center px-2 p-3 bg-black text-white">
                {name.charAt(0).toUpperCase()}
                {/* <MicOff className="w-4 h-4 absolute -bottom-1 -right-3 text-purple-500" /> */}
                {/* <AudioLines className="w-4 h-4 absolute -bottom-1 -right-3 text-purple-500" /> */}
              </p>
              <p className="text-neutra-800 md:text-xs text-[10px]">{name}</p>
            </div>
          ))}
        </div>
        {/* room info and controls */}
        <div className="md:w-1/4 w-full h-full flex flex-col items-start justify-between pb-10 space-y-2 px-5 md:border-l border-t md:border-t-0">
          <div className="flex flex-col items-start space-y-2 md:my-0 my-5">
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
