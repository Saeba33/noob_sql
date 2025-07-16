"use client";

import BeltIcon from "@/components/ui/BeltIcon";
import { BELT_COLORS } from "@/config/colors";
import { PAGES_CONFIG } from "@/config/navigation";
import Link from "next/link";
import { FaFistRaised } from "react-icons/fa";

// Import belt content for complete data
import { blackBeltContent } from "@/data/sections/black";
import { blueBeltContent } from "@/data/sections/blue";
import { brownBeltContent } from "@/data/sections/brown";
import { greenBeltContent } from "@/data/sections/green";
import { orangeBeltContent } from "@/data/sections/orange";
import { whiteBeltContent } from "@/data/sections/white";
import { yellowBeltContent } from "@/data/sections/yellow";

// Belt content mapping
const BELT_CONTENTS = {
  white: whiteBeltContent,
  yellow: yellowBeltContent,
  orange: orangeBeltContent,
  green: greenBeltContent,
  blue: blueBeltContent,
  brown: brownBeltContent,
  black: blackBeltContent,
};

export default function HomeNavigation() {
  // Combine navigation data with detailed content
  const belts = PAGES_CONFIG.filter((page) => {
    const key = page.href.replace("/", "");
    return BELT_CONTENTS[key]; // Only belts that have content
  }).map((page) => {
    const key = page.href.replace("/", "");
    return {
      ...page,
      key,
      content: BELT_CONTENTS[key],
      description: BELT_CONTENTS[key].description,
      topics: BELT_CONTENTS[key].topics,
    };
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Belt Cards */}
        {belts.map((page) => {
          const colors = BELT_COLORS[page.key];

          return (
            <Link key={page.key} href={page.href} className="group">
              <div
                className={`border-pop bg-white border-2 ${colors.border} ${colors.text} hover:bg-opacity-80 transition-all duration-200 rounded-lg p-3 shadow-sm hover:shadow-md w-full h-56 flex flex-col`}
              >
                <div className="flex items-center mb-2">
                  <BeltIcon belt={page.key} size={20} className="mr-3" />
                  <h3 className="text-xl font-semibold">{page.title}</h3>
                </div>

                <div className="pl-2 flex-1 flex flex-col">
                  <p className="text-sm text-gray-600 mb-3">
                    {page.description}
                  </p>

                  <div className="space-y-1 flex-1">
                    {page.topics.slice(0, 5).map((topic, index) => (
                      <div key={index} className="text-xs text-gray-500">
                        • {topic}
                      </div>
                    ))}
                    {page.topics.length > 5 && (
                      <div className="text-xs text-gray-400">
                        + {page.topics.length - 5} autres...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}

        {/* Practice Card */}
        <Link href="/practice" className="group">
          <div
            className={`border-pop bg-white border-2 ${BELT_COLORS.practice.border} ${BELT_COLORS.practice.text} hover:bg-opacity-80 transition-all duration-200 rounded-lg p-3 shadow-sm hover:shadow-md w-full h-56 flex flex-col`}
          >
            <div className="flex items-center mb-2">
              <FaFistRaised
                size={20}
                style={{ color: BELT_COLORS.practice.icon }}
                className="mr-3"
              />
              <h3 className="text-lg font-semibold">
                Passez 1<sup className="text-[10px]">ère</sup> DAN
              </h3>
            </div>

            <div className="pl-2 flex-1 flex flex-col">
              <p className="text-sm text-gray-600 mb-1">
                Testez vos connaissances au travers d'exercices
              </p>

              <div className="space-y-1 flex-1">
                <div className="text-xs text-gray-500">
                  • Exercices pratiques
                </div>
                <div className="text-xs text-gray-500">• Tests de niveau</div>
                <div className="text-xs text-gray-500">
                  • Validation des acquis
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
