import { FcGoogle } from "react-icons/fc";

export default function Navbar() {
  return (
    <header className="p-6">
      <nav className="flex justify-between items-center">
        <div className="text-2xl font-bold">ECHO</div>
        <button className=" bg-neutral-100 hover:bg-neutral-200 rounded-lg flex items-center px-4 py-2">
          <FcGoogle className="mr-2 w-5 h-5" /> Login
        </button>
      </nav>
    </header>
  );
}
