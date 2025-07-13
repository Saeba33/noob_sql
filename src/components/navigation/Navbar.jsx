"use client";

import { useNavigation } from "@/hooks/useNavigation";
import { PAGES_CONFIG } from "@/config/navigation";
import Link from "next/link";

export default function Navbar() {
  const { getPageNavigation } = useNavigation();
  const { items, isActive } = getPageNavigation();
  const navigationItems = Object.values(PAGES_CONFIG)
    .sort((a, b) => a.order - b.order);

  return (
    <nav className="flex items-center space-x-6">
      {items.map((item) => {
        const pageConfig = navigationItems.find(
          (config) => config.href === item.href
        );

        const isPractice = item.href === "/practice";

        return (
          <Link
            key={item.key}
            href={item.href}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium border ${
              isPractice
                ? "bg-green-600 text-white border-green-600 shadow-md hover:bg-green-700 hover:shadow-lg"
                : isActive(item.href)
                ? "bg-blue-600 text-white border-blue-600 shadow-md hover:bg-blue-700"
                : "text-gray-700 border-gray-200 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-300"
            }`}
          >
            <span>
              {pageConfig?.title || item.title}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
