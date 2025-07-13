import { parseSchema, sqlSyntaxConfig } from "../../../data/sqlSyntax.js";
import { MdContentCopy } from "react-icons/md";

export default function SqlSchemaBlock({
  tables,
  title = "Schéma de base",
  className = "",
}) {
  const styles = sqlSyntaxConfig.componentStyles.schema;

  // If tables is a string, parse it
  const parsedTables =
    typeof tables === "string" ? parseSchema(tables) : tables;

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
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className={`${styles.headerText} text-sm font-mono ml-3`}>
            {title}
          </span>
        </div>

        {/* Schema Content */}
        <div className="p-4 space-y-4">
          {parsedTables?.map((table, index) => (
            <div
              key={index}
              className={`${styles.border} border rounded-lg overflow-hidden`}
            >
              {/* Table's name */}
              <div className={`${styles.header} px-3 py-2`}>
                <h3 className={`${styles.tableName} text-lg font-mono`}>
                  {table.name}
                </h3>
              </div>

              {/* Columns */}
              <div className="p-3">
                <div className="space-y-1">
                  {table.columns?.map((column, colIndex) => (
                    <div
                      key={colIndex}
                      className="flex items-center space-x-2 font-mono text-sm"
                    >
                      <span className={`${styles.content}`}>{column.name}</span>
                      <span className={`${styles.columnType}`}>
                        {column.type}
                      </span>
                      {column.constraints && (
                        <span className={`${styles.constraint} text-xs`}>
                          {column.constraints}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Copy Button */}
        <div className="absolute top-2 right-2">
          <button
            onClick={() =>
              navigator.clipboard.writeText(
                JSON.stringify(parsedTables, null, 2)
              )
            }
            className="bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white p-2 rounded transition-colors duration-200"
            title="Copier le schéma"
          >
            <MdContentCopy className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
