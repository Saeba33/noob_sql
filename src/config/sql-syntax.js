export const sqlSyntaxConfig = {
	// Unified configuration with labels, colors, and styles
	types: {
		keyword: {
			label: "Mots-clés SQL",
			color: "text-blue-400",
			style: "text-blue-400 font-semibold",
			showInLegend: true,
		},
		punctuation: {
			label: "Ponctuation",
			color: "text-blue-400",
			style: "text-blue-400",
			showInLegend: false,
		},
		datatype: {
			label: "Types & Contraintes",
			color: "text-violet-400",
			style: "text-violet-400 font-medium",
			showInLegend: true,
		},
		constraint: {
			label: "Contraintes",
			color: "text-violet-400",
			style: "text-violet-400 font-medium",
			showInLegend: false, // Même catégorie que datatype
		},
		tableName: {
			label: "Tables",
			color: "text-emerald-400",
			style: "text-emerald-400 font-medium",
			showInLegend: true,
		},
		columnName: {
			label: "Colonnes",
			color: "text-white",
			style: "text-white",
			showInLegend: true,
		},
		string: {
			label: "Valeurs littérales",
			color: "text-amber-300",
			style: "text-amber-300",
			showInLegend: true,
		},
		number: {
			label: "Nombres",
			color: "text-amber-300",
			style: "text-amber-300",
			showInLegend: false,
		},
		operator: {
			label: "Opérateurs",
			color: "text-rose-400",
			style: "text-rose-400",
			showInLegend: true,
		},
		function: {
			label: "Fonctions",
			color: "text-cyan-400",
			style: "text-cyan-400 font-medium",
			showInLegend: true,
		},
		comment: {
			label: "Commentaires",
			color: "text-gray-500",
			style: "text-gray-500 italic",
			showInLegend: true,
		},
		default: {
			label: "Texte par défaut",
			color: "text-gray-200",
			style: "text-gray-200",
			showInLegend: false,
		},
	},
};

