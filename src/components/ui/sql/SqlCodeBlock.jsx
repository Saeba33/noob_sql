import { analyzeSqlCode, sqlSyntaxConfig } from "../../../data/sqlSyntax.js";

export default function SqlCodeBlock({ children, className = "" }) {
  // Function to colorize SQL code using the configuration
  const renderColorizedCode = (code) => {
    if (!code) return null;

    const parts = analyzeSqlCode(code);
    if (!parts || parts.length === 0) {
      return <span className={sqlSyntaxConfig.styles.default}>{code}</span>;
    }

    let result = [];
    let currentIndex = 0;
    let key = 0;

    for (let part of parts) {
      // Add text before this part
      if (currentIndex < part.start) {
        result.push(
          <span key={key++} className={sqlSyntaxConfig.styles.default}>
            {code.slice(currentIndex, part.start)}
          </span>
        );
      }
      // Add the coloured part
      const styleClass =
        sqlSyntaxConfig.styles[part.type] || sqlSyntaxConfig.styles.default;

      result.push(
        <span key={key++} className={styleClass}>
          {part.text}
        </span>
      );

      currentIndex = part.end;
    }

    // Add the rest of the text
    if (currentIndex < code.length) {
      result.push(
        <span key={key++} className={sqlSyntaxConfig.styles.default}>
          {code.slice(currentIndex)}
        </span>
      );
    }

    return result;
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`${sqlSyntaxConfig.componentStyles.code.background} ${sqlSyntaxConfig.componentStyles.code.border} border rounded-lg overflow-hidden shadow-lg`}
      >
        {/* Terminal Header */}
        <div
          className={`${sqlSyntaxConfig.componentStyles.code.header} px-4 py-2 flex items-center space-x-2`}
        >
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span
            className={`${sqlSyntaxConfig.componentStyles.code.headerText} text-sm font-mono ml-3`}
          >
            SQL Query
          </span>
        </div>

        {/* Code Content */}
        <div className="p-4">
          <pre className="text-sm font-mono leading-relaxed overflow-x-auto">
            <code>{renderColorizedCode(children)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
