"use client";

import { useNavigation } from "@/hooks/useNavigation";
import Link from "next/link";

export default function SectionTopNavigation() {
  const { getSectionNavigation } = useNavigation();
  const { previous, next } = getSectionNavigation();

  // Show only if we have a previous or next link
  if (!previous && !next) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          {/* Previous Link */}
          {previous && (
            <Link
              href={previous.href}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
            >
              <ion-icon
                name="chevron-back-outline"
                class="w-4 h-4 mr-2"
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
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
            >
              {next.title}
              <ion-icon
                name="chevron-forward-outline"
                class="w-4 h-4 ml-2"
              ></ion-icon>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
