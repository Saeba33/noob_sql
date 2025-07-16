import AccordionList from "@/components/AccordionList";
import SectionBottomNavigation from "@/components/navigation/SectionBottomNavigation";
import SectionTopNavigation from "@/components/navigation/SectionTopNavigation";
import SectionHeader from "@/components/ui/SectionHeader";
import { useBeltData, VALID_BELTS } from "@/hooks/useBeltData";

export default async function BeltPage({ params }) {
  const { belt } = params;
  const { beltContent } = await useBeltData(belt);

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

export async function generateStaticParams() {
  return Array.from(VALID_BELTS, (belt) => ({ belt }));
}
