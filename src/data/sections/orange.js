export const orangeBeltContent = {
	// Belt configuration
	belt: "orange",
	description: "Contrôle et filtrage des données",
	topics: [
		"WHERE",
		"Opérateurs de comparaison",
		"AND, OR, IN, LIKE",
		"ORDER BY",
		"NULL",
		"LIMIT, OFFSET",
	],

	// Content sections
	header: {
		title: "Filtres et Conditions",
		description: "Contrôlez et filtrez vos données avec précision",
		tag: "Ceinture Orange",
	},
	pageDescription: {
		title: "Maîtrisez le Filtrage et le Tri de vos Données",
		content:
			"La ceinture verte vous enseigne l'art du filtrage et du contrôle des données. Apprenez à utiliser WHERE pour filtrer, les opérateurs pour comparer, ORDER BY pour trier, et gérez les valeurs NULL. Ces compétences vous permettront d'extraire exactement les données dont vous avez besoin.",
	},
	accordions: [
		{
			title: "WHERE - Clause Fondamentale",
			content:
				"Filtrez vos données avec la clause WHERE, base de toute requête précise.",
			sqlQueries: [
				{
					title: "Filtrage basique par âge",
					sqlCode: `SELECT nom, email, age 
FROM utilisateurs 
WHERE age >= 18;`,
					sqlResult: [
						{ nom: "Alice Dupont", email: "alice@email.com", age: 28 },
						{ nom: "Bob Martin", email: "bob@email.com", age: 32 },
						{ nom: "David Moreau", email: "david@email.com", age: 45 },
					],
				},
				{
					title: "Filtrage par prix",
					sqlCode: `SELECT nom, prix, stock 
FROM produits 
WHERE prix > 100;`,
					sqlResult: [
						{ nom: "Ordinateur Portable", prix: 899, stock: 5 },
						{ nom: "Smartphone Pro", prix: 1299, stock: 3 },
						{ nom: "Tablette", prix: 299, stock: 8 },
					],
				},
				{
					title: "Filtrage par date",
					sqlCode: `SELECT numero_commande, client, date_commande 
FROM commandes 
WHERE date_commande = '2024-01-15';`,
					sqlResult: [
						{
							numero_commande: "CMD001",
							client: "Alice Dupont",
							date_commande: "2024-01-15",
						},
						{
							numero_commande: "CMD015",
							client: "Bob Martin",
							date_commande: "2024-01-15",
						},
					],
				},
				{
					title: "Filtrage avec calcul",
					sqlCode: `SELECT nom, age, (age * 365) AS jours_vecu 
FROM utilisateurs 
WHERE age * 365 > 10000;`,
					sqlResult: [
						{ nom: "Alice Dupont", age: 28, jours_vecu: 10220 },
						{ nom: "Bob Martin", age: 32, jours_vecu: 11680 },
						{ nom: "David Moreau", age: 45, jours_vecu: 16425 },
					],
				},
			],
			description:
				"WHERE est la clause la plus importante pour filtrer vos données. Sans elle, vous récupérez tout !",
		},
		{
			title: "Opérateurs de Comparaison",
			content:
				"Utilisez les opérateurs pour comparer et filtrer vos données avec précision.",
			sqlQueries: [
				{
					title: "Égalité exacte",
					sqlCode: `SELECT nom, age 
FROM utilisateurs 
WHERE age = 25;`,
					sqlResult: [{ nom: "Claire Durand", age: 25 }],
				},
				{
					title: "Inégalité (différent de)",
					sqlCode: `SELECT nom, age 
FROM utilisateurs 
WHERE age != 25;`,
					sqlResult: [
						{ nom: "Alice Dupont", age: 28 },
						{ nom: "Bob Martin", age: 32 },
						{ nom: "David Moreau", age: 45 },
						{ nom: "Emma Bernard", age: 30 },
					],
				},
				{
					title: "Supérieur et inférieur",
					sqlCode: `SELECT nom, prix 
FROM produits 
WHERE prix > 200 AND prix < 1000;`,
					sqlResult: [
						{ nom: "Ordinateur Portable", prix: 899 },
						{ nom: "Tablette", prix: 299 },
						{ nom: "Casque Audio", prix: 199 },
					],
				},
				{
					title: "Comparaison de texte",
					sqlCode: `SELECT nom, email 
FROM utilisateurs 
WHERE nom >= 'C' AND nom < 'E';`,
					sqlResult: [
						{ nom: "Claire Durand", email: "claire@email.com" },
						{ nom: "David Moreau", email: "david@email.com" },
					],
				},
			],
			description:
				"Les opérateurs de comparaison sont vos outils de précision pour extraire exactement ce que vous cherchez.",
		},
		{
			title: "Opérateurs Logiques",
			content:
				"Combinez et affinez vos conditions avec AND, OR, IN, LIKE et BETWEEN.",
			sqlQueries: [
				{
					title: "AND - Toutes les conditions",
					sqlCode: `SELECT nom, age, email 
FROM utilisateurs 
WHERE age >= 25 AND age <= 35 AND email IS NOT NULL;`,
					sqlResult: [
						{ nom: "Alice Dupont", age: 28, email: "alice@email.com" },
						{ nom: "Bob Martin", age: 32, email: "bob@email.com" },
						{ nom: "Claire Durand", age: 25, email: "claire@email.com" },
						{ nom: "Emma Bernard", age: 30, email: "emma@email.com" },
					],
				},
				{
					title: "OR - Au moins une condition",
					sqlCode: `SELECT nom, categorie, prix 
FROM produits 
WHERE categorie = 'electronique' OR prix < 100;`,
					sqlResult: [
						{
							nom: "Ordinateur Portable",
							categorie: "electronique",
							prix: 899,
						},
						{ nom: "Livre SQL", categorie: "livre", prix: 25 },
						{ nom: "Smartphone Pro", categorie: "electronique", prix: 1299 },
						{ nom: "Stylo", categorie: "bureau", prix: 5 },
					],
				},
				{
					title: "IN - Valeurs dans une liste",
					sqlCode: `SELECT nom, age 
FROM utilisateurs 
WHERE age IN (25, 30, 35, 40);`,
					sqlResult: [
						{ nom: "Claire Durand", age: 25 },
						{ nom: "Emma Bernard", age: 30 },
					],
				},
				{
					title: "LIKE - Correspondance de motif",
					sqlCode: `SELECT nom, email 
FROM utilisateurs 
WHERE email LIKE '%@email.com';`,
					sqlResult: [
						{ nom: "Alice Dupont", email: "alice@email.com" },
						{ nom: "Bob Martin", email: "bob@email.com" },
						{ nom: "Claire Durand", email: "claire@email.com" },
						{ nom: "David Moreau", email: "david@email.com" },
						{ nom: "Emma Bernard", email: "emma@email.com" },
					],
				},
				{
					title: "BETWEEN - Intervalle de valeurs",
					sqlCode: `SELECT nom, prix 
FROM produits 
WHERE prix BETWEEN 200 AND 800;`,
					sqlResult: [
						{ nom: "Tablette", prix: 299 },
						{ nom: "Casque Audio", prix: 199 },
						{ nom: "Montre Connectée", prix: 249 },
					],
				},
			],
			description:
				"Les opérateurs logiques vous permettent de créer des filtres complexes et précis.",
		},
		{
			title: "ORDER BY - Tri des Résultats",
			content: "Triez vos résultats dans l'ordre qui vous convient.",
			sqlQueries: [
				{
					title: "Tri croissant par âge",
					sqlCode: `SELECT nom, age 
FROM utilisateurs 
ORDER BY age ASC;`,
					sqlResult: [
						{ nom: "Claire Durand", age: 25 },
						{ nom: "Alice Dupont", age: 28 },
						{ nom: "Emma Bernard", age: 30 },
						{ nom: "Bob Martin", age: 32 },
						{ nom: "David Moreau", age: 45 },
					],
				},
				{
					title: "Tri décroissant par prix",
					sqlCode: `SELECT nom, prix 
FROM produits 
ORDER BY prix DESC;`,
					sqlResult: [
						{ nom: "Smartphone Pro", prix: 1299 },
						{ nom: "Ordinateur Portable", prix: 899 },
						{ nom: "Tablette", prix: 299 },
						{ nom: "Montre Connectée", prix: 249 },
						{ nom: "Casque Audio", prix: 199 },
					],
				},
				{
					title: "Tri sur plusieurs colonnes",
					sqlCode: `SELECT nom, age, ville 
FROM utilisateurs 
ORDER BY ville ASC, age DESC;`,
					sqlResult: [
						{ nom: "David Moreau", age: 45, ville: "Lyon" },
						{ nom: "Bob Martin", age: 32, ville: "Paris" },
						{ nom: "Alice Dupont", age: 28, ville: "Paris" },
						{ nom: "Emma Bernard", age: 30, ville: "Toulouse" },
						{ nom: "Claire Durand", age: 25, ville: "Toulouse" },
					],
				},
			],
			description:
				"ORDER BY organise vos résultats. Indispensable pour une présentation claire des données.",
		},
		{
			title: "NULL - Gestion des Valeurs Nulles",
			content: "Gérez les valeurs manquantes avec IS NULL et IS NOT NULL. ⚠️ Important : NULL comme valeur (absence de données) est différent de NULL comme type de colonne (accepte ou non les valeurs NULL, défini avec NOT NULL lors de la création en Ceinture Jaune).",
			sqlQueries: [
				{
					title: "Rechercher les valeurs NULL",
					sqlCode: `SELECT nom, telephone 
FROM utilisateurs 
WHERE telephone IS NULL;`,
					sqlResult: [
						{ nom: "Claire Durand", telephone: null },
						{ nom: "Emma Bernard", telephone: null },
					],
				},
				{
					title: "Rechercher les valeurs non NULL",
					sqlCode: `SELECT nom, telephone 
FROM utilisateurs 
WHERE telephone IS NOT NULL;`,
					sqlResult: [
						{ nom: "Alice Dupont", telephone: "06 12 34 56 78" },
						{ nom: "Bob Martin", telephone: "07 98 76 54 32" },
						{ nom: "David Moreau", telephone: "06 11 22 33 44" },
					],
				},
				{
					title: "Remplacer NULL par une valeur",
					sqlCode: `SELECT nom, COALESCE(telephone, 'Non renseigné') AS contact 
FROM utilisateurs;`,
					sqlResult: [
						{ nom: "Alice Dupont", contact: "06 12 34 56 78" },
						{ nom: "Bob Martin", contact: "07 98 76 54 32" },
						{ nom: "Claire Durand", contact: "Non renseigné" },
						{ nom: "David Moreau", contact: "06 11 22 33 44" },
						{ nom: "Emma Bernard", contact: "Non renseigné" },
					],
				},
				{
					title: "Conditions avec NULL",
					sqlCode: `SELECT nom, age 
FROM utilisateurs 
WHERE age > 25 OR age IS NULL;`,
					sqlResult: [
						{ nom: "Alice Dupont", age: 28 },
						{ nom: "Bob Martin", age: 32 },
						{ nom: "David Moreau", age: 45 },
						{ nom: "Emma Bernard", age: 30 },
					],
				},
			],
			description:
				"NULL représente l'absence de valeur. Attention : NULL = NULL est toujours FALSE !",
		},
		{
			title: "LIMIT et OFFSET - Pagination",
			content: "Contrôlez le nombre de résultats et implémentez la pagination.",
			sqlQueries: [
				{
					title: "Limiter le nombre de résultats",
					sqlCode: `SELECT nom, email 
FROM utilisateurs 
LIMIT 3;`,
					sqlResult: [
						{ nom: "Alice Dupont", email: "alice@email.com" },
						{ nom: "Bob Martin", email: "bob@email.com" },
						{ nom: "Claire Durand", email: "claire@email.com" },
					],
				},
				{
					title: "Pagination - Page 2",
					sqlCode: `SELECT nom, email 
FROM utilisateurs 
ORDER BY nom 
LIMIT 2 OFFSET 2;`,
					sqlResult: [
						{ nom: "Claire Durand", email: "claire@email.com" },
						{ nom: "David Moreau", email: "david@email.com" },
					],
				},
				{
					title: "Top 3 des produits les plus chers",
					sqlCode: `SELECT nom, prix 
FROM produits 
ORDER BY prix DESC 
LIMIT 3;`,
					sqlResult: [
						{ nom: "Smartphone Pro", prix: 1299 },
						{ nom: "Ordinateur Portable", prix: 899 },
						{ nom: "Tablette", prix: 299 },
					],
				},
				{
					title: "Pagination efficace",
					sqlCode: `SELECT nom, age 
FROM utilisateurs 
WHERE age > 25 
ORDER BY nom 
LIMIT 2 OFFSET 0;`,
					sqlResult: [
						{ nom: "Alice Dupont", age: 28 },
						{ nom: "Bob Martin", age: 32 },
					],
				},
			],
			description:
				"LIMIT et OFFSET sont essentiels pour la pagination et l'optimisation des performances sur grandes tables.",
		},
	],
};
