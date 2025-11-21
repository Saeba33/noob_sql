import { MdKey, MdLink, MdTableChart } from "react-icons/md";
import { sqlSyntaxConfig } from "../../../config/sql-syntax.js";

export default function SqlTableBlock({
	children,
	tables,
	title = "Structure des tables",
	className = "",
	type = "text",
}) {
	const styles = sqlSyntaxConfig.componentStyles.diagram;

	// Rendering for simple text diagram
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

	// Rendering for visual table diagrams
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
					<div className="flex flex-wrap gap-6">
						{tables.map((table, tableIndex) => (
							<div
								key={tableIndex}
								className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
							>
								{/* Table Header */}
								<div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
									<h3 className="text-gray-800 font-semibold text-sm font-mono flex items-center justify-center">
										<MdTableChart className="w-4 h-4 mr-2" />
										{table.name}
									</h3>
								</div>

								{/* Columns */}
								<div>
									{table.columns?.map((column, colIndex) => (
										<div
											key={colIndex}
											className={`px-4 py-2 text-sm font-mono flex items-center gap-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors ${
												column.isPrimary ? "bg-blue-50" : ""
											} ${column.isForeign ? "bg-purple-50" : ""}`}
										>
											{/* Icon */}
											<div className="flex-shrink-0 w-5 flex items-center justify-center">
												{column.isPrimary && (
													<MdKey className="w-3 h-3 text-blue-600" />
												)}
												{column.isForeign && (
													<MdLink className="w-3 h-3 text-purple-600" />
												)}
											</div>

											{/* Column */}
											<span className="text-gray-800 font-medium flex-shrink-0">
												{column.name}
											</span>

											{/* Spacer */}
											<div className="flex-grow min-w-[20px]"></div>

											{/* Data types */}
											<div className="flex-shrink-0 text-right">
												<div className="text-blue-600 text-xs font-medium whitespace-nowrap">
													{column.type}
												</div>
												{column.constraints && (
													<div className="text-violet-600 text-xs mt-0.5 whitespace-nowrap">
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
												<MdLink className="w-3 h-3 mr-1 flex-shrink-0" />
												<span className="break-all">
													{rel.column} → {rel.referencedTable}.
													{rel.referencedColumn}
												</span>
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
