"use client";
import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function BackNav() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div
      className={`w-full h-fit px-10 items-center justify-start ${
        pathname === "/" ? "hidden" : "flex"
      }`}
    >
      <ArrowLeft
        className="w-5 h-5 cursor-pointer"
        onClick={() => router.back()}
      />
    </div>
  );
}
