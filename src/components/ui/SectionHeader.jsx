export default function SectionHeader({
	title,
	description,
	tag,
	tagProps,
	className = "",
	subtitle,
	subtitleClassName = "",
	descriptionClassName = "",
}) {
	const colors = tagProps?.beltColors || {};

	return (
		<header className={`relative py-20 overflow-hidden ${className}`}>
			<div className="relative">
				<div className="text-center space-y-8">
					{/* Tag badge */}
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

					{/* Title */}
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

					{/* Subtitle */}
					{subtitle && (
						<h2
							className={`text-xl sm:text-2xl font-medium text-gray-600 max-w-3xl mx-auto ${subtitleClassName}`}
						>
							{subtitle}
						</h2>
					)}

					{/* Description */}
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
