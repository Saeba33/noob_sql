"use client";

import { BELT_COLORS } from "@/config/colors";
import { useNavigation } from "@/hooks/useNavigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function SectionBottomNavigation() {
  const { getSectionNavigation } = useNavigation();
  const { previous, next, current } = getSectionNavigation();
  const pathname = usePathname();

  // Determine current belt
  const currentBelt = pathname?.split("/")[1];
  const colors = currentBelt === "black"
    ? BELT_COLORS.black
    : BELT_COLORS[currentBelt] || BELT_COLORS.white;

  // Show only if we have a previous or next link
  if (!previous && !next) return null;

  // Determine button labels
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
      <div className={`border-accent p-6 shadow-sm ${
        colors.text || "text-gray-700"
      }`}>
        <div className="flex justify-between items-center min-h-[48px]">
          <div className="flex-1 flex items-center">
            {/* Previous Link */}
            {previous && (
              <Link
                href={previous.href}
                className={`border-pop inline-flex items-center px-4 py-2 bg-white rounded-lg shadow-sm focus:outline-none ${
                  colors.text || "text-gray-700"
                } hover:opacity-70 transition-opacity`}
              >
                <MdChevronLeft className="w-5 h-5 mr-1" />
                <span className="text-sm font-medium">
                  {getPreviousLabel()}
                </span>
              </Link>
            )}
          </div>

          {/* Current Page Title */}
          <div className="flex-1 flex items-center justify-center">
            <div className={`bg-white border border-gray-200 rounded-lg shadow-sm px-6 py-3 ${
              colors.text || "text-gray-700"
            }`}>
              <h3 className="text-lg font-semibold">
                {current?.title || ""}
              </h3>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-end">
            {/* Next Link */}
            {next && (
              <Link
                href={next.href}
                className={`border-pop inline-flex items-center px-4 py-2 bg-white rounded-lg shadow-sm focus:outline-none ${
                  colors.text || "text-gray-700"
                } hover:opacity-70 transition-opacity`}
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
