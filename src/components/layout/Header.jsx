import Navbar from "@/components/navigation/Navbar";
import Link from "next/link";

export default function Header() {
  return (
    <header className="z-50 sticky top-0 w-full bg-white border-b border-gray-200">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Titre */}
          <Link href="/" className="flex items-center space-x-3">
            <span className="text-2xl">🥋</span>
            <span className="text-xl font-bold text-gray-900">
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
