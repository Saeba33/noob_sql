import { MdKey, MdLink } from "react-icons/md";
import { IoMdInformation } from "react-icons/io";

export default function PrimaryForeignKeys() {
	return (
		<div className="space-y-8">
			{/* Introduction */}
			<div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
				<p className="text-gray-700 leading-relaxed">
					Dans une base de données relationnelle, il existe <strong>deux types de clés</strong> essentielles : les <strong>clés primaires</strong> qui identifient de manière unique chaque ligne, et les <strong>clés étrangères</strong> qui créent des relations entre les tables.
				</p>
			</div>

			{/* Les deux types de clés */}
			<div className="grid md:grid-cols-2 gap-6">
				{/* Clés Primaires */}
				<div className="bg-white rounded-lg border border-gray-200 p-6">
					<div className="flex items-center gap-3 mb-4">
						<MdKey className="w-8 h-8 text-blue-600" />
						<h3 className="text-xl font-bold text-gray-900">
							Clé Primaire (PRIMARY KEY)
						</h3>
					</div>

					<div className="space-y-3">
						<p className="text-gray-700">
							Identifiant <strong>unique</strong> de chaque ligne dans une table.
						</p>
						<ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
							<li>Toujours unique</li>
							<li>Ne peut jamais être NULL</li>
							<li>Ne doit pas changer</li>
							<li>Une seule par table</li>
						</ul>
					</div>
				</div>

				{/* Clés Étrangères */}
				<div className="bg-white rounded-lg border border-gray-200 p-6">
					<div className="flex items-center gap-3 mb-4">
						<MdLink className="w-8 h-8 text-green-600" />
						<h3 className="text-xl font-bold text-gray-900">
							Clé Étrangère (FOREIGN KEY)
						</h3>
					</div>

					<div className="space-y-3">
						<p className="text-gray-700">
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

			{/* Application concrète avec exemple des tables ci-dessus */}
			<div className="bg-white border border-gray-300 rounded-lg p-6">
				<h3 className="text-xl font-bold text-gray-900 mb-4">
					Comment les Relations Fonctionnent
				</h3>

				<p className="text-gray-700 mb-4">
					En prenant pour exemple les tables vues dans l'accordéon précédent :
				</p>

				<div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-4">
					<ul className="space-y-2 text-gray-800">
						<li>
							<code className="bg-white px-2 py-1 rounded font-mono text-sm">utilisateur_id</code> dans <strong>emprunts</strong> → <code className="bg-white px-2 py-1 rounded font-mono text-sm">id</code> dans <strong>utilisateurs</strong>
						</li>
						<li>
							<code className="bg-white px-2 py-1 rounded font-mono text-sm">livre_id</code> dans <strong>emprunts</strong> → <code className="bg-white px-2 py-1 rounded font-mono text-sm">id</code> dans <strong>livres</strong>
						</li>
					</ul>
				</div>

		<div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
			<p className="text-gray-700 mb-3">
				Exemple : à partir de la ligne 1 de la table emprunts, on peut voir que :
			</p>
			<div className="space-y-2 text-gray-800 text-sm">
					<p>
						<code className="bg-white px-2 py-1 rounded font-mono text-sm">utilisateur_id = 1</code> → <strong>Marie Dubois</strong>
					</p>
					<p>
						<code className="bg-white px-2 py-1 rounded font-mono text-sm">livre_id = 1</code> → <strong>"Le Petit Prince"</strong>
					</p>
					<div className="mt-3 pt-3 border-t border-gray-300">
					<p className="text-gray-900 font-semibold flex items-center gap-2">
						<IoMdInformation className="w-7 h-7 text-blue-600" /> Ainsi, on sait que Marie Dubois a emprunté "Le Petit Prince" le 10 janvier 2025 et l'a rendu le 24 janvier.
					</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
