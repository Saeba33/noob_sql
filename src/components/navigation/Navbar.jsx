"use client";

import Link from "next/link";
import { useNavigation } from "@/hooks/useNavigation";

export default function Navbar() {
  const { getPageNavigation } = useNavigation();
  const { items, isActive } = getPageNavigation();

  return (
    <nav className="bg-gray-500">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center h-12">
          {/* Navigation */}
          <div className="flex items-center space-x-8">
            {items.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`px-3 py-2 ${
                  isActive(item.href)
                    ? "text-blue-600"
                    : "text-white"
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
