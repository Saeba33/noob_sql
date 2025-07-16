"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import BeltIcon from "@/components/ui/BeltIcon";
import { FaFistRaised } from "react-icons/fa";
import { PAGES_CONFIG } from "@/config/navigation";
import { BELT_COLORS } from "@/config/colors";

export default function Navbar() {
  const pathname = usePathname();

  const navigationItems = PAGES_CONFIG;

  const isActive = (href) => pathname === href;

  return (
    <nav className="flex items-center space-x-4">
      {/* Navigation Items */}
      {navigationItems.map((item, index) => {
        const beltKey = item.href.replace("/", "") || "white";
        const colors = BELT_COLORS[beltKey] || BELT_COLORS.white;

        return (
          <Link
            key={`${beltKey}-${index}`}
            href={item.href}
            className={`border-pop ${isActive(item.href) ? "active" : ""} ${
              colors.bg
            } border-2 border-gray-300 ${colors.text} hover:bg-opacity-80 transition-colors rounded-lg px-4 py-2 flex items-center`}
          >
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${colors.bg} shadow-sm`}>
              {item.iconType === "belt" ? (
                <BeltIcon belt={beltKey} size={16} />
              ) : (
                <FaFistRaised size={16} />
              )}
            </div>
            <span className="ml-2">
              {item.title}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
