"use client";

const JoinCard = ({ title, vennConfig }) => {
	// Couleurs douces (cyan/teal)
	const fillColor = "#0891b2"; // cyan-600
	const strokeColor = "#155e75"; // cyan-800

	return (
		<div className="flex flex-col items-center p-4 bg-gray-200 rounded-lg border border-slate-700 hover:border-cyan-700 transition-colors">
			{/* Diagramme de Venn en SVG - Grande taille */}
			<svg width="180" height="130" viewBox="0 0 100 70">
				{/* Définition du masque pour l'intersection */}
				<defs>
					{/* Masque pour exclure l'intersection du cercle A */}
					<mask id={`maskA-${title.replace(/\s+/g, "")}`}>
						<rect width="100" height="70" fill="white" />
						<circle cx="68" cy="35" r="26" fill="black" />
					</mask>
					{/* Masque pour exclure l'intersection du cercle B */}
					<mask id={`maskB-${title.replace(/\s+/g, "")}`}>
						<rect width="100" height="70" fill="white" />
						<circle cx="32" cy="35" r="26" fill="black" />
					</mask>
					{/* Clip pour l'intersection (forme de lentille) */}
					<clipPath id={`intersection-${title.replace(/\s+/g, "")}`}>
						<circle cx="32" cy="35" r="26" />
					</clipPath>
				</defs>

				{/* Cercle A - fond (avec ou sans exclusion de l'intersection) */}
				{vennConfig.leftOnly && !vennConfig.intersection && (
					<circle
						cx="32"
						cy="35"
						r="26"
						fill={fillColor}
						mask={`url(#maskA-${title.replace(/\s+/g, "")})`}
					/>
				)}
				{vennConfig.leftOnly && vennConfig.intersection && (
					<circle cx="32" cy="35" r="26" fill={fillColor} />
				)}

				{/* Cercle B - fond (avec ou sans exclusion de l'intersection) */}
				{vennConfig.rightOnly && !vennConfig.intersection && (
					<circle
						cx="68"
						cy="35"
						r="26"
						fill={fillColor}
						mask={`url(#maskB-${title.replace(/\s+/g, "")})`}
					/>
				)}
				{vennConfig.rightOnly && vennConfig.intersection && (
					<circle cx="68" cy="35" r="26" fill={fillColor} />
				)}

				{/* Intersection uniquement (sans les cercles complets) */}
				{vennConfig.intersection &&
					!vennConfig.leftOnly &&
					!vennConfig.rightOnly && (
						<circle
							cx="68"
							cy="35"
							r="26"
							fill={fillColor}
							clipPath={`url(#intersection-${title.replace(/\s+/g, "")})`}
						/>
					)}

				{/* Bordure cercle A - toujours visible au-dessus */}
				<circle
					cx="32"
					cy="35"
					r="26"
					fill="none"
					stroke={strokeColor}
					strokeWidth="1"
				/>

				{/* Bordure cercle B - toujours visible au-dessus */}
				<circle
					cx="68"
					cy="35"
					r="26"
					fill="none"
					stroke={strokeColor}
					strokeWidth="1"
				/>

				{/* Labels A et B */}
				<text x="18" y="40" fill="black" fontSize="14" fontWeight="bold">
					A
				</text>
				<text x="74" y="40" fill="black" fontSize="14" fontWeight="bold">
					B
				</text>
			</svg>

			{/* Titre du type de jointure */}
			<h4 className="text-base font-semibold text-black mt-3 text-center">
				{title}
			</h4>
		</div>
	);
};

export default function JoinsDiagram() {
	const joins = [
		{
			title: "INNER JOIN",
			vennConfig: { leftOnly: false, intersection: true, rightOnly: false },
		},
		{
			title: "LEFT JOIN",
			vennConfig: { leftOnly: true, intersection: true, rightOnly: false },
		},
		{
			title: "RIGHT JOIN",
			vennConfig: { leftOnly: false, intersection: true, rightOnly: true },
		},
		{
			title: "FULL JOIN",
			vennConfig: { leftOnly: true, intersection: true, rightOnly: true },
		},
	];

	return (
		<div className="space-y-4">
			{/* Grille de jointures */}
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
				{joins.map((join, index) => (
					<JoinCard
						key={index}
						title={join.title}
						vennConfig={join.vennConfig}
					/>
				))}
			</div>

			{/* Légende */}
			<div className="flex flex-wrap gap-4 justify-start text-sm text-gray-400 pt-2">
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 rounded-full bg-cyan-600 border-2 border-cyan-800"></div>
					<span>Zone sélectionnée</span>
				</div>
				<div className="flex items-center gap-2">
					<span className="font-bold text-white">A</span>
					<span>= Table de gauche (FROM)</span>
				</div>
				<div className="flex items-center gap-2">
					<span className="font-bold text-white">B</span>
					<span>= Table de droite (JOIN)</span>
				</div>
			</div>
		</div>
	);
}
