"use client";

import { useScrollIndicator } from "@/hooks/useScrollIndicator";
import { formatQueryResult } from "../../../config/sql-syntax.js";

export default function SQLResultBlock({
	data,
	headers,
	message,
	title = "Résultat de la requête",
	className = "",
	type = "auto",
}) {
	const { ref, hasScroll } = useScrollIndicator();

	// Determines the type of content to display
	const contentType =
		type === "auto"
			? message
				? "message"
				: data && data.length > 0
				? "table"
				: "empty"
			: type;

	// Rendering for messages
	if (contentType === "message" && message) {
		return (
			<div className={`${className}`}>
				<div className="bg-blue-50 border border-blue-200 rounded-lg overflow-hidden">
					{/* Header */}
					<div className="bg-blue-100 px-4 py-3 border-b border-blue-200">
						<h5 className="text-blue-800 font-semibold flex items-center"></h5>
					</div>

					{/* Message Content */}
					<div className="p-4">
						<p className="text-blue-700 font-mono text-sm">{message}</p>
					</div>
				</div>
			</div>
		);
	}

	// Format data for tables
	const formattedData = data ? formatQueryResult(data, headers) : null;

	// Rendering for empty result
	if (contentType === "empty" || !formattedData || !formattedData.rows.length) {
		return (
			<div className={`${className}`}>
				<div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
					{/* Header */}
					<div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
						<h5 className="text-gray-700 font-semibold flex items-center"></h5>
					</div>

					{/* Empty Content */}
					<div className="p-4">
						<p className="text-gray-500 text-center italic text-sm">
							Aucun résultat
						</p>
					</div>
				</div>
			</div>
		);
	}

	// Rendu for tables results
	return (
		<div className={`${className}`}>
			<div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
				{/* Header */}
				<div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
					<h5 className="text-gray-800 font-semibold flex items-center">
						{formattedData.rows.length > 1 ? "s" : ""}
					</h5>
				</div>

				{/* Results Table */}
				<div className="relative">
					{/* Scroll indicator - affiché uniquement si scroll */}
					{hasScroll && <div className="scroll-indicator-white" />}
					<div ref={ref} className="overflow-x-auto">
						<table className="w-full text-sm">
							{/* Headers */}
							<thead>
								<tr className="bg-gray-50 border-b border-gray-200">
									{formattedData.headers.map((header, index) => (
										<th
											key={index}
											className="px-4 py-3 text-left font-semibold text-gray-700 border-r border-gray-200 last:border-r-0"
										>
											{header}
										</th>
									))}
								</tr>
							</thead>

							{/* Rows */}
							<tbody className="divide-y divide-gray-200">
								{formattedData.rows.map((row, rowIndex) => (
									<tr
										key={rowIndex}
										className={`hover:bg-gray-50 transition-colors ${
											rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50/50"
										}`}
									>
										{row.map((cell, cellIndex) => (
											<td
												key={cellIndex}
												className="px-4 py-3 text-gray-800 font-mono border-r border-gray-200 last:border-r-0"
											>
												{cell === null ? (
													<span className="text-gray-400 italic">NULL</span>
												) : cell === undefined ? (
													<span className="text-gray-400 italic">-</span>
												) : (
													String(cell)
												)}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
