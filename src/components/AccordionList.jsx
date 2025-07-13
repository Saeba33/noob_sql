"use client";

import AccordionSection from "@/components/AccordionSection";

export default function AccordionList({ accordions }) {
  if (!accordions || accordions.length === 0) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {accordions.map((accordion, index) => (
          <AccordionSection
            key={index}
            title={accordion.title}
            content={accordion.content}
            sqlCode={accordion.sqlCode}
            explanation={accordion.explanation}
            diagram={accordion.diagram}
            schema={accordion.schema}
            result={accordion.result}
            table={accordion.table}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          />
        ))}
      </div>
    </div>
  );
}
