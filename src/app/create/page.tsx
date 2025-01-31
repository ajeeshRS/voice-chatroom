export default function Page() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="md:w-2/6 w-5/6 h-2/6 flex flex-col items-center justify-start p-10 rounded-xl shadow-md space-y-3">
        <h4 className="font-bold text-xl">Create New Room</h4>
        <input
          type="text"
          placeholder="Enter room name"
          className="p-3 rounded-md border md:w-5/6 w-full focus:outline-none"
        />
        <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-neutral-800">
          create
        </button>
      </div>
    </div>
  );
}
