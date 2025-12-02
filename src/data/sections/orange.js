const menu = {
	description: "Contrôle et filtrage des données",
	topics: [
		"Données de référence",
		"WHERE",
		"Opérateurs de comparaison",
		"Opérateurs logiques",
		"Mots-clés de filtrage",
		"Tri des résultats (ORDER BY)",
		"Pagination (LIMIT, OFFSET)",
		"Exemples combinés",
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
			"WHERE est la clause qui permet de filtrer les lignes d'une requête. Elle s'écrit après FROM et avant ORDER BY. Grâce à WHERE, on peut récupérer uniquement les lignes qui correspondent à une ou plusieurs conditions. Sans cette clause, toutes les lignes de la table seraient retournées.\n\nLes valeurs de type texte et les dates doivent être écrites entre guillemets simples (par exemple : 'Paris' ou '2024-01-15'). Les nombres, eux, s'écrivent sans guillemets (par exemple : 42).\n\nAttention, si une valeur texte contient une apostrophe, il faut la doubler pour que SQL ne la confonde pas avec la fin de la chaîne de caractères. Par exemple, pour rechercher le nom O'Connor, on écrit : 'O''Connor'.",
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
			"Les opérateurs de comparaison permettent de filtrer les résultats de la requête selon les valeurs qui y sont associées. Ils fonctionnent avec les nombres, les textes (ordre alphabétique) et les dates.",
		sqlQueries: [
			{
				sqlCode: `-- Liste des utilisateurs qui ont exactement 25 ans
-- Opérateur : =
SELECT prenom, nom, age 
FROM utilisateurs 
WHERE age = 25;`,
				sqlResult: [
					{ prenom: "Claire", nom: "Durand", age: 25 },
					{ prenom: "François", nom: "Petit", age: 25 },
				],
			},
			{
				sqlCode: `-- Liste des utilisateurs qui ont un âge différent de 25 ans
-- Opérateur : != ou <>
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
				sqlCode: `-- Liste des produits avec un prix strictement inférieur à 100 euros
-- Opérateur : <
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
				sqlCode: `-- Liste des produits avec un prix inférieur ou égal à 25 euros
-- Opérateur : <=
SELECT nom, prix 
FROM produits 
WHERE prix <= 25;`,
				sqlResult: [
					{ nom: "Livre SQL", prix: 25 },
					{ nom: "Stylo", prix: 5 },
				],
			},
			{
				sqlCode: `-- Liste des produits avec un prix strictement supérieur à 500 euros
-- Opérateur : >
SELECT nom, prix 
FROM produits 
WHERE prix > 500;`,
				sqlResult: [
					{ nom: "Ordinateur Portable", prix: 899 },
					{ nom: "Smartphone Pro", prix: 1299 },
				],
			},
			{
				sqlCode: `-- Liste des produits avec un prix supérieur ou égal à 299 euros
-- Opérateur : >=
SELECT nom, prix 
FROM produits 
WHERE prix >= 299;`,
				sqlResult: [
					{ nom: "Ordinateur Portable", prix: 899 },
					{ nom: "Smartphone Pro", prix: 1299 },
					{ nom: "Tablette", prix: 299 },
					{ nom: "Montre Connectée", prix: 349 },
				],
			},
			{
				sqlCode: `-- Liste des utilisateurs dont le prénom commence par D ou après dans l'alphabet
-- Opérateur : >=
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
-- Opérateur : >
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
			"Les opérateurs logiques permettent de combiner plusieurs conditions dans une même requête. AND exige que toutes les conditions soient vraies, OR exige qu'au moins une condition soit vraie.",
		sqlQueries: [
			{
				sqlCode: `-- Liste des utilisateurs entre 25 et 35 ans (inclus)
-- Opérateur logique : AND
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
				sqlCode: `-- Liste des produits de catégorie "electronique" ou avec un prix inférieur à 100€
-- Opérateur logique : OR
SELECT nom, categorie, prix 
FROM produits 
WHERE categorie = 'electronique' OR prix < 100;`,
				sqlResult: [
					{ nom: "Ordinateur Portable", categorie: "electronique", prix: 899 },
					{ nom: "Smartphone Pro", categorie: "electronique", prix: 1299 },
					{ nom: "Tablette", categorie: "electronique", prix: 299 },
					{ nom: "Casque Audio", categorie: "electronique", prix: 249 },
					{ nom: "Montre Connectée", categorie: "electronique", prix: 349 },
					{ nom: "Livre SQL", categorie: "livre", prix: 25 },
					{ nom: "Stylo", categorie: "bureau", prix: 5 },
					{ nom: "Peluche Pikachu", categorie: "jouet", prix: 29 },
				],
			},
		],
	},
	{
		title: "Mots-clés de filtrage",
		content:
			"Les mots-clés de filtrage offrent des moyens expressifs pour définir des conditions : IN pour une liste de valeurs, BETWEEN pour un intervalle, LIKE pour des motifs de texte, IS NULL pour les valeurs manquantes. Chacun peut être inversé avec NOT. \n\nAttention, IS NULL et IS NOT NULL (mots-clés de filtrage) sont différents de NULL et NOT NULL (contraintes utilisées lors de la création de tables).",
		sqlQueries: [
			{
				title: "IN - Liste de valeurs",
				sqlCode: `-- Liste des utilisateurs dont l'âge est 25, 30, 35 ou 40 ans
-- Mot-clé : IN
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
				title: "NOT IN - Exclusion de valeurs",
				sqlCode: `-- Liste des utilisateurs dont l'âge n'est PAS 25, 30, 35 ou 40 ans
-- Mot-clé : NOT IN
SELECT prenom, nom, age 
FROM utilisateurs 
WHERE age NOT IN (25, 30, 35, 40);`,
				sqlResult: [
					{ prenom: "Alice", nom: "Dupont", age: 28 },
					{ prenom: "Bob", nom: "Martin", age: 32 },
					{ prenom: "David", nom: "Moreau", age: 45 },
				],
			},
			{
				title: "BETWEEN - Intervalle de valeurs",
				sqlCode: `-- Liste des produits dont le prix est compris entre 200€ et 800€ (inclus)
-- Mots-clés : BETWEEN avec AND
SELECT nom, prix 
FROM produits 
WHERE prix BETWEEN 200 AND 800;`,
				sqlResult: [
					{ nom: "Tablette", prix: 299 },
					{ nom: "Casque Audio", prix: 249 },
					{ nom: "Montre Connectée", prix: 349 },
				],
			},
			{
				title: "NOT BETWEEN - Hors intervalle",
				sqlCode: `-- Liste des produits dont le prix n'est PAS entre 200€ et 800€
-- Mots-clés : NOT BETWEEN avec AND
SELECT nom, prix 
FROM produits 
WHERE prix NOT BETWEEN 200 AND 800;`,
				sqlResult: [
					{ nom: "Ordinateur Portable", prix: 899 },
					{ nom: "Smartphone Pro", prix: 1299 },
					{ nom: "Livre SQL", prix: 25 },
					{ nom: "Stylo", prix: 5 },
					{ nom: "Peluche Pikachu", prix: 29 },
				],
			},
			{
				title: "LIKE - Commence par",
				sqlCode: `-- Tous les prénoms qui commencent par 'A'
-- Mots-clés : LIKE avec %
SELECT prenom, nom 
FROM utilisateurs 
WHERE prenom LIKE 'A%';`,
				sqlResult: [{ prenom: "Alice", nom: "Dupont" }],
			},
			{
				title: "LIKE - Finit par",
				sqlCode: `-- Tous les noms qui finissent par 'and'
-- Mots-clés : LIKE avec %
SELECT prenom, nom 
FROM utilisateurs 
WHERE nom LIKE '%and';`,
				sqlResult: [{ prenom: "Claire", nom: "Durand" }],
			},
			{
				title: "LIKE - Contient",
				sqlCode: `-- Tous les noms qui contiennent 'ar'
-- Mots-clés : LIKE avec %
SELECT prenom, nom 
FROM utilisateurs 
WHERE nom LIKE '%ar%';`,
				sqlResult: [
					{ prenom: "Bob", nom: "Martin" },
					{ prenom: "Emma", nom: "Bernard" },
				],
			},
			{
				title: "LIKE - Nombre exact de caractères (_)",
				sqlCode: `-- Prénoms de exactement 5 lettres commençant par 'A'
-- Mots-clés : LIKE avec _
SELECT prenom, nom 
FROM utilisateurs 
WHERE prenom LIKE 'A____';`,
				sqlResult: [{ prenom: "Alice", nom: "Dupont" }],
			},
			{
				title: "NOT LIKE - Exclusion de motif",
				sqlCode: `-- Tous les utilisateurs dont le prénom ne commence PAS par 'A'
-- Mot-clé : NOT LIKE
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
			{
				title: "IS NULL - Valeurs manquantes",
				sqlCode: `-- Liste des utilisateurs n'ayant pas de numéro de téléphone
-- Mot-clé : IS NULL
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
				title: "IS NOT NULL - Valeurs renseignées",
				sqlCode: `-- Liste des utilisateurs ayant un numéro de téléphone renseigné
-- Mot-clé : IS NOT NULL
SELECT prenom, nom, telephone 
FROM utilisateurs 
WHERE telephone IS NOT NULL;`,
				sqlResult: [
					{ prenom: "Alice", nom: "Dupont", telephone: "06 12 34 56 78" },
					{ prenom: "Bob", nom: "Martin", telephone: "07 98 76 54 32" },
					{ prenom: "David", nom: "Moreau", telephone: "06 11 22 33 44" },
				],
			},
		],
	},
	{
		title: "Tri des résultats (ORDER BY)",
		content:
			"ORDER BY permet de trier les résultats selon une ou plusieurs colonnes. ASC (ordre croissant) est l'ordre par défaut, DESC (ordre décroissant) inverse l'ordre.",
		sqlQueries: [
			{
				sqlCode: `-- Liste des utilisateurs triés par âge croissant (du plus jeune au plus âgé)
-- Clause : ORDER BY avec ASC
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
				sqlCode: `-- Liste des produits triés par prix décroissant (du plus cher au moins cher)
-- Clause : ORDER BY avec DESC
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
				sqlCode: `-- Liste des utilisateurs triés par ville (A-Z) puis par âge décroissant (du plus âgé au moins agé)
-- Clause : ORDER BY multi-colonnes
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
		title: "Pagination (LIMIT, OFFSET)",
		content:
			"LIMIT restreint le nombre de résultats retournés. OFFSET permet de sauter un certain nombre de lignes avant de commencer à retourner des résultats.",
		sqlQueries: [
			{
				sqlCode: `-- Liste uniquement les 3 premiers utilisateurs
-- Clause : LIMIT
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
				sqlCode: `-- Liste 3 utilisateurs en sautant les 2 premiers
-- Clauses : LIMIT et OFFSET
SELECT prenom, nom, email 
FROM utilisateurs 
LIMIT 3 OFFSET 2;`,
				sqlResult: [
					{ prenom: "Claire", nom: "Durand", email: "claire@email.com" },
					{ prenom: "David", nom: "Moreau", email: "david@email.com" },
					{ prenom: "Emma", nom: "Bernard", email: "emma@email.com" },
				],
			},
		],
	},
	{
		title: "Exemples combinés",
		content:
			"Les vraies requêtes SQL combinent souvent plusieurs concepts. Voici des exemples qui utilisent simultanément filtres, tri et pagination.",
		sqlQueries: [
			{
				title: "Filtres multiples + Tri",
				sqlCode: `-- Utilisateurs parisiens de plus de 25 ans, triés par âge
-- Opérateurs : = et > | Opérateur logique : AND | Clause : ORDER BY
SELECT prenom, nom, age, ville 
FROM utilisateurs 
WHERE ville = 'Paris' AND age > 25 
ORDER BY age ASC;`,
				sqlResult: [
					{ prenom: "Alice", nom: "Dupont", age: 28, ville: "Paris" },
					{ prenom: "Bob", nom: "Martin", age: 32, ville: "Paris" },
				],
			},
			{
				title: "Mot-clé + Tri + Pagination",
				sqlCode: `-- Top 3 des produits électroniques les moins chers
-- Opérateur : = | Clauses : ORDER BY et LIMIT
SELECT nom, categorie, prix 
FROM produits 
WHERE categorie = 'electronique' 
ORDER BY prix ASC 
LIMIT 3;`,
				sqlResult: [
					{ nom: "Casque Audio", categorie: "electronique", prix: 249 },
					{ nom: "Tablette", categorie: "electronique", prix: 299 },
					{ nom: "Montre Connectée", categorie: "electronique", prix: 349 },
				],
			},
			{
				title: "LIKE + IS NOT NULL + ORDER BY",
				sqlCode: `-- Utilisateurs avec un téléphone, dont le nom contient 'a', triés par nom
-- Mots-clés : LIKE et IS NOT NULL | Clause : ORDER BY
SELECT prenom, nom, telephone 
FROM utilisateurs 
WHERE telephone IS NOT NULL AND nom LIKE '%a%' 
ORDER BY nom;`,
				sqlResult: [
					{ prenom: "Bob", nom: "Martin", telephone: "07 98 76 54 32" },
					{ prenom: "David", nom: "Moreau", telephone: "06 11 22 33 44" },
				],
			},
			{
				title: "BETWEEN + NOT IN + ORDER BY",
				sqlCode: `-- Produits entre 20€ et 500€, sauf catégorie bureau, triés par prix décroissant
-- Mots-clés : BETWEEN et NOT IN | Clause : ORDER BY
SELECT nom, categorie, prix 
FROM produits 
WHERE prix BETWEEN 20 AND 500 AND categorie NOT IN ('bureau') 
ORDER BY prix DESC;`,
				sqlResult: [
					{ nom: "Montre Connectée", categorie: "electronique", prix: 349 },
					{ nom: "Tablette", categorie: "electronique", prix: 299 },
					{ nom: "Casque Audio", categorie: "electronique", prix: 249 },
					{ nom: "Peluche Pikachu", categorie: "jouet", prix: 29 },
					{ nom: "Livre SQL", categorie: "livre", prix: 25 },
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
