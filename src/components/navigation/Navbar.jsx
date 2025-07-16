"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import BeltIcon from "@/components/ui/BeltIcon";
import { FaFistRaised } from "react-icons/fa";
import { PAGES_CONFIG } from "@/config/navigation";
import { NAVBAR_BUTTON_STYLES } from "@/config/colors";

export default function Navbar() {
  const pathname = usePathname();

  const navigationItems = PAGES_CONFIG;

  const isActive = (href) => pathname === href;

  return (
    <nav className="flex items-center space-x-4">
      {/* Navigation Items */}
      {navigationItems.map((item, index) => {
        const beltKey = item.href.replace("/", "") || "white";
        const buttonStyles = NAVBAR_BUTTON_STYLES[beltKey] || NAVBAR_BUTTON_STYLES.white;

        return (
          <Link
            key={`${beltKey}-${index}`}
            href={item.href}
            className={`border-pop ${isActive(item.href) ? "active" : ""} ${
              buttonStyles.bg
            } ${buttonStyles.border} ${buttonStyles.text} hover:bg-opacity-80 transition-colors rounded-lg px-4 py-2 flex items-center border-2`}
          >
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${buttonStyles.iconBg} shadow-sm`}>
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
