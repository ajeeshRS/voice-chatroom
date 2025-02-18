"use client";
import { useSocket } from "@/hooks/useSocket";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { socket, loading } = useSocket();
  const [roomName, setRoomName] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const handlJoinRoom = () => {
    if (!socket) {
      return;
    }
    socket.send(
      JSON.stringify({
        action: "join",
        roomId: roomName,
        username: session?.user?.name,
      })
    );
  };

  useEffect(() => {
    socket?.addEventListener("message", (e) => {
      const parsedData = JSON.parse(e.data);
      if (parsedData.type === "joined") {
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
        <h4 className="font-bold text-xl">Enter Room ID</h4>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="p-3 rounded-md border md:w-5/6 w-full focus:outline-none"
        />
        <button
          onClick={handlJoinRoom}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-neutral-800"
        >
          Join
        </button>
      </div>
    </div>
  );
}
