export default function Footer({ 
	textColor = "text-gray-600", 
	borderColor = "border-gray-300/50" 
}) {
	return (
		<footer className="relative mt-auto">
			<div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className={`border-t ${borderColor} pt-6`}>
					<p className={`text-center text-xs sm:text-sm ${textColor} font-light tracking-wide`}>
						&copy; 2025 NoobSQL (by Saeba33) · Tous droits réservés
					</p>
				</div>
			</div>
		</footer>
	);
}
