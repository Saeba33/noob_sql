import { sqlSyntaxConfig } from "../../../data/sqlSyntax.js";

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
      </div>
    </div>
  );
}
