export const brownBeltContent = {
	// Belt configuration
	belt: "brown",
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

	// Content sections
	header: {
		title: "Jointures",
		description: "Maîtrisez les relations entre tables avec les jointures",
		tag: "Ceinture Marron",
	},
	pageDescription: {
		title: "Connectez vos Tables avec les Jointures",
		content:
			"La ceinture marron vous enseigne l'art des jointures, permettant de relier les données de plusieurs tables. Comprenez les clés primaires et étrangères, explorez tous les types de jointures (INNER, LEFT, RIGHT, FULL, CROSS, SELF) et apprenez à construire des requêtes complexes sur plusieurs tables.",
	},
	accordions: [
		{
			title: "Schéma Récapitulatif des Types de Jointures",
			content:
				"Vue d'ensemble visuelle des différents types de jointures et leurs résultats.",
			sqlDiagram: `Types de Jointures - Vue d'ensemble

Table A          Table B
┌─────┐         ┌─────┐
│ 1,2,│         │ 2,3,│
│ 3,4 │         │ 4,5 │
└─────┘         └─────┘

INNER JOIN       LEFT JOIN        RIGHT JOIN       FULL JOIN
┌─────┐         ┌─────┐           ┌─────┐         ┌─────┐
│ 2,3,│         │ 1,2,│           │ 2,3,│         │ 1,2,│
│  4  │         │ 3,4 │           │ 4,5 │         │ 3,4,│
└─────┘         └─────┘           └─────┘         │  5  │
                                                  └─────┘

CROSS JOIN : Produit cartésien (A × B)
SELF JOIN : Table jointe avec elle-même`,
			description:
				"Chaque type de jointure a un usage spécifique selon les données que vous voulez récupérer.",
		},
		{
			title:
				"Clés Primaires et Étrangères - Conditions Nécessaires aux Jointures",
			content: "Comprenez les relations qui permettent de lier vos tables.",
			sqlSchema: `-- Structure avec clés primaires et étrangères
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
			description:
				"Les clés primaires identifient de manière unique chaque ligne. Les clés étrangères créent les relations entre tables.",
		},
		{
			title: "JOIN (INNER JOIN) - Jointure Interne",
			content:
				"Récupérez uniquement les lignes qui ont une correspondance dans les deux tables. 💡 Rappel : Les jointures reposent sur les clés primaires (PK) et étrangères (FK) vues en Ceinture Blanche - la PK identifie uniquement chaque ligne, la FK référence une PK d'une autre table pour créer la relation.",
			sqlQueries: [
				{
					title: "INNER JOIN basique",
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
					title: "INNER JOIN avec alias et condition",
					sqlCode: `SELECT 
    u.nom AS client,
    c.produit,
    c.prix,
    c.date_commande
FROM utilisateurs u
JOIN commandes c ON u.id = c.utilisateur_id
WHERE c.prix > 100;`,
					sqlResult: [
						{
							client: "Alice Dupont",
							produit: "Laptop Pro",
							prix: 1299,
							date_commande: "2024-01-15",
						},
						{
							client: "David Moreau",
							produit: "Smartphone",
							prix: 799,
							date_commande: "2024-02-20",
						},
					],
				},
				{
					title: "Jointure sur trois tables",
					sqlCode: `SELECT 
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
			description:
				"INNER JOIN ne retourne que les lignes qui existent dans les deux tables. C'est la jointure la plus courante.",
		},
		{
			title: "LEFT JOIN (LEFT OUTER JOIN) - Jointure Externe Gauche",
			content:
				"Récupérez toutes les lignes de la table de gauche, même sans correspondance à droite.",
			sqlQueries: [
				{
					title: "LEFT JOIN - Tous les utilisateurs",
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
					title: "Trouver les utilisateurs sans commandes",
					sqlCode: `SELECT 
    u.nom,
    u.email,
    u.age
FROM utilisateurs u
LEFT JOIN commandes c ON u.id = c.utilisateur_id
WHERE c.id IS NULL;`,
					sqlResult: [
						{ nom: "Emma Bernard", email: "emma@email.com", age: 30 },
					],
				},
				{
					title: "LEFT JOIN avec agrégation",
					sqlCode: `SELECT 
    u.nom,
    u.email,
    COUNT(c.id) AS nombre_commandes,
    COALESCE(SUM(c.prix), 0) AS total_depense
FROM utilisateurs u
LEFT JOIN commandes c ON u.id = c.utilisateur_id
GROUP BY u.id, u.nom, u.email
ORDER BY total_depense DESC;`,
					sqlResult: [
						{
							nom: "Alice Dupont",
							email: "alice@email.com",
							nombre_commandes: 1,
							total_depense: 1299,
						},
						{
							nom: "David Moreau",
							email: "david@email.com",
							nombre_commandes: 1,
							total_depense: 799,
						},
						{
							nom: "Bob Martin",
							email: "bob@email.com",
							nombre_commandes: 1,
							total_depense: 89,
						},
						{
							nom: "Claire Durand",
							email: "claire@email.com",
							nombre_commandes: 1,
							total_depense: 25,
						},
						{
							nom: "Emma Bernard",
							email: "emma@email.com",
							nombre_commandes: 0,
							total_depense: 0,
						},
					],
				},
			],
			description:
				"LEFT JOIN garde toutes les lignes de la table de gauche. Parfait pour trouver les éléments sans relation.",
		},
		{
			title: "RIGHT JOIN (RIGHT OUTER JOIN) - Jointure Externe Droite",
			content:
				"Récupérez toutes les lignes de la table de droite, même sans correspondance à gauche.",
			sqlQueries: [
				{
					title: "RIGHT JOIN - Toutes les commandes",
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
					title: "Équivalent avec LEFT JOIN (plus lisible)",
					sqlCode: `SELECT 
    u.nom,
    c.produit,
    c.prix,
    c.date_commande
FROM commandes c
LEFT JOIN utilisateurs u ON c.utilisateur_id = u.id;`,
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
					title: "Trouver les commandes orphelines",
					sqlCode: `SELECT 
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
			description:
				"RIGHT JOIN est moins utilisé que LEFT JOIN. La plupart des développeurs préfèrent réorganiser avec LEFT JOIN.",
		},
		{
			title: "FULL JOIN (FULL OUTER JOIN) - Jointure Externe Complète",
			content:
				"Récupérez toutes les lignes des deux tables, avec ou sans correspondance.",
			sqlQueries: [
				{
					title: "FULL JOIN - Toutes les données",
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
						{
							nom: null,
							email: null,
							produit: "Commande Orpheline",
							prix: 150,
						},
					],
				},
				{
					title: "Équivalent avec UNION (pour SQLite)",
					sqlCode: `SELECT 
    u.nom,
    u.email,
    c.produit,
    c.prix
FROM utilisateurs u
LEFT JOIN commandes c ON u.id = c.utilisateur_id

UNION

SELECT 
    u.nom,
    u.email,
    c.produit,
    c.prix
FROM commandes c
LEFT JOIN utilisateurs u ON c.utilisateur_id = u.id
WHERE u.id IS NULL;`,
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
						{
							nom: null,
							email: null,
							produit: "Commande Orpheline",
							prix: 150,
						},
					],
				},
				{
					title: "Analyse complète des relations",
					sqlCode: `SELECT 
    u.nom,
    c.produit,
    CASE 
        WHEN u.id IS NULL THEN 'Commande orpheline'
        WHEN c.id IS NULL THEN 'Utilisateur sans commande'
        ELSE 'Relation normale'
    END AS statut_relation
FROM utilisateurs u
FULL OUTER JOIN commandes c ON u.id = c.utilisateur_id;`,
					sqlResult: [
						{
							nom: "Alice Dupont",
							produit: "Laptop Pro",
							statut_relation: "Relation normale",
						},
						{
							nom: "Bob Martin",
							produit: "Souris Gaming",
							statut_relation: "Relation normale",
						},
						{
							nom: "Claire Durand",
							produit: "Livre SQL",
							statut_relation: "Relation normale",
						},
						{
							nom: "David Moreau",
							produit: "Smartphone",
							statut_relation: "Relation normale",
						},
						{
							nom: "Emma Bernard",
							produit: null,
							statut_relation: "Utilisateur sans commande",
						},
						{
							nom: null,
							produit: "Commande Orpheline",
							statut_relation: "Commande orpheline",
						},
					],
				},
			],
			description:
				"FULL JOIN combine LEFT et RIGHT JOIN. Utile pour l'analyse complète de relations entre tables.",
		},
		{
			title: "CROSS JOIN - Produit Cartésien",
			content: "Créez toutes les combinaisons possibles entre deux tables.",
			sqlQueries: [
				{
					title: "CROSS JOIN - Toutes les combinaisons",
					sqlCode: `SELECT 
    u.nom AS utilisateur,
    p.nom AS produit,
    p.prix
FROM utilisateurs u
CROSS JOIN produits p
LIMIT 10;`,
					sqlResult: [
						{ utilisateur: "Alice Dupont", produit: "Laptop Pro", prix: 1299 },
						{ utilisateur: "Alice Dupont", produit: "Souris Gaming", prix: 89 },
						{ utilisateur: "Alice Dupont", produit: "Livre SQL", prix: 25 },
						{ utilisateur: "Alice Dupont", produit: "Smartphone", prix: 799 },
						{ utilisateur: "Alice Dupont", produit: "Stylo Bureau", prix: 5 },
						{ utilisateur: "Bob Martin", produit: "Laptop Pro", prix: 1299 },
						{ utilisateur: "Bob Martin", produit: "Souris Gaming", prix: 89 },
						{ utilisateur: "Bob Martin", produit: "Livre SQL", prix: 25 },
						{ utilisateur: "Bob Martin", produit: "Smartphone", prix: 799 },
						{ utilisateur: "Bob Martin", produit: "Stylo Bureau", prix: 5 },
					],
				},
				{
					title: "Matrice de compatibilité",
					sqlCode: `SELECT 
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
					title: "Génération de créneaux",
					sqlCode: `SELECT 
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
			description:
				"CROSS JOIN crée le produit cartésien. Attention à la taille du résultat : n × m lignes !",
		},
		{
			title: "SELF JOIN - Auto-jointure",
			content:
				"Joignez une table avec elle-même pour analyser les relations hiérarchiques.",
			sqlQueries: [
				{
					title: "Structure hiérarchique des employés",
					sqlCode: `-- Structure hiérarchique : employés et managers
CREATE TABLE employes (
    id INTEGER PRIMARY KEY,
    nom VARCHAR(100),
    manager_id INTEGER,
    FOREIGN KEY (manager_id) REFERENCES employes(id)
);`,
					sqlResult: {
						message: "Table employés créée avec structure hiérarchique",
						type: "message",
					},
				},
				{
					title: "SELF JOIN - Employés avec leur manager",
					sqlCode: `SELECT 
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
						{
							employe: "Emma Bernard",
							poste: "Designer",
							manager: "Bob Martin",
						},
					],
				},
				{
					title: "Trouver les collègues (même manager)",
					sqlCode: `SELECT 
    e1.nom AS employe1,
    e2.nom AS employe2,
    m.nom AS manager_commun
FROM employes e1
JOIN employes e2 ON e1.manager_id = e2.manager_id AND e1.id != e2.id
JOIN employes m ON e1.manager_id = m.id
WHERE e1.id < e2.id;`,
					sqlResult: [
						{
							employe1: "Claire Durand",
							employe2: "David Moreau",
							manager_commun: "Bob Martin",
						},
						{
							employe1: "Claire Durand",
							employe2: "Emma Bernard",
							manager_commun: "Bob Martin",
						},
						{
							employe1: "David Moreau",
							employe2: "Emma Bernard",
							manager_commun: "Bob Martin",
						},
					],
				},
				{
					title: "Hiérarchie complète sur 3 niveaux",
					sqlCode: `SELECT 
    e.nom AS employe,
    e.poste,
    m1.nom AS manager_direct,
    m2.nom AS grand_manager
FROM employes e
LEFT JOIN employes m1 ON e.manager_id = m1.id
LEFT JOIN employes m2 ON m1.manager_id = m2.id;`,
					sqlResult: [
						{
							employe: "Alice Dupont",
							poste: "PDG",
							manager_direct: null,
							grand_manager: null,
						},
						{
							employe: "Bob Martin",
							poste: "Directeur IT",
							manager_direct: "Alice Dupont",
							grand_manager: null,
						},
						{
							employe: "Claire Durand",
							poste: "Développeuse",
							manager_direct: "Bob Martin",
							grand_manager: "Alice Dupont",
						},
						{
							employe: "David Moreau",
							poste: "Développeur",
							manager_direct: "Bob Martin",
							grand_manager: "Alice Dupont",
						},
						{
							employe: "Emma Bernard",
							poste: "Designer",
							manager_direct: "Bob Martin",
							grand_manager: "Alice Dupont",
						},
					],
				},
			],
			description:
				"SELF JOIN permet d'analyser les relations au sein d'une même table. Très utile pour les hiérarchies.",
		},
	],
};
