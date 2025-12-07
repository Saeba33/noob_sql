"use client";

/**
 * JoinDiagramSingle - Displays a single SQL join type with Venn diagram visualization
 * @param {string} type - The join type: "inner", "left", "right", "full"
 */
export default function JoinDiagramSingle({ type = "inner" }) {
	const fillColor = "#d97706"; // amber-600
	const strokeColor = "#92400e"; // amber-800

	// Configuration based on join type
	const configs = {
		inner: { leftOnly: false, intersection: true, rightOnly: false },
		left: { leftOnly: true, intersection: true, rightOnly: false },
		right: { leftOnly: false, intersection: true, rightOnly: true },
		full: { leftOnly: true, intersection: true, rightOnly: true },
	};

	const vennConfig = configs[type] || configs.inner;
	const uniqueId = `single-${type}`;

	return (
		<div className="flex justify-center py-4">
			<svg width="180" height="120" viewBox="0 0 100 70">
				<defs>
					{/* Mask to exclude intersection from circle A */}
					<mask id={`maskA-${uniqueId}`}>
						<rect width="100" height="70" fill="white" />
						<circle cx="68" cy="35" r="26" fill="black" />
					</mask>
					{/* Mask to exclude intersection from circle B */}
					<mask id={`maskB-${uniqueId}`}>
						<rect width="100" height="70" fill="white" />
						<circle cx="32" cy="35" r="26" fill="black" />
					</mask>
					{/* Clip path for intersection (lens shape) */}
					<clipPath id={`intersection-${uniqueId}`}>
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
						mask={`url(#maskA-${uniqueId})`}
					/>
				)}
				{vennConfig.leftOnly && vennConfig.intersection && (
					<circle cx="32" cy="35" r="26" fill={fillColor} />
				)}

				{/* Circle B - fill (with or without intersection exclusion) */}
				{vennConfig.rightOnly && !vennConfig.intersection && (
					<circle
						cx="68"
						cy="35"
						r="26"
						fill={fillColor}
						mask={`url(#maskB-${uniqueId})`}
					/>
				)}
				{vennConfig.rightOnly && vennConfig.intersection && (
					<circle cx="68" cy="35" r="26" fill={fillColor} />
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
							clipPath={`url(#intersection-${uniqueId})`}
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
		</div>
	);
}
