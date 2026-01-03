export default function Footer({ 
	textColor = "text-gray-600", 
	borderColor = "border-gray-600/30" 
}) {
	return (
		<footer className="relative mt-auto">
			<div className="max-w-[800px] mx-auto px-8 sm:px-10 lg:px-12 py-6">
				<div className={`border-t ${borderColor} pt-6`}>
				<div className={`text-center text-footer ${textColor} font-light tracking-wide`}>
					&copy; 2025 NoobSQL (by Saeba33) · Tous droits réservés
				</div>
				</div>
			</div>
		</footer>
	);
}
