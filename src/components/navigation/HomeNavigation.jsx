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
            <Link key={page.key} href={page.href} className={`home-card ${colors.text}`}>
              <h3 className="text-xl font-bold mb-4">{page.title}</h3>

              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {page.description}
              </p>

              <div className="space-y-2">

                {page.topics.slice(0, 4).map((topic, index) => (
                  <div key={index} className="text-sm text-gray-700 flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <span>{topic}</span>
                  </div>
                ))}
                {page.topics.length > 4 && (
                  <div className="text-sm text-gray-500">
                    + {page.topics.length - 4} autres sujets
                  </div>
                )}
              </div>
            </Link>
          );
        })}

        {/* Practice Card */}
        <Link href="/practice" className={`home-card ${BELT_COLORS.practice.text}`}>
          <div className="flex items-center mb-4">
            <FaFistRaised
              size={24}
              style={{ color: BELT_COLORS.practice.icon }}
              className="mr-3"
            />
            <h3 className="text-xl font-bold">
              Passez 1<sup className="text-sm">ère</sup> DAN
            </h3>
          </div>

          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            Testez vos connaissances au travers d'exercices pratiques
          </p>

          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Au programme :
            </div>
            <div className="text-sm text-gray-700 flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span>Exercices pratiques</span>
            </div>
            <div className="text-sm text-gray-700 flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span>Tests de niveau</span>
            </div>
            <div className="text-sm text-gray-700 flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span>Validation des acquis</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
