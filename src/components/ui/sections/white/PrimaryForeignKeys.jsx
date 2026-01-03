"use client";

import { MdKey, MdLink } from "react-icons/md";

export default function PrimaryForeignKeys() {
	return (
		<div className="space-y-8">
			{/* Introductory section */}
			<div className="bg-blue-50 border-l-4 border-blue-500 p-4 ">
				<p className="text-body text-gray-700 leading-relaxed">
					Dans une base de données relationnelle, il existe deux types de clés
					essentielles : les <strong>clés primaires</strong> qui identifient de
					manière unique chaque ligne, et les <strong>clés étrangères</strong>{" "}
					qui créent des relations entre les tables.
				</p>
			</div>

			{/* The two key types */}
			<div className="grid md:grid-cols-2 gap-6">
				{/* Primary Keys */}
				<div className="bg-white squircle border border-gray-200 p-6">
					<div className="flex items-center gap-3 mb-4">
						<MdKey className="w-8 h-8 min-w-[32px] text-yellow-600" />
					<h5 className="font-bold text-gray-900">
						Clé Primaire (PRIMARY KEY)
					</h5>
				</div>

				<div className="space-y-3">
					<p className="text-body text-gray-700">
						Identifiant <strong>unique</strong> de chaque ligne dans une
						table.
					</p>
					<ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
						<li>Toujours unique</li>
						<li>Ne peut jamais être NULL</li>
						<li>Ne doit pas changer</li>
						<li>Une seule par table</li>
					</ul>
				</div>
			</div>

			{/* Foreign Keys */}
			<div className="bg-white squircle border border-gray-200 p-6">
				<div className="flex items-center gap-3 mb-4">
					<MdLink className="w-8 h-8 min-w-[32px] text-red-600 opacity-80" />
					<h5 className="font-bold text-gray-900">
						Clé Étrangère (FOREIGN KEY)
					</h5>
				</div>

				<div className="space-y-3">
					<p className="text-body text-gray-700">
						Référence vers la clé primaire d'une <strong>autre table</strong>.
					</p>
					<ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
						<li>Crée un lien entre tables</li>
						<li>Garantit l'intégrité des données</li>
						<li>Empêche les relations invalides</li>
						<li>Maintient la cohérence</li>
					</ul>
				</div>
			</div>
		</div>

		{/* Example */}
		<div className="bg-white border border-gray-300 squircle p-6">
			<h5 className="font-bold text-gray-900 mb-4">
				Comment les relations fonctionnent ?
			</h5>

			<p className="text-body text-gray-700 mb-2">
				En prenant pour exemple les tables vues dans la section précédente :
			</p>

			<div className="mb-8">
				<ul className="space-y-2 text-gray-800">
						<li>
							<code className="bg-gray-100 px-2 py-1 squircle-sm font-mono text-sm">
								utilisateur_id
							</code>{" "}
							dans la table <strong>emprunts</strong> fait référence à{" "}
							<code className="bg-gray-100 px-2 py-1 squircle-sm font-mono text-sm">
								id
							</code>{" "}
							de la table <strong>utilisateurs</strong>
						</li>
						<li>
							<code className="bg-gray-100 px-2 py-1 squircle-sm font-mono text-sm">
								livre_id
							</code>{" "}
							dans la table <strong>emprunts</strong> fait référence à{" "}
							<code className="bg-gray-100 px-2 py-1 squircle-sm font-mono text-sm">
								id
							</code>{" "}
							de la table <strong>livres</strong>
						</li>
					</ul>
				</div>

				<div className="bg-gray-100 border border-gray-200 p-4 squircle">
					<p className="text-body text-gray-700 mb-3">
						Si on prend pour exemple la ligne 1 de la table emprunts, on peut
						voir que :
					</p>
					<div className="space-y-2 text-gray-800 text-sm">
						<p className="text-body">
							<code className="bg-white px-2 py-1 squircle-sm font-mono text-sm">
								utilisateur_id = 1
							</code>{" "}
							correspond à{" "}
							<code className="bg-white px-2 py-1 squircle-sm font-mono text-sm">
								Marie Dubois
							</code>
						</p>
						<p className="text-body mb-4">
							<code className="bg-white px-2 py-1 squircle-sm font-mono text-sm">
								livre_id = 1
							</code>{" "}
							correspond à{" "}
							<code className="bg-white px-2 py-1 squircle-sm font-mono text-sm">
								Le Petit Prince
							</code>
						</p>
						<div className="mt-3 pt-3 border-t border-gray-300">
							<p className="text-body text-gray-800 italic flex items-center gap-2 pl-1">
								Par conséquent, on peut déterminer que Marie Dubois a emprunté
								"Le Petit Prince" le 10 janvier 2025 et l'a rendu le 24 janvier
								2025.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
