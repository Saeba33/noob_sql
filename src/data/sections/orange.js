const menu = {
	description: "Contrôle et filtrage des données",
	topics: [
		"Données de référence",
		"WHERE",
		"Opérateurs de comparaison",
		"Opérateurs logiques",
		"LIKE",
		"ORDER BY",
		"NULL",
		"LIMIT, OFFSET",
	],
};

const header = {
	tag: "Ceinture Orange",
	title: "Filtres et Conditions",
	description:
		"La ceinture orange vous enseigne l'art du filtrage et du contrôle des données. Apprenez à utiliser WHERE pour filtrer, les opérateurs pour comparer, ORDER BY pour trier, et gérez les valeurs NULL. Ces compétences vous permettront d'extraire exactement les données dont vous avez besoin.",
};

const accordions = [
	{
		title: "Données de référence",
		content:
			"Voici les tables utilisées dans les exemples de cette section. Consultez-les pour mieux comprendre les résultats des requêtes.",
		sqlQueries: [
			{
				title: "Table utilisateurs",
				sqlCode: `SELECT * FROM utilisateurs;`,
				sqlResult: [
					{
						id: 1,
						prenom: "Alice",
						nom: "Dupont",
						email: "alice@email.com",
						age: 28,
						ville: "Paris",
						telephone: "06 12 34 56 78",
					},
					{
						id: 2,
						prenom: "Bob",
						nom: "Martin",
						email: "bob@gmail.com",
						age: 32,
						ville: "Paris",
						telephone: "07 98 76 54 32",
					},
					{
						id: 3,
						prenom: "Claire",
						nom: "Durand",
						email: "claire@email.com",
						age: 25,
						ville: "Toulouse",
						telephone: null,
					},
					{
						id: 4,
						prenom: "David",
						nom: "Moreau",
						email: "david@email.com",
						age: 45,
						ville: "Lyon",
						telephone: "06 11 22 33 44",
					},
					{
						id: 5,
						prenom: "Emma",
						nom: "Bernard",
						email: "emma@email.com",
						age: 30,
						ville: "Toulouse",
						telephone: null,
					},
					{
						id: 6,
						prenom: "François",
						nom: "Petit",
						email: "francois@email.com",
						age: 25,
						ville: "Paris",
						telephone: null,
					},
				],
			},
			{
				title: "Table produits",
				sqlCode: `SELECT * FROM produits;`,
				sqlResult: [
					{
						id: 1,
						nom: "Ordinateur Portable",
						categorie: "electronique",
						prix: 899,
						stock: 15,
					},
					{
						id: 2,
						nom: "Smartphone Pro",
						categorie: "electronique",
						prix: 1299,
						stock: 8,
					},
					{
						id: 3,
						nom: "Tablette",
						categorie: "electronique",
						prix: 299,
						stock: 20,
					},
					{
						id: 4,
						nom: "Casque Audio",
						categorie: "electronique",
						prix: 249,
						stock: 30,
					},
					{
						id: 5,
						nom: "Montre Connectée",
						categorie: "electronique",
						prix: 349,
						stock: 12,
					},
					{ id: 6, nom: "Livre SQL", categorie: "livre", prix: 25, stock: 50 },
					{ id: 7, nom: "Stylo", categorie: "bureau", prix: 5, stock: 200 },
					{
						id: 8,
						nom: "Peluche Pikachu",
						categorie: "jouet",
						prix: 29,
						stock: 25,
					},
				],
			},
			{
				title: "Table commandes",
				sqlCode: `SELECT * FROM commandes;`,
				sqlResult: [
					{
						id: 1,
						numero_commande: "CMD001",
						utilisateur_id: 4,
						date_commande: "2023-11-20 09:15:00",
						montant: 549,
					},
					{
						id: 2,
						numero_commande: "CMD002",
						utilisateur_id: 1,
						date_commande: "2024-01-15 10:30:00",
						montant: 899,
					},
					{
						id: 3,
						numero_commande: "CMD003",
						utilisateur_id: 2,
						date_commande: "2024-01-15 14:45:00",
						montant: 324,
					},
					{
						id: 4,
						numero_commande: "CMD004",
						utilisateur_id: 1,
						date_commande: "2024-02-10 16:20:00",
						montant: 1299,
					},
				],
			},
		],
	},
	{
		title: "WHERE - Clause fondamentale",
		content:
			"WHERE est la clause qui permet de filtrer les lignes d'une requête. Elle s'écrit après FROM et avant ORDER BY. WHERE permet de ne récupérer que les lignes qui correspondent à une condition. Sans WHERE, toutes les lignes de la table seraient retournées.",
		sqlCode: `-- Structure d'une requête avec WHERE
SELECT nom_des_colonnes          -- Quelles colonnes afficher
FROM nom_de_la_table             -- Dans quelle table chercher
WHERE condition;                 -- Quelles lignes garder

-- Exemple : afficher le nom et l'âge de tous les utilisateurs qui ont plus de 18 ans
SELECT nom, age
FROM utilisateurs
WHERE age > 18;

-- Sans WHERE : cela affiche toutes les lignes de la table utilisateurs
SELECT nom, age
FROM utilisateurs;`,
	},
	{
		title: "Opérateurs de comparaison",
		content:
			"Les opérateurs de comparaison permettent de filtrer les résultats de la requêtes selon les valeurs qui y sont associées. Ils fonctionnent avec les nombres, les textes (ordre alphabétique) et les dates.",
		sqlQueries: [
			{
				sqlCode: `-- Liste des utilisateurs qui ont exactement 25 ans / opérateur =
SELECT prenom, nom, age 
FROM utilisateurs 
WHERE age = 25;`,
				sqlResult: [
					{ prenom: "Claire", nom: "Durand", age: 25 },
					{ prenom: "François", nom: "Petit", age: 25 },
				],
			},
			{
				sqlCode: `-- Liste des utilisateurs qui ont un âge différent de 25 ans / opérateur != ou <> 
SELECT prenom, nom, age 
FROM utilisateurs 
WHERE age != 25;`,
				sqlResult: [
					{ prenom: "Alice", nom: "Dupont", age: 28 },
					{ prenom: "Bob", nom: "Martin", age: 32 },
					{ prenom: "David", nom: "Moreau", age: 45 },
					{ prenom: "Emma", nom: "Bernard", age: 30 },
				],
			},
			{
				sqlCode: `-- Liste des produits qui ont un prix strictement inférieur à 100 euros / opérateur <
SELECT nom, prix 
FROM produits 
WHERE prix < 100;`,
				sqlResult: [
					{ nom: "Livre SQL", prix: 25 },
					{ nom: "Stylo", prix: 5 },
					{ nom: "Peluche Pikachu", prix: 29 },
				],
			},
			{
				sqlCode: `-- Liste des produits qui ont un prix inférieur ou égal à 25 euros / opérateur <=
SELECT nom, prix 
FROM produits 
WHERE prix <= 25;`,
				sqlResult: [
					{ nom: "Livre SQL", prix: 25 },
					{ nom: "Stylo", prix: 5 },
				],
			},
			{
				sqlCode: `-- Liste des produits qui ont un prix strictement supérieur à 500 euros / opérateur >
SELECT nom, prix 
FROM produits 
WHERE prix > 500;`,
				sqlResult: [
					{ nom: "Ordinateur Portable", prix: 899 },
					{ nom: "Smartphone Pro", prix: 1299 },
				],
			},
			{
				sqlCode: `-- Liste des utilisateurs qui ont 25 ans ou moins / opérateur <=
SELECT prenom, nom, email, age 
FROM utilisateurs 
WHERE age <= 25;`,
				sqlResult: [
					{
						prenom: "Claire",
						nom: "Durand",
						email: "claire@email.com",
						age: 25,
					},
					{
						prenom: "François",
						nom: "Petit",
						email: "francois@email.com",
						age: 25,
					},
				],
			},
			{
				sqlCode: `-- Liste des utilisateurs dont le prénom commence par D ou après dans l'alphabet / opérateur >=
SELECT prenom, nom 
FROM utilisateurs 
WHERE prenom >= 'D';`,
				sqlResult: [
					{ prenom: "David", nom: "Moreau" },
					{ prenom: "Emma", nom: "Bernard" },
					{ prenom: "François", nom: "Petit" },
				],
			},
			{
				sqlCode: `-- Liste des commandes avec une date supérieure au 01 janvier 2024
SELECT numero_commande, date_commande 
FROM commandes 
WHERE date_commande > '2024-01-01';`,
				sqlResult: [
					{ numero_commande: "CMD002", date_commande: "2024-01-15 10:30:00" },
					{ numero_commande: "CMD003", date_commande: "2024-01-15 14:45:00" },
					{ numero_commande: "CMD004", date_commande: "2024-02-10 16:20:00" },
				],
			},
		],
	},
	{
		title: "Opérateurs logiques",
		content:
			"Combinez et affinez vos conditions avec AND, OR, IN, LIKE et BETWEEN.",
		sqlQueries: [
			{
				sqlCode: `-- Liste des utilisateurs entre 25 et 35 ans (inclus)
SELECT prenom, nom, age 
FROM utilisateurs 
WHERE age >= 25 AND age <= 35;`,
				sqlResult: [
					{ prenom: "Alice", nom: "Dupont", age: 28 },
					{ prenom: "Bob", nom: "Martin", age: 32 },
					{ prenom: "Claire", nom: "Durand", age: 25 },
					{ prenom: "Emma", nom: "Bernard", age: 30 },
					{ prenom: "François", nom: "Petit", age: 25 },
				],
			},
			{
				sqlCode: `-- Liste des produits de catégorie "electronique" OU dont le prix est inférieur à 100€
SELECT nom, categorie, prix 
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
					{ nom: "Peluche Pikachu", categorie: "jouet", prix: 29 },
				],
			},
			{
				sqlCode: `-- Liste des utilisateurs dont l'âge est exactement 25, 30, 35 ou 40 ans
SELECT prenom, nom, age 
FROM utilisateurs 
WHERE age IN (25, 30, 35, 40);`,
				sqlResult: [
					{ prenom: "Claire", nom: "Durand", age: 25 },
					{ prenom: "Emma", nom: "Bernard", age: 30 },
					{ prenom: "François", nom: "Petit", age: 25 },
				],
			},
			{
				sqlCode: `-- Liste de tous les utilisateurs dont l'email se termine par '@email.com'
SELECT prenom, nom, email 
FROM utilisateurs 
WHERE email LIKE '%@email.com';`,
				sqlResult: [
					{ prenom: "Alice", nom: "Dupont", email: "alice@email.com" },
					{ prenom: "Claire", nom: "Durand", email: "claire@email.com" },
					{ prenom: "David", nom: "Moreau", email: "david@email.com" },
					{ prenom: "Emma", nom: "Bernard", email: "emma@email.com" },
					{ prenom: "François", nom: "Petit", email: "francois@email.com" },
				],
			},
			{
				sqlCode: `-- Liste des produits dont le prix est compris entre 200€ et 800€ (inclus)
SELECT nom, prix 
FROM produits 
WHERE prix BETWEEN 200 AND 800;`,
				sqlResult: [
					{ nom: "Tablette", prix: 299 },
					{ nom: "Casque Audio", prix: 249 },
					{ nom: "Montre Connectée", prix: 349 },
				],
			},
		],
	},
	{
		title: "LIKE - Recherche par motif",
		content:
			"LIKE permet de filtrer avec des motifs de texte. Deux caractères spéciaux : % (n'importe quelle séquence de caractères) et _ (exactement un caractère). Note : la sensibilité à la casse dépend du SGBD (MySQL : insensible, PostgreSQL : sensible - utiliser ILIKE pour insensible).",
		sqlQueries: [
			{
				title: "Commence par (préfixe)",
				sqlCode: `-- Tous les prénoms qui commencent par 'A'
SELECT prenom, nom 
FROM utilisateurs 
WHERE prenom LIKE 'A%';`,
				sqlResult: [{ prenom: "Alice", nom: "Dupont" }],
			},
			{
				title: "Finit par (suffixe)",
				sqlCode: `-- Tous les noms qui finissent par 'and'
SELECT prenom, nom 
FROM utilisateurs 
WHERE nom LIKE '%and';`,
				sqlResult: [
					{ prenom: "Claire", nom: "Durand" },
				],
			},
			{
				title: "Contient",
				sqlCode: `-- Tous les noms qui contiennent 'ar'
SELECT prenom, nom 
FROM utilisateurs 
WHERE nom LIKE '%ar%';`,
				sqlResult: [
					{ prenom: "Bob", nom: "Martin" },
					{ prenom: "Emma", nom: "Bernard" },
				],
			},
			{
				title: "Un seul caractère (_)",
				sqlCode: `-- Prénoms de exactement 5 lettres commençant par 'A'
SELECT prenom, nom 
FROM utilisateurs 
WHERE prenom LIKE 'A____';`,
				sqlResult: [{ prenom: "Alice", nom: "Dupont" }],
			},
			{
				title: "Combinaison de % et _",
				sqlCode: `-- Prénoms dont la 2ème lettre est 'a'
SELECT prenom, nom 
FROM utilisateurs 
WHERE prenom LIKE '_a%';`,
				sqlResult: [{ prenom: "David", nom: "Moreau" }],
			},
			{
				title: "NOT LIKE (exclusion)",
				sqlCode: `-- Tous les utilisateurs dont le prénom ne commence PAS par 'A'
SELECT prenom, nom 
FROM utilisateurs 
WHERE prenom NOT LIKE 'A%';`,
				sqlResult: [
					{ prenom: "Bob", nom: "Martin" },
					{ prenom: "Claire", nom: "Durand" },
					{ prenom: "David", nom: "Moreau" },
					{ prenom: "Emma", nom: "Bernard" },
					{ prenom: "François", nom: "Petit" },
				],
			},
		],
	},
	{
		title: "ORDER BY - Tri des résultats",
		content: "Triez vos résultats dans l'ordre qui vous convient.",
		sqlQueries: [
			{
				sqlCode: `-- Liste de tous les utilisateurs triés par âge croissant (du plus jeune au plus âgé)
SELECT prenom, nom, age 
FROM utilisateurs 
ORDER BY age ASC;`,
				sqlResult: [
					{ prenom: "Claire", nom: "Durand", age: 25 },
					{ prenom: "François", nom: "Petit", age: 25 },
					{ prenom: "Alice", nom: "Dupont", age: 28 },
					{ prenom: "Emma", nom: "Bernard", age: 30 },
					{ prenom: "Bob", nom: "Martin", age: 32 },
					{ prenom: "David", nom: "Moreau", age: 45 },
				],
			},
			{
				sqlCode: `-- Liste de tous les produits triés par prix décroissant (du plus cher au moins cher)
SELECT nom, prix 
FROM produits 
ORDER BY prix DESC;`,
				sqlResult: [
					{ nom: "Smartphone Pro", prix: 1299 },
					{ nom: "Ordinateur Portable", prix: 899 },
					{ nom: "Montre Connectée", prix: 349 },
					{ nom: "Tablette", prix: 299 },
					{ nom: "Casque Audio", prix: 249 },
					{ nom: "Peluche Pikachu", prix: 29 },
					{ nom: "Livre SQL", prix: 25 },
					{ nom: "Stylo", prix: 5 },
				],
			},
			{
				sqlCode: `-- Liste de tous les utilisateurs triés par ville (A-Z) puis par âge décroissant
SELECT prenom, nom, age, ville 
FROM utilisateurs 
ORDER BY ville ASC, age DESC;`,
				sqlResult: [
					{ prenom: "David", nom: "Moreau", age: 45, ville: "Lyon" },
					{ prenom: "Bob", nom: "Martin", age: 32, ville: "Paris" },
					{ prenom: "Alice", nom: "Dupont", age: 28, ville: "Paris" },
					{ prenom: "François", nom: "Petit", age: 25, ville: "Paris" },
					{ prenom: "Emma", nom: "Bernard", age: 30, ville: "Toulouse" },
					{ prenom: "Claire", nom: "Durand", age: 25, ville: "Toulouse" },
				],
			},
		],
	},
	{
		title: "NULL - Gestion des valeurs nulles",
		content:
			"Gérez les valeurs manquantes avec IS NULL et IS NOT NULL. Important : NULL comme valeur (absence de données) est différent de NULL comme type de colonne (Abordé en ceinture Ceinture Jaune).",
		sqlQueries: [
			{
				sqlCode: `-- Liste de tous les utilisateurs n'ayant pas de numéro de téléphone
SELECT prenom, nom, telephone 
FROM utilisateurs 
WHERE telephone IS NULL;`,
				sqlResult: [
					{ prenom: "Claire", nom: "Durand", telephone: null },
					{ prenom: "Emma", nom: "Bernard", telephone: null },
					{ prenom: "François", nom: "Petit", telephone: null },
				],
			},
			{
				sqlCode: `-- Liste de tous les utilisateurs ayant un numéro de téléphone renseigné
SELECT prenom, nom, telephone 
FROM utilisateurs 
WHERE telephone IS NOT NULL;`,
				sqlResult: [
					{ prenom: "Alice", nom: "Dupont", telephone: "06 12 34 56 78" },
					{ prenom: "Bob", nom: "Martin", telephone: "07 98 76 54 32" },
					{ prenom: "David", nom: "Moreau", telephone: "06 11 22 33 44" },
				],
			},
			{
				sqlCode: `-- Liste de tous les utilisateurs avec remplacement des téléphones NULL par 'Non renseigné'
SELECT prenom, nom, COALESCE(telephone, 'Non renseigné') AS contact 
FROM utilisateurs;`,
				sqlResult: [
					{ prenom: "Alice", nom: "Dupont", contact: "06 12 34 56 78" },
					{ prenom: "Bob", nom: "Martin", contact: "07 98 76 54 32" },
					{ prenom: "Claire", nom: "Durand", contact: "Non renseigné" },
					{ prenom: "David", nom: "Moreau", contact: "06 11 22 33 44" },
					{ prenom: "Emma", nom: "Bernard", contact: "Non renseigné" },
					{ prenom: "François", nom: "Petit", contact: "Non renseigné" },
				],
			},
			{
				sqlCode: `-- Liste des utilisateurs de plus de 25 ans OU dont l'âge n'est pas renseigné
SELECT prenom, nom, age 
FROM utilisateurs 
WHERE age > 25 OR age IS NULL;`,
				sqlResult: [
					{ prenom: "Alice", nom: "Dupont", age: 28 },
					{ prenom: "Bob", nom: "Martin", age: 32 },
					{ prenom: "David", nom: "Moreau", age: 45 },
					{ prenom: "Emma", nom: "Bernard", age: 30 },
				],
			},
		],
	},
	{
		title: "LIMIT et OFFSET - Pagination",
		content:
			"Contrôlez le nombre de résultats (LIMIT) et implémentez la pagination (OFFSET).",
		sqlQueries: [
			{
				sqlCode: `-- Liste uniquement des 3 premiers utilisateurs
SELECT prenom, nom, email 
FROM utilisateurs 
LIMIT 3;`,
				sqlResult: [
					{ prenom: "Alice", nom: "Dupont", email: "alice@email.com" },
					{ prenom: "Bob", nom: "Martin", email: "bob@gmail.com" },
					{ prenom: "Claire", nom: "Durand", email: "claire@email.com" },
				],
			},
			{
				sqlCode: `-- Liste de 2 utilisateurs (LIMIT 2) en sautant les 2 premiers (OFFSET 2)
SELECT prenom, nom, email 
FROM utilisateurs 
ORDER BY nom 
LIMIT 2 OFFSET 2;`,
				sqlResult: [
					{ prenom: "Claire", nom: "Durand", email: "claire@email.com" },
					{ prenom: "David", nom: "Moreau", email: "david@gmail.com" },
				],
			},
			{
				sqlCode: `-- Liste des 3 produits les plus chers
SELECT nom, prix 
FROM produits 
ORDER BY prix DESC 
LIMIT 3;`,
				sqlResult: [
					{ nom: "Smartphone Pro", prix: 1299 },
					{ nom: "Ordinateur Portable", prix: 899 },
					{ nom: "Montre Connectée", prix: 349 },
				],
			},
			{
				sqlCode: `-- Liste des 2 premiers utilisateurs de plus de 25 ans
SELECT prenom, nom, age 
FROM utilisateurs 
WHERE age > 25 
ORDER BY nom 
LIMIT 2 OFFSET 0;`,
				sqlResult: [
					{ prenom: "Alice", nom: "Dupont", age: 28 },
					{ prenom: "Bob", nom: "Martin", age: 32 },
				],
			},
		],
	},
];

export const orangeBeltContent = {
	...menu,
	header,
	accordions,
};
