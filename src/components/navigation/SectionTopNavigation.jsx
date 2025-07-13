"use client";

import { useNavigation } from "@/hooks/useNavigation";
import { PAGES_CONFIG } from "@/config/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function SectionTopNavigation() {
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
    ? `inline-flex items-center px-4 py-2 text-sm font-medium ${beltColors.text} bg-white border ${beltColors.border} rounded-md hover:${beltColors.bg} hover:${beltColors.text} transition-colors duration-200`
    : "inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          {/* Previous Link */}
          {previous && (
            <Link 
              href={previous.href} 
              className="inline-flex items-center px-5 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <MdChevronLeft className="w-4 h-4 mr-2" />
              {previous.title}
            </Link>
          )}
        </div>

        <div className="flex-1 flex justify-end">
          {/* Next Link */}
          {next && (
            <Link 
              href={next.href} 
              className="inline-flex items-center px-5 py-3 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 hover:border-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {next.title}
              <MdChevronRight className="w-4 h-4 ml-2" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
