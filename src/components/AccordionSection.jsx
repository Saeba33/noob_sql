"use client";

import SqlCodeBlock from "@/components/ui/sql/SqlCodeBlock";
import SqlDiagramBlock from "@/components/ui/sql/SqlDiagramBlock";
import SqlResultBlock from "@/components/ui/sql/SqlResultBlock";
import SqlSchemaBlock from "@/components/ui/sql/SqlSchemaBlock";
import SqlTableBlock from "@/components/ui/sql/SqlTableBlock";
import { useAccordionSection } from "@/hooks/useAccordionSection";
import { MdExpandMore, MdCode, MdAccountTree, MdLibraryBooks, MdCheckCircle, MdGridOn, MdInfo } from "react-icons/md";
import { FaCode } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { SECTION_DESC_COLORS } from "@/config/colors";

export default function AccordionSection({
  title,
  content,
  sqlCode,
  explanation,
  sqlDiagram,
  sqlSchema,
  sqlResult,
  sqlTable,
  externalComponent,
  description,
  className = "",
}) {
  const { isOpen, toggleOpen } = useAccordionSection();
  const pathname = usePathname();
  
  // Determine current belt and get colors
  const currentBelt = pathname?.split("/")[1];
  const colors = SECTION_DESC_COLORS[currentBelt] || SECTION_DESC_COLORS.white;

  return (
    <div
      className={`mb-6 border border-gray-200 rounded-xl shadow-sm ${className}`}
    >
      {/* Accordion header */}
      <button
        onClick={toggleOpen}
        className={`w-full text-left p-6 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-200 focus:outline-none relative cursor-pointer ${
          isOpen ? "rounded-t-xl" : "rounded-xl"
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${colors.bg} transition-opacity duration-200`}>
            <FaCode className={`w-4 h-4 ${colors.text}`} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <MdExpandMore
          className={`w-6 h-6 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Accordion content */}
      {isOpen && (
        <div className="p-6 bg-white space-y-6 rounded-b-xl border-t border-gray-200">
          {/* Description - only show if content exists */}
          {content && (
            <div className={`${colors.bg} ${colors.border} border-l-4 p-6 rounded-r-lg`}>
              <p className={`${colors.text} leading-relaxed`}>{content}</p>
            </div>
          )}

          {/* External Component */}
          {externalComponent && (
            <div>
              <div>
                {externalComponent}
              </div>
            </div>
          )}

          {/* SQL Code */}
          {sqlCode && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <MdCode className="w-4 h-4 mr-2 text-blue-600" />
                SQL Code
              </h4>
              <SqlCodeBlock>{sqlCode}</SqlCodeBlock>
            </div>
          )}

          {/* Diagram */}
          {sqlDiagram && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <MdAccountTree className="w-4 h-4 mr-2 text-slate-600" />
                Diagram
              </h4>
              <SqlDiagramBlock title="Database Diagram">
                {sqlDiagram}
              </SqlDiagramBlock>
            </div>
          )}

          {/* Schema */}
          {sqlSchema && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <MdLibraryBooks className="w-4 h-4 mr-2 text-purple-600" />
                Table Schema
              </h4>
              <SqlSchemaBlock tables={sqlSchema} title="Table Schema" />
            </div>
          )}

          {/* Results */}
          {sqlResult && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <MdCheckCircle className="w-4 h-4 mr-2 text-green-600" />
                Query Result
              </h4>
              <SqlResultBlock data={sqlResult} title="Query Result" />
            </div>
          )}

          {/* Data Table */}
          {sqlTable && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <MdGridOn className="w-4 h-4 mr-2 text-indigo-600" />
                Table Data
              </h4>
              <SqlTableBlock data={sqlTable} title="Table Data" />
            </div>
          )}

          {/* Explanation or Description */}
          {(explanation || description) && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <div className="flex items-start">
                <MdInfo className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">
                    {explanation ? "Explanation" : "Description"}
                  </h4>
                  <p className="text-blue-800 text-sm leading-relaxed">
                    {explanation || description}
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
