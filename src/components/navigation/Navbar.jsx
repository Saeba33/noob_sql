"use client";

import BeltIcon from "@/components/ui/BeltIcon";
import { PAGES_CONFIG } from "@/config/navigation";
import { useNavigation } from "@/hooks/useNavigation";
import { NAVBAR_COLORS } from "@/config/colors";
import Link from "next/link";

export default function Navbar() {
  const { getPageNavigation } = useNavigation();
  const { items, isActive } = getPageNavigation();
  const navigationItems = Object.values(PAGES_CONFIG).sort(
    (a, b) => a.order - b.order
  );

  return (
    <nav className="flex items-center space-x-4">
      {items.map((item) => {
        const pageConfig = navigationItems.find(
          (config) => config.href === item.href
        );

        const isPractice = item.href === "/practice";
        const beltKey = isPractice ? "practice" : item.href.replace("/", "");
        const beltStyle = NAVBAR_COLORS[beltKey] || NAVBAR_COLORS.white;

        return (
          <Link
            key={item.key}
            href={item.href}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium border focus:outline-none ${
              isPractice
                ? "bg-purple-600 text-white border-purple-600 shadow-md hover:bg-purple-700 hover:shadow-lg hover:border-purple-700"
                : isActive(item.href)
                ? `${beltStyle.ring} ring-2 ${beltStyle.activeBg} border-transparent shadow-md ${beltStyle.activeText}`
                : `text-gray-700 border-transparent ${beltStyle.hover} ${beltStyle.hoverBorder}`
            }`}
          >
            {!isPractice && <BeltIcon belt={beltKey} size={16} />}
            <span>{pageConfig?.title || item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
