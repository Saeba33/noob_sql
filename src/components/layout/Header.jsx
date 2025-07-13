import Navbar from "@/components/navigation/Navbar";
import Link from "next/link";

export default function Header() {
  return (
    <header className="z-50 sticky top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo + Titre */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 py-2 px-3 my-3 mx-2 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors focus:outline-none"
          >
            <span className="text-2xl">🥋</span>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              NoobSQL
            </span>
          </Link>

          {/* Navigation */}
          <Navbar />
        </div>
      </div>
    </header>
  );
}
