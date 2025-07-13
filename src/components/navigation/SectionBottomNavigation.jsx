"use client";

import { useNavigation } from "@/hooks/useNavigation";
import { PAGES_CONFIG } from "@/config/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SectionBottomNavigation() {
  const { getSectionNavigation } = useNavigation();
  const { previous, next } = getSectionNavigation();
  const pathname = usePathname();

  // Get current belt colors
  const currentPage = Object.values(PAGES_CONFIG).find(
    (page) => page.href === pathname
  );
  const beltColors = currentPage?.colors || null;

  // Show only if we have a previous or next link
  if (!previous && !next) return null;

  const buttonClasses = beltColors
    ? `inline-flex items-center px-6 py-3 text-base font-medium text-white ${beltColors.accent} border border-transparent rounded-md hover:bg-opacity-90 transition-colors duration-200`
    : "inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors duration-200";

  return (
    <div
      className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-8 ${
        beltColors
          ? `border-t ${beltColors.border}`
          : "border-t border-gray-200"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex-1">
          {/* Previous Link */}
          {previous && (
            <Link href={previous.href} className={buttonClasses}>
              <ion-icon
                name="chevron-back-outline"
                class="w-5 h-5 mr-2"
              ></ion-icon>
              {previous.title}
            </Link>
          )}
        </div>

        <div className="flex-1 flex justify-end">
          {/* Next Link */}
          {next && (
            <Link href={next.href} className={buttonClasses}>
              {next.title}
              <ion-icon
                name="chevron-forward-outline"
                class="w-5 h-5 ml-2"
              ></ion-icon>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
