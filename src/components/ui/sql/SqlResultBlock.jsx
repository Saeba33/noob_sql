import { formatQueryResult } from "../../../data/sqlSyntax.js";
import { MdCheckCircle, MdInfo, MdTableChart } from "react-icons/md";

export default function SqlResultBlock({
  data,
  headers,
  message,
  title = "Résultat de la requête",
  className = "",
  type = "auto", // "table", "message", ou "auto" pour détection automatique
}) {
  // Détermine le type de contenu à afficher
  const contentType = type === "auto" 
    ? (message ? "message" : (data && data.length > 0 ? "table" : "empty"))
    : type;

  // Rendu pour les messages
  if (contentType === "message" && message) {
    return (
      <div className={`${className}`}>
        <div className="bg-blue-50 border border-blue-200 rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-100 px-4 py-3 border-b border-blue-200">
            <h3 className="text-blue-800 font-semibold text-sm flex items-center">
              <MdCheckCircle className="w-4 h-4 mr-2" />
              {title}
            </h3>
          </div>
          
          {/* Message Content */}
          <div className="p-4">
            <p className="text-blue-700 font-mono text-sm">
              {message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Format data pour les tableaux
  const formattedData = data ? formatQueryResult(data, headers) : null;

  // Rendu pour résultats vides
  if (contentType === "empty" || !formattedData || !formattedData.rows.length) {
    return (
      <div className={`${className}`}>
        <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
            <h3 className="text-gray-700 font-semibold text-sm flex items-center">
              <MdInfo className="w-4 h-4 mr-2" />
              {title}
            </h3>
          </div>
          
          {/* Empty Content */}
          <div className="p-4">
            <p className="text-gray-500 text-center italic text-sm">
              Aucun résultat
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Rendu pour les tableaux de résultats
  return (
    <div className={`${className}`}>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        {/* Header */}
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h3 className="text-gray-800 font-semibold text-sm flex items-center">
            <MdTableChart className="w-4 h-4 mr-2" />
            {title} ({formattedData.rows.length} ligne{formattedData.rows.length > 1 ? "s" : ""})
          </h3>
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Headers */}
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {formattedData.headers.map((header, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 text-left font-semibold text-gray-700 border-r border-gray-200 last:border-r-0"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Rows */}
            <tbody className="divide-y divide-gray-200">
              {formattedData.rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`hover:bg-gray-50 transition-colors ${
                    rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-4 py-3 text-gray-800 font-mono border-r border-gray-200 last:border-r-0"
                    >
                      {cell === null ? (
                        <span className="text-gray-400 italic">NULL</span>
                      ) : cell === undefined ? (
                        <span className="text-gray-400 italic">-</span>
                      ) : (
                        String(cell)
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
