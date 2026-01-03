import { MdKey, MdLink, MdTableChart } from "react-icons/md";

/**
 * SQLTableDiagram - Displays a database table structure with columns, types, constraints and relationships
 * @param {Object} table - Table data with name, columns, and relationships
 */
export default function SQLTableDiagram({ table }) {
	return (
		<div className="bg-white border border-gray-300 squircle shadow-lg w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
			{/* Table header */}
			<div className="bg-gray-50 px-4 py-3 border-b border-gray-200 squircle-t">
				<h6 className="text-gray-800 font-semibold font-mono flex items-center justify-center">
					<MdTableChart className="w-4 h-4 mr-2" />
					{table.name}
				</h6>
			</div>

			{/* Columns */}
			<div>
				{table.columns?.map((column, colIndex) => (
					<div
						key={colIndex}
						className={`px-4 py-2 text-sm font-mono border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors ${
							column.isPrimary ? "bg-blue-50" : ""
						} ${column.isForeign ? "bg-purple-50" : ""}`}
					>
						<div className="flex items-start gap-3">
							<div className="flex-shrink-0 w-5 flex items-center justify-center pt-0.5">
								{column.isPrimary && (
									<MdKey className="w-3 h-3 text-blue-600" />
								)}
								{column.isForeign && (
									<MdLink className="w-3 h-3 text-purple-600 opacity-80" />
								)}
							</div>
							<div className="flex-shrink-0 text-gray-800 font-medium">
								{column.name}
							</div>
						</div>
						<div className="mt-1 ml-8 text-right">
							<div className="text-blue-600 text-xs font-medium break-words text-left">
								{column.type}
							</div>
							{column.constraints && (
								<div className="text-violet-600 text-xs mt-0.5 break-words text-left">
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
								{rel.column} → {rel.referencedTable}.{rel.referencedColumn}
							</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
