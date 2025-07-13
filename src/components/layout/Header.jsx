import Navbar from "@/components/navigation/Navbar";
import Link from "next/link";

export default function Header() {
  return (
    <header className="z-50 sticky top-0 w-full bg-white">
      {/* Logo Title */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1500px] mx-auto px-4">
          <div className="flex justify-center items-center h-16">
            <Link
              href="/"
              className="text-2xl font-bold text-blue-600"
            >
              NoobSQL
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Navbar />
    </header>
  );
}
