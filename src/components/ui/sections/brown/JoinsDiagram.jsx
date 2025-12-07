"use client";

/**
 * JoinCard - Displays a single SQL join type with Venn diagram visualization
 * @param {string} title - The join type name (e.g., "INNER JOIN")
 * @param {object} vennConfig - Configuration for which areas to highlight
 * @param {boolean} vennConfig.leftOnly - Highlight left circle (table A)
 * @param {boolean} vennConfig.intersection - Highlight intersection area
 * @param {boolean} vennConfig.rightOnly - Highlight right circle (table B)
 */
const JoinCard = ({ title, vennConfig }) => {
	// Brown/amber color palette
	const fillColor = "#d97706"; // amber-600
	const strokeColor = "#92400e"; // amber-800

	return (
		<div className="group relative flex flex-col items-center p-5 bg-stone-50 rounded-xl border border-amber-200 hover:border-amber-400 transition-all duration-300 hover:shadow-xs hover:shadow-amber-200/50 hover:-translate-y-1">
			{/* Hover glow effect */}
			<div className="absolute inset-0 rounded-xl bg-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

			{/* Venn diagram SVG */}
			<svg
				width="160"
				height="110"
				viewBox="0 0 100 70"
				className="relative z-10"
			>
				<defs>
					{/* Mask to exclude intersection from circle A */}
					<mask id={`maskA-${title.replace(/\s+/g, "")}`}>
						<rect width="100" height="70" fill="white" />
						<circle cx="68" cy="35" r="26" fill="black" />
					</mask>
					{/* Mask to exclude intersection from circle B */}
					<mask id={`maskB-${title.replace(/\s+/g, "")}`}>
						<rect width="100" height="70" fill="white" />
						<circle cx="32" cy="35" r="26" fill="black" />
					</mask>
					{/* Clip path for intersection (lens shape) */}
					<clipPath id={`intersection-${title.replace(/\s+/g, "")}`}>
						<circle cx="32" cy="35" r="26" />
					</clipPath>
				</defs>

				{/* Circle A - fill (with or without intersection exclusion) */}
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
					<circle
						cx="32"
						cy="35"
						r="26"
						fill={fillColor}
					/>
				)}

				{/* Circle B - fill (with or without intersection exclusion) */}
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
					<circle
						cx="68"
						cy="35"
						r="26"
						fill={fillColor}
					/>
				)}

				{/* Intersection only (without full circles) */}
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

				{/* Circle A border */}
				<circle
					cx="32"
					cy="35"
					r="26"
					fill="none"
					stroke={strokeColor}
					strokeWidth="1"
				/>

				{/* Circle B border */}
				<circle
					cx="68"
					cy="35"
					r="26"
					fill="none"
					stroke={strokeColor}
					strokeWidth="1"
				/>

				{/* Labels A and B */}
				<text x="18" y="40" fill="#78350f" fontSize="13" fontWeight="bold">
					A
				</text>
				<text x="74" y="40" fill="#78350f" fontSize="13" fontWeight="bold">
					B
				</text>
			</svg>

			{/* Join type title */}
			<h4 className="relative z-10 text-base font-semibold text-amber-900 mt-3 text-center tracking-wide group-hover:text-amber-700 transition-colors duration-300">
				{title}
			</h4>
		</div>
	);
};

/**
 * JoinsDiagram - Visual overview of SQL join types using Venn diagrams
 * Displays INNER, LEFT, RIGHT, and FULL JOIN with interactive cards
 */
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
		<div className="space-y-6">
			{/* Join types grid */}
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
				{joins.map((join, index) => (
					<JoinCard
						key={index}
						title={join.title}
						vennConfig={join.vennConfig}
					/>
				))}
			</div>

			{/* Legend */}
			<div className="flex flex-wrap gap-6 justify-center text-sm pt-4 px-4 py-3 bg-amber-50/50 rounded-lg border border-amber-200/50">
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 rounded-full bg-amber-600"></div>
					<span className="text-stone-600">Zone sélectionnée</span>
				</div>
				<div className="flex items-center gap-2">
					<span className="font-bold text-amber-900 bg-amber-100 w-6 h-6 rounded flex items-center justify-center text-xs">
						A
					</span>
					<span className="text-stone-600">Table de gauche (FROM)</span>
				</div>
				<div className="flex items-center gap-2">
					<span className="font-bold text-amber-900 bg-amber-100 w-6 h-6 rounded flex items-center justify-center text-xs">
						B
					</span>
					<span className="text-stone-600">Table de droite (JOIN)</span>
				</div>
			</div>
		</div>
	);
}
