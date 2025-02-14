"use client";
import { CustomSession } from "@/lib/auth";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function Navbar() {
  const { data: session, status } = useSession();
  const customSession = session as CustomSession;
  console.log(customSession?.user);
  return (
    <header className="p-6">
      <nav className="w-full flex justify-between items-center">
        <div className="text-2xl font-bold">ECHO</div>
        {status !== "loading" && customSession.user ? (
          <p className="rounded-full w-10 h-10 flex items-center justify-center bg-black text-white text-semibold">
            {customSession?.user.name.charAt(0).toUpperCase()}
          </p>
        ) : (
          <button
            className=" bg-neutral-100 hover:bg-neutral-200 rounded-lg flex items-center px-4 py-2"
            onClick={() => signIn("google")}
          >
            <FcGoogle className="mr-2 w-5 h-5" /> Login
          </button>
        )}
      </nav>
    </header>
  );
}
