import AccordionList from "@/components/AccordionList";
import SectionBottomNavigation from "@/components/navigation/SectionBottomNavigation";
import SectionTopNavigation from "@/components/navigation/SectionTopNavigation";
import SectionHeader from "@/components/ui/SectionHeader";
import { notFound } from "next/navigation";

// Import belt content for each level
import { blackBeltContent } from "@/data/sections/black";
import { blueBeltContent } from "@/data/sections/blue";
import { brownBeltContent } from "@/data/sections/brown";
import { greenBeltContent } from "@/data/sections/green";
import { orangeBeltContent } from "@/data/sections/orange";
import { whiteBeltContent } from "@/data/sections/white";
import { yellowBeltContent } from "@/data/sections/yellow";

// Valid belt configuration
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

  // Check if belt is valid
  if (!VALID_BELTS.includes(belt)) {
    notFound();
  }

  // Get belt content
  const beltContent = BELT_CONTENTS[belt];

  return (
    <div className={`min-h-screen ${beltContent.colors.bg}`}>
      <main className="mx-auto space-y-8">
        <SectionHeader
          title={beltContent.header.title}
          description={beltContent.pageDescription.content}
          tag={beltContent.header.tag}
          tagProps={{ beltColors: beltContent.colors }}
          descriptionClassName={`${beltContent.colors.text} leading-relaxed`}
          className="mb-6"
        />

        <SectionTopNavigation currentLevel={belt} />

        <AccordionList accordions={beltContent.accordions} />

        <SectionBottomNavigation currentLevel={belt} />
      </main>
    </div>
  );
}

// Static generation for all valid belts
export async function generateStaticParams() {
  return VALID_BELTS.map((belt) => ({
    belt,
  }));
}
