import AccordionSection from "@/components/AccordionSection";
import DescriptionSection from "@/components/DescriptionSection";
import HeaderSection from "@/components/HeaderSection";
import SectionBottomNavigation from "@/components/navigation/SectionBottomNavigation";
import SectionTopNavigation from "@/components/navigation/SectionTopNavigation";
import { ddlContent } from "@/data/sections/ddl";

export default function DdlPage() {
  const { header, pageDescription, accordions } = ddlContent;

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderSection
        title={header.title}
        description={header.description}
        tag={header.tag}
      />

      <SectionTopNavigation />

      <DescriptionSection
        title={pageDescription.title}
        description={pageDescription.description}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {accordions.map((accordion) => (
          <AccordionSection
            key={accordion.id}
            title={accordion.title}
            content={accordion.content}
            sqlCode={accordion.sqlCode}
            diagram={accordion.diagram}
            schema={accordion.schema}
            result={accordion.result}
            table={accordion.table}
            explanation={accordion.explanation}
          />
        ))}
      </div>

      <SectionBottomNavigation />
    </div>
  );
}
