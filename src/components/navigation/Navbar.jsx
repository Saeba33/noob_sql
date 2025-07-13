"use client";

import { useNavigation } from "@/hooks/useNavigation";
import { PAGES_CONFIG } from "@/config/navigation";
import BeltIcon from "@/components/ui/BeltIcon";
import Link from "next/link";

export default function Navbar() {
  const { getPageNavigation } = useNavigation();
  const { items, isActive } = getPageNavigation();
  const navigationItems = Object.values(PAGES_CONFIG)
    .sort((a, b) => a.order - b.order);

  // Couleurs de ceintures pour les styles
  const beltColors = {
    white: { 
      ring: "ring-gray-400", 
      hover: "hover:bg-gray-50",
      text: "text-gray-700",
      activeText: "text-gray-800",
      activeBg: "bg-gray-50"
    },
    yellow: { 
      ring: "ring-yellow-400", 
      hover: "hover:bg-yellow-50",
      text: "text-yellow-700",
      activeText: "text-yellow-800",
      activeBg: "bg-yellow-50"
    },
    orange: { 
      ring: "ring-orange-400", 
      hover: "hover:bg-orange-50",
      text: "text-orange-700",
      activeText: "text-orange-800",
      activeBg: "bg-orange-50"
    },
    green: { 
      ring: "ring-green-400", 
      hover: "hover:bg-green-50",
      text: "text-green-700",
      activeText: "text-green-800",
      activeBg: "bg-green-50"
    },
    blue: { 
      ring: "ring-blue-400", 
      hover: "hover:bg-blue-50",
      text: "text-blue-700",
      activeText: "text-blue-800",
      activeBg: "bg-blue-50"
    },
    brown: { 
      ring: "ring-amber-700", 
      hover: "hover:bg-amber-50",
      text: "text-amber-800",
      activeText: "text-amber-900",
      activeBg: "bg-amber-50"
    },
    black: { 
      ring: "ring-gray-800", 
      hover: "hover:bg-gray-50",
      text: "text-gray-800",
      activeText: "text-gray-900",
      activeBg: "bg-gray-50"
    },
    practice: { 
      ring: "ring-purple-600", 
      hover: "hover:bg-purple-50",
      text: "text-purple-700"
    }
  };

  return (
    <nav className="flex items-center space-x-4">
      {items.map((item) => {
        const pageConfig = navigationItems.find(
          (config) => config.href === item.href
        );

        const isPractice = item.href === "/practice";
        const beltKey = isPractice ? "practice" : item.href.replace("/", "");
        const beltStyle = beltColors[beltKey] || beltColors.white;

        return (
          <Link
            key={item.key}
            href={item.href}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium border focus:outline-none ${
              isPractice
                ? "bg-purple-600 text-white border-purple-600 shadow-md hover:bg-purple-700 hover:shadow-lg"
                : isActive(item.href)
                ? `${beltStyle.ring} ring-2 ${beltStyle.activeBg} border-transparent shadow-md ${beltStyle.activeText}`
                : `text-gray-700 border-transparent ${beltStyle.hover} hover:border-gray-200`
            }`}
          >
            {!isPractice && (
              <BeltIcon belt={beltKey} size={16} />
            )}
            <span>
              {pageConfig?.title || item.title}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
