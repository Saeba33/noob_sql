export default function SectionHeader({
	title,
	description,
	tag,
	className = "",
	descriptionClassName = "",
}) {
	return (
		<header className={`relative py-20 overflow-hidden ${className}`}>
			<div className="relative">
				<div className="text-center space-y-8">
					{/* Tag badge */}
					{tag && (
						<div className="inline-flex items-center justify-center">
							<span className="text-xs sm:text-sm font-light uppercase tracking-[0.1em] text-gray-500">
								{tag}
							</span>
						</div>
					)}

					{/* Title */}
					{title && (
						<div className="space-y-3 relative">
							<h2 className="font-extrabold leading-tight tracking-tight text-gray-900 relative inline-block">
								{title}
							</h2>
						</div>
					)}

					{/* Description */}
					{description && (
						<div className="max-w-3xl mx-auto mt-6">
							<p
								className={`text-lead leading-relaxed font-light ${descriptionClassName}`}
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
