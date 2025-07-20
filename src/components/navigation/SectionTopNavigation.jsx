"use client";

import { BELT_COLORS } from "@/config/colors";
import { useNavigation } from "@/hooks/useNavigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function SectionTopNavigation() {
  const { getSectionNavigation } = useNavigation();
  const { previous, next } = getSectionNavigation();
  const pathname = usePathname();

  // Determine current belt
  const currentBelt = pathname?.split("/")[1];
  const colors = BELT_COLORS[currentBelt] || BELT_COLORS.white;

  // Show only if we have a previous or next link
  if (!previous && !next) return null;

  // Determine button labels
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
    <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          {/* Previous Link */}
          {previous && (
            <Link
              href={previous.href}
              className={`border-pop inline-flex items-center px-4 py-2 bg-white rounded-lg shadow-sm focus:outline-none group ${
                colors.text || "text-gray-700"
              } transition-opacity`}
            >
              <MdChevronLeft
                className={`w-5 h-5 mr-1 transition-opacity`}
              />
              <span
                className={`text-sm font-medium transition-opacity`}
              >
                {getPreviousLabel()}
              </span>
            </Link>
          )}
        </div>

        <div className="flex-1 flex justify-end">
          {/* Next Link */}
          {next && (
            <Link
              href={next.href}
              className={`border-pop inline-flex items-center px-4 py-2 bg-white rounded-lg shadow-sm focus:outline-none group ${
                colors.text || "text-gray-700"
              } transition-opacity`}
            >
              <span
                className={`text-sm font-medium transition-opacity`}
              >
                {getNextLabel()}
              </span>
              <MdChevronRight
                className={`w-5 h-5 ml-1 transition-opacity`}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
