import { sqlSyntaxConfig } from "../../../data/sqlSyntax.js";
import { MdContentCopy } from "react-icons/md";

export default function SqlDiagramBlock({
  children,
  title = "Diagramme",
  className = "",
}) {
  const styles = sqlSyntaxConfig.componentStyles.diagram;

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

        {/* Diagram Content */}
        <div className="p-4">
          <pre
            className={`${styles.content} text-sm font-mono leading-relaxed overflow-x-auto whitespace-pre`}
          >
            {children}
          </pre>
        </div>

        {/* Copy Button */}
        <div className="absolute top-2 right-2">
          <button
            onClick={() => navigator.clipboard.writeText(children)}
            className="bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white p-2 rounded transition-colors duration-200"
            title="Copier le diagramme"
          >
            <MdContentCopy className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
