import { BELT_COLORS } from "@/config/belts-config";

export const blueBeltContent = {
	// Belt configuration
	belt: "blue",
	description: "Calculs et regroupements",
	topics: ["COUNT, SUM, AVG, MIN, MAX", "GROUP BY", "HAVING"],
	colors: BELT_COLORS.blue,

	// Content sections
	header: {
		title: "Agrégations",
		description: "Calculez et regroupez vos données pour des analyses poussées",
		tag: "Ceinture Bleue",
	},
	pageDescription: {
		title: "Analysez vos Données avec les Fonctions d'Agrégation",
		content:
			"La ceinture bleue vous initie aux fonctions d'agrégation qui permettent de calculer des statistiques sur vos données. Apprenez COUNT, SUM, AVG, MIN, MAX pour vos calculs, GROUP BY pour regrouper vos données, et HAVING pour filtrer les groupes. Ces outils sont essentiels pour l'analyse de données.",
	},
	accordions: [
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
			description:
				"Les fonctions d'agrégation transforment plusieurs lignes en une seule valeur calculée.",
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
			description:
				"GROUP BY divise vos données en groupes et applique les fonctions d'agrégation à chaque groupe.",
		},
		{
			title: "HAVING - Filtrage des Groupes",
			content:
				"Filtrez les résultats des regroupements avec HAVING (WHERE pour les groupes).",
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
			description:
				"HAVING est le WHERE des regroupements. Il filtre les groupes selon des conditions sur les agrégations.",
		},
	],
};
