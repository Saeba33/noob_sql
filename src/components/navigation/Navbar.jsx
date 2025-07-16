"use client";

import BeltIcon from "@/components/ui/BeltIcon";
import { BELT_COLORS } from "@/config/colors";
import { PAGES_CONFIG } from "@/config/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFistRaised } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();

  const navigationItems = PAGES_CONFIG;

  const isActive = (href) => pathname === href;

  return (
    <nav className="flex items-center space-x-3 lg:space-x-4">
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
            } border-2 ${colors.border} ${
              colors.text
            } hover:bg-opacity-80 transition-colors rounded-lg px-3 py-2 lg:px-4 lg:py-2 flex items-center text-sm lg:text-base`}
          >
            <div
              className={`flex items-center justify-center w-7 h-7 lg:w-8 lg:h-8 rounded-full ${colors.bg} shadow-sm`}
            >
              {item.iconType === "belt" ? (
                <BeltIcon belt={beltKey} size={14} className="lg:w-4 lg:h-4" />
              ) : (
                <FaFistRaised size={14} className="lg:w-4 lg:h-4" />
              )}
            </div>
            <span className="ml-2 font-medium">{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
