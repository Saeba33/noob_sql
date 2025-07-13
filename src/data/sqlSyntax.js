export const sqlSyntaxConfig = {
  // Style definitions for each token type
  styles: {
    keyword: "text-blue-300 font-semibold",
    table: "text-green-400",
    column: "text-cyan-300",
    string: "text-yellow-300",
    number: "text-orange-400",
    operator: "text-purple-300",
    comment: "text-gray-500 italic",
    function: "text-pink-300",
    punctuation: "text-gray-400",
    default: "text-gray-100",
  },

  // Specific styles for different components
  componentStyles: {
    diagram: {
      background: "bg-slate-800",
      border: "border-slate-600",
      header: "bg-slate-700",
      headerText: "text-slate-300",
      content: "text-slate-100",
    },
    schema: {
      background: "bg-gray-900",
      border: "border-gray-600",
      header: "bg-gray-800",
      headerText: "text-gray-300",
      content: "text-gray-100",
      tableName: "text-green-400 font-semibold",
      columnType: "text-blue-300",
      constraint: "text-purple-300",
    },
    result: {
      background: "bg-emerald-900",
      border: "border-emerald-600",
      header: "bg-emerald-800",
      headerText: "text-emerald-200",
      content: "text-emerald-100",
      rowEven: "bg-emerald-800/30",
      rowOdd: "bg-emerald-700/20",
    },
    table: {
      background: "bg-indigo-900",
      border: "border-indigo-600",
      header: "bg-indigo-800",
      headerText: "text-indigo-200",
      content: "text-indigo-100",
      cellBorder: "border-indigo-700",
    },
    code: {
      background: "bg-gray-900",
      border: "border-gray-700",
      header: "bg-gray-800",
      headerText: "text-gray-400",
    },
  },
};

// Function to analyze and colorize SQL code
export function analyzeSqlCode(code) {
  if (!code) return null;

  let parts = [];

  // 1. SQL Keywords
  const keywords =
    /\b(SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|ALTER|DROP|COLUMN|ADD|PRIMARY|KEY|FOREIGN|REFERENCES|UNIQUE|NOT|NULL|DEFAULT|CURRENT_TIMESTAMP|INTEGER|VARCHAR|DECIMAL|TIMESTAMP|DATE|CHECK|IF|EXISTS|ORDER|BY|LIMIT|DESC|ASC|AND|OR|IN|IS|LIKE|BETWEEN|GROUP|HAVING|DISTINCT|AS|JOIN|INNER|LEFT|RIGHT|FULL|OUTER|ON|UNION|ALL|CASE|WHEN|THEN|ELSE|END|WITH|RECURSIVE|OVER|PARTITION|INDEX|VIEW)\b/gi;

  let match;
  while ((match = keywords.exec(code)) !== null) {
    parts.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0],
      type: "keyword",
    });
  }

  // 2. SQL Functions
  const functions =
    /\b(COUNT|SUM|AVG|MAX|MIN|COALESCE|ROW_NUMBER|RANK|DENSE_RANK|LAG|LEAD|SUBSTRING|CONCAT|UPPER|LOWER)\b/gi;
  while ((match = functions.exec(code)) !== null) {
    parts.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0],
      type: "function",
    });
  }

  // 3 Common tables
  const tables =
    /\b(users|orders|products|employees|customers|order_items|categories|departments|employee_summary|employee_hierarchy)\b/g;
  while ((match = tables.exec(code)) !== null) {
    parts.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0],
      type: "table",
    });
  }

  // 4. Common columns (after keywords to avoid conflicts)
  const columns =
    /\b(id|name|email|password|created_at|updated_at|age|salary|department|title|price|quantity|total)\b/g;
  while ((match = columns.exec(code)) !== null) {
    parts.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0],
      type: "column",
    });
  }

  // 5. Character strings
  const strings = /'([^']*)'/g;
  while ((match = strings.exec(code)) !== null) {
    parts.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0],
      type: "string",
    });
  }

  // 6. Numbers
  const numbers = /\b(\d+(?:\.\d+)?)\b/g;
  while ((match = numbers.exec(code)) !== null) {
    parts.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0],
      type: "number",
    });
  }

  // 7. Operators
  const operators = /([=!<>]+|[+\-*/%])/g;
  while ((match = operators.exec(code)) !== null) {
    parts.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0],
      type: "operator",
    });
  }

  // 8. Punctuation
  const punctuation = /([(),.;])/g;
  while ((match = punctuation.exec(code)) !== null) {
    parts.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0],
      type: "punctuation",
    });
  }

  // 9. Comments
  const comments = /(--.*)/g;
  while ((match = comments.exec(code)) !== null) {
    parts.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0],
      type: "comment",
    });
  }
  // Sort by position and filter overlaps
  parts.sort((a, b) => a.start - b.start);

  let filteredParts = [];
  for (let part of parts) {
    let overlaps = false;
    for (let existing of filteredParts) {
      if (part.start < existing.end && part.end > existing.start) {
        overlaps = true;
        break;
      }
    }
    if (!overlaps) {
      filteredParts.push(part);
    }
  }

  return filteredParts;
}

