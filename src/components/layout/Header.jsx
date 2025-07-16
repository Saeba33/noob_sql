import Navbar from "@/components/navigation/Navbar";
import Link from "next/link";

export default function Header() {
  return (
    <header className="z-50 sticky top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm ">
      <div className=" mx-auto px-8">
        <div className="flex justify-between items-center h-24 lg:h-28 gap-4">
          {/* Logo + Title */}
          <Link
            href="/"
            className="flex items-center gap-3 transition-border duration-500 border-2 border-gray-300 rounded-lg p-2 hover:border-gray-600"
          >
            <span className="text-3xl lg:text-3xl">🥋</span>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight leading-none">
                NoobSQL
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center">
            <Navbar />
          </div>
        </div>
      </div>
    </header>
  );
}
