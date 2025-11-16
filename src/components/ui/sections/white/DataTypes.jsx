import {
	MdCheckBox,
	MdInventory,
	MdKey,
	MdLink,
	MdLock,
	MdNumbers,
	MdSchedule,
	MdSecurity,
	MdSettings,
	MdStorage,
	MdTextFields,
	MdVerified,
} from "react-icons/md";

export default function DataTypes() {
	const commonDataTypes = [
		{
			category: "Nombres",
			icon: <MdNumbers className="w-6 h-6 text-gray-600" />,
			color: "gray",
			types: [
				{
					name: "INTEGER",
					description: "Nombres entiers (-2 milliards à +2 milliards)",
					examples: ["1", "42", "-15", "0"],
					usage: "Identifiants, compteurs, âges",
					bestPractice: "Utilisez AUTO_INCREMENT pour les clés primaires",
				},
				{
					name: "DECIMAL(10,2)",
					description: "Nombres décimaux précis (10 chiffres, 2 après virgule)",
					examples: ["19.99", "1500.00", "-25.50"],
					usage: "Prix, salaires, mesures précises",
					bestPractice: "Toujours pour les montants financiers",
				},
			],
		},
		{
			category: "Texte",
			icon: <MdTextFields className="w-6 h-6 text-gray-600" />,
			color: "gray",
			types: [
				{
					name: "VARCHAR(255)",
					description: "Texte variable (recommandé : max 255 caractères)",
					examples: ["'Marie Dubois'", "'contact@site.com'"],
					usage: "Noms, emails, titres, descriptions courtes",
					bestPractice: "255 = optimisation MySQL, très courante",
				},
				{
					name: "TEXT",
					description: "Texte long (jusqu'à 65 000 caractères)",
					examples: ["'Description longue...'", "'Article complet...'"],
					usage: "Articles, commentaires, descriptions détaillées",
					bestPractice: "Uniquement si vraiment nécessaire",
				},
			],
		},
		{
			category: "Dates & Heures",
			icon: <MdSchedule className="w-6 h-6 text-gray-600" />,
			color: "gray",
			types: [
				{
					name: "DATE",
					description: "Date uniquement (YYYY-MM-DD)",
					examples: ["2025-01-15", "1990-05-20"],
					usage: "Dates de naissance, échéances",
					bestPractice: "Pour les dates sans notion d'heure",
				},
				{
					name: "TIMESTAMP",
					description: "Date et heure avec fuseau horaire",
					examples: ["2025-01-15 14:30:00"],
					usage: "Logs, créations, modifications",
					bestPractice: "DEFAULT CURRENT_TIMESTAMP très utile",
				},
			],
		},
	];

	const lessCommonDataTypes = [
		{
			category: "Nombres",
			icon: <MdNumbers className="w-6 h-6 text-gray-400" />,
			color: "lightgray",
			types: [
				{
					name: "BIGINT",
					description: "Très grands nombres entiers",
					examples: ["9223372036854775807"],
					usage: "IDs très nombreux, timestamps Unix",
				},
				{
					name: "FLOAT / DOUBLE",
					description: "Nombres à virgule flottante (approximatifs)",
					examples: ["3.14159", "2.718281828"],
					usage: "Calculs scientifiques, coordonnées GPS",
				},
				{
					name: "TINYINT",
					description: "Petits entiers (-128 à 127, ou 0 à 255 si UNSIGNED)",
					examples: ["1", "0", "255"],
					usage: "Flags, petits compteurs, booléens",
				},
			],
		},
		{
			category: "Texte",
			icon: <MdTextFields className="w-6 h-6 text-gray-400" />,
			color: "lightgray",
			types: [
				{
					name: "CHAR(10)",
					description: "Texte de longueur fixe (complété par des espaces)",
					examples: ["'FR        '", "'0123456789'"],
					usage: "Codes pays, hash fixes, IDs formatés",
				},
				{
					name: "MEDIUMTEXT",
					description: "Texte moyen (jusqu'à 16 millions de caractères)",
					examples: ["'Très long contenu...'"],
					usage: "Livres, documentation extensive",
				},
				{
					name: "LONGTEXT",
					description: "Texte très long (jusqu'à 4 Go)",
					examples: ["'Contenu gigantesque...'"],
					usage: "Stockage de fichiers texte entiers",
				},
			],
		},
		{
			category: "Autres Types",
			icon: <MdCheckBox className="w-6 h-6 text-gray-400" />,
			color: "lightgray",
			types: [
				{
					name: "BOOLEAN / TINYINT(1)",
					description: "Vrai ou Faux",
					examples: ["TRUE", "FALSE", "1", "0"],
					usage: "États, validations, options actives/inactives",
				},
				{
					name: "ENUM('val1','val2')",
					description: "Liste de valeurs prédéfinies",
					examples: ["'actif'", "'inactif'", "'suspendu'"],
					usage: "Statuts, catégories fixes",
				},
				{
					name: "JSON",
					description: "Données structurées JSON",
					examples: ['\'{"nom": "Marie", "age": 30}\''],
					usage: "Configurations, métadonnées flexibles",
				},
			],
		},
	];

	const constraints = [
		{
			name: "PRIMARY KEY",
			description: "Identifiant unique de la table",
			icon: <MdKey className="w-5 h-5 text-gray-600" />,
			example: "id INTEGER PRIMARY KEY AUTO_INCREMENT",
			usage: "Une seule par table, jamais NULL, unique",
		},
		{
			name: "FOREIGN KEY",
			description: "Référence vers une autre table",
			icon: <MdLink className="w-5 h-5 text-gray-600" />,
			example: "utilisateur_id INTEGER REFERENCES utilisateurs(id)",
			usage: "Maintient l'intégrité référentielle",
		},
		{
			name: "UNIQUE",
			description: "Valeur unique dans la table",
			icon: <MdVerified className="w-5 h-5 text-gray-600" />,
			example: "email VARCHAR(255) UNIQUE",
			usage: "Emails, noms d'utilisateurs uniques",
		},
		{
			name: "NOT NULL",
			description: "Valeur obligatoire",
			icon: <MdSecurity className="w-5 h-5 text-gray-600" />,
			example: "nom VARCHAR(100) NOT NULL",
			usage: "Champs obligatoires",
		},
		{
			name: "DEFAULT",
			description: "Valeur par défaut",
			icon: <MdSettings className="w-5 h-5 text-gray-600" />,
			example: "statut VARCHAR(20) DEFAULT 'actif'",
			usage: "Valeurs automatiques à l'insertion",
		},
		{
			name: "CHECK",
			description: "Contrainte de validation",
			icon: <MdVerified className="w-5 h-5 text-gray-600" />,
			example: "age INTEGER CHECK (age >= 0 AND age <= 120)",
			usage: "Validation des données",
		},
		{
			name: "AUTO_INCREMENT",
			description: "Incrémentation automatique",
			icon: <MdNumbers className="w-5 h-5 text-gray-600" />,
			example: "id INTEGER AUTO_INCREMENT",
			usage: "IDs automatiques, commence à 1",
		},
		{
			name: "UNSIGNED",
			description: "Nombres positifs uniquement",
			icon: <MdNumbers className="w-5 h-5 text-gray-600" />,
			example: "age INTEGER UNSIGNED",
			usage: "Étend la plage de 0 à 4 milliards (au lieu de -2 à +2 milliards)",
		},
	];

	return (
		<div>
			{/* Introduction */}
			<div className="mb-8 space-y-4 text-gray-700 leading-relaxed">
				<p>
					En SQL, chaque colonne d'une table doit avoir un{" "}
					<strong>type de données</strong> qui définit le format des
					informations qu'elle peut contenir, ainsi que des{" "}
					<strong>contraintes</strong> qui garantissent l'intégrité des données.
					<br />Bien choisir les types et contraintes est crucial pour garantir la
					qualité, optimiser les performances et maintenir l'intégrité des
					données.
				</p>

				<div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
					<p className="flex justifyitems-center">
						<span>
							<MdInventory className="w-4 h-4 text-blue-600 inline mr-2" />
							<strong>Type de données</strong> = le format autorisé (nombres,
							texte, dates...)
							<br />
							<MdLock className="w-4 h-4 text-blue-600 inline mr-2" />
							<strong>Contraintes</strong> = les règles à respecter
							(obligatoire, unique, valeur par défaut...)
						</span>
					</p>
				</div>
			</div>

			{/* Types de données courants */}
			<div className="border border-gray-300 rounded-lg bg-gray-50 p-6">
				<h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
					<MdStorage className="w-6 h-6 text-gray-600 mr-3" />
					Types de données courantes
				</h2>

				<div className="grid gap-6">
					{commonDataTypes.map((category, categoryIndex) => (
						<div
							key={categoryIndex}
							className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden"
						>
							{/* En-tête de catégorie */}
							<div className="flex items-center space-x-3 mb-4 p-4 pb-0">
								{category.icon}
								<h3 className="text-lg font-bold text-gray-800">
									{category.category}
								</h3>
							</div>

							{/* Wrapper avec scroll horizontal */}
							<div className="overflow-x-auto">
								<table className="w-full min-w-[800px] border-collapse">
									<thead>
										<tr className="bg-gray-100">
											<th className="text-xs font-semibold text-gray-600 uppercase p-3 pl-5 text-left border-b border-gray-300">
												Type
											</th>
											<th className="text-xs font-semibold text-gray-600 uppercase p-3 text-left border-b border-gray-300">
												Description
											</th>
											<th className="text-xs font-semibold text-gray-600 uppercase p-3 text-left border-b border-gray-300">
												Exemples
											</th>
											<th className="text-xs font-semibold text-gray-600 uppercase p-3 text-left border-b border-gray-300">
												Utilisation
											</th>
										</tr>
									</thead>
									<tbody>
										{category.types.map((type, typeIndex) => (
											<tr
												key={typeIndex}
												className="border-b border-gray-200 hover:bg-gray-50"
											>
												<td className="p-3">
													<div className="bg-gray-100 px-2 py-1 rounded inline-block">
														<code className="font-semibold text-sm text-gray-800">
															{type.name}
														</code>
													</div>
												</td>
												<td className="p-3 text-gray-700 text-sm">
													{type.description}
												</td>
												<td className="p-3">
													<div className="flex flex-wrap gap-1">
														{type.examples.map((example, exampleIndex) => (
															<code
																key={exampleIndex}
																className="bg-gray-100 px-1 py-0.5 rounded text-xs text-gray-800"
															>
																{example}
															</code>
														))}
													</div>
												</td>
												<td className="p-3 text-gray-600 text-sm">
													{type.usage}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					))}
				</div>

				{/* Types moins courants */}
				<div className="mt-8">
					<h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
						<MdStorage className="w-6 h-6 text-gray-400 mr-3" />
						Types de données moins courantes
					</h2>

					<div className="grid gap-6">
						{lessCommonDataTypes.map((category, categoryIndex) => (
							<div
								key={categoryIndex}
								className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden"
							>
								{/* En-tête de catégorie */}
								<div className="flex items-center space-x-3 mb-4 p-4 pb-0">
									{category.icon}
									<h3 className="text-lg font-bold text-gray-800">
										{category.category}
									</h3>
								</div>

								{/* Wrapper avec scroll horizontal */}
								<div className="overflow-x-auto">
									<table className="w-full min-w-[800px] border-collapse">
										<thead>
											<tr className="bg-gray-100">
												<th className="text-xs font-semibold text-gray-600 uppercase p-3 pl-5 text-left border-b border-gray-300">
													Type
												</th>
												<th className="text-xs font-semibold text-gray-600 uppercase p-3 text-left border-b border-gray-300">
													Description
												</th>
												<th className="text-xs font-semibold text-gray-600 uppercase p-3 text-left border-b border-gray-300">
													Exemples
												</th>
												<th className="text-xs font-semibold text-gray-600 uppercase p-3 text-left border-b border-gray-300">
													Utilisation
												</th>
											</tr>
										</thead>
										<tbody>
											{category.types.map((type, typeIndex) => (
												<tr
													key={typeIndex}
													className="border-b border-gray-200 hover:bg-gray-50"
												>
													<td className="p-3">
														<div className="bg-gray-100 px-2 py-1 rounded inline-block">
															<code className="font-semibold text-sm text-gray-800">
																{type.name}
															</code>
														</div>
													</td>
													<td className="p-3 text-gray-700 text-sm">
														{type.description}
													</td>
													<td className="p-3">
														<div className="flex flex-wrap gap-1">
															{type.examples.map((example, exampleIndex) => (
																<code
																	key={exampleIndex}
																	className="bg-gray-100 px-1 py-0.5 rounded text-xs text-gray-800"
																>
																	{example}
																</code>
															))}
														</div>
													</td>
													<td className="p-3 text-gray-600 text-sm">
														{type.usage}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Section Contraintes */}
				<div className="mt-8">
					<h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
						<MdSecurity className="w-6 h-6 text-gray-600 mr-3" />
						Contraintes et options
					</h2>

					<div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
						<p className="text-gray-700 mb-6">
							Les <strong>contraintes</strong> définissent des règles que les
							données doivent respecter pour garantir l'intégrité et la
							cohérence de votre base de données.
						</p>

						<div className="grid md:grid-cols-2 gap-4">
							{constraints.map((constraint, index) => (
								<div
									key={index}
									className="bg-gray-50 border border-gray-200 rounded-lg p-4"
								>
									<div className="flex items-start space-x-3">
										<div className="flex-shrink-0 mt-1">{constraint.icon}</div>
										<div className="flex-1">
											<h4 className="font-bold text-gray-900 mb-1">
												{constraint.name}
											</h4>
											<p className="text-gray-700 text-sm mb-2">
												{constraint.description}
											</p>
											<div className="bg-gray-100 border border-gray-200 rounded p-2 mb-2">
												<code className="text-xs text-gray-800">
													{constraint.example}
												</code>
											</div>
											<p className="text-gray-600 text-xs">
												<strong>Usage :</strong> {constraint.usage}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Exemple pratique complet */}
				<div className="mt-8">
					<div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
						<div className="flex items-center space-x-2 mb-4 p-4 pb-0">
							<MdStorage className="w-5 h-5 text-gray-600" />
							<h4 className="font-bold text-gray-900">
								Exemple d'une table "utilisateurs" avec contraintes
							</h4>
						</div>

						<div className="bg-gray-50 border border-gray-200 rounded-lg overflow-x-auto m-4 mt-4">
							<table className="w-full min-w-[900px]">
								<thead>
									<tr className="bg-gray-100 border-b border-gray-300">
										<th className="p-3 text-left font-semibold text-gray-900 text-sm">
											Colonne
										</th>
										<th className="p-3 text-left font-semibold text-gray-900 text-sm">
											Type + Contraintes
										</th>
										<th className="p-3 text-left font-semibold text-gray-900 text-sm">
											Pourquoi ce choix ?
										</th>
										<th className="p-3 text-left font-semibold text-gray-900 text-sm">
											Valeur exemple
										</th>
										<th className="p-3 text-left font-semibold text-gray-900 text-sm">
											Avantages
										</th>
									</tr>
								</thead>
								<tbody>
									{[
										{
											column: "id",
											type: "INTEGER PRIMARY KEY AUTO_INCREMENT",
											reason: "Clé primaire automatique",
											example: "1, 2, 3...",
											benefit: "Unique, incrémental, performant",
										},
										{
											column: "nom",
											type: "VARCHAR(100) NOT NULL",
											reason: "Noms rarement > 100 caractères",
											example: "'Marie Dubois'",
											benefit: "Obligatoire, taille optimale",
										},
										{
											column: "email",
											type: "VARCHAR(255) UNIQUE NOT NULL",
											reason: "Standard email + unicité",
											example: "'marie@site.com'",
											benefit: "Pas de doublons, connexion unique",
										},
										{
											column: "age",
											type: "INTEGER UNSIGNED CHECK(...)",
											reason: "Âge toujours positif + validation",
											example: "30",
											benefit: "Données cohérentes",
										},
										{
											column: "salaire",
											type: "DECIMAL(10,2) DEFAULT 0.00",
											reason: "Précision financière + défaut",
											example: "3500.50",
											benefit: "Calculs exacts",
										},
										{
											column: "actif",
											type: "BOOLEAN DEFAULT TRUE",
											reason: "État actif par défaut",
											example: "TRUE",
											benefit: "Gestion des comptes",
										},
										{
											column: "date_creation",
											type: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
											reason: "Auto-remplissage à la création",
											example: "2025-01-15 14:30:00",
											benefit: "Traçabilité automatique",
										},
										{
											column: "date_naissance",
											type: "DATE NULL",
											reason: "Info optionnelle",
											example: "1990-05-20",
											benefit: "Flexibilité",
										},
										{
											column: "preferences",
											type: "JSON NULL",
											reason: "Données structurées flexibles",
											example: "{'theme': 'dark'}",
											benefit: "Extensibilité",
										},
									].map((row, index) => (
										<tr
											key={index}
											className="hover:bg-gray-50 border-b border-gray-200"
										>
											<td className="p-3 font-medium text-gray-900 text-sm">
												{row.column}
											</td>
											<td className="p-3 text-sm">
												<code className="bg-blue-100 px-2 py-1 rounded text-blue-800 text-xs">
													{row.type}
												</code>
											</td>
											<td className="p-3 text-gray-700 text-sm">
												{row.reason}
											</td>
											<td className="p-3 text-sm">
												<code className="bg-gray-100 px-2 py-1 rounded text-gray-800 text-xs">
													{row.example}
												</code>
											</td>
											<td className="p-3 text-gray-600 text-sm">
												{row.benefit}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
