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
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
              isPractice
                ? "bg-gray-800 text-white shadow-lg hover:bg-gray-900"
                : isActive(item.href)
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
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
