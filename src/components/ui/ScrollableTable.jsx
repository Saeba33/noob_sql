"use client";

import { useScrollIndicator } from "@/hooks/useScrollIndicator";

export default function ScrollableTable({ columns, data, renderCell }) {
	const { ref, hasScroll } = useScrollIndicator();

	return (
		<div className="border border-gray-300 rounded-lg overflow-hidden relative">
			{/* Scroll indicator - affiché uniquement si scroll */}
			{hasScroll && <div className="scroll-indicator-white" />}
			<div ref={ref} className="overflow-x-auto">
			<div>
				<div
					className="grid"
					style={{
						gridTemplateColumns: `repeat(${columns.length}, minmax(200px, 1fr))`,
					}}
				>
					{/* Header */}
					{columns.map((col, index) => (
						<div
							key={`header-${index}`}
							className={`p-3 text-center font-semibold bg-gray-100 border-b border-gray-300 ${
								index < columns.length - 1 ? "border-r border-gray-300" : ""
							}`}
						>
							<div className="flex items-center justify-center space-x-1">
								{col.icon}
								<span className={col.className || "text-gray-900"}>
									{col.label}
								</span>
							</div>
						</div>
					))}

					{/* Data */}
					{data.map((row, rowIndex) =>
						row.map((cell, cellIndex) => (
							<div
								key={`cell-${rowIndex}-${cellIndex}`}
								className={`p-3 text-center bg-white break-words ${
									rowIndex < data.length - 1 ? "border-b border-gray-300" : ""
								} ${
									cellIndex < columns.length - 1
										? "border-r border-gray-300"
										: ""
								}`}
							>
								{renderCell ? (
									renderCell(cell, cellIndex, rowIndex)
								) : (
									<span className="text-gray-900 text-sm">{cell}</span>
								)}
							</div>
						))
					)}
				</div>
			</div>
		</div>
	</div>
	);
}