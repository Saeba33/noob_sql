"use client";

import Link from "next/link";
import { useNavigation } from "@/hooks/useNavigation";

export default function SectionBottomNavigation() {
  const { getSectionNavigation } = useNavigation();
  const { previous, next } = getSectionNavigation();

  // Show only if we have a previous ou next link
  if (!previous && !next) return null;

  return (
    <div className="">
      <div className="">
        <div className="">
          {/* Previouos Link */}
          <div className="">
            {previous && (
              <Link
                href={previous.href}
                className=""
              >
                <ion-icon
                  name="chevron-back-outline"
                  class="w-4 h-4"
                ></ion-icon>
                {previous.title}
              </Link>
            )}
          </div>

          {/* Next Link */}
          <div className="">
            {next && (
              <Link
                href={next.href}
                className=""
              >
                {next.title}
                <ion-icon
                  name="chevron-forward-outline"
                  class="w-4 h-4"
                ></ion-icon>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
