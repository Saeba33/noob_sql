import JoinsDiagram from "@/components/ui/sections/JoinsDiagram";

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
		title: "Schéma Récapitulatif des Types de Jointures",
		content:
			"Vue d'ensemble visuelle des différents types de jointures SQL et leurs résultats, représentés sous forme de diagrammes de Venn.",
		externalComponent: <JoinsDiagram />,
	},
	{
		title:
			"Clés Primaires et Étrangères - Conditions Nécessaires aux Jointures",
		content: "Comprenez les relations qui permettent de lier vos tables.",
		sqlCode: `-- Structure avec clés primaires et étrangères
CREATE TABLE utilisateurs (
    id INTEGER PRIMARY KEY,    -- Clé primaire
    nom VARCHAR(100),
    email VARCHAR(255)
);

CREATE TABLE commandes (
    id INTEGER PRIMARY KEY,    -- Clé primaire
    utilisateur_id INTEGER,   -- Clé étrangère
    produit VARCHAR(200),
    prix DECIMAL(10,2),
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id)
);

CREATE TABLE details_commande (
    id INTEGER PRIMARY KEY,
    commande_id INTEGER,      -- Clé étrangère vers commandes
    produit_id INTEGER,       -- Clé étrangère vers produits
    quantite INTEGER,
    FOREIGN KEY (commande_id) REFERENCES commandes(id),
    FOREIGN KEY (produit_id) REFERENCES produits(id)
);`,
	},
	{
		title: "JOIN (INNER JOIN) - Jointure Interne",
		content:
			"Retourne uniquement les lignes qui ont une correspondance dans les deux tables. C'est la jointure par défaut si on écrit simplement JOIN.",
		sqlQueries: [
			{
				title: "Syntaxe générale",
				sqlCode: `-- INNER JOIN : sélectionne uniquement les lignes avec correspondance
-- dans les deux tables (intersection)
SELECT colonnes
FROM TableA A
INNER JOIN TableB B ON A.cle = B.cle;

-- JOIN est équivalent à INNER JOIN
SELECT colonnes
FROM TableA A
JOIN TableB B ON A.cle = B.cle;`,
			},
			{
				title: "Exemple : Utilisateurs avec leurs commandes",
				sqlCode: `SELECT u.nom, c.produit, c.prix
FROM utilisateurs u
INNER JOIN commandes c ON u.id = c.utilisateur_id;`,
				sqlResult: [
					{ nom: "Alice Dupont", produit: "Laptop Pro", prix: 1299 },
					{ nom: "Bob Martin", produit: "Souris Gaming", prix: 89 },
					{ nom: "Claire Durand", produit: "Livre SQL", prix: 25 },
					{ nom: "David Moreau", produit: "Smartphone", prix: 799 },
				],
			},
			{
				title: "Jointure sur trois tables",
				sqlCode: `-- On peut enchaîner plusieurs JOIN
SELECT 
    u.nom AS client,
    p.nom AS produit,
    c.quantite,
    p.prix,
    (c.quantite * p.prix) AS total
FROM utilisateurs u
JOIN commandes c ON u.id = c.utilisateur_id
JOIN produits p ON c.produit_id = p.id;`,
				sqlResult: [
					{
						client: "Alice Dupont",
						produit: "Laptop Pro",
						quantite: 1,
						prix: 1299,
						total: 1299,
					},
					{
						client: "Bob Martin",
						produit: "Souris Gaming",
						quantite: 2,
						prix: 89,
						total: 178,
					},
					{
						client: "Claire Durand",
						produit: "Livre SQL",
						quantite: 1,
						prix: 25,
						total: 25,
					},
				],
			},
		],
	},
	{
		title: "LEFT JOIN (LEFT OUTER JOIN) - Jointure Externe Gauche",
		content:
			"Retourne toutes les lignes de la table de gauche (A), avec les correspondances de la table de droite (B) si elles existent. Les colonnes de B seront NULL s'il n'y a pas de correspondance.",
		sqlQueries: [
			{
				title: "Syntaxe générale",
				sqlCode: `-- LEFT JOIN : toutes les lignes de A + correspondances de B
-- Les lignes de A sans correspondance auront NULL pour les colonnes de B
SELECT colonnes
FROM TableA A
LEFT JOIN TableB B ON A.cle = B.cle;

-- LEFT OUTER JOIN est équivalent à LEFT JOIN
SELECT colonnes
FROM TableA A
LEFT OUTER JOIN TableB B ON A.cle = B.cle;`,
			},
			{
				title: "Exemple : Tous les utilisateurs (même sans commande)",
				sqlCode: `SELECT 
    u.nom,
    u.email,
    c.produit,
    c.prix
FROM utilisateurs u
LEFT JOIN commandes c ON u.id = c.utilisateur_id;`,
				sqlResult: [
					{
						nom: "Alice Dupont",
						email: "alice@email.com",
						produit: "Laptop Pro",
						prix: 1299,
					},
					{
						nom: "Bob Martin",
						email: "bob@email.com",
						produit: "Souris Gaming",
						prix: 89,
					},
					{
						nom: "Claire Durand",
						email: "claire@email.com",
						produit: "Livre SQL",
						prix: 25,
					},
					{
						nom: "David Moreau",
						email: "david@email.com",
						produit: "Smartphone",
						prix: 799,
					},
					{
						nom: "Emma Bernard",
						email: "emma@email.com",
						produit: null,
						prix: null,
					},
				],
			},
			{
				title: "LEFT EXCLUSIVE : Utilisateurs SANS commande",
				sqlCode: `-- Ajouter WHERE B.cle IS NULL pour exclure les correspondances
SELECT 
    u.nom,
    u.email,
    u.age
FROM utilisateurs u
LEFT JOIN commandes c ON u.id = c.utilisateur_id
WHERE c.id IS NULL;`,
				sqlResult: [{ nom: "Emma Bernard", email: "emma@email.com", age: 30 }],
			},
		],
	},
	{
		title: "RIGHT JOIN (RIGHT OUTER JOIN) - Jointure Externe Droite",
		content:
			"Retourne toutes les lignes de la table de droite (B), avec les correspondances de la table de gauche (A) si elles existent. En pratique, on préfère souvent réécrire un RIGHT JOIN en LEFT JOIN en inversant l'ordre des tables.",
		sqlQueries: [
			{
				title: "Syntaxe générale",
				sqlCode: `-- RIGHT JOIN : toutes les lignes de B + correspondances de A
-- Les lignes de B sans correspondance auront NULL pour les colonnes de A
SELECT colonnes
FROM TableA A
RIGHT JOIN TableB B ON A.cle = B.cle;

-- Équivalent avec LEFT JOIN (plus lisible) :
SELECT colonnes
FROM TableB B
LEFT JOIN TableA A ON B.cle = A.cle;`,
			},
			{
				title: "Exemple : Toutes les commandes (même orphelines)",
				sqlCode: `SELECT 
    u.nom,
    c.produit,
    c.prix,
    c.date_commande
FROM utilisateurs u
RIGHT JOIN commandes c ON u.id = c.utilisateur_id;`,
				sqlResult: [
					{
						nom: "Alice Dupont",
						produit: "Laptop Pro",
						prix: 1299,
						date_commande: "2024-01-15",
					},
					{
						nom: "Bob Martin",
						produit: "Souris Gaming",
						prix: 89,
						date_commande: "2024-01-18",
					},
					{
						nom: "Claire Durand",
						produit: "Livre SQL",
						prix: 25,
						date_commande: "2024-02-05",
					},
					{
						nom: "David Moreau",
						produit: "Smartphone",
						prix: 799,
						date_commande: "2024-02-20",
					},
					{
						nom: null,
						produit: "Commande Orpheline",
						prix: 150,
						date_commande: "2024-03-01",
					},
				],
			},
			{
				title: "RIGHT EXCLUSIVE : Commandes orphelines",
				sqlCode: `-- Trouver les commandes sans utilisateur valide
SELECT 
    c.id,
    c.produit,
    c.prix,
    c.utilisateur_id
FROM utilisateurs u
RIGHT JOIN commandes c ON u.id = c.utilisateur_id
WHERE u.id IS NULL;`,
				sqlResult: [
					{
						id: 5,
						produit: "Commande Orpheline",
						prix: 150,
						utilisateur_id: 999,
					},
				],
			},
		],
	},
	{
		title: "FULL JOIN (FULL OUTER JOIN) - Jointure Externe Complète",
		content:
			"Retourne toutes les lignes des deux tables, avec ou sans correspondance. Les lignes sans correspondance dans l'une ou l'autre table auront NULL pour les colonnes de l'autre table. Note : SQLite ne supporte pas FULL JOIN directement, il faut utiliser UNION.",
		sqlQueries: [
			{
				title: "Syntaxe générale",
				sqlCode: `-- FULL JOIN : toutes les lignes de A + toutes les lignes de B
-- Les lignes sans correspondance auront NULL de l'autre côté
SELECT colonnes
FROM TableA A
FULL OUTER JOIN TableB B ON A.cle = B.cle;

-- Pour SQLite (pas de FULL JOIN natif), utiliser UNION :
SELECT colonnes FROM TableA A LEFT JOIN TableB B ON A.cle = B.cle
UNION
SELECT colonnes FROM TableA A RIGHT JOIN TableB B ON A.cle = B.cle;`,
			},
			{
				title: "Exemple : Vue complète utilisateurs/commandes",
				sqlCode: `SELECT 
    u.nom,
    u.email,
    c.produit,
    c.prix
FROM utilisateurs u
FULL OUTER JOIN commandes c ON u.id = c.utilisateur_id;`,
				sqlResult: [
					{
						nom: "Alice Dupont",
						email: "alice@email.com",
						produit: "Laptop Pro",
						prix: 1299,
					},
					{
						nom: "Bob Martin",
						email: "bob@email.com",
						produit: "Souris Gaming",
						prix: 89,
					},
					{
						nom: "Emma Bernard",
						email: "emma@email.com",
						produit: null,
						prix: null,
					},
					{
						nom: null,
						email: null,
						produit: "Commande Orpheline",
						prix: 150,
					},
				],
			},
			{
				title: "FULL EXCLUSIVE : Données non appariées",
				sqlCode: `-- Trouver TOUS les enregistrements orphelins (des deux côtés)
SELECT 
    u.nom,
    c.produit,
    CASE 
        WHEN u.id IS NULL THEN 'Commande orpheline'
        WHEN c.id IS NULL THEN 'Utilisateur sans commande'
    END AS anomalie
FROM utilisateurs u
FULL OUTER JOIN commandes c ON u.id = c.utilisateur_id
WHERE u.id IS NULL OR c.id IS NULL;`,
				sqlResult: [
					{
						nom: "Emma Bernard",
						produit: null,
						anomalie: "Utilisateur sans commande",
					},
					{
						nom: null,
						produit: "Commande Orpheline",
						anomalie: "Commande orpheline",
					},
				],
			},
		],
	},
	{
		title: "CROSS JOIN - Produit Cartésien",
		content:
			"Génère toutes les combinaisons possibles entre deux tables. Le nombre de lignes résultat est le produit des deux tables (5 lignes × 4 lignes = 20 combinaisons). Utile pour générer des matrices, des plannings, ou des variantes de produits.",
		sqlQueries: [
			{
				title: "Syntaxe générale",
				sqlCode: `-- CROSS JOIN : chaque ligne de A combinée avec chaque ligne de B
-- Attention : N lignes × M lignes = N×M résultats !
SELECT colonnes
FROM TableA A
CROSS JOIN TableB B;

-- Syntaxe alternative (implicite) :
SELECT colonnes
FROM TableA A, TableB B;  -- Équivalent mais moins explicite`,
			},
			{
				title: "Exemple : Matrice tailles × couleurs",
				sqlCode: `-- Générer toutes les variantes d'un produit
SELECT 
    t.nom AS taille,
    c.nom AS couleur,
    CONCAT(t.nom, ' - ', c.nom) AS variante
FROM tailles t
CROSS JOIN couleurs c
ORDER BY t.ordre, c.ordre;`,
				sqlResult: [
					{ taille: "S", couleur: "Rouge", variante: "S - Rouge" },
					{ taille: "S", couleur: "Bleu", variante: "S - Bleu" },
					{ taille: "S", couleur: "Vert", variante: "S - Vert" },
					{ taille: "M", couleur: "Rouge", variante: "M - Rouge" },
					{ taille: "M", couleur: "Bleu", variante: "M - Bleu" },
					{ taille: "M", couleur: "Vert", variante: "M - Vert" },
					{ taille: "L", couleur: "Rouge", variante: "L - Rouge" },
					{ taille: "L", couleur: "Bleu", variante: "L - Bleu" },
					{ taille: "L", couleur: "Vert", variante: "L - Vert" },
				],
			},
			{
				title: "Cas pratique : Génération de créneaux",
				sqlCode: `-- Créer un planning : toutes les dates × toutes les heures
SELECT 
    d.date,
    h.heure,
    DATETIME(d.date || ' ' || h.heure) AS creneau
FROM dates_semaine d
CROSS JOIN heures_ouverture h
WHERE d.jour_semaine NOT IN ('samedi', 'dimanche')
LIMIT 8;`,
				sqlResult: [
					{ date: "2024-07-15", heure: "09:00", creneau: "2024-07-15 09:00" },
					{ date: "2024-07-15", heure: "10:00", creneau: "2024-07-15 10:00" },
					{ date: "2024-07-15", heure: "11:00", creneau: "2024-07-15 11:00" },
					{ date: "2024-07-15", heure: "14:00", creneau: "2024-07-15 14:00" },
					{ date: "2024-07-16", heure: "09:00", creneau: "2024-07-16 09:00" },
					{ date: "2024-07-16", heure: "10:00", creneau: "2024-07-16 10:00" },
					{ date: "2024-07-16", heure: "11:00", creneau: "2024-07-16 11:00" },
					{ date: "2024-07-16", heure: "14:00", creneau: "2024-07-16 14:00" },
				],
			},
		],
	},
	{
		title: "SELF JOIN - Auto-jointure",
		content:
			"Permet de joindre une table avec elle-même. Indispensable pour analyser les structures hiérarchiques (employés/managers, catégories/sous-catégories) ou comparer des lignes de la même table entre elles.",
		sqlQueries: [
			{
				title: "Syntaxe générale",
				sqlCode: `-- SELF JOIN : joindre une table avec elle-même
-- Les alias (A et B) sont OBLIGATOIRES pour distinguer les deux "copies"
SELECT colonnes
FROM MaTable A
JOIN MaTable B ON A.colonne_reference = B.colonne_cible;

-- Structure hiérarchique typique :
-- La colonne manager_id référence id de la même table
CREATE TABLE employes (
    id INTEGER PRIMARY KEY,
    nom VARCHAR(100),
    manager_id INTEGER,  -- Référence vers id (même table)
    FOREIGN KEY (manager_id) REFERENCES employes(id)
);`,
			},
			{
				title: "Exemple : Employés avec leur manager",
				sqlCode: `-- Trouver le manager de chaque employé
SELECT 
    e.nom AS employe,
    e.poste,
    m.nom AS manager
FROM employes e
LEFT JOIN employes m ON e.manager_id = m.id;`,
				sqlResult: [
					{ employe: "Alice Dupont", poste: "PDG", manager: null },
					{
						employe: "Bob Martin",
						poste: "Directeur IT",
						manager: "Alice Dupont",
					},
					{
						employe: "Claire Durand",
						poste: "Développeuse",
						manager: "Bob Martin",
					},
					{
						employe: "David Moreau",
						poste: "Développeur",
						manager: "Bob Martin",
					},
				],
			},
			{
				title: "Trouver les collègues (même manager)",
				sqlCode: `-- Comparer des lignes de la même table entre elles
SELECT 
    e1.nom AS employe1,
    e2.nom AS employe2,
    m.nom AS manager_commun
FROM employes e1
JOIN employes e2 ON e1.manager_id = e2.manager_id 
    AND e1.id < e2.id  -- Évite les doublons (A,B) et (B,A)
JOIN employes m ON e1.manager_id = m.id;`,
				sqlResult: [
					{
						employe1: "Claire Durand",
						employe2: "David Moreau",
						manager_commun: "Bob Martin",
					},
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
