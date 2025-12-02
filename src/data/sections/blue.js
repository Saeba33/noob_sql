const menu = {
	description: "Calculs et regroupements",
	topics: [
		"Fonctions d'agrégation",
		"Fonctions scalaires",
		"GROUP BY",
		"HAVING",
	],
};

const header = {
	tag: "Ceinture Bleue",
	title: "Agrégations",
	description:
		"La ceinture bleue vous initie aux fonctions d'agrégation qui permettent de calculer des statistiques sur vos données. Apprenez COUNT, SUM, AVG, MIN, MAX pour vos calculs, GROUP BY pour regrouper vos données, et HAVING pour filtrer les groupes. Ces outils sont essentiels pour l'analyse de données.",
};

const accordions = [
	{
		title: "Fonctions d'Agrégation",
		content:
			"Calculez des statistiques sur vos données avec COUNT, SUM, AVG, MIN, MAX.",
		sqlQueries: [
			{
				title: "COUNT - Compter les lignes",
				sqlCode: `SELECT COUNT(*) AS total_utilisateurs 
FROM utilisateurs;`,
				sqlResult: [{ total_utilisateurs: 5 }],
			},
			{
				title: "COUNT avec condition",
				sqlCode: `SELECT COUNT(*) AS utilisateurs_seniors 
FROM utilisateurs 
WHERE age >= 30;`,
				sqlResult: [{ utilisateurs_seniors: 3 }],
			},
			{
				title: "COUNT DISTINCT",
				sqlCode: `SELECT COUNT(DISTINCT age) AS ages_differents 
FROM utilisateurs;`,
				sqlResult: [{ ages_differents: 5 }],
			},
			{
				title: "SUM - Somme des valeurs",
				sqlCode: `SELECT SUM(prix) AS chiffre_affaires_total 
FROM produits;`,
				sqlResult: [{ chiffre_affaires_total: 3245 }],
			},
			{
				title: "AVG - Moyenne des valeurs",
				sqlCode: `SELECT AVG(age) AS age_moyen 
FROM utilisateurs;`,
				sqlResult: [{ age_moyen: 32.0 }],
			},
			{
				title: "MIN et MAX - Valeurs extrêmes",
				sqlCode: `SELECT 
    MIN(age) AS plus_jeune,
    MAX(age) AS plus_age,
    MIN(prix) AS produit_moins_cher,
    MAX(prix) AS produit_plus_cher
FROM utilisateurs, produits;`,
				sqlResult: [
					{
						plus_jeune: 25,
						plus_age: 45,
						produit_moins_cher: 5,
						produit_plus_cher: 1299,
					},
				],
			},
			{
				title: "Combinaison de fonctions",
				sqlCode: `SELECT 
    COUNT(*) AS nombre_utilisateurs,
    AVG(age) AS age_moyen,
    MIN(age) AS plus_jeune,
    MAX(age) AS plus_age
FROM utilisateurs;`,
				sqlResult: [
					{
						nombre_utilisateurs: 5,
						age_moyen: 32.0,
						plus_jeune: 25,
						plus_age: 45,
					},
				],
			},
		],
	},
	{
		title: "Fonctions scalaires",
		content:
			"Les fonctions scalaires transforment ou manipulent des valeurs individuelles, contrairement aux fonctions d'agrégation qui calculent sur des groupes de lignes.",
		sqlQueries: [
			{
				title: "COALESCE - Valeur par défaut",
				sqlCode: `-- Remplace NULL par 'Non renseigné' pour le téléphone
-- Fonction : COALESCE
SELECT prenom, nom, COALESCE(telephone, 'Non renseigné') AS telephone 
FROM utilisateurs;`,
				sqlResult: [
					{ prenom: "Alice", nom: "Dupont", telephone: "06 12 34 56 78" },
					{ prenom: "Bob", nom: "Martin", telephone: "07 98 76 54 32" },
					{ prenom: "Claire", nom: "Durand", telephone: "Non renseigné" },
					{ prenom: "David", nom: "Moreau", telephone: "06 11 22 33 44" },
					{ prenom: "Emma", nom: "Bernard", telephone: "Non renseigné" },
				],
			},
			{
				title: "COALESCE - Cascade de valeurs",
				sqlCode: `-- Prend la première valeur non NULL parmi plusieurs colonnes
-- Fonction : COALESCE
SELECT 
    prenom,
    COALESCE(telephone, email, 'Aucun contact') AS contact_principal 
FROM utilisateurs;`,
				sqlResult: [
					{ prenom: "Alice", contact_principal: "06 12 34 56 78" },
					{ prenom: "Bob", contact_principal: "07 98 76 54 32" },
					{ prenom: "Claire", contact_principal: "claire@email.com" },
					{ prenom: "David", contact_principal: "06 11 22 33 44" },
					{ prenom: "Emma", contact_principal: "emma@email.com" },
				],
			},
			{
				title: "UPPER et LOWER - Casse du texte",
				sqlCode: `-- Convertit le texte en majuscules ou minuscules
-- Fonctions : UPPER et LOWER
SELECT 
    UPPER(prenom) AS prenom_majuscule,
    LOWER(email) AS email_minuscule 
FROM utilisateurs 
LIMIT 3;`,
				sqlResult: [
					{ prenom_majuscule: "ALICE", email_minuscule: "alice@email.com" },
					{ prenom_majuscule: "BOB", email_minuscule: "bob@gmail.com" },
					{ prenom_majuscule: "CLAIRE", email_minuscule: "claire@email.com" },
				],
			},
			{
				title: "LENGTH - Longueur d'une chaîne",
				sqlCode: `-- Compte le nombre de caractères dans une chaîne
-- Fonction : LENGTH
SELECT prenom, LENGTH(prenom) AS nb_caracteres 
FROM utilisateurs 
ORDER BY nb_caracteres DESC;`,
				sqlResult: [
					{ prenom: "Claire", nb_caracteres: 6 },
					{ prenom: "David", nb_caracteres: 5 },
					{ prenom: "Alice", nb_caracteres: 5 },
					{ prenom: "Emma", nb_caracteres: 4 },
					{ prenom: "Bob", nb_caracteres: 3 },
				],
			},
			{
				title: "ROUND - Arrondi numérique",
				sqlCode: `-- Arrondit un nombre à un nombre de décimales
-- Fonction : ROUND
SELECT 
    nom,
    prix,
    ROUND(prix * 1.20, 2) AS prix_ttc 
FROM produits 
WHERE categorie = 'electronique'
LIMIT 3;`,
				sqlResult: [
					{ nom: "Ordinateur Portable", prix: 899, prix_ttc: 1078.8 },
					{ nom: "Smartphone Pro", prix: 1299, prix_ttc: 1558.8 },
					{ nom: "Tablette", prix: 299, prix_ttc: 358.8 },
				],
			},
		],
	},
	{
		title: "GROUP BY - Regroupement",
		content: "Regroupez vos données pour des analyses par catégorie.",
		sqlQueries: [
			{
				title: "Regroupement simple par âge",
				sqlCode: `SELECT age, COUNT(*) AS nombre 
FROM utilisateurs 
GROUP BY age 
ORDER BY age;`,
				sqlResult: [
					{ age: 25, nombre: 1 },
					{ age: 28, nombre: 1 },
					{ age: 30, nombre: 1 },
					{ age: 32, nombre: 1 },
					{ age: 45, nombre: 1 },
				],
			},
			{
				title: "Regroupement par tranche d'âge",
				sqlCode: `SELECT 
    CASE 
        WHEN age < 30 THEN 'Jeunes (< 30)'
        WHEN age >= 30 AND age < 40 THEN 'Adultes (30-39)'
        ELSE 'Seniors (40+)'
    END AS tranche_age,
    COUNT(*) AS nombre
FROM utilisateurs 
GROUP BY CASE 
    WHEN age < 30 THEN 'Jeunes (< 30)'
    WHEN age >= 30 AND age < 40 THEN 'Adultes (30-39)'
    ELSE 'Seniors (40+)'
END;`,
				sqlResult: [
					{ tranche_age: "Jeunes (< 30)", nombre: 2 },
					{ tranche_age: "Adultes (30-39)", nombre: 2 },
					{ tranche_age: "Seniors (40+)", nombre: 1 },
				],
			},
			{
				title: "Regroupement par catégorie de produits",
				sqlCode: `SELECT 
    categorie,
    COUNT(*) AS nombre_produits,
    AVG(prix) AS prix_moyen,
    SUM(prix) AS total_valeur
FROM produits 
GROUP BY categorie
ORDER BY prix_moyen DESC;`,
				sqlResult: [
					{
						categorie: "electronique",
						nombre_produits: 3,
						prix_moyen: 799.0,
						total_valeur: 2397,
					},
					{
						categorie: "livre",
						nombre_produits: 1,
						prix_moyen: 25.0,
						total_valeur: 25,
					},
					{
						categorie: "bureau",
						nombre_produits: 1,
						prix_moyen: 5.0,
						total_valeur: 5,
					},
				],
			},
			{
				title: "Regroupement avec dates",
				sqlCode: `SELECT 
    STRFTIME('%Y-%m', date_commande) AS mois,
    COUNT(*) AS nombre_commandes,
    SUM(total) AS chiffre_affaires
FROM commandes 
GROUP BY STRFTIME('%Y-%m', date_commande)
ORDER BY mois;`,
				sqlResult: [
					{ mois: "2024-01", nombre_commandes: 15, chiffre_affaires: 12450 },
					{ mois: "2024-02", nombre_commandes: 22, chiffre_affaires: 18750 },
					{ mois: "2024-03", nombre_commandes: 18, chiffre_affaires: 15200 },
				],
			},
		],
	},
	{
		title: "HAVING - Filtrage des Groupes",
		content:
			"Filtrez les résultats des regroupements avec HAVING (WHERE pour les groupes). ⚠️ Note : ORDER BY est optionnel avec GROUP BY/HAVING - utilisez-le uniquement pour trier les résultats finaux.",
		sqlQueries: [
			{
				title: "Différence WHERE vs HAVING",
				sqlCode: `-- WHERE filtre AVANT regroupement
-- HAVING filtre APRÈS regroupement

SELECT age, COUNT(*) AS nombre 
FROM utilisateurs 
WHERE age >= 25  -- Filtre avant GROUP BY
GROUP BY age 
HAVING COUNT(*) >= 1  -- Filtre après GROUP BY
ORDER BY age;`,
				sqlResult: [
					{ age: 25, nombre: 1 },
					{ age: 28, nombre: 1 },
					{ age: 30, nombre: 1 },
					{ age: 32, nombre: 1 },
					{ age: 45, nombre: 1 },
				],
			},
			{
				title: "Catégories avec plusieurs produits",
				sqlCode: `SELECT 
    categorie,
    COUNT(*) AS nombre_produits,
    AVG(prix) AS prix_moyen
FROM produits 
GROUP BY categorie
HAVING COUNT(*) > 1;`,
				sqlResult: [
					{
						categorie: "electronique",
						nombre_produits: 3,
						prix_moyen: 799.0,
					},
				],
			},
			{
				title: "Tranches d'âge bien représentées",
				sqlCode: `SELECT 
    CASE 
        WHEN age < 30 THEN 'Jeunes'
        WHEN age >= 30 AND age < 40 THEN 'Adultes'
        ELSE 'Seniors'
    END AS tranche,
    COUNT(*) AS nombre,
    AVG(age) AS age_moyen
FROM utilisateurs 
GROUP BY CASE 
    WHEN age < 30 THEN 'Jeunes'
    WHEN age >= 30 AND age < 40 THEN 'Adultes'
    ELSE 'Seniors'
END
HAVING COUNT(*) >= 2;`,
				sqlResult: [
					{ tranche: "Jeunes", nombre: 2, age_moyen: 26.5 },
					{ tranche: "Adultes", nombre: 2, age_moyen: 31.0 },
				],
			},
			{
				title: "Mois avec fort chiffre d'affaires",
				sqlCode: `SELECT 
    STRFTIME('%Y-%m', date_commande) AS mois,
    COUNT(*) AS nombre_commandes,
    SUM(total) AS chiffre_affaires
FROM commandes 
GROUP BY STRFTIME('%Y-%m', date_commande)
HAVING SUM(total) > 15000
ORDER BY chiffre_affaires DESC;`,
				sqlResult: [
					{ mois: "2024-02", nombre_commandes: 22, chiffre_affaires: 18750 },
					{ mois: "2024-03", nombre_commandes: 18, chiffre_affaires: 15200 },
				],
			},
		],
	},
];

export const blueBeltContent = {
	...menu,
	header,
	accordions,
};