// Utility functions for SQL components

// Function to colorize text with SQL syntax (reusable)
export function colorizeText(text, targetType = "default") {
  if (!text) return null;

  const parts = analyzeSqlCode(text);
  if (!parts || parts.length === 0) {
    return text;
  }

  let result = [];
  let currentIndex = 0;
  let key = 0;

  for (let part of parts) {
    // Text before this part
    if (currentIndex < part.start) {
      result.push({
        key: key++,
        text: text.slice(currentIndex, part.start),
        className: sqlSyntaxConfig.styles.default,
      });
    }

    // Coloured part
    const styleClass =
      sqlSyntaxConfig.styles[part.type] || sqlSyntaxConfig.styles.default;
    result.push({
      key: key++,
      text: part.text,
      className: styleClass,
    });

    currentIndex = part.end;
  }

  // Rest of text
  if (currentIndex < text.length) {
    result.push({
      key: key++,
      text: text.slice(currentIndex),
      className: sqlSyntaxConfig.styles.default,
    });
  }

  return result;
}

// Function to parse database schemas
export function parseSchema(schemaText) {
  const tables = [];
  const lines = schemaText.split("\n");
  let currentTable = null;

  for (let line of lines) {
    line = line.trim();

    // Detect a new table
    if (line.match(/^CREATE TABLE\s+(\w+)/i)) {
      const tableName = line.match(/CREATE TABLE\s+(\w+)/i)[1];
      currentTable = {
        name: tableName,
        columns: [],
      };
      tables.push(currentTable);
    }
    // Detect a column
    else if (currentTable && line.match(/^\w+\s+\w+/)) {
      const parts = line.split(/\s+/);
      const column = {
        name: parts[0],
        type: parts[1],
        constraints: parts.slice(2).join(" "),
      };
      currentTable.columns.push(column);
    }
  }

  return tables;
}

// Function to format query results
export function formatQueryResult(data, headers = null) {
  if (!data || !Array.isArray(data)) return null;

  // If no headers are provided, extract them from the first object
  if (!headers && data.length > 0) {
    headers = Object.keys(data[0]);
  }

  return {
    headers: headers || [],
    rows: data.map((row) =>
      headers ? headers.map((header) => row[header]) : Object.values(row)
    ),
  };
}

// Function to generate a simple text diagram
export function generateDiagram(tables, relationships = []) {
  let diagram = "┌─ DATABASE ─┐\n";

  tables.forEach((table, index) => {
    diagram += `│\n├─ ${table.name.toUpperCase()}\n`;
    table.columns?.forEach((col, colIndex) => {
      const isLast = colIndex === table.columns.length - 1;
      const connector = isLast ? "└──" : "├──";
      diagram += `│  ${connector} ${col.name} (${col.type})\n`;
    });

    if (index < tables.length - 1) {
      diagram += "│\n";
    }
  });

  diagram += "└────────────────────┘";

  return diagram;
}
