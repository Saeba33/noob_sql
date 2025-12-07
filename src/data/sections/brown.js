import JoinDiagramSingle from "@/components/ui/sections/brown/JoinDiagramSingle";
import JoinsDiagram from "@/components/ui/sections/brown/JoinsDiagram";

const menu = {
	description: "Relations entre les tables",
	topics: [
		"Schéma jointures",
		"Clés primaires/étrangères",
		"INNER JOIN",
		"LEFT JOIN",
		"RIGHT JOIN",
		"FULL JOIN",
		"CROSS JOIN",
		"SELF JOIN",
	],
};

const header = {
	tag: "Ceinture Marron",
	title: "Jointures",
	description:
		"La ceinture marron vous enseigne l'art des jointures, permettant de relier les données de plusieurs tables. Comprenez les clés primaires et étrangères, explorez tous les types de jointures (INNER, LEFT, RIGHT, FULL, CROSS, SELF) et apprenez à construire des requêtes complexes sur plusieurs tables.",
};

const accordions = [
	{
		title: "Types de jointures",
		content:
			"Pour mieux comprendre comment combiner les données de plusieurs tables en SQL, voici un schéma récapitulatif des quatres principaux types de jointures : INNER JOIN, LEFT JOIN, RIGHT JOIN et FULL JOIN. Il illustre la façon dont chaque jointure inclut ou exclut les enregistrements selon leur présence dans les tables concernées.",
		externalComponent: <JoinsDiagram />,
	},
	{
		title: "Rappel : clés primaires / étrangères",
		content:
			"Les clés primaires et étrangères sont indispensables pour établir des jointures entre tables. Elles définissent les relations qui lient les enregistrements d'une table à ceux d'une autre. Sans elles, il n'est pas possible de faire de jointures entre les tables.",
		examples: [
			{
				type: "schema",
				title: "Structure de la base bibliothèque",
				code: `-- Structure avec clés primaires et étrangères
CREATE TABLE utilisateurs (
    id INTEGER PRIMARY KEY,             -- Clé primaire
    prenom VARCHAR(50) NOT NULL,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    date_naissance DATE,
    date_inscription DATE DEFAULT CURRENT_DATE
);

CREATE TABLE livres (
    id INTEGER PRIMARY KEY,             -- Clé primaire
    titre VARCHAR(200) NOT NULL,
    auteur VARCHAR(100) NOT NULL,
    genre VARCHAR(50),
    annee_publication INTEGER,
    isbn VARCHAR(13) UNIQUE
);

CREATE TABLE emprunts (
    id INTEGER PRIMARY KEY,                             -- Clé primaire
    utilisateur_id INTEGER REFERENCES utilisateurs(id), -- Clé étrangère vers utilisateurs
    livre_id INTEGER REFERENCES livres(id),             -- Clé étrangère vers livres
    date_emprunt DATE NOT NULL,
    date_retour_prevue DATE NOT NULL,
    date_retour_reel DATE,
    statut ENUM('en_cours', 'rendu', 'en_retard') DEFAULT 'en_cours'
);`,
			},
		],
	},
	{
		title: "INNER JOIN",
		content: `INNER JOIN, qui peut s'écrire simplement JOIN, retourne uniquement les lignes ayant une correspondance dans les deux tables (intersection). \n\nPrincipe de syntaxe :\n<code>FROM</code> nom_de_la_table_A\n<code>JOIN</code> nom_de_la_table_B <code>ON</code> nom_de_la_table_A <code>.</code> nom_de_la_cle_primaire <code>=</code> nom_de_la_table_B <code>.</code> nom_de_la_cle_etrangere`,
		externalComponent: <JoinDiagramSingle type="inner" />,
		examples: [
			{
				title: "Syntaxe générale",
				code: `-- On peut l'écrire de 3 façons :

-- JOIN sans alias (on retourne le nom complet de la table dans le ON)
SELECT colonnes
FROM TableA
JOIN TableB ON TableA.cle_primaire = TableB.cle_etrangere;

-- JOIN avec alias et mot-clé AS (on retourne l'alias de la table dans le ON)
SELECT colonnes
FROM TableA AS A
JOIN TableB AS B ON A.cle_primaire = B.cle_etrangere;

-- JOIN avec alias et sans mot-clé AS
-- Le mot-clé AS est optionnel pour les alias de table
SELECT colonnes
FROM TableA A
JOIN TableB B ON A.cle_primaire = B.cle_etrangere;`,
			},
			{
				title: "Exemple : jointure sur deux tables (utilisateurs et emprunts)",
				code: `-- Afficher les utilisateurs avec leurs emprunts
SELECT 
    u.prenom,
    u.nom,
    u.email,
    e.date_emprunt,
    e.date_retour_prevue,
    e.statut
FROM utilisateurs u
JOIN emprunts e ON u.id = e.utilisateur_id
WHERE e.statut = 'en_cours';`,
				result: [
					{
						prenom: "Alice",
						nom: "Dupont",
						email: "alice@email.com",
						date_emprunt: "2024-11-15",
						date_retour_prevue: "2024-12-15",
						statut: "en_cours",
					},
					{
						prenom: "Bob",
						nom: "Martin",
						email: "bob@email.com",
						date_emprunt: "2024-11-20",
						date_retour_prevue: "2024-12-20",
						statut: "en_cours",
					},
					{
						prenom: "Claire",
						nom: "Durand",
						email: "claire@email.com",
						date_emprunt: "2024-11-25",
						date_retour_prevue: "2024-12-25",
						statut: "en_cours",
					},
			],
		},

		{
			title: "Exemple : jointure sur trois tables (utilisateurs, livres et emprunts)",
			code: `-- Afficher tous les emprunts avec les informations des livres et des utilisateurs
SELECT 
    u.prenom,
    u.nom,
    l.titre,
    l.genre,
    e.date_emprunt,
    e.date_retour_reel,
    e.statut
FROM utilisateurs u
JOIN emprunts e ON u.id = e.utilisateur_id
JOIN livres l ON e.livre_id = l.id
ORDER BY e.date_emprunt DESC;`,
			result: [
					{
						prenom: "Claire",
						nom: "Durand",
						titre: "Clean Code",
						genre: "Informatique",
						date_emprunt: "2024-11-25",
						date_retour_reel: null,
						statut: "en_cours",
					},
					{
						prenom: "Bob",
						nom: "Martin",
						titre: "Le Seigneur des Anneaux",
						genre: "Fantasy",
						date_emprunt: "2024-11-20",
						date_retour_reel: null,
						statut: "en_cours",
					},
					{
						prenom: "Alice",
						nom: "Dupont",
						titre: "1984",
						genre: "Science-Fiction",
						date_emprunt: "2024-11-15",
						date_retour_reel: null,
						statut: "en_cours",
					},
					{
						prenom: "Alice",
						nom: "Dupont",
						titre: "Le Petit Prince",
						genre: "Conte",
						date_emprunt: "2024-10-01",
						date_retour_reel: "2024-10-15",
						statut: "rendu",
					},
				],
			},
		],
	},
	{
		title: "LEFT JOIN",
		content: `LEFT JOIN, qui peut également s'écrire LEFT OUTER JOIN, retourne toutes les lignes de la table de gauche (après FROM), avec les correspondances de la table de droite si elles existent. S'il n'y a pas de correspondance, les colonnes de la table de droite seront NULL. 

Principe de syntaxe :
<code>FROM</code> nom_de_la_table_A
<code>LEFT JOIN</code> nom_de_la_table_B <code>ON</code> nom_de_la_table_A <code>.</code> nom_de_la_cle_primaire <code>=</code> nom_de_la_table_B <code>.</code> nom_de_la_cle_etrangere`,
		externalComponent: <JoinDiagramSingle type="left" />,
		examples: [
			{
				title: "Syntaxe générale",
				code: `-- On peut l'écrire de 2 façons :

-- LEFT JOIN avec alias et mot-clé AS (on retourne l'alias de la table dans le ON)
SELECT colonnes
FROM TableA AS A
LEFT JOIN TableB AS B ON A.cle_primaire = B.cle_etrangere;

-- LEFT JOIN avec alias et sans mot-clé AS
-- Le mot-clé AS est optionnel pour les alias de table, vous pouvez donc utiliser le raccourci syntaxique suivant :
SELECT colonnes
FROM TableA A
LEFT JOIN TableB B ON A.cle_primaire = B.cle_etrangere;

-- LEFT OUTER JOIN est strictement équivalent à LEFT JOIN
SELECT colonnes
FROM TableA A
LEFT OUTER JOIN TableB B ON A.cle_primaire = B.cle_etrangere;`,
			},
			{
				title: "Exemple : Tous les utilisateurs (même sans emprunt)",
				code: `SELECT 
    u.prenom,
    u.nom,
    u.email,
    COUNT(e.id) AS nombre_emprunts
FROM utilisateurs u
LEFT JOIN emprunts e ON u.id = e.utilisateur_id
GROUP BY u.id, u.prenom, u.nom, u.email;`,
				result: [
					{
						prenom: "Alice",
						nom: "Dupont",
						email: "alice@email.com",
						nombre_emprunts: 2,
					},
					{
						prenom: "Bob",
						nom: "Martin",
						email: "bob@email.com",
						nombre_emprunts: 1,
					},
					{
						prenom: "Claire",
						nom: "Durand",
						email: "claire@email.com",
						nombre_emprunts: 1,
					},
					{
						prenom: "Emma",
						nom: "Bernard",
						email: "emma@email.com",
						nombre_emprunts: 0,
					},
				],
			},
			{
				title: "LEFT EXCLUSIVE : Utilisateurs sans emprunt",
				code: `-- Ajouter WHERE ... IS NULL pour ne garder que les lignes sans correspondance
SELECT 
    u.prenom,
    u.nom,
    u.email,
    u.date_inscription
FROM utilisateurs u
LEFT JOIN emprunts e ON u.id = e.utilisateur_id
WHERE e.id IS NULL;`,
				result: [
					{
						prenom: "Emma",
						nom: "Bernard",
						email: "emma@email.com",
						date_inscription: "2024-11-10",
					},
				],
			},
		],
	},
	{
		title: "RIGHT JOIN",
		content: `RIGHT JOIN, qui peut également s'écrire RIGHT OUTER JOIN, retourne toutes les lignes de la table de droite (après JOIN), avec les correspondances de la table de gauche si elles existent. En pratique, on préfère souvent réécrire un RIGHT JOIN en LEFT JOIN en inversant l'ordre des tables. 

Principe de syntaxe :
<code>FROM</code> nom_de_la_table_A
<code>RIGHT JOIN</code> nom_de_la_table_B <code>ON</code> nom_de_la_table_A <code>.</code> nom_de_la_cle_primaire <code>=</code> nom_de_la_table_B <code>.</code> nom_de_la_cle_etrangere`,
		externalComponent: <JoinDiagramSingle type="right" />,
		examples: [
			{
				title: "Syntaxe générale",
				code: `-- On peut l'écrire de 2 façons :

-- RIGHT JOIN avec alias et mot-clé AS (on retourne l'alias de la table dans le ON)
SELECT colonnes
FROM TableA AS A
RIGHT JOIN TableB AS B ON A.cle_primaire = B.cle_etrangere;

-- RIGHT JOIN avec alias et sans mot-clé AS
-- Le mot-clé AS est optionnel pour les alias de table, vous pouvez donc utiliser le raccourci syntaxique suivant :
SELECT colonnes
FROM TableA A
RIGHT JOIN TableB B ON A.cle_primaire = B.cle_etrangere;

-- Équivalent avec LEFT JOIN (en inversant l'ordre des tables) :
SELECT colonnes
FROM TableB B
LEFT JOIN TableA A ON A.cle_primaire = B.cle_etrangere;`,
			},
			{
				title: "Exemple : Tous les livres (même jamais empruntés)",
				code: `SELECT 
    l.titre,
    l.auteur,
    l.genre,
    COUNT(e.id) AS nombre_emprunts
FROM emprunts e
RIGHT JOIN livres l ON e.livre_id = l.id
GROUP BY l.id, l.titre, l.auteur, l.genre;`,
				result: [
					{
						titre: "1984",
						auteur: "George Orwell",
						genre: "Science-Fiction",
						nombre_emprunts: 1,
					},
					{
						titre: "Le Seigneur des Anneaux",
						auteur: "J.R.R. Tolkien",
						genre: "Fantasy",
						nombre_emprunts: 1,
					},
					{
						titre: "Clean Code",
						auteur: "Robert Martin",
						genre: "Informatique",
						nombre_emprunts: 1,
					},
					{
						titre: "Le Petit Prince",
						auteur: "Antoine de Saint-Exupéry",
						genre: "Conte",
						nombre_emprunts: 1,
					},
					{
						titre: "Design Patterns",
						auteur: "Gang of Four",
						genre: "Informatique",
						nombre_emprunts: 0,
					},
				],
			},
			{
				title: "RIGHT EXCLUSIVE : Livres jamais empruntés",
				code: `-- Trouver les livres qui n'ont jamais été empruntés
SELECT 
    l.titre,
    l.auteur,
    l.genre,
    l.annee_publication
FROM emprunts e
RIGHT JOIN livres l ON e.livre_id = l.id
WHERE e.id IS NULL;`,
				result: [
					{
						titre: "Design Patterns",
						auteur: "Gang of Four",
						genre: "Informatique",
						annee_publication: 1994,
					},
				],
			},
		],
	},
	{
		title: "FULL JOIN",
		content: `FULL JOIN, qui peut également s'écrire FULL OUTER JOIN, retourne toutes les lignes des deux tables, qu'il y ait correspondance ou non. Les colonnes sans correspondance seront NULL. 

Note : SQLite ne supporte pas FULL JOIN nativement, il faut utiliser UNION pour combiner LEFT et RIGHT JOIN.

Principe de syntaxe :
<code>FROM</code> nom_de_la_table_A
<code>FULL JOIN</code> nom_de_la_table_B <code>ON</code> nom_de_la_table_A <code>.</code> nom_de_la_cle_primaire <code>=</code> nom_de_la_table_B <code>.</code> nom_de_la_cle_etrangere`,
		externalComponent: <JoinDiagramSingle type="full" />,
		examples: [
			{
				title: "Syntaxe générale",
				code: `-- On peut l'écrire de 2 façons :

-- FULL JOIN avec alias et mot-clé AS (on retourne l'alias de la table dans le ON)
SELECT colonnes
FROM TableA AS A
FULL OUTER JOIN TableB AS B ON A.cle_primaire = B.cle_etrangere;

-- FULL JOIN avec alias et sans mot-clé AS
-- Le mot-clé AS est optionnel pour les alias de table, vous pouvez donc utiliser le raccourci syntaxique suivant :
SELECT colonnes
FROM TableA A
FULL OUTER JOIN TableB B ON A.cle_primaire = B.cle_etrangere;

-- Alternative pour SQLite (pas de FULL JOIN natif) :
-- Combiner LEFT JOIN et RIGHT JOIN avec UNION
SELECT colonnes FROM TableA A LEFT JOIN TableB B ON A.cle_primaire = B.cle_etrangere
UNION
SELECT colonnes FROM TableA A RIGHT JOIN TableB B ON A.cle_primaire = B.cle_etrangere;`,
			},
			{
				title: "Exemple : Vue complète utilisateurs/livres",
				code: `SELECT 
    u.prenom,
    u.nom,
    l.titre,
    l.genre,
    e.statut
FROM utilisateurs u
LEFT JOIN emprunts e ON u.id = e.utilisateur_id
FULL OUTER JOIN livres l ON e.livre_id = l.id;`,
				result: [
					{
						prenom: "Alice",
						nom: "Dupont",
						titre: "1984",
						genre: "Science-Fiction",
						statut: "en_cours",
					},
					{
						prenom: "Bob",
						nom: "Martin",
						titre: "Le Seigneur des Anneaux",
						genre: "Fantasy",
						statut: "en_cours",
					},
					{
						prenom: "Claire",
						nom: "Durand",
						titre: "Clean Code",
						genre: "Informatique",
						statut: "en_cours",
					},
					{
						prenom: "Alice",
						nom: "Dupont",
						titre: "Le Petit Prince",
						genre: "Conte",
						statut: "rendu",
					},
					{
						prenom: "Emma",
						nom: "Bernard",
						titre: null,
						genre: null,
						statut: null,
					},
					{
						prenom: null,
						nom: null,
						titre: "Design Patterns",
						genre: "Informatique",
						statut: null,
					},
				],
			},
			{
				title: "FULL EXCLUSIVE : Données non appariées",
				code: `-- Trouver les utilisateurs sans emprunts ET les livres jamais empruntés
SELECT 
    u.prenom,
    u.nom,
    l.titre,
    CASE 
        WHEN u.id IS NULL THEN 'Livre jamais emprunté'
        WHEN l.id IS NULL THEN 'Utilisateur sans emprunt'
    END AS anomalie
FROM utilisateurs u
LEFT JOIN emprunts e ON u.id = e.utilisateur_id
FULL OUTER JOIN livres l ON e.livre_id = l.id
WHERE u.id IS NULL OR l.id IS NULL;`,
				result: [
					{
						prenom: "Emma",
						nom: "Bernard",
						titre: null,
						anomalie: "Utilisateur sans emprunt",
					},
					{
						prenom: null,
						nom: null,
						titre: "Design Patterns",
						anomalie: "Livre jamais emprunté",
					},
				],
			},
		],
	},
	{
		title: "CROSS JOIN",
		content: `CROSS JOIN génère le produit cartésien : chaque ligne de la première table est combinée avec chaque ligne de la seconde. Attention : N lignes × M lignes = N×M résultats ! Utile pour générer des matrices ou des combinaisons. 

Principe de syntaxe :
<code>FROM</code> nom_de_la_table_A
<code>CROSS JOIN</code> nom_de_la_table_B

Note : CROSS JOIN n'utilise pas de clause <code>ON</code> car il n'y a aucune condition de jointure.`,
		examples: [
			{
				title: "Syntaxe générale",
				code: `-- On peut l'écrire de 2 façons :

-- CROSS JOIN avec alias et mot-clé AS
-- Pas de clause ON car aucune condition de jointure
-- Attention : génère N × M lignes !
SELECT colonnes
FROM TableA AS A
CROSS JOIN TableB AS B;

-- CROSS JOIN avec alias et sans mot-clé AS
-- Le mot-clé AS est optionnel pour les alias de table, vous pouvez donc utiliser le raccourci syntaxique suivant :
SELECT colonnes
FROM TableA A
CROSS JOIN TableB B;

-- Syntaxe alternative (implicite) :
-- Utiliser la virgule entre les tables produit le même résultat
SELECT colonnes
FROM TableA A, TableB B;`,
			},
			{
				title: "Exemple : Matrice utilisateurs × genres littéraires",
				code: `-- Générer des recommandations : tous les utilisateurs × tous les genres
SELECT 
    u.prenom,
    u.nom,
    g.genre
FROM utilisateurs u
CROSS JOIN (
    SELECT DISTINCT genre
    FROM livres
    WHERE genre IS NOT NULL
) g
ORDER BY u.nom, g.genre
LIMIT 8;`,
				result: [
					{ prenom: "Emma", nom: "Bernard", genre: "Conte" },
					{ prenom: "Emma", nom: "Bernard", genre: "Fantasy" },
					{ prenom: "Emma", nom: "Bernard", genre: "Informatique" },
					{ prenom: "Emma", nom: "Bernard", genre: "Science-Fiction" },
					{ prenom: "Alice", nom: "Dupont", genre: "Conte" },
					{ prenom: "Alice", nom: "Dupont", genre: "Fantasy" },
					{ prenom: "Alice", nom: "Dupont", genre: "Informatique" },
					{ prenom: "Alice", nom: "Dupont", genre: "Science-Fiction" },
				],
			},
			{
				title: "Cas pratique : Planning de réservations",
				code: `-- Créer un planning : tous les livres × toutes les dates disponibles
SELECT 
    l.titre,
    d.date_disponible
FROM livres l
CROSS JOIN (
    SELECT DATE('2024-12-01') AS date_disponible
    UNION SELECT DATE('2024-12-08')
    UNION SELECT DATE('2024-12-15')
    UNION SELECT DATE('2024-12-22')
) d
WHERE l.genre = 'Informatique'
ORDER BY l.titre, d.date_disponible;`,
				result: [
					{ titre: "Clean Code", date_disponible: "2024-12-01" },
					{ titre: "Clean Code", date_disponible: "2024-12-08" },
					{ titre: "Clean Code", date_disponible: "2024-12-15" },
					{ titre: "Clean Code", date_disponible: "2024-12-22" },
					{ titre: "Design Patterns", date_disponible: "2024-12-01" },
					{ titre: "Design Patterns", date_disponible: "2024-12-08" },
				],
			},
		],
	},
	{
		title: "SELF JOIN",
		content: `SELF JOIN permet de joindre une table avec elle-même. Indispensable pour les structures hiérarchiques ou pour comparer des lignes entre elles. Les alias sont obligatoires pour distinguer les deux "copies" de la table. 

Principe de syntaxe :
<code>FROM</code> nom_de_la_table alias1
<code>JOIN</code> nom_de_la_table alias2 <code>ON</code> alias1 <code>.</code> nom_colonne <code>=</code> alias2 <code>.</code> nom_colonne`,
		examples: [
			{
				title: "Syntaxe générale",
				code: `-- On peut l'écrire de 2 façons :

-- SELF JOIN avec alias et mot-clé AS (les alias sont OBLIGATOIRES)
SELECT colonnes
FROM MaTable AS alias1
JOIN MaTable AS alias2 ON alias1.colonne = alias2.colonne;

-- SELF JOIN avec alias et sans mot-clé AS
-- Le mot-clé AS est optionnel pour les alias de table, vous pouvez donc utiliser le raccourci syntaxique suivant :
SELECT colonnes
FROM MaTable alias1
JOIN MaTable alias2 ON alias1.colonne = alias2.colonne;

-- Structure hiérarchique typique (colonne qui référence la même table) :
CREATE TABLE categories (
    id INTEGER PRIMARY KEY,
    nom VARCHAR(100),
    parent_id INTEGER REFERENCES categories(id)  -- Auto-référence
);`,
			},
			{
				title: "Livres du même auteur",
				code: `-- Trouver les livres écrits par le même auteur
SELECT 
    l1.titre AS livre1,
    l2.titre AS livre2,
    l1.auteur,
    l1.annee_publication AS annee1,
    l2.annee_publication AS annee2
FROM livres l1
JOIN livres l2 ON l1.auteur = l2.auteur
    AND l1.id < l2.id  -- Évite les doublons
ORDER BY l1.auteur;`,
				result: [
					{
						livre1: "Clean Code",
						livre2: "The Clean Coder",
						auteur: "Robert Martin",
						annee1: 2008,
						annee2: 2011,
					},
				],
			},
		],
	},
];

export const beltContent = {
	...menu,
	header,
	accordions,
};
