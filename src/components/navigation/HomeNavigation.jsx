"use client";

import BeltIcon from "@/components/ui/BeltIcon";
import { PAGES_CONFIG } from "@/config/navigation";
import Link from "next/link";
import { MdFitnessCenter } from "react-icons/md";
import { HOME_NAV_COLORS } from "@/config/colors";

// Import des contenus de chaque ceinture pour les données complètes
import { blackBeltContent } from "@/data/sections/black";
import { blueBeltContent } from "@/data/sections/blue";
import { brownBeltContent } from "@/data/sections/brown";
import { greenBeltContent } from "@/data/sections/green";
import { orangeBeltContent } from "@/data/sections/orange";
import { whiteBeltContent } from "@/data/sections/white";
import { yellowBeltContent } from "@/data/sections/yellow";

// Mapping des contenus par ceinture
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
  // Combiner les données de navigation avec les contenus détaillés
  const belts = Object.entries(PAGES_CONFIG)
    .filter(([key, page]) => BELT_CONTENTS[key]) // Seulement les ceintures qui ont du contenu
    .map(([key, page]) => ({
      ...page,
      key,
      content: BELT_CONTENTS[key],
      description: BELT_CONTENTS[key].description,
      topics: BELT_CONTENTS[key].topics,
    }))
    .sort((a, b) => a.order - b.order);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Belt Cards */}
        {belts.map((page) => {
          const colors = HOME_NAV_COLORS[page.key];

          return (
            <Link key={page.key} href={page.href} className="group">
              <div
                className={`
                ${colors.bg} 
                ${colors.border}
                border-l-4
                border-gray-100
                border
                rounded-lg 
                p-4 
                shadow-sm 
                hover:shadow-md 
                transition-all 
                duration-200 
                h-48
                flex
                flex-col
              `}
              >
                <div className="flex items-center mb-3">
                  <BeltIcon belt={page.key} size={20} className="mr-3" />
                  <h3
                    className={`text-base font-semibold text-gray-700 group-hover:${colors.text.replace(
                      "text-",
                      ""
                    )} transition-colors`}
                  >
                    {page.title}
                  </h3>
                </div>

                <p className="text-gray-600 mb-3 text-sm flex-1">
                  {page.description}
                </p>

                <div className="space-y-1 mt-auto">
                  {page.topics.slice(0, 3).map((topic, index) => (
                    <div key={index} className="text-xs text-gray-500">
                      • {topic}
                    </div>
                  ))}
                  {page.topics.length > 3 && (
                    <div className="text-xs text-gray-400">
                      + {page.topics.length - 3} autres...
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}

        {/* Practice Card */}
        <Link href="/practice" className="group">
          <div className="bg-white border-l-purple-600 border-l-4 border-gray-100 border rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 h-48 flex flex-col">
            <div className="flex items-center mb-3">
              <MdFitnessCenter className="text-purple-600 mr-3 w-5 h-5" />
              <h3 className="text-base font-semibold text-gray-700 group-hover:text-purple-600 transition-colors">
                Pratique
              </h3>
            </div>

            <p className="text-gray-600 mb-3 text-sm flex-1">
              Testez vos compétences à travers tous les niveaux de ceinture
            </p>

            <div className="space-y-1 mt-auto">
              <div className="text-xs text-gray-500">• Exercices pratiques</div>
              <div className="text-xs text-gray-500">• Tests de niveau</div>
              <div className="text-xs text-gray-500">
                • Validation des acquis
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
