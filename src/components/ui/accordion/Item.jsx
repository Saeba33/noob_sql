import { useState } from "react";
import { MdExpandMore, MdInfo } from "react-icons/md";

export default function Item({
  title,
  content,
  sqlCode,
  explanation,
  className = "",
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`border border-gray-200 rounded-lg mb-6 shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-5 flex items-center justify-between bg-white hover:bg-gray-50 rounded-lg transition-all duration-200 group"
      >
        <h4 className="font-semibold text-gray-900 group-hover:text-gray-700">{title}</h4>
        <MdExpandMore
          className={`w-5 h-5 text-gray-500 transition-all duration-200 group-hover:text-gray-700 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {isExpanded && (
        <div className="border-t border-gray-200 p-6 bg-gray-50/50">
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 mb-6 leading-relaxed">{content}</p>
          </div>

          {sqlCode && (
            <div className="mb-6">
              <h5 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                Code SQL
              </h5>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm leading-relaxed border">
                <code>{sqlCode}</code>
              </pre>
            </div>
          )}

          {explanation && (
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <MdInfo className="w-5 h-5 text-blue-600 mt-0.5" />
                </div>
                <div className="ml-3">
                  <p className="text-blue-800 text-sm leading-relaxed">
                    <span className="font-semibold">Explication :</span> {explanation}
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
