"use client";

import { useNavigation } from "@/hooks/useNavigation";
import { PAGES_CONFIG } from "@/config/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

// Couleurs de ceinture pour le texte
const BELT_TEXT_COLORS = {
  white: "text-gray-600",
  yellow: "text-yellow-600", 
  orange: "text-orange-600",
  green: "text-green-600",
  blue: "text-blue-600",
  brown: "text-yellow-800",
  black: "text-gray-800",
};

export default function SectionTopNavigation() {
  const { getSectionNavigation } = useNavigation();
  const { previous, next } = getSectionNavigation();
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
    return `Précédent : ${previous.title}`;
  };

  const getNextLabel = () => {
    if (!next) return "";
    return `Suivant : ${next.title}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          {/* Previous Link */}
          {previous && (
            <Link 
              href={previous.href} 
              className={`inline-flex items-center ${textColor} hover:opacity-70 transition-opacity`}
            >
              <MdChevronLeft className="w-5 h-5 mr-1" />
              <span className="text-sm font-medium">{getPreviousLabel()}</span>
            </Link>
          )}
        </div>

        <div className="flex-1 flex justify-end">
          {/* Next Link */}
          {next && (
            <Link 
              href={next.href} 
              className={`inline-flex items-center ${textColor} hover:opacity-70 transition-opacity`}
            >
              <span className="text-sm font-medium">{getNextLabel()}</span>
              <MdChevronRight className="w-5 h-5 ml-1" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
