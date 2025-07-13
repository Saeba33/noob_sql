import { sqlSyntaxConfig } from "../../../data/sqlSyntax.js";

export default function SqlTableBlock({
  data,
  title = "Table",
  className = "",
}) {
  const styles = sqlSyntaxConfig.componentStyles.table;

  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className={`relative ${className}`}>
        <div
          className={`${styles.background} ${styles.border} border rounded-lg overflow-hidden shadow-lg`}
        >
          <div
            className={`${styles.header} px-4 py-2 flex items-center space-x-2`}
          >
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            </div>
            <span className={`${styles.headerText} text-sm font-mono ml-3`}>
              {title}
            </span>
          </div>
          <div className="p-4">
            <p className={`${styles.content} text-center italic`}>Table vide</p>
          </div>
        </div>
      </div>
    );
  }
  // Extract the headers of the first object
  const headers = Object.keys(data[0]);

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
            <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          </div>
          <span className={`${styles.headerText} text-sm font-mono ml-3`}>
            {title} ({data.length} enregistrement{data.length > 1 ? "s" : ""})
          </span>
        </div>

        {/* Table */}
        <div className="p-4 overflow-x-auto">
          <table className="w-full font-mono text-sm">
            {/* Headers */}
            <thead>
              <tr className={`${styles.header}`}>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className={`${styles.headerText} px-3 py-2 text-left font-semibold ${styles.cellBorder} border-r last:border-r-0`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Rows */}
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`${styles.cellBorder} border-b last:border-b-0 hover:bg-indigo-800/20 transition-colors`}
                >
                  {headers.map((header, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`${styles.content} px-3 py-2 ${styles.cellBorder} border-r last:border-r-0`}
                    >
                      {row[header] === null ? (
                        <span className="text-indigo-400 italic">NULL</span>
                      ) : row[header] === undefined ? (
                        <span className="text-indigo-400 italic">-</span>
                      ) : (
                        String(row[header])
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Copy button */}
        <div className="absolute top-2 right-2">
          <button
            onClick={() =>
              navigator.clipboard.writeText(JSON.stringify(data, null, 2))
            }
            className="bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white p-2 rounded transition-colors duration-200"
            title="Copier la table"
          >
            <ion-icon name="copy-outline" class="w-4 h-4"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  );
}
