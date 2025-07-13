import { formatQueryResult, sqlSyntaxConfig } from "../../../data/sqlSyntax.js";

export default function SqlResultBlock({
  data,
  headers,
  title = "Résultat de la requête",
  className = "",
}) {
  const styles = sqlSyntaxConfig.componentStyles.result;

  // Format data
  const formattedData = formatQueryResult(data, headers);

  if (!formattedData || !formattedData.rows.length) {
    return (
      <div className={`relative ${className}`}>
        <div
          className={`${styles.background} ${styles.border} border rounded-lg overflow-hidden shadow-lg`}
        >
          <div
            className={`${styles.header} px-4 py-2 flex items-center space-x-2`}
          >
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
            </div>
            <span className={`${styles.headerText} text-sm font-mono ml-3`}>
              {title}
            </span>
          </div>
          <div className="p-4">
            <p className={`${styles.content} text-center italic`}>
              Aucun résultat
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div
        className={`${styles.background} ${styles.border} border rounded-lg overflow-hidden shadow-lg`}
      >
        {/* Header */}
        <div
          className={`${styles.header} px-4 py-2 flex items-center space-x-2`}
        >
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
          </div>
          <span className={`${styles.headerText} text-sm font-mono ml-3`}>
            {title} ({formattedData.rows.length} ligne
            {formattedData.rows.length > 1 ? "s" : ""})
          </span>
        </div>

        {/* Results Table */}
        <div className="p-4 overflow-x-auto">
          <table className="w-full font-mono text-sm">
            {/* Headers */}
            <thead>
              <tr className={`${styles.header}`}>
                {formattedData.headers.map((header, index) => (
                  <th
                    key={index}
                    className={`${styles.headerText} px-3 py-2 text-left font-semibold border-r border-emerald-600 last:border-r-0`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Rows */}
            <tbody>
              {formattedData.rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={
                    rowIndex % 2 === 0 ? styles.rowEven : styles.rowOdd
                  }
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`${styles.content} px-3 py-2 border-r border-emerald-700 last:border-r-0`}
                    >
                      {cell === null ? (
                        <span className="text-emerald-400 italic">NULL</span>
                      ) : cell === undefined ? (
                        <span className="text-emerald-400 italic">-</span>
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

        {/* Copy Button */}
        <div className="absolute top-2 right-2">
          <button
            onClick={() =>
              navigator.clipboard.writeText(JSON.stringify(data, null, 2))
            }
            className="bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white p-2 rounded transition-colors duration-200"
            title="Copier les résultats"
          >
            <ion-icon name="copy-outline" class="w-4 h-4"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  );
}
