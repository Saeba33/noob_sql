"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import BeltIcon from "@/components/ui/BeltIcon";
import { PAGES_CONFIG } from "@/config/navigation";
import { NAVBAR_COLORS } from "@/config/colors";

export default function Navbar() {
  const pathname = usePathname();

  const navigationItems = Object.values(PAGES_CONFIG).sort(
    (a, b) => a.order - b.order
  );

  const isActive = (href) => pathname === href;

  return (
    <nav className="flex items-center space-x-4">
      {/* Navigation Items */}
      {navigationItems.map((item, index) => {
        const beltKey =
          item.href === "/practice" ? "practice" : item.href.replace("/", "");
        const beltStyle = NAVBAR_COLORS[beltKey] || NAVBAR_COLORS.white;

        const customStyles = {
          "/general": "bg-blue-100 border-blue-500",
          "/advanced-query": "bg-green-100 border-green-500",
          "/practice": "bg-indigo-100 border-indigo-500 border-dashed",
        };

        const buttonStyle = customStyles[item.href] || "bg-gray-100 border-gray-300";

        return (
          <Link
            key={`${item.key}-${index}`}
            href={item.href}
            className={`border-pop ${isActive(item.href) ? "active" : ""} ${
              beltStyle.activeText
            } ${beltStyle.activeBg} ${buttonStyle} hover:bg-opacity-80 transition-colors rounded-lg px-4 py-2`}
          >
            {item.href !== "/practice" && <BeltIcon belt={beltKey} size={16} />}
            <span className="ml-2">{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