// Function to analyze and colorize SQL code with improved logic
export function analyzeSqlCode(code) {
	if (!code) return null;

	let parts = [];

	// 1. Comments (high priority to avoid highlighting inside comments)
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

	// 2. Strings (high priority) - includes apostrophes
	// [^'\n] prevents the regex from matching past a newline
	const strings = /'[^'\n]*'/g;
	while ((match = strings.exec(code)) !== null) {
		parts.push({
			start: match.index,
			end: match.index + match[0].length,
			text: match[0],
			type: "string",
			priority: 2,
		});
	}

	// 3. Multi-word constraints (highest priority for constraints)
	const multiWordConstraints =
		/\b(PRIMARY\s+KEY|FOREIGN\s+KEY|NOT\s+NULL|NO\s+ACTION|SET\s+NULL|SET\s+DEFAULT|ON\s+DELETE|ON\s+UPDATE)\b/gi;
	while ((match = multiWordConstraints.exec(code)) !== null) {
		parts.push({
			start: match.index,
			end: match.index + match[0].length,
			text: match[0],
			type: "constraint",
			priority: 3,
		});
	}
	// 4. Mots ambigus (DATE, TIME, etc.) qui sont des fonctions quand suivis de parenthèses
	// Doit être détecté AVANT les datatypes pour avoir la priorité
	const ambiguousFunctions = /\b(DATE|TIME|TIMESTAMP|REPLACE)\s*(?=\()/gi;
	while ((match = ambiguousFunctions.exec(code)) !== null) {
		parts.push({
			start: match.index,
			end: match.index + match[0].trim().length,
			text: match[0].trim(),
			type: "function",
			priority: 4,
		});
	}

	// Fonctions temporelles (priorité haute pour éviter conflit avec keywords)
	const temporalFunctions = /\b(CURRENT_TIMESTAMP|CURRENT_DATE|CURRENT_TIME|NOW)\b/gi;
	while ((match = temporalFunctions.exec(code)) !== null) {
		parts.push({
			start: match.index,
			end: match.index + match[0].length,
			text: match[0],
			type: "function",
			priority: 4,
		});
	}

	// CASCADE bleu si précédé de DROP TABLE (doit être ici, car code est défini)
	const cascadeDropTable = /DROP\s+TABLE[^;]*\bCASCADE\b/gi;
	let cascadeMatch;
	while ((cascadeMatch = cascadeDropTable.exec(code)) !== null) {
		const cascadeIndex = cascadeMatch[0].lastIndexOf("CASCADE");
		if (cascadeIndex !== -1) {
			parts.push({
				start: cascadeMatch.index + cascadeIndex,
				end: cascadeMatch.index + cascadeIndex + 7,
				text: "CASCADE",
				type: "keyword",
				priority: 5,
			});
		}
	}
	// 5. Multi-word SQL keywords (commands)
	const multiWordKeywords =
		/\b(CREATE\s+TABLE|CREATE\s+INDEX|CREATE\s+VIEW|INSERT\s+INTO|DELETE\s+FROM|GROUP\s+BY|ORDER\s+BY|LEFT\s+OUTER\s+JOIN|RIGHT\s+OUTER\s+JOIN|FULL\s+OUTER\s+JOIN|LEFT\s+JOIN|RIGHT\s+JOIN|INNER\s+JOIN|FULL\s+JOIN|CROSS\s+JOIN|UNION\s+ALL|ADD\s+COLUMN|DROP\s+COLUMN|RENAME\s+COLUMN|ALTER\s+COLUMN|EXPLAIN\s+QUERY\s+PLAN|ADD\s+CONSTRAINT|DROP\s+CONSTRAINT|ON\s+CONFLICT|IS\s+NOT\s+NULL|IS\s+NULL|IS\s+NOT|IF\s+EXISTS|IF\s+NOT\s+EXISTS|NOT\s+LIKE|NOT\s+IN|NOT\s+BETWEEN|NOT\s+EXISTS)\b/gi;
	while ((match = multiWordKeywords.exec(code)) !== null) {
		parts.push({
			start: match.index,
			end: match.index + match[0].length,
			text: match[0],
			type: "keyword",
			priority: 5,
		});
	}

	// 6. Main SQL keywords (single words - commands and clauses)
	const keywords =
		/\b(CREATE|TABLE|DATABASE|SCHEMA|TRIGGER|PROCEDURE|FUNCTION|ALTER|DROP|RENAME|ADD|MODIFY|CHANGE|COLUMN|SELECT|DISTINCT|FROM|WHERE|JOIN|INNER|LEFT|RIGHT|FULL|OUTER|CROSS|SELF|ON|INSERT|INTO|VALUES|UPDATE|SET|DELETE|TRUNCATE|UNION|ALL|WITH|AS|USING|HAVING|ASC|DESC|LIMIT|OFFSET|CASE|WHEN|THEN|ELSE|END|INDEX|VIEW|BEGIN|COMMIT|ROLLBACK|TRANSACTION|SAVEPOINT|RELEASE|AND|OR|IN|BETWEEN|LIKE|EXISTS|IS|TO|ANY|SOME|EXPLAIN|ANALYZE|DESCRIBE|SHOW|USE|GRANT|REVOKE|RETURNING|CONFLICT|IGNORE|REPLACE|ABORT|FAIL|RAISE|PRAGMA|ATTACH|DETACH|VACUUM|INTERVAL|DEFAULT)\b/gi;
	while ((match = keywords.exec(code)) !== null) {
		parts.push({
			start: match.index,
			end: match.index + match[0].length,
			text: match[0],
			type: "keyword",
			priority: 6,
		});
	}

	// 7. SQL data types
	const datatypes =
	/\b(ENUM|INTEGER|INT|SMALLINT|VARCHAR|DECIMAL|NUMERIC|TIMESTAMP|DATE|TEXT|CHAR|BOOLEAN|BOOL|TINYINT|BIGINT|FLOAT|DOUBLE|REAL|TIME|DATETIME|BLOB|JSON|SERIAL)\b/gi;
	while ((match = datatypes.exec(code)) !== null) {
		parts.push({
			start: match.index,
			end: match.index + match[0].length,
			text: match[0],
			type: "datatype",
			priority: 7,
		});
	}

	// 8. Constraints and special keywords (single words)
	const constraints =
		/\b(PRIMARY|KEY|FOREIGN|REFERENCES|UNIQUE|NULL|NOT|AUTO_INCREMENT|AUTOINCREMENT|CHECK|UNSIGNED|SIGNED|ZEROFILL|CONSTRAINT|CASCADE|RESTRICT)\b/gi;
	while ((match = constraints.exec(code)) !== null) {
		parts.push({
			start: match.index,
			end: match.index + match[0].length,
			text: match[0],
			type: "constraint",
			priority: 8,
		});
	}

	// 9. SQL functions and aggregations (unambiguous ones)
	const functions =
		/\b(COUNT|SUM|AVG|MAX|MIN|COALESCE|NULLIF|IFNULL|IIF|ROW_NUMBER|RANK|DENSE_RANK|NTILE|LAG|LEAD|FIRST_VALUE|LAST_VALUE|SUBSTRING|SUBSTR|CONCAT|CONCAT_WS|UPPER|LOWER|TRIM|LTRIM|RTRIM|LENGTH|LEN|REVERSE|NOW|CURDATE|CURTIME|STRFTIME|DATE_FORMAT|YEAR|MONTH|DAY|HOUR|MINUTE|SECOND|DATEDIFF|DATEADD|TIMESTAMPDIFF|ABS|CEIL|CEILING|FLOOR|ROUND|MOD|POWER|SQRT|RAND|RANDOM|CAST|CONVERT|GROUP_CONCAT|STRING_AGG|OVER|PARTITION|DATE_ADD|DATE_SUB|CURRENT_TIMESTAMP|CURRENT_DATE|CURRENT_TIME)\b/gi;
	while ((match = functions.exec(code)) !== null) {
		parts.push({
			start: match.index,
			end: match.index + match[0].length,
			text: match[0],
			type: "function",
			priority: 9,
		});
	}

	// 10. Numbers (including in parentheses like VARCHAR(255))
	const numbers = /\b(\d+(?:\.\d+)?)\b/g;
	while ((match = numbers.exec(code)) !== null) {
		parts.push({
			start: match.index,
			end: match.index + match[0].length,
			text: match[0],
			type: "number",
			priority: 10,
		});
	}

	// 11. Recognized table names (after SQL keywords that precede table names)
	const tablePattern =
		/(?:CREATE\s+TABLE\s+|ALTER\s+TABLE\s+|DROP\s+TABLE\s+|TRUNCATE\s+TABLE\s+|INSERT\s+INTO\s+|UPDATE\s+|DELETE\s+FROM\s+|FROM\s+|JOIN\s+|INNER\s+JOIN\s+|LEFT\s+JOIN\s+|RIGHT\s+JOIN\s+|FULL\s+JOIN\s+|CROSS\s+JOIN\s+|REFERENCES\s+|CREATE\s+(?:UNIQUE\s+)?INDEX\s+\w+\s+ON\s+)(\w+)/gi;
	while ((match = tablePattern.exec(code)) !== null) {
		const tableName = match[1];
		const tableStart = match.index + match[0].length - tableName.length;
		parts.push({
			start: tableStart,
			end: tableStart + tableName.length,
			text: tableName,
			type: "tableName",
			priority: 11,
		});
	}

	// 12. Operators
	// - Comparison: =, !=, <>, <, >, <=, >=
	// - Arithmetic: +, -, /, %
	// - Multiplication: * except after SELECT, comma, or aggregate functions (COUNT, SUM, etc.)
	// - Concatenation: ||
	const operators =
		/(\|\||[=!<>]+|[+\-/%]|(?<!SELECT\s*)(?<!,\s*)(?<!COUNT\s*\(\s*)(?<!SUM\s*\(\s*)(?<!AVG\s*\(\s*)(?<!MIN\s*\(\s*)(?<!MAX\s*\(\s*)\*(?!\s*FROM))/gi;
	while ((match = operators.exec(code)) !== null) {
		parts.push({
			start: match.index,
			end: match.index + match[0].length,
			text: match[0],
			type: "operator",
			priority: 12,
		});
	}

	// 13. Punctuation
	const punctuation = /([(),.;])/g;
	while ((match = punctuation.exec(code)) !== null) {
		parts.push({
			start: match.index,
			end: match.index + match[0].length,
			text: match[0],
			type: "punctuation",
			priority: 13,
		});
	}

	// Sort by position then by priority (lower numeric value = higher importance)
	parts.sort((a, b) => {
		if (a.start !== b.start) return a.start - b.start;
		return a.priority - b.priority;
	});

	// Filter overlaps, keeping the highest-priority token
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

// Function to parse database schemas with enhanced structure for diagrams
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
				relationships: [],
			};
			tables.push(currentTable);
		} else if (currentTable && line.match(/^\w+\s+\w+/)) {
			const cleanLine = line
				.replace(/--.*$/, "")
				.replace(/[,;]\s*$/, "")
				.trim();
			const columnName = cleanLine.match(/^(\w+)/)[1];
			const typeMatch = cleanLine.match(/^\w+\s+(\w+(?:\s*\([^)]+\))?)/);
			const columnType = typeMatch ? typeMatch[1] : "";
			const afterType = cleanLine
				.slice(cleanLine.indexOf(columnType) + columnType.length)
				.trim();
			const constraints = afterType;
			const column = {
				name: columnName,
				type: columnType,
				constraints: constraints,
				isPrimary: /PRIMARY\s+KEY/i.test(constraints),
				isForeign:
					/FOREIGN\s+KEY/i.test(line) || /REFERENCES/i.test(constraints),
				isUnique: /UNIQUE/i.test(constraints),
				isNotNull: /NOT\s+NULL/i.test(constraints),
			};
			currentTable.columns.push(column);
		} else if (currentTable && line.match(/FOREIGN KEY\s*\((\w+)\)\s*REFERENCES\s+(\w+)\s*\((\w+)\)/i)) {
			const match = line.match(/FOREIGN KEY\s*\((\w+)\)\s*REFERENCES\s+(\w+)\s*\((\w+)\)/i);
			const relationship = {
				column: match[1],
				referencedTable: match[2],
				referencedColumn: match[3],
			};
			currentTable.relationships.push(relationship);
		} else if (currentTable && line.match(/(\w+)\s+\w+.*REFERENCES\s+(\w+)\s*\((\w+)\)/i)) {
			const match = line.match(/(\w+)\s+\w+.*REFERENCES\s+(\w+)\s*\((\w+)\)/i);
			const relationship = {
				column: match[1],
				referencedTable: match[2],
				referencedColumn: match[3],
			};
			currentTable.relationships.push(relationship);
		}
	}
	return tables;
}

// Function to convert SQL CREATE TABLE statements to diagram data
export function sqlToTableDiagram(sqlCode) {
	if (!sqlCode) return [];

	// Parse the SQL to extract table structure
	const tables = parseSchema(sqlCode);

	// Enhance with visual information
	return tables.map((table) => ({
		...table,
		// Add visual metadata
		totalColumns: table.columns.length,
		primaryKeys: table.columns.filter((col) => col.isPrimary).length,
		foreignKeys: table.columns.filter((col) => col.isForeign).length,
		uniqueConstraints: table.columns.filter((col) => col.isUnique).length,
	}));
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
