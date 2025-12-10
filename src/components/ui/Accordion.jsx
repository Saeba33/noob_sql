"use client";

import SQLCodeBlock from "@/components/ui/sql/SQLCodeBlock";
import SQLResultBlock from "@/components/ui/sql/SQLResultBlock";
import SQLTableDiagram from "@/components/ui/sql/SQLTableDiagram";
import { BELT_COLORS } from "@/config/belts-config";
import { sqlToTableDiagram } from "@/config/sql-syntax";
import { Suspense, useState } from "react";
import { FaCode } from "react-icons/fa6";
import { MdAccountTree, MdCode, MdExpandMore } from "react-icons/md";

// Helper to render SQL result
const renderSqlResult = (sqlResult) => {
	if (Array.isArray(sqlResult)) {
		return <SQLResultBlock data={sqlResult} />;
	}
	if (sqlResult?.message) {
		return <SQLResultBlock message={sqlResult.message} type="message" />;
	}
	return <SQLResultBlock data={sqlResult} />;
};

export default function Accordion({
	section,
	content,
	examples,
	externalComponent,
	colors = BELT_COLORS.white,
	className = "",
}) {
	const [isOpen, setIsOpen] = useState(false);
	const accordionId = `accordion-${section.replace(/\s+/g, "-").toLowerCase()}`;

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div
			className={`border-accordion ${
				isOpen ? "open" : ""
			} overflow-hidden ${className}`}
			style={{ "--accordion-color": colors.icon }}
		>
			{/* Accordion header */}
			<button
				id={`${accordionId}-header`}
				onClick={toggle}
				aria-expanded={isOpen}
				aria-controls={`${accordionId}-content`}
				className={`w-full text-left px-6 py-4 bg-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 relative cursor-pointer ${
					isOpen ? "rounded-t-lg" : "rounded-lg"
				}`}
			>
				<div className="flex items-center justify-between pr-8">
					<div className="flex items-center gap-3">
						<FaCode
							style={{ color: colors.icon }}
							className="w-5 h-5 flex-shrink-0"
							aria-hidden="true"
						/>
						<h3 className="text-lg font-semibold text-gray-600">{section}</h3>
					</div>
					<MdExpandMore
						className={`w-6 h-6 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
							isOpen ? "rotate-180" : ""
						}`}
						aria-hidden="true"
					/>
				</div>
			</button>

			{/* Accordion content - using grid for smooth animation */}
			<div
				id={`${accordionId}-content`}
				role="region"
				aria-labelledby={`${accordionId}-header`}
				aria-hidden={!isOpen}
				className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
					isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
				}`}
			>
				<div className="overflow-hidden">
					<div
						className="px-6 py-5 bg-white flex flex-col space-y-6 rounded-b-lg border-t"
						style={{ 
							borderTopColor: colors.icon, 
							borderTopWidth: "1px"
						}}
					>
						{/* Description - only show if content exists */}
						{content && (
							<div 
								className="bg-white border rounded-lg p-5 shadow-sm"
								style={{ borderColor: `color-mix(in srgb, ${colors.icon} 85%, #e5e7eb 85%)` }}
							>
								<p
									className="leading-relaxed whitespace-pre-line content-html text-gray-700"
									dangerouslySetInnerHTML={{ __html: content }}
								/>
							</div>
						)}

						{/* External Component */}
						{externalComponent && (
							<Suspense
								fallback={
									<div className="flex items-center justify-center p-8">
										<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
										<span className="ml-3 text-gray-600">Chargement...</span>
									</div>
								}
							>
								<div>{externalComponent}</div>
							</Suspense>
						)}

						{/* Examples structure */}
						{examples && examples.length > 0 && (
							<div className="space-y-6">
								{examples.map((example, index) => {
									const exampleType = example.type || "query"; // default to "query"

									return (
										<div
											key={index}
											className="space-y-4 border rounded-lg p-5 bg-white shadow-sm"
											style={{ borderColor: `color-mix(in srgb, ${colors.icon} 25%, #e5e7eb 85%)` }}
										>
											{example.label && (
												<h5 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-4">
													<MdCode
														className="w-4 h-4"
														style={{ color: colors.icon }}
													/>
													{example.label}
												</h5>
											)}

											{exampleType === "schema" ? (
												// Schema: CREATE TABLE with auto-generated diagram
												<>
													<SQLCodeBlock>{example.code}</SQLCodeBlock>
													{example.code &&
														example.code.includes("CREATE TABLE") && (
															<div className="mt-4">
																<h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
																	<MdAccountTree className="w-4 h-4 mr-2 text-emerald-600" />
																	Structure des tables
																</h4>
																<div className="flex flex-wrap gap-6 items-start">
																	{sqlToTableDiagram(example.code).map(
																		(table, tableIndex) => (
																			<SQLTableDiagram
																				key={tableIndex}
																				table={table}
																			/>
																		)
																	)}
																</div>
															</div>
														)}
												</>
											) : (
												// Query: Regular SQL with optional result
												<>
													<SQLCodeBlock>{example.code}</SQLCodeBlock>
													{example.result !== undefined && (
														<div className="mt-3">
															{renderSqlResult(example.result)}
														</div>
													)}
												</>
											)}
										</div>
									);
								})}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
