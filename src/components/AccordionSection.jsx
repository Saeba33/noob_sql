"use client";

import SqlCodeBlock from "@/components/ui/sql/SqlCodeBlock";
import SqlDiagramBlock from "@/components/ui/sql/SqlDiagramBlock";
import SqlResultBlock from "@/components/ui/sql/SqlResultBlock";
import SqlSchemaBlock from "@/components/ui/sql/SqlSchemaBlock";
import SqlTableBlock from "@/components/ui/sql/SqlTableBlock";
import { useAccordionSection } from "@/hooks/useAccordionSection";

export default function AccordionSection({
  title,
  content,
  sqlCode,
  explanation,
  diagram,
  schema,
  result,
  table,
  className = "",
}) {
  const { isOpen, toggleOpen } = useAccordionSection();

  return (
    <div
      className={`mb-6 border border-gray-200 rounded-lg shadow-sm ${className}`}
    >
      {/* Accordion header */}
      <button
        onClick={toggleOpen}
        className={`w-full text-left p-6 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-200 ${
          isOpen ? "border-b border-gray-200" : "rounded-lg"
        }`}
      >
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <ion-icon
          name="chevron-down-outline"
          class={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        ></ion-icon>
      </button>

      {/* Accordion content */}
      {isOpen && (
        <div className="p-6 bg-gray-50 space-y-6">
          {/* Description */}
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed">{content}</p>
          </div>

          {/* SQL Code */}
          {sqlCode && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <ion-icon
                  name="code-outline"
                  class="w-4 h-4 mr-2 text-blue-600"
                ></ion-icon>
                SQL Code
              </h4>
              <SqlCodeBlock>{sqlCode}</SqlCodeBlock>
            </div>
          )}

          {/* Diagram */}
          {diagram && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <ion-icon
                  name="git-network-outline"
                  class="w-4 h-4 mr-2 text-slate-600"
                ></ion-icon>
                Diagram
              </h4>
              <SqlDiagramBlock title="Database Diagram">
                {diagram}
              </SqlDiagramBlock>
            </div>
          )}

          {/* Schema */}
          {schema && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <ion-icon
                  name="library-outline"
                  class="w-4 h-4 mr-2 text-purple-600"
                ></ion-icon>
                Table Schema
              </h4>
              <SqlSchemaBlock tables={schema} title="Table Schema" />
            </div>
          )}

          {/* Results */}
          {result && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <ion-icon
                  name="checkmark-circle-outline"
                  class="w-4 h-4 mr-2 text-green-600"
                ></ion-icon>
                Query Result
              </h4>
              <SqlResultBlock data={result} title="Query Result" />
            </div>
          )}

          {/* Data Table */}
          {table && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <ion-icon
                  name="grid-outline"
                  class="w-4 h-4 mr-2 text-indigo-600"
                ></ion-icon>
                Table Data
              </h4>
              <SqlTableBlock data={table} title="Table Data" />
            </div>
          )}

          {/* Explanation */}
          {explanation && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <div className="flex items-start">
                <ion-icon
                  name="information-circle-outline"
                  class="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0"
                ></ion-icon>
                <div>
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">
                    Explanation
                  </h4>
                  <p className="text-blue-800 text-sm leading-relaxed">
                    {explanation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
