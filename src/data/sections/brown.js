import JoinDiagramSingle from "@/components/ui/sections/brown/JoinDiagramSingle";
import JoinsDiagram from "@/components/ui/sections/brown/JoinsDiagram";

const menu = {
	summary: "Relations entre les tables",
	topics: [
		"Types de jointures",
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
		section: "Types de jointures",
		content:
			"Pour mieux comprendre comment combiner les données de plusieurs tables en SQL, voici un schéma récapitulatif des quatres principaux types de jointures : INNER JOIN, LEFT JOIN, RIGHT JOIN et FULL JOIN. Il illustre la façon dont chaque jointure inclut ou exclut les enregistrements selon leur présence dans les tables concernées.",
		externalComponent: <JoinsDiagram />,
	},
	{
		section: "Clés primaires & étrangères",
		content:
			"Les clés primaires et étrangères sont indispensables pour établir des jointures entre tables. Elles définissent les relations qui lient les enregistrements d'une table à ceux d'une autre. Sans elles, il n'est pas possible de faire de jointures entre les tables.",
		examples: [
			{
				type: "schema",
				label: "Structure de la base bibliothèque",
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
		section: "INNER JOIN",
		content: `INNER JOIN, qui peut s'écrire simplement JOIN, retourne uniquement les lignes ayant une correspondance dans les deux tables (intersection). \n\nPrincipe de syntaxe :\n<code>FROM</code> nom_de_la_table_A\n<code>JOIN</code> nom_de_la_table_B <code>ON</code> nom_de_la_table_A <code>.</code> nom_de_la_cle_primaire <code>=</code> nom_de_la_table_B <code>.</code> nom_de_la_cle_etrangere`,
		externalComponent: <JoinDiagramSingle type="inner" />,
		examples: [
			{
				label: "Syntaxe générale",
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
				label: "Exemple : jointure sur deux tables (utilisateurs et emprunts)",
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
				label:
					"Exemple : jointure sur trois tables (utilisateurs, livres et emprunts)",
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
		section: "LEFT JOIN",
		content: `LEFT JOIN, qui peut également s'écrire LEFT OUTER JOIN, retourne toutes les lignes de la table de gauche (après FROM), avec les correspondances de la table de droite si elles existent. S'il n'y a pas de correspondance, les colonnes de la table de droite seront NULL.\n\nPrincipe de syntaxe :\n<code>FROM</code> nom_de_la_table_A\n<code>LEFT JOIN</code> nom_de_la_table_B <code>ON</code> nom_de_la_table_A <code>.</code> nom_de_la_cle_primaire <code>=</code> nom_de_la_table_B <code>.</code> nom_de_la_cle_etrangere`,
		externalComponent: <JoinDiagramSingle type="left" />,
		examples: [
			{
				label: "Syntaxe générale",
				code: `-- On peut l'écrire de 3 façons :

-- LEFT JOIN sans alias (on retourne le nom complet de la table dans le ON)
SELECT colonnes
FROM TableA
LEFT JOIN TableB ON TableA.cle_primaire = TableB.cle_etrangere;

-- LEFT JOIN avec alias et mot-clé AS (on retourne l'alias de la table dans le ON)
SELECT colonnes
FROM TableA AS A
LEFT JOIN TableB AS B ON A.cle_primaire = B.cle_etrangere;

-- LEFT JOIN avec alias et sans mot-clé AS
-- Le mot-clé AS est optionnel pour les alias de table
SELECT colonnes
FROM TableA A
LEFT JOIN TableB B ON A.cle_primaire = B.cle_etrangere;`,
			},
			{
				label: "Exemple : jointure sur deux tables (utilisateurs et emprunts)",
				code: `-- Afficher tous les utilisateurs avec le nombre d'emprunts
SELECT 
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
				label: "Exemple : jointure sur trois tables avec filtre exclusif",
				code: `-- Trouver les utilisateurs qui n'ont jamais emprunté de livres du genre "Informatique"
SELECT 
    u.prenom,
    u.nom,
    u.email,
    u.date_inscription
FROM utilisateurs u
LEFT JOIN emprunts e ON u.id = e.utilisateur_id
LEFT JOIN livres l ON e.livre_id = l.id AND l.genre = 'Informatique'
WHERE l.id IS NULL
GROUP BY u.id, u.prenom, u.nom, u.email, u.date_inscription;`,
				result: [
					{
						prenom: "Alice",
						nom: "Dupont",
						email: "alice@email.com",
						date_inscription: "2024-08-15",
					},
					{
						prenom: "Bob",
						nom: "Martin",
						email: "bob@email.com",
						date_inscription: "2024-09-20",
					},
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
		section: "RIGHT JOIN",
		content: `RIGHT JOIN, qui peut également s'écrire RIGHT OUTER JOIN, retourne toutes les lignes de la table de droite (après JOIN), avec les correspondances de la table de gauche si elles existent. En pratique, on préfère souvent réécrire un RIGHT JOIN en LEFT JOIN en inversant l'ordre des tables.\n\nPrincipe de syntaxe :\n<code>FROM</code> nom_de_la_table_A\n<code>RIGHT JOIN</code> nom_de_la_table_B <code>ON</code> nom_de_la_table_A <code>.</code> nom_de_la_cle_primaire <code>=</code> nom_de_la_table_B <code>.</code> nom_de_la_cle_etrangere`,
		externalComponent: <JoinDiagramSingle type="right" />,
		examples: [
			{
				label: "Syntaxe générale",
				code: `-- On peut l'écrire de 3 façons :

-- RIGHT JOIN sans alias (on retourne le nom complet de la table dans le ON)
SELECT colonnes
FROM TableA
RIGHT JOIN TableB ON TableA.cle_primaire = TableB.cle_etrangere;

-- RIGHT JOIN avec alias et mot-clé AS (on retourne l'alias de la table dans le ON)
SELECT colonnes
FROM TableA AS A
RIGHT JOIN TableB AS B ON A.cle_primaire = B.cle_etrangere;

-- RIGHT JOIN avec alias et sans mot-clé AS
-- Le mot-clé AS est optionnel pour les alias de table
SELECT colonnes
FROM TableA A
RIGHT JOIN TableB B ON A.cle_primaire = B.cle_etrangere;`,
			},
			{
				label: "Exemple : jointure sur deux tables (emprunts et livres)",
				code: `-- Afficher tous les livres avec le nombre d'emprunts
SELECT 
    l.titre,
    l.auteur,
    l.genre,
    COUNT(e.id) AS nombre_emprunts
FROM emprunts e
RIGHT JOIN livres l ON e.livre_id = l.id
GROUP BY l.id, l.titre, l.auteur, l.genre
ORDER BY nombre_emprunts DESC;`,
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
				label: "Exemple : jointure sur trois tables avec analyse des emprunts",
				code: `-- Afficher tous les livres avec les emprunts en cours et les utilisateurs
SELECT 
    l.titre,
    l.genre,
    u.prenom,
    u.nom,
    e.date_emprunt,
    e.date_retour_prevue,
    e.statut
FROM utilisateurs u
JOIN emprunts e ON u.id = e.utilisateur_id
RIGHT JOIN livres l ON e.livre_id = l.id
ORDER BY l.titre;`,
				result: [
					{
						titre: "1984",
						genre: "Science-Fiction",
						prenom: "Alice",
						nom: "Dupont",
						date_emprunt: "2024-11-15",
						date_retour_prevue: "2024-12-15",
						statut: "en_cours",
					},
					{
						titre: "Clean Code",
						genre: "Informatique",
						prenom: "Claire",
						nom: "Durand",
						date_emprunt: "2024-11-25",
						date_retour_prevue: "2024-12-25",
						statut: "en_cours",
					},
					{
						titre: "Design Patterns",
						genre: "Informatique",
						prenom: null,
						nom: null,
						date_emprunt: null,
						date_retour_prevue: null,
						statut: null,
					},
					{
						titre: "Le Petit Prince",
						genre: "Conte",
						prenom: "Alice",
						nom: "Dupont",
						date_emprunt: "2024-10-01",
						date_retour_prevue: "2024-10-31",
						statut: "rendu",
					},
					{
						titre: "Le Seigneur des Anneaux",
						genre: "Fantasy",
						prenom: "Bob",
						nom: "Martin",
						date_emprunt: "2024-11-20",
						date_retour_prevue: "2024-12-20",
						statut: "en_cours",
					},
				],
			},
		],
	},
	{
		section: "FULL JOIN",
		content: `FULL JOIN, qui peut également s'écrire FULL OUTER JOIN, retourne toutes les lignes des deux tables, qu'il y ait correspondance ou non. Les colonnes sans correspondance seront NULL.\n\nNote : SQLite ne supporte pas FULL JOIN nativement, il faut utiliser UNION pour combiner LEFT et RIGHT JOIN.\n\nPrincipe de syntaxe :\n<code>FROM</code> nom_de_la_table_A\n<code>FULL JOIN</code> nom_de_la_table_B <code>ON</code> nom_de_la_table_A <code>.</code> nom_de_la_cle_primaire <code>=</code> nom_de_la_table_B <code>.</code> nom_de_la_cle_etrangere`,
		externalComponent: <JoinDiagramSingle type="full" />,
		examples: [
			{
				label: "Syntaxe générale",
				code: `-- On peut l'écrire de 3 façons :

-- FULL JOIN sans alias (on retourne le nom complet de la table dans le ON)
SELECT colonnes
FROM TableA
FULL OUTER JOIN TableB ON TableA.cle_primaire = TableB.cle_etrangere;

-- FULL JOIN avec alias et mot-clé AS (on retourne l'alias de la table dans le ON)
SELECT colonnes
FROM TableA AS A
FULL OUTER JOIN TableB AS B ON A.cle_primaire = B.cle_etrangere;

-- FULL JOIN avec alias et sans mot-clé AS
-- Le mot-clé AS est optionnel pour les alias de table
SELECT colonnes
FROM TableA A
FULL OUTER JOIN TableB B ON A.cle_primaire = B.cle_etrangere;`,
			},
			{
				label: "Exemple : jointure sur deux tables (utilisateurs et emprunts)",
				code: `-- Vue complète : tous les utilisateurs ET tous les emprunts (même orphelins)
SELECT 
    u.prenom,
    u.nom,
    u.email,
    e.date_emprunt,
    e.date_retour_prevue,
    e.statut
FROM utilisateurs u
FULL OUTER JOIN emprunts e ON u.id = e.utilisateur_id
ORDER BY u.nom, e.date_emprunt;`,
				result: [
					{
						prenom: "Emma",
						nom: "Bernard",
						email: "emma@email.com",
						date_emprunt: null,
						date_retour_prevue: null,
						statut: null,
					},
					{
						prenom: "Alice",
						nom: "Dupont",
						email: "alice@email.com",
						date_emprunt: "2024-10-01",
						date_retour_prevue: "2024-10-31",
						statut: "rendu",
					},
					{
						prenom: "Alice",
						nom: "Dupont",
						email: "alice@email.com",
						date_emprunt: "2024-11-15",
						date_retour_prevue: "2024-12-15",
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
					{
						prenom: "Bob",
						nom: "Martin",
						email: "bob@email.com",
						date_emprunt: "2024-11-20",
						date_retour_prevue: "2024-12-20",
						statut: "en_cours",
					},
				],
			},
			{
				label: "Exemple : jointure sur trois tables avec détection d'anomalies",
				code: `-- Audit complet : utilisateurs, emprunts et livres (incluant les orphelins)
SELECT 
    u.prenom,
    u.nom,
    l.titre,
    l.genre,
    e.statut,
    CASE 
        WHEN u.id IS NULL THEN 'Emprunt sans utilisateur'
        WHEN l.id IS NULL THEN 'Emprunt sans livre'
        WHEN e.id IS NULL AND u.id IS NOT NULL THEN 'Utilisateur sans emprunt'
        WHEN e.id IS NULL AND l.id IS NOT NULL THEN 'Livre jamais emprunté'
        ELSE 'OK'
    END AS etat
FROM utilisateurs u
FULL OUTER JOIN emprunts e ON u.id = e.utilisateur_id
FULL OUTER JOIN livres l ON e.livre_id = l.id
ORDER BY etat DESC, u.nom;`,
				result: [
					{
						prenom: "Emma",
						nom: "Bernard",
						titre: null,
						genre: null,
						statut: null,
						etat: "Utilisateur sans emprunt",
					},
					{
						prenom: null,
						nom: null,
						titre: "Design Patterns",
						genre: "Informatique",
						statut: null,
						etat: "Livre jamais emprunté",
					},
					{
						prenom: "Alice",
						nom: "Dupont",
						titre: "1984",
						genre: "Science-Fiction",
						statut: "en_cours",
						etat: "OK",
					},
					{
						prenom: "Alice",
						nom: "Dupont",
						titre: "Le Petit Prince",
						genre: "Conte",
						statut: "rendu",
						etat: "OK",
					},
					{
						prenom: "Bob",
						nom: "Martin",
						titre: "Le Seigneur des Anneaux",
						genre: "Fantasy",
						statut: "en_cours",
						etat: "OK",
					},
					{
						prenom: "Claire",
						nom: "Durand",
						titre: "Clean Code",
						genre: "Informatique",
						statut: "en_cours",
						etat: "OK",
					},
				],
			},
		],
	},
	{
		section: "CROSS JOIN",
		content: `CROSS JOIN génère le produit cartésien : chaque ligne de la première table est combinée avec chaque ligne de la seconde. Attention : N lignes × M lignes = N×M résultats ! Utile pour générer des matrices ou des combinaisons.\n\nPrincipe de syntaxe :\n<code>FROM</code> nom_de_la_table_A\n<code>CROSS JOIN</code> nom_de_la_table_B\n\nNote : CROSS JOIN n'utilise pas de clause <code>ON</code> car il n'y a aucune condition de jointure.`,
		examples: [
			{
				label: "Syntaxe générale",
				code: `-- On peut l'écrire de 3 façons :

-- CROSS JOIN sans alias
-- Pas de clause ON car aucune condition de jointure
-- Attention : génère N × M lignes !
SELECT colonnes
FROM TableA
CROSS JOIN TableB;

-- CROSS JOIN avec alias et mot-clé AS
SELECT colonnes
FROM TableA AS A
CROSS JOIN TableB AS B;

-- CROSS JOIN avec alias et sans mot-clé AS
-- Le mot-clé AS est optionnel pour les alias de table
SELECT colonnes
FROM TableA A
CROSS JOIN TableB B;`,
			},
			{
				label: "Exemple : produit cartésien simple (utilisateurs × genres)",
				code: `-- Générer toutes les combinaisons utilisateurs × genres littéraires
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
LIMIT 12;`,
				result: [
					{ prenom: "Emma", nom: "Bernard", genre: "Conte" },
					{ prenom: "Emma", nom: "Bernard", genre: "Fantasy" },
					{ prenom: "Emma", nom: "Bernard", genre: "Informatique" },
					{ prenom: "Emma", nom: "Bernard", genre: "Science-Fiction" },
					{ prenom: "Alice", nom: "Dupont", genre: "Conte" },
					{ prenom: "Alice", nom: "Dupont", genre: "Fantasy" },
					{ prenom: "Alice", nom: "Dupont", genre: "Informatique" },
					{ prenom: "Alice", nom: "Dupont", genre: "Science-Fiction" },
					{ prenom: "Claire", nom: "Durand", genre: "Conte" },
					{ prenom: "Claire", nom: "Durand", genre: "Fantasy" },
					{ prenom: "Claire", nom: "Durand", genre: "Informatique" },
					{ prenom: "Claire", nom: "Durand", genre: "Science-Fiction" },
				],
			},
			{
				label: "Exemple : matrice complexe avec filtres et comptages",
				code: `-- Créer une matrice de recommandations : utilisateurs × livres avec score de compatibilité
SELECT 
    u.prenom,
    u.nom,
    l.titre,
    l.genre,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM emprunts e 
            WHERE e.utilisateur_id = u.id 
            AND e.livre_id = l.id
        ) THEN 'Déjà emprunté'
        WHEN l.genre = 'Informatique' THEN 'Recommandé'
        ELSE 'Disponible'
    END AS statut_recommandation
FROM utilisateurs u
CROSS JOIN livres l
WHERE u.prenom IN ('Alice', 'Emma')
ORDER BY u.nom, l.titre
LIMIT 8;`,
				result: [
					{
						prenom: "Emma",
						nom: "Bernard",
						titre: "1984",
						genre: "Science-Fiction",
						statut_recommandation: "Disponible",
					},
					{
						prenom: "Emma",
						nom: "Bernard",
						titre: "Clean Code",
						genre: "Informatique",
						statut_recommandation: "Recommandé",
					},
					{
						prenom: "Emma",
						nom: "Bernard",
						titre: "Design Patterns",
						genre: "Informatique",
						statut_recommandation: "Recommandé",
					},
					{
						prenom: "Emma",
						nom: "Bernard",
						titre: "Le Petit Prince",
						genre: "Conte",
						statut_recommandation: "Disponible",
					},
					{
						prenom: "Alice",
						nom: "Dupont",
						titre: "1984",
						genre: "Science-Fiction",
						statut_recommandation: "Déjà emprunté",
					},
					{
						prenom: "Alice",
						nom: "Dupont",
						titre: "Clean Code",
						genre: "Informatique",
						statut_recommandation: "Recommandé",
					},
					{
						prenom: "Alice",
						nom: "Dupont",
						titre: "Design Patterns",
						genre: "Informatique",
						statut_recommandation: "Recommandé",
					},
					{
						prenom: "Alice",
						nom: "Dupont",
						titre: "Le Petit Prince",
						genre: "Conte",
						statut_recommandation: "Déjà emprunté",
					},
				],
			},
		],
	},
	{
		section: "SELF JOIN",
		content: `SELF JOIN permet de joindre une table avec elle-même. Indispensable pour les structures hiérarchiques ou pour comparer des lignes entre elles. Les alias sont obligatoires pour distinguer les deux "copies" de la table.\n\nPrincipe de syntaxe :\n<code>FROM</code> nom_de_la_table alias1\n<code>JOIN</code> nom_de_la_table alias2 <code>ON</code> alias1 <code>.</code> nom_colonne <code>=</code> alias2 <code>.</code> nom_colonne`,
		examples: [
			{
				label: "Syntaxe générale",
				code: `-- On peut l'écrire de 2 façons :

-- SELF JOIN avec alias et mot-clé AS (les alias sont OBLIGATOIRES)
SELECT colonnes
FROM MaTable AS alias1
JOIN MaTable AS alias2 ON alias1.colonne = alias2.colonne;

-- SELF JOIN avec alias et sans mot-clé AS
-- Le mot-clé AS est optionnel pour les alias de table
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
				label: "Exemple : comparaison simple (livres du même auteur)",
				code: `-- Trouver les paires de livres écrits par le même auteur
SELECT 
    l1.titre AS livre1,
    l2.titre AS livre2,
    l1.auteur,
    l1.annee_publication AS annee1,
    l2.annee_publication AS annee2
FROM livres l1
JOIN livres l2 ON l1.auteur = l2.auteur
    AND l1.id < l2.id  -- Évite les doublons (A-B et B-A)
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
			{
				label: "Exemple : analyse des emprunts consécutifs par utilisateur",
				code: `-- Trouver les emprunts consécutifs d'un même utilisateur
-- Utile pour analyser les délais entre emprunts
SELECT 
    u.prenom,
    u.nom,
    l1.titre AS livre_precedent,
    e1.date_retour_reel AS date_retour,
    l2.titre AS livre_suivant,
    e2.date_emprunt AS nouvelle_date_emprunt,
    JULIANDAY(e2.date_emprunt) - JULIANDAY(e1.date_retour_reel) AS jours_entre_emprunts
FROM emprunts e1
JOIN emprunts e2 ON e1.utilisateur_id = e2.utilisateur_id
    AND e1.date_retour_reel < e2.date_emprunt
    AND e1.id != e2.id
JOIN utilisateurs u ON e1.utilisateur_id = u.id
JOIN livres l1 ON e1.livre_id = l1.id
JOIN livres l2 ON e2.livre_id = l2.id
WHERE e1.date_retour_reel IS NOT NULL
ORDER BY u.nom, e1.date_retour_reel;`,
				result: [
					{
						prenom: "Alice",
						nom: "Dupont",
						livre_precedent: "Le Petit Prince",
						date_retour: "2024-10-15",
						livre_suivant: "1984",
						nouvelle_date_emprunt: "2024-11-15",
						jours_entre_emprunts: 31,
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
