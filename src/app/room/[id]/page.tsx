"use client";
import { names } from "@/app/utils/data";
import { useSocket } from "@/hooks/useSocket";
import { AudioLines, Hand, LogOut, Mic, MicOff } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface User {
  ws: WebSocket;
  username?: string;
  isHost?: boolean;
}

export default function Page() {
  const { id } = useParams();
  const { socket, loading } = useSocket();
  const { data: session } = useSession();
  const router = useRouter();

  const [userCount, setUserCount] = useState(0);
  const [users, setUsers] = useState<User[]>([]);

  const handleLeaveRoom = () => {
    if (!socket) return;

    socket.send(
      JSON.stringify({
        action: "leave",
        roomId: id,
        username: session?.user?.name,
      })
    );
  };

  useEffect(() => {
    if (socket) {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ action: "get_roomInfo", roomId: id }));
      } else {
        socket.addEventListener("open", () => {
          socket.send(JSON.stringify({ action: "get_roomInfo", roomId: id }));
        });
      }

      // hanlding on message events
      socket.addEventListener("message", (e) => {
        const parsedData = JSON.parse(e.data);
        console.log(parsedData);
        if (parsedData.type === "room_details") {
          setUserCount(parsedData.participantCount);
          setUsers(parsedData.users);
          console.log(parsedData.users);
        } else if (parsedData.type === "left") {
          console.log("left the room reached");
          router.push("/");
          toast.success("Left the room");
        }
      });
    } else {
      return;
    }

    // cleanup
    return () => {
      if (socket) {
        socket.removeEventListener("open", () => {});
        socket.removeEventListener("message", () => {});
      }
    };
  }, [socket, id]);

  if (loading) return <div>loading..</div>;

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="md:w-5/6 w-full h-5/6 md:border rounded-2xl md:py-20 py-10 px-10 flex md:flex-row flex-col items-start justify-between">
        {/* participants */}
        <div className="md:w-5/6 w-full h-full grid md:grid-cols-4 grid-cols-3 md:px-5 md:pb-0 pb-4 gap-5 items-start overflow-y-scroll ">
          {users.map((user) => (
            <div
              key={user.username}
              className="flex flex-col items-center text-center space-y-1 "
            >
              <p className="relative rounded-full w-10 h-10 flex items-center justify-center px-2 p-3 bg-black text-white">
                {user?.username?.charAt(0).toUpperCase()}
                {/* <MicOff className="w-4 h-4 absolute -bottom-1 -right-3 text-purple-500" /> */}
                {/* <AudioLines className="w-4 h-4 absolute -bottom-1 -right-3 text-purple-500" /> */}
              </p>
              <p className="text-neutra-800 md:text-xs text-[10px]">
                {user.username}
              </p>
            </div>
          ))}
        </div>
        {/* room info and controls */}
        <div className="md:w-1/4 w-full h-full flex flex-col items-start justify-between pb-10 space-y-2 px-5 md:border-l border-t md:border-t-0">
          <div className="flex flex-col items-start space-y-2 md:my-0 my-5">
            <h4 className="text-4xl font-bold text-neutral-800">{id}</h4>
            <p className="text-neutral-800 font-semibold text-xs">
              #45234t23-43534bhjb-dsf
            </p>
            <p className="text-sm text-neutral-600">
              {`${userCount} Participants`}{" "}
            </p>
            <p className="text-sm text-neutral-500">
              Hosted by {getHostName(users)}
            </p>
          </div>
          <div className="flex items-center justify-center w-full space-x-5">
            <button className="rounded-full p-3 border text-black hover:bg-neutral-50">
              <Hand className="w-5 h-5" />
            </button>
            <button className="rounded-full p-3 border text-black hover:bg-neutral-50">
              <Mic className="w-5 h-5" />
            </button>
            <button
              onClick={handleLeaveRoom}
              className="rounded-full p-3 bg-red-500 hover:bg-red-600 text-white"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getHostName(users: User[]) {
  const host = users.find((u) => u.isHost === true);
  return host?.username;
}
