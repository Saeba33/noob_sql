import { MdKey, MdLink, MdTableChart } from "react-icons/md";
import { sqlSyntaxConfig } from "../../../config/sql-syntax.js";

export default function SqlTableBlock({
	children,
	tables,
	title = "Structure des Tables",
	className = "",
	type = "text", // "text" pour du texte simple, "tables" pour des tables visuelles
}) {
	const styles = sqlSyntaxConfig.componentStyles.diagram;

	// Rendu pour diagramme textuel simple
	if (type === "text" || !tables) {
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

	// Rendu pour diagramme de tables visuelles
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
					<span
						className={`${styles.headerText} text-sm font-mono ml-3 flex items-center`}
					>
						<MdTableChart className="w-4 h-4 mr-2" />
						{title}
					</span>
				</div>

				{/* Tables Diagram */}
				<div className="p-6 overflow-auto">
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{tables.map((table, tableIndex) => (
							<div
								key={tableIndex}
								className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm"
							>
								{/* Table Header */}
								<div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
									<h3 className="text-gray-800 font-semibold text-sm font-mono flex items-center justify-center">
										<MdTableChart className="w-4 h-4 mr-2" />
										{table.name}
									</h3>
								</div>

								{/* Columns */}
								<div className="divide-y divide-gray-200">
									{table.columns?.map((column, colIndex) => (
										<div
											key={colIndex}
											className={`px-4 py-2 text-sm font-mono flex items-center justify-between hover:bg-gray-50 transition-colors ${
												column.isPrimary ? "bg-blue-50" : ""
											} ${column.isForeign ? "bg-purple-50" : ""}`}
										>
											<div className="flex items-center space-x-2">
												{/* Icône de clé */}
												{column.isPrimary && (
													<MdKey className="w-3 h-3 text-blue-600" />
												)}
												{column.isForeign && (
													<MdLink className="w-3 h-3 text-purple-600" />
												)}

												{/* Nom de la colonne */}
												<span className="text-gray-800 font-medium">
													{column.name}
												</span>
											</div>

											{/* Type de données */}
											<div className="text-right">
												<span className="text-blue-600 text-xs font-medium">
													{column.type}
												</span>
												{column.constraints && (
													<div className="text-violet-600 text-xs mt-1">
														{column.constraints}
													</div>
												)}
											</div>
										</div>
									))}
								</div>

								{/* Relationships */}
								{table.relationships && table.relationships.length > 0 && (
									<div className="bg-gray-50 px-4 py-2 border-t border-gray-200">
										<div className="text-xs text-gray-600 mb-1 font-medium">
											Relations:
										</div>
										{table.relationships.map((rel, relIndex) => (
											<div
												key={relIndex}
												className="text-xs text-purple-700 flex items-center font-mono"
											>
												<MdLink className="w-3 h-3 mr-1" />
												{rel.column} → {rel.referencedTable}.
												{rel.referencedColumn}
											</div>
										))}
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
