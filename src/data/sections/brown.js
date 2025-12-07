import JoinsDiagram from "@/components/ui/sections/brown/JoinsDiagram";
import JoinDiagramSingle from "@/components/ui/sections/brown/JoinDiagramSingle";

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
		content: "Schéma récapitulatif des principaux types de jointures SQL",
		externalComponent: <JoinsDiagram />,
	},
	{
		title: "Rappel : clés primaires / étrangères",
		content:
			"Les clés primaires et étrangères sont indispensables pour établir des jointures entre tables. Elles définissent les relations qui lient les enregistrements d'une table à ceux d'une autre. Sans elles, il n'est pas possible de faire de jointures entre plusieurs tables.",
		sqlCode: `-- Structure avec clés primaires et étrangères
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
	{
		title: "JOIN",
		content: `JOIN (ou INNER JOIN) retourne uniquement les lignes ayant une correspondance dans les deux tables (intersection).

Principe de syntaxe :
<code>FROM</code> TableA <code>JOIN</code> TableB <code>ON</code> TableA.cle_primaire <code>=</code> TableB.cle_etrangere`,
		externalComponent: <JoinDiagramSingle type="inner" />,
		sqlQueries: [
			{
				title: "Syntaxe générale",
				sqlCode: `-- On peut l'écrire de 3 façons :

-- JOIN sans alias
SELECT colonnes
FROM TableA
JOIN TableB ON TableA.cle = TableB.cle;

-- JOIN avec alias (et mot-clé AS)
SELECT colonnes
FROM TableA AS A
JOIN TableB AS B ON A.cle = B.cle;

-- JOIN avec alias (sans mot-clé AS) 
-- Le mot-clé AS est optionnel, vous pouvez utiliser ce raccourci :
SELECT colonnes
FROM TableA A
JOIN TableB B ON A.cle = B.cle;`,
			},
			{
				title: "Exemple : Emprunts en cours avec détails",
				sqlCode: `SELECT 
    u.prenom,
    u.nom,
    l.titre,
    l.auteur,
    e.date_emprunt,
    e.date_retour_prevue
FROM utilisateurs u
JOIN emprunts e ON u.id = e.utilisateur_id
JOIN livres l ON e.livre_id = l.id
WHERE e.statut = 'en_cours';`,
				sqlResult: [
					{ prenom: "Alice", nom: "Dupont", titre: "1984", auteur: "George Orwell", date_emprunt: "2024-11-15", date_retour_prevue: "2024-12-15" },
					{ prenom: "Bob", nom: "Martin", titre: "Le Seigneur des Anneaux", auteur: "J.R.R. Tolkien", date_emprunt: "2024-11-20", date_retour_prevue: "2024-12-20" },
					{ prenom: "Claire", nom: "Durand", titre: "Clean Code", auteur: "Robert Martin", date_emprunt: "2024-11-25", date_retour_prevue: "2024-12-25" },
				],
			},
			{
				title: "Jointure sur trois tables : historique complet",
				sqlCode: `-- Afficher tous les emprunts avec informations utilisateur et livre
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
				sqlResult: [
					{ prenom: "Claire", nom: "Durand", titre: "Clean Code", genre: "Informatique", date_emprunt: "2024-11-25", date_retour_reel: null, statut: "en_cours" },
					{ prenom: "Bob", nom: "Martin", titre: "Le Seigneur des Anneaux", genre: "Fantasy", date_emprunt: "2024-11-20", date_retour_reel: null, statut: "en_cours" },
					{ prenom: "Alice", nom: "Dupont", titre: "1984", genre: "Science-Fiction", date_emprunt: "2024-11-15", date_retour_reel: null, statut: "en_cours" },
					{ prenom: "Alice", nom: "Dupont", titre: "Le Petit Prince", genre: "Conte", date_emprunt: "2024-10-01", date_retour_reel: "2024-10-15", statut: "rendu" },
				],
			},
		],
	},
	{
		title: "LEFT JOIN",
		content: `LEFT JOIN (ou LEFT OUTER JOIN) retourne toutes les lignes de la table de gauche (après FROM), avec les correspondances de la table de droite si elles existent. S'il n'y a pas de correspondance, les colonnes de la table de droite seront NULL.

Principe de syntaxe :
<code>FROM</code> TableA <code>LEFT JOIN</code> TableB <code>ON</code> TableA.cle_primaire <code>=</code> TableB.cle_etrangere`,
		externalComponent: <JoinDiagramSingle type="left" />,
		sqlQueries: [
			{
				title: "Syntaxe générale",
				sqlCode: `-- LEFT JOIN : toutes les lignes de A + correspondances de B (si elles existent)
-- Les lignes de A sans correspondance auront NULL pour les colonnes de B

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
				sqlCode: `SELECT 
    u.prenom,
    u.nom,
    u.email,
    COUNT(e.id) AS nombre_emprunts
FROM utilisateurs u
LEFT JOIN emprunts e ON u.id = e.utilisateur_id
GROUP BY u.id, u.prenom, u.nom, u.email;`,
				sqlResult: [
					{ prenom: "Alice", nom: "Dupont", email: "alice@email.com", nombre_emprunts: 2 },
					{ prenom: "Bob", nom: "Martin", email: "bob@email.com", nombre_emprunts: 1 },
					{ prenom: "Claire", nom: "Durand", email: "claire@email.com", nombre_emprunts: 1 },
					{ prenom: "Emma", nom: "Bernard", email: "emma@email.com", nombre_emprunts: 0 },
				],
			},
			{
				title: "LEFT EXCLUSIVE : Utilisateurs sans emprunt",
				sqlCode: `-- Ajouter WHERE ... IS NULL pour ne garder que les lignes sans correspondance
SELECT 
    u.prenom,
    u.nom,
    u.email,
    u.date_inscription
FROM utilisateurs u
LEFT JOIN emprunts e ON u.id = e.utilisateur_id
WHERE e.id IS NULL;`,
				sqlResult: [
					{ prenom: "Emma", nom: "Bernard", email: "emma@email.com", date_inscription: "2024-11-10" },
				],
			},
		],
	},
	{
		title: "RIGHT JOIN",
		content: `RIGHT JOIN (ou RIGHT OUTER JOIN) retourne toutes les lignes de la table de droite (après JOIN), avec les correspondances de la table de gauche si elles existent. En pratique, on préfère souvent réécrire un RIGHT JOIN en LEFT JOIN en inversant l'ordre des tables.

Principe de syntaxe :
<code>FROM</code> TableA <code>RIGHT JOIN</code> TableB <code>ON</code> TableA.cle_primaire <code>=</code> TableB.cle_etrangere`,
		externalComponent: <JoinDiagramSingle type="right" />,
		sqlQueries: [
			{
				title: "Syntaxe générale",
				sqlCode: `-- RIGHT JOIN : toutes les lignes de B + correspondances de A (si elles existent)
-- Les lignes de B sans correspondance auront NULL pour les colonnes de A

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
				sqlCode: `SELECT 
    l.titre,
    l.auteur,
    l.genre,
    COUNT(e.id) AS nombre_emprunts
FROM emprunts e
RIGHT JOIN livres l ON e.livre_id = l.id
GROUP BY l.id, l.titre, l.auteur, l.genre;`,
				sqlResult: [
					{ titre: "1984", auteur: "George Orwell", genre: "Science-Fiction", nombre_emprunts: 1 },
					{ titre: "Le Seigneur des Anneaux", auteur: "J.R.R. Tolkien", genre: "Fantasy", nombre_emprunts: 1 },
					{ titre: "Clean Code", auteur: "Robert Martin", genre: "Informatique", nombre_emprunts: 1 },
					{ titre: "Le Petit Prince", auteur: "Antoine de Saint-Exupéry", genre: "Conte", nombre_emprunts: 1 },
					{ titre: "Design Patterns", auteur: "Gang of Four", genre: "Informatique", nombre_emprunts: 0 },
				],
			},
			{
				title: "RIGHT EXCLUSIVE : Livres jamais empruntés",
				sqlCode: `-- Trouver les livres qui n'ont jamais été empruntés
SELECT 
    l.titre,
    l.auteur,
    l.genre,
    l.annee_publication
FROM emprunts e
RIGHT JOIN livres l ON e.livre_id = l.id
WHERE e.id IS NULL;`,
				sqlResult: [
					{ titre: "Design Patterns", auteur: "Gang of Four", genre: "Informatique", annee_publication: 1994 },
				],
			},
		],
	},
	{
		title: "FULL JOIN",
		content: `FULL JOIN (ou FULL OUTER JOIN) retourne toutes les lignes des deux tables, qu'il y ait correspondance ou non. Les colonnes sans correspondance seront NULL. Note : SQLite ne supporte pas FULL JOIN, il faut utiliser UNION.

Principe de syntaxe :
<code>FROM</code> TableA <code>FULL JOIN</code> TableB <code>ON</code> TableA.cle_primaire <code>=</code> TableB.cle_etrangere`,
		externalComponent: <JoinDiagramSingle type="full" />,
		sqlQueries: [
			{
				title: "Syntaxe générale",
				sqlCode: `-- FULL JOIN : toutes les lignes de A + toutes les lignes de B
-- Les lignes sans correspondance auront NULL de l'autre côté

SELECT colonnes
FROM TableA A
FULL OUTER JOIN TableB B ON A.cle_primaire = B.cle_etrangere;

-- Alternative pour SQLite (pas de FULL JOIN natif) :
SELECT colonnes FROM TableA A LEFT JOIN TableB B ON A.cle = B.cle
UNION
SELECT colonnes FROM TableA A RIGHT JOIN TableB B ON A.cle = B.cle;`,
			},
			{
				title: "Exemple : Vue complète utilisateurs/livres",
				sqlCode: `SELECT 
    u.prenom,
    u.nom,
    l.titre,
    l.genre,
    e.statut
FROM utilisateurs u
LEFT JOIN emprunts e ON u.id = e.utilisateur_id
FULL OUTER JOIN livres l ON e.livre_id = l.id;`,
				sqlResult: [
					{ prenom: "Alice", nom: "Dupont", titre: "1984", genre: "Science-Fiction", statut: "en_cours" },
					{ prenom: "Bob", nom: "Martin", titre: "Le Seigneur des Anneaux", genre: "Fantasy", statut: "en_cours" },
					{ prenom: "Claire", nom: "Durand", titre: "Clean Code", genre: "Informatique", statut: "en_cours" },
					{ prenom: "Alice", nom: "Dupont", titre: "Le Petit Prince", genre: "Conte", statut: "rendu" },
					{ prenom: "Emma", nom: "Bernard", titre: null, genre: null, statut: null },
					{ prenom: null, nom: null, titre: "Design Patterns", genre: "Informatique", statut: null },
				],
			},
			{
				title: "FULL EXCLUSIVE : Données non appariées",
				sqlCode: `-- Trouver les utilisateurs sans emprunts ET les livres jamais empruntés
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
				sqlResult: [
					{ prenom: "Emma", nom: "Bernard", titre: null, anomalie: "Utilisateur sans emprunt" },
					{ prenom: null, nom: null, titre: "Design Patterns", anomalie: "Livre jamais emprunté" },
				],
			},
		],
	},
	{
		title: "CROSS JOIN",
		content: `CROSS JOIN génère le produit cartésien : chaque ligne de la première table est combinée avec chaque ligne de la seconde. Attention : N lignes × M lignes = N×M résultats ! Utile pour générer des matrices ou des combinaisons.

Principe de syntaxe :
<code>FROM</code> TableA <code>CROSS JOIN</code> TableB
(pas de clause ON)`,
		sqlQueries: [
			{
				title: "Syntaxe générale",
				sqlCode: `-- CROSS JOIN : chaque ligne de A combinée avec chaque ligne de B
-- Pas de clause ON : aucune condition de jointure
-- Attention au nombre de résultats : N × M lignes !

SELECT colonnes
FROM TableA A
CROSS JOIN TableB B;

-- Syntaxe alternative (implicite) :
SELECT colonnes
FROM TableA A, TableB B;`,
			},
			{
				title: "Exemple : Matrice utilisateurs × genres littéraires",
				sqlCode: `-- Générer des recommandations : tous les utilisateurs × tous les genres
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
				sqlResult: [
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
				sqlCode: `-- Créer un planning : tous les livres × toutes les dates disponibles
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
				sqlResult: [
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
		content: `SELF JOIN permet de joindre une table avec elle-même. Indispensable pour les structures hiérarchiques ou pour comparer des lignes entre elles. Les alias sont obligatoires pour distinguer les deux "copies".

Principe de syntaxe :
<code>FROM</code> MaTable alias1 <code>JOIN</code> MaTable alias2 <code>ON</code> alias1.colonne <code>=</code> alias2.colonne`,
		sqlQueries: [
			{
				title: "Syntaxe générale",
				sqlCode: `-- SELF JOIN : joindre une table avec elle-même
-- Les alias sont OBLIGATOIRES pour distinguer les deux "copies"

SELECT colonnes
FROM MaTable alias1
JOIN MaTable alias2 ON alias1.colonne_ref = alias2.colonne_cible;

-- Structure hiérarchique typique (colonne qui référence la même table) :
CREATE TABLE categories (
    id INTEGER PRIMARY KEY,
    nom VARCHAR(100),
    parent_id INTEGER REFERENCES categories(id)  -- Auto-référence
);`,
			},
			{
				title: "Exemple : Utilisateurs nés la même année",
				sqlCode: `-- Comparer les dates de naissance des utilisateurs
SELECT 
    u1.prenom AS prenom1,
    u1.nom AS nom1,
    u2.prenom AS prenom2,
    u2.nom AS nom2,
    YEAR(u1.date_naissance) AS annee_naissance
FROM utilisateurs u1
JOIN utilisateurs u2 ON YEAR(u1.date_naissance) = YEAR(u2.date_naissance)
    AND u1.id < u2.id  -- Évite les doublons (A,B) et (B,A)
ORDER BY annee_naissance;`,
				sqlResult: [
					{ prenom1: "Alice", nom1: "Dupont", prenom2: "Bob", nom2: "Martin", annee_naissance: 1995 },
					{ prenom1: "Claire", nom1: "Durand", prenom2: "Emma", nom2: "Bernard", annee_naissance: 1998 },
				],
			},
			{
				title: "Livres du même auteur",
				sqlCode: `-- Trouver les livres écrits par le même auteur
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
				sqlResult: [
					{ livre1: "Clean Code", livre2: "The Clean Coder", auteur: "Robert Martin", annee1: 2008, annee2: 2011 },
				],
			},
		],
	},
];

export const brownBeltContent = {
	...menu,
	header,
	accordions,
};
