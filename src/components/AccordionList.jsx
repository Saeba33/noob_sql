"use client";

import Accordion from "@/components/ui/Accordion";

export default function AccordionList({ accordions }) {
  if (!accordions || accordions.length === 0) {
    return null;
  }

  return (
    <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {accordions.map((accordion, index) => (
          <Accordion
            key={index}
            title={accordion.title}
            content={accordion.content}
            sqlCode={accordion.sqlCode}
            sqlQueries={accordion.sqlQueries}
            explanation={accordion.explanation}
            sqlDiagram={accordion.sqlDiagram}
            sqlSchema={accordion.sqlSchema}
            sqlResult={accordion.sqlResult}
            sqlTable={accordion.sqlTable}
            externalComponent={accordion.externalComponent}
            description={accordion.description}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          />
        ))}
      </div>
    </div>
  );
}
