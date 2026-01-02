import { MdClose } from "react-icons/md";
import { sqlSyntaxConfig } from "@/config/sql-syntax";

export default function SQLLegend({ variant = "default", onClose }) {
	// Generate legend items from config, filtering only those to show
	const legendItems = Object.entries(sqlSyntaxConfig.types)
		.filter(([_, config]) => config.showInLegend)
		.map(([type, config]) => ({
			color: config.color,
			label: config.label,
			type: type,
		}));

	// Variant compact pour modal
	if (variant === "popover") {
		return (
			<div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl w-80">
				{/* Header avec titre et croix */}
				<div className="flex items-center justify-between px-5 py-4 border-b border-gray-600">
					<h4 className="text-white">
						Coloration syntaxique
					</h4>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-700 rounded"
						aria-label="Fermer"
					>
						<MdClose className="w-5 h-5" />
					</button>
				</div>
				
				{/* Content */}
				<div className="px-5 py-4">
					<div className="space-y-3">
						{legendItems.map((item, index) => (
							<div key={index} className="flex items-center gap-3">
								<span className={`${item.color} font-mono font-semibold text-lg`}>
									●
								</span>
								<span className="text-gray-300 text-sm">{item.label}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}

	// Variant default (pour accordéon ou autre usage)
	return (
		<div className="space-y-3">
			{legendItems.map((item, index) => (
				<div key={index} className="flex items-start gap-3">
					<span className={`${item.color} font-mono font-semibold text-xl`}>
						●
					</span>
					<div className="flex-1">
						<h6 className="font-semibold text-gray-800 mb-1">{item.label}</h6>
						<p className="text-gray-600 text-sm font-mono">{item.examples}</p>
					</div>
				</div>
			))}
		</div>
	);
}
