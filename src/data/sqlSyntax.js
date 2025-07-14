export const sqlSyntaxConfig = {
  // Style definitions for each token type
  styles: {
    // Mots-clés SQL (bleu vif mais équilibré)
    keyword: "text-blue-400 font-semibold",
    // Types de données (sky vif)
    datatype: "text-sky-400 font-medium",
    // Contraintes (violet vif)
    constraint: "text-violet-400 font-medium",
    // Noms de tables (vert vif)
    tableName: "text-emerald-400 font-medium",
    // Noms de colonnes (cyan visible)
    columnName: "text-cyan-300",
    // Chaînes de caractères (ambre vif)
    string: "text-amber-300",
    // Nombres (orange vif)
    number: "text-orange-400",
    // Opérateurs (violet moyen)
    operator: "text-violet-300",
    // Commentaires (gris visible)
    comment: "text-gray-400 italic",
    // Fonctions (rose vif)
    function: "text-pink-300 font-medium",
    // Ponctuation (même couleur que les mots-clés pour cohérence syntaxique)
    punctuation: "text-blue-400",
    // Par défaut (blanc cassé mais visible)
    default: "text-gray-200",
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

// Function to analyze and colorize SQL code with improved logic
export function analyzeSqlCode(code) {
  if (!code) return null;

  let parts = [];

  // 1. Commentaires (priorité haute pour éviter la coloration dans les commentaires)
  const comments = /(--.*$)/gm;
  let match;
  while ((match = comments.exec(code)) !== null) {
    parts.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0],
      type: "comment",
      priority: 1,
    });
  }

  // 2. Chaînes de caractères (priorité haute)
  const strings = /'([^']*)'/g;
  while ((match = strings.exec(code)) !== null) {
    parts.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0],
      type: "string",
      priority: 2,
    });
  }

  // 3. Mots-clés SQL principaux (CREATE, TABLE, etc.)
  const keywords = /\b(CREATE|TABLE|ALTER|DROP|SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|SET|DELETE)\b/gi;
  while ((match = keywords.exec(code)) !== null) {
    parts.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0],
      type: "keyword",
      priority: 3,
    });
  }

  // 4. Types de données SQL
  const datatypes = /\b(INTEGER|VARCHAR|DECIMAL|TIMESTAMP|DATE|TEXT|CHAR|BOOLEAN|TINYINT|BIGINT|FLOAT|DOUBLE|TIME|DATETIME|BLOB|JSON)\b/gi;
  while ((match = datatypes.exec(code)) !== null) {
    parts.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0],
      type: "datatype",
      priority: 4,
    });
  }

  // 5. Contraintes et mots-clés spéciaux
  const constraints = /\b(PRIMARY|KEY|FOREIGN|REFERENCES|UNIQUE|NOT|NULL|DEFAULT|CURRENT_TIMESTAMP|AUTO_INCREMENT|CHECK|IF|EXISTS|UNSIGNED|CONSTRAINT)\b/gi;
  while ((match = constraints.exec(code)) !== null) {
    parts.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0],
      type: "constraint",
      priority: 5,
    });
  }

  // 6. Fonctions SQL
  const functions = /\b(COUNT|SUM|AVG|MAX|MIN|COALESCE|ROW_NUMBER|RANK|DENSE_RANK|LAG|LEAD|SUBSTRING|CONCAT|UPPER|LOWER|NOW|CURDATE|CURTIME)\b/gi;
  while ((match = functions.exec(code)) !== null) {
    parts.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0],
      type: "function",
      priority: 6,
    });
  }

  // 7. Nombres (y compris dans les parenthèses comme VARCHAR(255))
  const numbers = /\b(\d+(?:\.\d+)?)\b/g;
  while ((match = numbers.exec(code)) !== null) {
    parts.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0],
      type: "number",
      priority: 7,
    });
  }

  // 8. Noms de tables reconnus (après CREATE TABLE ou références)
  const tablePattern = /(?:CREATE\s+TABLE\s+|REFERENCES\s+)(\w+)/gi;
  while ((match = tablePattern.exec(code)) !== null) {
    const tableName = match[1];
    const tableStart = match.index + match[0].length - tableName.length;
    parts.push({
      start: tableStart,
      end: tableStart + tableName.length,
      text: tableName,
      type: "tableName",
      priority: 8,
    });
  }

  // 9. Opérateurs
  const operators = /([=!<>]+|[+\-*/%])/g;
  while ((match = operators.exec(code)) !== null) {
    parts.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0],
      type: "operator",
      priority: 9,
    });
  }

  // 10. Ponctuation
  const punctuation = /([(),.;])/g;
  while ((match = punctuation.exec(code)) !== null) {
    parts.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0],
      type: "punctuation",
      priority: 10,
    });
  }

  // Tri par position puis par priorité (priorité plus faible = plus important)
  parts.sort((a, b) => {
    if (a.start !== b.start) return a.start - b.start;
    return a.priority - b.priority;
  });

  // Filtrage des chevauchements en gardant la priorité la plus élevée
  let filteredParts = [];
  for (let part of parts) {
    let hasOverlap = false;
    for (let existing of filteredParts) {
      if (part.start < existing.end && part.end > existing.start) {
        hasOverlap = true;
        break;
      }
    }
    if (!hasOverlap) {
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
