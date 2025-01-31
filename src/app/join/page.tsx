export default function Page() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-2/6 h-2/6 flex flex-col items-center justify-start p-10 rounded-xl shadow-md space-y-3">
        <h4 className="font-bold text-xl">Enter Room ID</h4>
        <input
          type="text"
          className="p-3 rounded-md border w-5/6 focus:outline-none"
        />
        <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-neutral-800">
          Join
        </button>
      </div>
    </div>
  );
}
