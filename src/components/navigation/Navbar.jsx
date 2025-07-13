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
      text: "text-gray-700"
    },
    yellow: { 
      ring: "ring-yellow-400", 
      hover: "hover:bg-yellow-50",
      text: "text-yellow-700"
    },
    orange: { 
      ring: "ring-orange-400", 
      hover: "hover:bg-orange-50",
      text: "text-orange-700"
    },
    green: { 
      ring: "ring-green-400", 
      hover: "hover:bg-green-50",
      text: "text-green-700"
    },
    blue: { 
      ring: "ring-blue-400", 
      hover: "hover:bg-blue-50",
      text: "text-blue-700"
    },
    brown: { 
      ring: "ring-yellow-800", 
      hover: "hover:bg-yellow-50",
      text: "text-yellow-800"
    },
    black: { 
      ring: "ring-gray-800", 
      hover: "hover:bg-gray-50",
      text: "text-gray-800"
    },
    practice: { 
      ring: "ring-green-600", 
      hover: "hover:bg-green-50",
      text: "text-green-700"
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
                ? "bg-green-600 text-white border-green-600 shadow-md hover:bg-green-700 hover:shadow-lg"
                : isActive(item.href)
                ? `${beltStyle.ring} ring-2 bg-white border-transparent shadow-md ${beltStyle.text}`
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
