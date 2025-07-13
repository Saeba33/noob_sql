"use client";

import { useNavigation } from "@/hooks/useNavigation";
import { PAGES_CONFIG } from "@/config/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

// Couleurs de ceinture pour le texte avec meilleur contraste
const BELT_TEXT_COLORS = {
  white: "text-gray-700",
  yellow: "text-yellow-700", 
  orange: "text-orange-700",
  green: "text-green-700",
  blue: "text-blue-700",
  brown: "text-amber-900",
  black: "text-gray-800", // Reste noir car sur fond blanc
};

export default function SectionBottomNavigation() {
  const { getSectionNavigation } = useNavigation();
  const { previous, next, current } = getSectionNavigation();
  const pathname = usePathname();
  
  // Déterminer la ceinture actuelle
  const currentBelt = pathname?.split('/')[1];
  const textColor = BELT_TEXT_COLORS[currentBelt] || "text-gray-600";

  // Show only if we have a previous or next link
  if (!previous && !next) return null;

  // Déterminer les libellés des boutons
  const getPreviousLabel = () => {
    if (!previous) return "";
    if (previous.href === "/") return "Retour à l'accueil";
    return previous.title;
  };

  const getNextLabel = () => {
    if (!next) return "";
    return next.title;
  };

  return (
    <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center">
        <div className="flex-1">
          {/* Previous Link */}
          {previous && (
            <Link
              href={previous.href}
              className={`inline-flex items-center ${textColor} hover:opacity-70 transition-opacity focus:outline-none`}
            >
              <MdChevronLeft className="w-5 h-5 mr-1" />
              <span className="text-sm font-medium">{getPreviousLabel()}</span>
            </Link>
          )}
        </div>

        {/* Current Page Title */}
        <div className="flex-1 text-center">
          <h3 className="text-lg font-semibold text-gray-900">
            {current?.title || ""}
          </h3>
        </div>

        <div className="flex-1 flex justify-end">
          {/* Next Link */}
          {next && (
            <Link
              href={next.href}
              className={`inline-flex items-center ${textColor} hover:opacity-70 transition-opacity focus:outline-none`}
            >
              <span className="text-sm font-medium">{getNextLabel()}</span>
              <MdChevronRight className="w-5 h-5 ml-1" />
            </Link>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
