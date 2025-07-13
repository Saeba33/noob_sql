import { useState } from "react";

export default function Item({
  title,
  content,
  sqlCode,
  explanation,
  className = "",
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`border border-gray-200 rounded-lg mb-4 ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-4 flex items-center justify-between bg-white hover:bg-gray-50 rounded-lg transition-colors duration-200"
      >
        <h4 className="font-medium text-gray-900">{title}</h4>
        <ion-icon
          name="chevron-down-outline"
          class={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        ></ion-icon>
      </button>

      {isExpanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <p className="text-gray-700 mb-4">{content}</p>

          {sqlCode && (
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-900 mb-2">
                SQL Code:
              </h5>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{sqlCode}</code>
              </pre>
            </div>
          )}

          {explanation && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
              <p className="text-blue-800 text-sm">
                <strong>Explanation:</strong> {explanation}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
