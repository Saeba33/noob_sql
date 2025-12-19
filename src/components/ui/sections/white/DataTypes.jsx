"use client";

import { constraints, dataTypes, exampleTypes } from "@/data/sections/white";
import { MdInventory, MdLocalOffer, MdLock, MdStorage } from "react-icons/md";
import { useScrollIndicator } from "@/hooks/useScrollIndicator";

export default function DataTypes() {
	const scrollIndicator1 = useScrollIndicator();
	const scrollIndicator2 = useScrollIndicator();
	// #region  Table's types
	const flatCommon = dataTypes
		.filter((cat) => cat.type === "common")
		.flatMap((cat) =>
			cat.types.map((t) => ({
				...t,
				category: cat.category,
				categoryTagColorClass:
					cat.tagColorClass || "bg-gray-50 text-gray-800 border-gray-100",
				type: cat.type,
			}))
		);

	const flatLess = dataTypes
		.filter((cat) => cat.type === "uncommon")
		.flatMap((cat) =>
			cat.types.map((t) => ({
				...t,
				category: cat.category,
				categoryTagColorClass:
					cat.tagColorClass || "bg-gray-50 text-gray-800 border-gray-100",
				type: cat.type,
			}))
		);
	//#endregion

	// #region Types Section
	const renderTypesSection = (title, rows) => {
			return (
				<div className="border border-gray-300 rounded-lg bg-gray-50 p-6 mt-8">
					<h4 className="font-bold text-gray-800 mb-6 flex items-center">
						<MdInventory className="w-6 h-6 min-w-[24px] text-gray-600 mr-3 hidden sm:block" />
						{title}
					</h4>
				<p className="italic mb-2">
					* Les valeurs entre parenthèses sont données à titre d'exemple, elles
					sont configurables selon vos besoins. La liste suivante n'est pas
					exhaustive.
				</p>

				<div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
					<div className="relative">
						{/* Scroll indicator - affiché uniquement si scroll */}
						{scrollIndicator1.hasScroll && <div className="scroll-indicator-white" />}
						<div ref={scrollIndicator1.ref} className="overflow-x-auto">
						<table className="w-full min-w-[800px] border-collapse bg-white rounded-lg shadow-sm overflow-hidden">
							<thead>
								<tr>
									<th className="text-xs font-semibold text-gray-600 uppercase p-3 pl-4 text-left border-b  border-r border-gray-300 bg-gray-100 rounded-tl-lg">
										Type
									</th>
									<th className="text-xs font-semibold text-gray-600 uppercase p-3 text-left border-b border-r border-gray-300 bg-gray-100">
										Catégorie
									</th>
									<th className="text-xs font-semibold text-gray-600 uppercase p-3 text-left border-b border-r  border-gray-300 bg-gray-100">
										Description
									</th>
									<th className="text-xs font-semibold text-gray-600 uppercase p-3 text-left border-b border-r  border-gray-300 bg-gray-100">
										Exemples
									</th>
									<th className="text-xs font-semibold text-gray-600 uppercase p-3 text-left border-b border-gray-300 bg-gray-100 rounded-tr-lg">
										Utilisation
									</th>
								</tr>
							</thead>
							<tbody>
								{rows.map((type, typeIndex) => {
									const isLast = typeIndex === rows.length - 1;
									return (
										<tr
											key={typeIndex}
											className="border-b border-gray-200 hover:bg-gray-50"
										>
											<td
												className={`p-3 border-r border-gray-300 ${
													isLast ? "rounded-bl-lg" : ""
												}`}
											>
												<div className="bg-gray-100 px-2 py-1 rounded inline-block">
													<code className="font-semibold text-sm text-gray-800">
														{type.name}
													</code>
												</div>
											</td>
											<td className={`p-3 border-r border-gray-300`}>
												<span
													className={`inline-flex items-center text-xs ${type.categoryTagColorClass} px-2 py-0.5 rounded-md border`}
												>
													<span className="mr-1">
														<MdLocalOffer className="w-3 h-3 text-current inline" />
													</span>
													<span className="whitespace-nowrap">
														{type.category}
													</span>
												</span>
											</td>
											<td
												className={`p-3 text-gray-700 text-sm border-r border-gray-300`}
											>
												{type.description}
											</td>
											<td className="p-3">
												<div className="flex flex-wrap gap-1 border-gray-300">
													{type.examples.map((example, exampleIndex) => (
														<code
															key={exampleIndex}
															className="bg-gray-100 px-1 py-0.5 rounded text-xs text-gray-800"
														>
															{example}
														</code>
													))}
												</div>
											</td>
											<td
												className={`p-3 text-gray-600 text-sm border-l border-gray-300 ${
													isLast ? "rounded-br-lg" : ""
												}`}
											>
												{type.usage}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		);
	};
	//#endregion

	// #region Constraints Section
	const renderConstraintsSection = () => {
		return (
			<div className="mt-8">
				<div className="border border-gray-300 rounded-lg bg-gray-50 p-6">
					<h4 className="font-bold text-gray-800 mb-6 flex items-center">
						<MdLock className="w-6 h-6 min-w-[24px] text-gray-600 mr-3 hidden sm:block" />
						Contraintes et options
					</h4>

					<p className="text-body text-gray-700 mb-6">
						Les <strong>contraintes</strong> définissent des règles que les
						données doivent respecter pour garantir l'intégrité et la cohérence
						de votre base de données.
					</p>

					<div className="grid md:grid-cols-2 gap-4">
						{constraints.map((constraint, index) => (
							<div
								key={index}
								className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
							>
								<div className="flex items-center space-x-3">
									<div className="flex-1 self-start">
										<div className="flex items-center gap-2">
											<h4 className="font-bold text-gray-900 mb-1">
												{constraint.name}
											</h4>
											<span className="pb-1 w-5 h-5 min-w-[20px] text-gray-600 ">{constraint.icon}</span>
										</div>
										<p className="text-gray-700 text-sm mb-2">
											{constraint.description}
										</p>
										<div className="inline-block bg-gray-100 border border-gray-200 rounded px-2 py-1 mb-2 max-w-full">
											<code className="text-xs text-gray-800 whitespace-pre-wrap break-words block">
												{constraint.example}
											</code>
										</div>
										<p className="text-gray-600 text-xs">
											<strong>Usage :</strong> {constraint.usage}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	};
	//#endregion

	// #region Example table
	const renderExampleSection = () => {
		return (
			<div className="mt-8">
				<div className="border border-gray-300 rounded-lg bg-gray-50 p-6">
					<h4 className="font-bold text-gray-800 mb-6 flex items-center">
						<MdStorage className="w-6 h-6 min-w-[24px] text-gray-600 mr-3 hidden sm:block" />
						Exemple d'une table "utilisateurs" avec contraintes
					</h4>

					<div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
						<div className="relative">
							{/* Scroll indicator - affiché uniquement si scroll */}
							{scrollIndicator2.hasScroll && <div className="scroll-indicator-white" />}
							<div ref={scrollIndicator2.ref} className="overflow-x-auto">
							<table className="w-full min-w-[800px] border-collapse bg-white rounded-lg shadow-sm overflow-hidden">
								<thead>
									<tr>
										<th className="text-xs font-semibold text-gray-600 uppercase p-3 text-left border-b  border-r border-gray-300 bg-gray-100 rounded-tl-lg">
											Nom de la colonne
										</th>
										<th className="text-xs font-semibold text-gray-600 uppercase p-3 text-left border-b border-r border-gray-300 bg-gray-100">
											Type + Contraintes
										</th>
										<th className="text-xs font-semibold text-gray-600 uppercase p-3 text-left border-b border-r  border-gray-300 bg-gray-100">
											Pourquoi ce choix ?
										</th>
										<th className="text-xs font-semibold text-gray-600 uppercase p-3 text-left border-b border-r  border-gray-300 bg-gray-100">
											Valeur exemple
										</th>
										<th className="text-xs font-semibold text-gray-600 uppercase p-3 text-left border-b border-gray-300 bg-gray-100 rounded-tr-lg">
											Avantages
										</th>
									</tr>
								</thead>
								<tbody>
									{exampleTypes.map((row, index) => {
										const isLast = index === exampleTypes.length - 1;
										return (
											<tr
												key={index}
												className="border-b border-gray-200 hover:bg-gray-50"
											>
												<td
													className={`p-3 border-r border-gray-300 ${
														isLast ? "rounded-bl-lg" : ""
													}`}
												>
													<div className="font-medium text-gray-900 text-sm">
														{row.column}
													</div>
												</td>
												<td className={`p-3 border-r border-gray-300`}>
													<code className="bg-blue-100 px-2 py-1 rounded text-blue-800 text-xs">
														{row.type}
													</code>
												</td>
												<td
													className={`p-3 text-gray-700 text-sm border-r border-gray-300`}
												>
													{row.reason}
												</td>
												<td className="p-3">
													<code className="bg-gray-100 px-2 py-1 rounded text-gray-800 text-xs">
														{row.example}
													</code>
												</td>
												<td
													className={`p-3 text-gray-600 text-sm border-l border-gray-300 ${
														isLast ? "rounded-br-lg" : ""
													}`}
												>
													{row.benefit}
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
	};
	//#endregion

	return (
		<div>
			{/* Introductory section */}
			<div className="mb-8 space-y-4 text-gray-700 leading-relaxed">
				<p>
					En SQL, chaque colonne d'une table doit avoir un{" "}
					<strong>type de données</strong> qui définit le format des
					informations qu'elle peut contenir, ainsi que des{" "}
					<strong>contraintes</strong> qui garantissent l'intégrité des données.
					Bien choisir les types et contraintes est crucial pour garantir la
					qualité, optimiser les performances et maintenir l'intégrité des
					données.
				</p>

				<div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
					<p className="flex justifyitems-center">
						<span>
							<MdInventory className="w-4 h-4 text-blue-600 inline mr-2" />
							<strong>Type de données</strong> = le format autorisé (nombres,
							texte, dates...)
							<br />
							<MdLock className="w-4 h-4 text-blue-600 inline mr-2" />
							<strong>Contraintes</strong> = les règles à respecter
							(obligatoire, unique, valeur par défaut...)
						</span>
					</p>
				</div>
			</div>

			{/* Sections */}
			{renderTypesSection("Types de données courantes", flatCommon)}
			{renderTypesSection("Types de données moins courantes", flatLess)}
			{renderConstraintsSection()}
			{renderExampleSection()}
		</div>
	);
}
