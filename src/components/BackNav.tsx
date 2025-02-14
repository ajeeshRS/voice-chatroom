'use client'
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackNav() {
  const router = useRouter();
  return (
    <div className="w-full h-fit py-5 px-10 mt-10 flex items-center justify-start fixed top-10">
      <ArrowLeft className="w-5 h-5 cursor-pointer" onClick={() => router.back()} />
    </div>
  );
}
