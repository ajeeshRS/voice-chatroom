"use client";
import { useSocket } from "@/hooks/useSocket";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const { socket, loading } = useSocket();
  const [roomName, setRoomName] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const handleRoomCreation = () => {
    if (!socket) {
      return;
    }
    socket.send(
      JSON.stringify({
        action: "create",
        roomId: roomName,
        username: session?.user?.name,
      })
    );
  };

  useEffect(() => {
    socket?.addEventListener("message", (e) => {
      const parsedData = JSON.parse(e.data);

      // on room created
      if (parsedData.type === "created") {
        router.push(`/room/${parsedData.roomId}`);
      }
    });
  }, [socket]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        loading...
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="md:w-2/6 w-5/6 h-2/6 flex flex-col items-center justify-start p-10 rounded-xl shadow-md space-y-3">
        <h4 className="font-bold text-xl">Create New Room</h4>
        <input
          type="text"
          placeholder="Enter room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="p-3 rounded-md border md:w-5/6 w-full focus:outline-none"
        />
        <button
          onClick={handleRoomCreation}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-neutral-800"
        >
          create
        </button>
      </div>
    </div>
  );
}
