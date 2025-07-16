import AccordionList from "@/components/AccordionList";
import SectionBottomNavigation from "@/components/navigation/SectionBottomNavigation";
import SectionTopNavigation from "@/components/navigation/SectionTopNavigation";
import SectionHeader from "@/components/ui/SectionHeader";
import { notFound } from "next/navigation";

// Valid belt configuration
const VALID_BELTS = ["white", "yellow", "orange", "green", "blue", "brown", "black"];

// Dynamic import function for belt content
async function getBeltContent(belt) {
  try {
    const module = await import(`@/data/sections/${belt}`);
    return module[`${belt}BeltContent`];
  } catch (error) {
    console.error(`Failed to load content for belt: ${belt}`, error);
    return null;
  }
}

export default async function BeltPage({ params }) {
  const { belt } = await params;

  // Check if belt is valid
  if (!VALID_BELTS.includes(belt)) {
    notFound();
  }

  // Get belt content dynamically
  const beltContent = await getBeltContent(belt);
  
  if (!beltContent) {
    notFound();
  }

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
