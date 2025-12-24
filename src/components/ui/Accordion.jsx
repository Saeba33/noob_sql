"use client";

import SQLCodeBlock from "@/components/ui/sql/SQLCodeBlock";
import SQLResultBlock from "@/components/ui/sql/SQLResultBlock";
import SQLTableDiagram from "@/components/ui/sql/SQLTableDiagram";
import { BELT_COLORS } from "@/config/belts-config";
import { sqlToTableDiagram } from "@/config/sql-syntax";
import { useState } from "react";
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
		>
			{/* Accordion header */}
			<button
				id={`${accordionId}-header`}
				onClick={toggle}
				aria-expanded={isOpen}
				aria-controls={`${accordionId}-content`}
				className={`w-full text-left px-4 py-3 sm:px-5 sm:py-3.5 md:px-6 md:py-4 bg-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 relative cursor-pointer group ${
					isOpen ? "rounded-t-lg" : "rounded-lg"
				}`}
			>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<FaCode
							className="w-5 h-5 flex-shrink-0 transition-colors duration-200 hidden sm:block"
							style={{ color: "#8A8A8A" }}
							aria-hidden="true"
						/>
						<h4 className="font-semibold text-gray-600 group-hover:text-gray-800 transition-colors">
							{section}
						</h4>
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
					<div className="px-6 py-5 bg-white flex flex-col space-y-6 rounded-b-lg cursor-auto border-t border-[#e5e7eb]">
						{/* Description - only show if content exists */}
						{content && (
							<div>
								<p
									className="text-body leading-relaxed whitespace-pre-line content-html text-gray-700"
									dangerouslySetInnerHTML={{ __html: content }}
								/>
							</div>
						)}

						{/* External Component */}
						{externalComponent && <div>{externalComponent}</div>}

						{/* Examples structure */}
						{examples && examples.length > 0 && (
							<div className="space-y-6">
								{examples.map((example, index) => {
									const exampleType = example.type || "query"; // default to "query"
									const hasMultipleExamples = examples.length > 1;

									return (
										<div
											key={index}
											className="space-y-4 border border-gray-200 rounded-lg p-5 bg-gray-50"
											style={{
												boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
											}}
										>
											{example.label && (
												<h6 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
													<MdCode className="w-4 h-4" />
													{example.label}
												</h6>
											)}

											{exampleType === "schema" ? (
												// Schema: CREATE TABLE with auto-generated diagram
												<>
													<SQLCodeBlock>{example.code}</SQLCodeBlock>
													{example.code &&
														example.code.includes("CREATE TABLE") && (
															<div className="mt-4">
																<h6 className="font-semibold text-gray-900 mb-3 flex items-center">
																	<MdAccountTree className="w-4 h-4 mr-2" />
																	Structure des tables
																</h6>
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
