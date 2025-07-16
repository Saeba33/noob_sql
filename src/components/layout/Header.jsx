import Navbar from "@/components/navigation/Navbar";
import Link from "next/link";

export default function Header() {
  return (
    <header className="z-50 sticky top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo + Title */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 py-2 px-4 rounded-lg bg-black text-white font-bold hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 h-[44px]"
          >
            <span className="text-xl">🥋</span>
            <span className="text-lg tracking-tight">NoobSQL</span>
          </Link>

          {/* Navigation */}
          <Navbar />
        </div>
      </div>
    </header>
  );
}
