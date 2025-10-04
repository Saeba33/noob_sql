export default function SectionHeader({
	title,
	description,
	tag,
	tagProps,
	className = "",
	subtitle,
	subtitleClassName = "",
	descriptionClassName = "",
	currentBelt = null,
}) {
	const colors = tagProps?.beltColors || {};

	return (
		<header
			className={`relative py-12 sm:py-16 lg:py-20 overflow-hidden ${className}`}
		>
			<div className="relative max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center space-y-8">
					{/* Tag badge - sans bordure, plus moderne */}
					{tag && (
						<div className="inline-flex items-center justify-center">
							<span
								className={`text-sm sm:text-base font-light uppercase tracking-wider ${
									colors.text || "text-gray-700"
								} opacity-90`}
							>
								{tag}
							</span>
						</div>
					)}

					{/* Titre principal - plus imposant */}
					{title && (
						<div className="space-y-3">
							<h1
								className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight ${
									colors.text || "text-gray-900"
								}`}
							>
								{title}
							</h1>
						</div>
					)}

					{/* Sous-titre */}
					{subtitle && (
						<h2
							className={`text-xl sm:text-2xl font-medium text-gray-600 max-w-3xl mx-auto ${subtitleClassName}`}
						>
							{subtitle}
						</h2>
					)}

					{/* Description - sans encadré, plus aérée */}
					{description && (
						<div className="max-w-3xl mx-auto mt-6">
							<p
								className={`text-lg sm:text-xl leading-relaxed font-light ${descriptionClassName}`}
							>
								{description}
							</p>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}
