import { notFound } from "next/navigation";
import HeaderSection from "@/components/HeaderSection";
import DescriptionSection from "@/components/DescriptionSection";
import AccordionList from "@/components/AccordionList";
import SectionTopNavigation from "@/components/navigation/SectionTopNavigation";
import SectionBottomNavigation from "@/components/navigation/SectionBottomNavigation";

// Import des contenus de chaque ceinture
import { whiteBeltContent } from "@/data/sections/white";
import { yellowBeltContent } from "@/data/sections/yellow";
import { orangeBeltContent } from "@/data/sections/orange";
import { greenBeltContent } from "@/data/sections/green";
import { blueBeltContent } from "@/data/sections/blue";
import { brownBeltContent } from "@/data/sections/brown";
import { blackBeltContent } from "@/data/sections/black";

// Configuration des ceintures valides
const BELT_CONTENTS = {
  white: whiteBeltContent,
  yellow: yellowBeltContent,
  orange: orangeBeltContent,
  green: greenBeltContent,
  blue: blueBeltContent,
  brown: brownBeltContent,
  black: blackBeltContent,
};

const VALID_BELTS = Object.keys(BELT_CONTENTS);

export default async function BeltPage({ params }) {
  const { belt } = await params;

  // Vérifier si la ceinture est valide
  if (!VALID_BELTS.includes(belt)) {
    notFound();
  }

  // Récupérer le contenu de la ceinture
  const beltContent = BELT_CONTENTS[belt];

  return (
    <div className={`min-h-screen ${beltContent.colors.bg}`}>
      <main className="container mx-auto px-4 py-8 space-y-8">
        <HeaderSection 
          header={beltContent.header}
          beltColors={beltContent.colors}
        />
        
        <SectionTopNavigation 
          currentLevel={belt}
        />
        
        <DescriptionSection 
          pageDescription={beltContent.pageDescription}
        />
        
        <AccordionList 
          accordions={beltContent.accordions}
        />
        
        <SectionBottomNavigation 
          currentLevel={belt}
        />
      </main>
    </div>
  );
}

// Génération statique pour toutes les ceintures valides
export async function generateStaticParams() {
  return VALID_BELTS.map((belt) => ({
    belt,
  }));
}
