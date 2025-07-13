"use client";

import { PAGES_CONFIG } from "@/config/navigation";
import Link from "next/link";

// Import des contenus de chaque ceinture pour les données complètes
import { whiteBeltContent } from "@/data/sections/white";
import { yellowBeltContent } from "@/data/sections/yellow";
import { orangeBeltContent } from "@/data/sections/orange";
import { greenBeltContent } from "@/data/sections/green";
import { blueBeltContent } from "@/data/sections/blue";
import { brownBeltContent } from "@/data/sections/brown";
import { blackBeltContent } from "@/data/sections/black";

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

export default function IntroductionPage() {
  // Combiner les données de navigation avec les contenus détaillés
  const belts = Object.entries(PAGES_CONFIG)
    .filter(([key, page]) => BELT_CONTENTS[key]) // Seulement les ceintures qui ont du contenu
    .map(([key, page]) => ({
      ...page,
      key,
      content: BELT_CONTENTS[key],
      colors: BELT_CONTENTS[key].colors,
      beltBadge: BELT_CONTENTS[key].beltBadge,
      description: BELT_CONTENTS[key].description,
      topics: BELT_CONTENTS[key].topics,
      beltDisplayName: BELT_CONTENTS[key].beltDisplayName,
    }))
    .sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen">
      {/* Belt Progression Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            SQL SQL SQL
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
Blabla
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Belt Cards */}
          {belts.map((page) => {
            const colors = page.colors;

            return (
              <Link key={page.key} href={page.href} className="group">
                <div
                  className={`
                  ${colors.bg} 
                  ${colors.border} 
                  border-2 
                  rounded-xl 
                  p-6 
                  shadow-lg 
                  hover:shadow-xl 
                  transition-all 
                  duration-300 
                  group-hover:scale-105
                `}
                >
                  <div className="flex items-center mb-4">
                    <div 
                      className={`
                        w-16 h-16 
                        ${colors.bg} 
                        ${colors.text} 
                        ${colors.border} 
                        border-2 
                        rounded-full 
                        flex 
                        items-center 
                        justify-center 
                        font-bold 
                        shadow-lg 
                        mr-4
                      `}
                      title={`Ceinture ${page.beltDisplayName}`}
                    >
                      {page.beltBadge}
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold ${colors.text}`}>
                        {page.title.split(" - ")[0]}
                      </h3>
                      <p className={`text-sm ${colors.text} opacity-75`}>
                        {page.title.split(" - ")[1]}
                      </p>
                    </div>
                  </div>

                  <p className={`${colors.text} mb-4 text-sm`}>
                    {page.description}
                  </p>

                  <div className="space-y-1">
                    {page.topics.slice(0, 3).map((topic, index) => (
                      <div
                        key={index}
                        className={`text-xs ${colors.text} opacity-75`}
                      >
                        • {topic}
                      </div>
                    ))}
                    {page.topics.length > 3 && (
                      <div className={`text-xs ${colors.text} opacity-50`}>
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
            <div className="bg-gradient-to-br from-green-100 to-blue-100 border-2 border-green-300 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-2xl mr-4">
                  🏟️
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    En pratique
                  </h3>
                  <p className="text-sm text-gray-600 opacity-75">
                    Dojo d'entraînement
                  </p>
                </div>
              </div>

              <p className="text-gray-700 mb-4 text-sm">
                Testez vos compétences à travers tous les niveaux de ceinture
              </p>

              <div className="space-y-1">
                <div className="text-xs text-gray-600 opacity-75">
                  • Exercices pratiques
                </div>
                <div className="text-xs text-gray-600 opacity-75">
                  • Tests de niveau
                </div>
                <div className="text-xs text-gray-600 opacity-75">
                  • Validation des acquis
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
