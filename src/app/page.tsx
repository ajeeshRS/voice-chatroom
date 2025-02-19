"use client";
import FeatureCard from "@/components/FeatureCard";
import Footer from "@/components/Footer";
import { caveat, kalam, poppins } from "@/fonts/fonts";
import { Mic, Users, Lock, Merge, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className={`min-h-screen flex flex-col ${poppins.className}`}>
      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center py-20">
        <h1
          className={`${kalam.className} text-4xl md:text-6xl font-bold mb-6`}
        >
          Voice chat room
        </h1>
        <p className={`text-2xl mb-8 max-w-md ${caveat.className}`}>
          Join crystal-clear voice chat rooms and make your conversations come
          alive.
        </p>
        <div className="flex items-center space-x-2">
          <button
            className="text-md px-4 py-2 flex items-center bg-black text-white rounded-lg group"
            onClick={() => router.push("/create")}
          >
            Create
            <Plus className="ml-2 w-5 h-5 " />
          </button>
          <button
            className="text-md px-4 py-2 flex items-center bg-black text-white rounded-lg group"
            onClick={() => router.push("/join")}
          >
            Join
            <Merge className="ml-2 w-5 h-5" />
          </button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-3xl">
          <FeatureCard
            icon={<Mic className="w-8 h-8" />}
            title="Crystal Clear"
            description="Experience high-quality, lag-free voice communication."
          />
          <FeatureCard
            icon={<Users className="w-8 h-8" />}
            title="Group Chats"
            description="Create or join rooms for team meetings or casual hangouts."
          />
          <FeatureCard
            icon={<Lock className="w-8 h-8" />}
            title="Secure & Private"
            description="Your conversations are encrypted and private."
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
