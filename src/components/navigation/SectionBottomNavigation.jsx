"use client";

import { useNavigation } from "@/hooks/useNavigation";
import Link from "next/link";

export default function SectionBottomNavigation() {
  const { getSectionNavigation } = useNavigation();
  const { previous, next } = getSectionNavigation();

  // Show only if we have a previous or next link
  if (!previous && !next) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200 mt-8">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          {/* Previous Link */}
          {previous && (
            <Link
              href={previous.href}
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
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
            <Link
              href={next.href}
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
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
