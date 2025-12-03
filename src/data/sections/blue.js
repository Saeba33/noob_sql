const menu = {
	description: "Fonctions de calcul et transformation",
	topics: [
		"Fonctions d'agrégation",
		"Fonctions de texte",
		"Fonctions numériques",
		"Fonctions de date",
		"Fonctions conditionnelles",
	],
};

const header = {
	tag: "Ceinture Bleue",
	title: "Fonctions SQL",
	description:
		"La ceinture bleue vous initie aux fonctions SQL qui permettent de calculer et transformer vos données. Découvrez les fonctions d'agrégation pour vos statistiques, et les fonctions scalaires (texte, numériques, dates, conditionnelles) qui transforment chaque valeur individuellement.",
};

const accordions = [
	{
		title: "Fonctions d'agrégation",
		content:
			"Les fonctions d'agrégation calculent une valeur unique à partir d'un ensemble de lignes. Elles sont souvent utilisées avec GROUP BY (vu précedemment) pour obtenir des statistiques par groupe.\n\nSans GROUP BY, elles retournent un seul résultat pour toute la table.",
		sqlQueries: [
			{
				title: "COUNT - Compter les lignes",
				sqlCode: `-- COUNT(*) compte toutes les lignes
-- COUNT(colonne) compte les valeurs non NULL
SELECT COUNT(*) AS total_utilisateurs 
FROM utilisateurs;`,
				sqlResult: [{ total_utilisateurs: 6 }],
			},
			{
				title: "COUNT avec condition",
				sqlCode: `-- Compte les utilisateurs de 30 ans ou plus
SELECT COUNT(*) AS utilisateurs_30_plus 
FROM utilisateurs 
WHERE age >= 30;`,
				sqlResult: [{ utilisateurs_30_plus: 3 }],
			},
			{
				title: "COUNT DISTINCT - Valeurs uniques",
				sqlCode: `-- Compte le nombre de villes différentes
SELECT COUNT(DISTINCT ville) AS nb_villes 
FROM utilisateurs;`,
				sqlResult: [{ nb_villes: 3 }],
			},
			{
				title: "SUM - Somme des valeurs",
				sqlCode: `-- SUM(colonne) additionne toutes les valeurs numériques
SELECT SUM(prix * stock) AS valeur_stock_total 
FROM produits;`,
				sqlResult: [{ valeur_stock_total: 47920 }],
			},
			{
				title: "AVG - Moyenne des valeurs",
				sqlCode: `-- AVG(colonne) calcule la moyenne des valeurs numériques
SELECT ROUND(AVG(age), 1) AS age_moyen 
FROM utilisateurs;`,
				sqlResult: [{ age_moyen: 30.8 }],
			},
			{
				title: "MIN et MAX - Valeurs extrêmes",
				sqlCode: `-- MIN(colonne) retourne la plus petite valeur
-- MAX(colonne) retourne la plus grande valeur
SELECT 
    MIN(prix) AS prix_min,
    MAX(prix) AS prix_max 
FROM produits;`,
				sqlResult: [{ prix_min: 5, prix_max: 1299 }],
			},
			{
				title: "Combinaison de fonctions",
				sqlCode: `-- Statistiques multiples sur les utilisateurs
SELECT 
    COUNT(*) AS nombre,
    ROUND(AVG(age), 1) AS age_moyen,
    MIN(age) AS plus_jeune,
    MAX(age) AS plus_age
FROM utilisateurs;`,
				sqlResult: [
					{
						nombre: 6,
						age_moyen: 30.8,
						plus_jeune: 25,
						plus_age: 45,
					},
				],
			},
		],
	},
	{
		title: "Fonctions de texte",
		content:
			"Les fonctions de texte manipulent les chaînes de caractères : changer la casse, extraire une partie, concaténer, nettoyer les espaces, etc.\n\nElles s'appliquent ligne par ligne et retournent une valeur pour chaque ligne.",
		sqlQueries: [
			{
				title: "UPPER et LOWER - Changer la casse",
				sqlCode: `-- Convertit en majuscules (UPPER) ou minuscules (LOWER)
SELECT 
    UPPER(prenom) AS prenom_maj,
    LOWER(email) AS email_min 
FROM utilisateurs 
LIMIT 3;`,
				sqlResult: [
					{ prenom_maj: "ALICE", email_min: "alice@email.com" },
					{ prenom_maj: "BOB", email_min: "bob@gmail.com" },
					{ prenom_maj: "CLAIRE", email_min: "claire@email.com" },
				],
			},
			{
				title: "LENGTH - Longueur d'une chaîne",
				sqlCode: `-- LENGTH(colonne) retourne le nombre de caractères
SELECT 
	prenom,
	LENGTH(prenom) AS nb_lettres 
FROM utilisateurs 
ORDER BY nb_lettres DESC;`,
				sqlResult: [
					{ prenom: "François", nb_lettres: 8 },
					{ prenom: "Claire", nb_lettres: 6 },
					{ prenom: "Alice", nb_lettres: 5 },
					{ prenom: "David", nb_lettres: 5 },
					{ prenom: "Emma", nb_lettres: 4 },
					{ prenom: "Bob", nb_lettres: 3 },
				],
			},
			{
				title: "CONCAT - Concaténer des chaînes",
				sqlCode: `-- CONCAT(val1, val2, ...) assemble plusieurs valeurs en une chaîne
SELECT CONCAT(prenom, ' ', nom) AS nom_complet 
FROM utilisateurs 
LIMIT 3;`,
				sqlResult: [
					{ nom_complet: "Alice Dupont" },
					{ nom_complet: "Bob Martin" },
					{ nom_complet: "Claire Durand" },
				],
			},
			{
				title: "SUBSTRING - Extraire une partie",
				sqlCode: `-- Extrait les 3 premiers caractères du prénom
-- SUBSTRING(colonne, début, longueur)
SELECT 
    prenom,
    SUBSTRING(prenom, 1, 3) AS initiales 
FROM utilisateurs 
LIMIT 4;`,
				sqlResult: [
					{ prenom: "Alice", initiales: "Ali" },
					{ prenom: "Bob", initiales: "Bob" },
					{ prenom: "Claire", initiales: "Cla" },
					{ prenom: "David", initiales: "Dav" },
				],
			},
			{
				title: "TRIM - Supprimer les espaces",
				sqlCode: `-- Supprime les espaces en début et fin de chaîne
-- Utile pour nettoyer des données mal saisies
SELECT TRIM('   texte avec espaces   ') AS resultat;`,
				sqlResult: [{ resultat: "texte avec espaces" }],
			},
			{
				title: "REPLACE - Remplacer du texte",
				sqlCode: `-- REPLACE(colonne, 'ancien', 'nouveau')
-- Remplace toutes les occurrences de 'ancien' par 'nouveau'
SELECT 
    email AS email_actuel,
    REPLACE(email, '@email.com', '@nouveau.fr') AS nouvel_email 
FROM utilisateurs 
WHERE email LIKE '%@email.com'
LIMIT 3;`,
				sqlResult: [
					{ email_actuel: "alice@email.com", nouvel_email: "alice@nouveau.fr" },
					{
						email_actuel: "claire@email.com",
						nouvel_email: "claire@nouveau.fr",
					},
					{ email_actuel: "david@email.com", nouvel_email: "david@nouveau.fr" },
				],
			},
		],
	},
	{
		title: "Fonctions numériques",
		content:
			"Les fonctions numériques effectuent des calculs mathématiques sur les nombres : arrondir, valeur absolue, modulo, etc.",
		sqlQueries: [
			{
				title: "ROUND - Arrondir un nombre",
				sqlCode: `-- ROUND(nombre, decimales) arrondit à N décimales
SELECT 
    nom,
    prix,
    ROUND(prix * 1.20, 2) AS prix_ttc 
FROM produits 
WHERE prix > 200
LIMIT 3;`,
				sqlResult: [
					{ nom: "Ordinateur Portable", prix: 899, prix_ttc: 1078.8 },
					{ nom: "Smartphone Pro", prix: 1299, prix_ttc: 1558.8 },
					{ nom: "Tablette", prix: 299, prix_ttc: 358.8 },
				],
			},
			{
				title: "CEIL et FLOOR - Arrondir entier",
				sqlCode: `-- CEIL(nombre) arrondit à l'entier supérieur (8.3 → 9)
-- FLOOR(nombre) arrondit à l'entier inférieur (8.9 → 8)
SELECT 
    prix,
    prix / 3.0 AS division,
    CEIL(prix / 3.0) AS arrondi_haut,
    FLOOR(prix / 3.0) AS arrondi_bas
FROM produits 
WHERE prix < 50;`,
				sqlResult: [
					{ prix: 25, division: 8.33, arrondi_haut: 9, arrondi_bas: 8 },
					{ prix: 5, division: 1.67, arrondi_haut: 2, arrondi_bas: 1 },
					{ prix: 29, division: 9.67, arrondi_haut: 10, arrondi_bas: 9 },
				],
			},
		],
	},
	{
		title: "Fonctions de date",
		content:
			"Les fonctions de date permettent d'extraire des parties d'une date, calculer des différences, ou obtenir la date actuelle.\n\n A noter : la syntaxe peut varier selon le SGBD (MySQL, PostgreSQL, SQLite...). Les exemples ci-dessous utilisent une syntaxe courante.",
		sqlQueries: [
			{
				title: "NOW / CURRENT_DATE - Date actuelle",
				sqlCode: `-- Obtient la date et l'heure actuelles
SELECT 
    CURRENT_DATE AS date_jour,
    CURRENT_TIMESTAMP AS date_heure;`,
				sqlResult: [
					{
						date_jour: "2025-12-02",
						date_heure: "2025-12-02 19:30:00",
					},
				],
			},
			{
				title: "YEAR, MONTH, DAY - Extraire des parties",
				sqlCode: `-- Extrait l'année, le mois ou le jour d'une date
SELECT 
    date_commande,
    YEAR(date_commande) AS annee,
    MONTH(date_commande) AS mois,
    DAY(date_commande) AS jour
FROM commandes;`,
				sqlResult: [
					{
						date_commande: "2023-11-20 09:15:00",
						annee: 2023,
						mois: 11,
						jour: 20,
					},
					{
						date_commande: "2024-01-15 10:30:00",
						annee: 2024,
						mois: 1,
						jour: 15,
					},
					{
						date_commande: "2024-01-15 14:45:00",
						annee: 2024,
						mois: 1,
						jour: 15,
					},
					{
						date_commande: "2024-02-10 16:20:00",
						annee: 2024,
						mois: 2,
						jour: 10,
					},
				],
			},
			{
				title: "DATE - Extraire uniquement la date",
				sqlCode: `-- Supprime la partie heure d'un datetime
SELECT 
    date_commande,
    DATE(date_commande) AS date_seule
FROM commandes
LIMIT 2;`,
				sqlResult: [
					{ date_commande: "2023-11-20 09:15:00", date_seule: "2023-11-20" },
					{ date_commande: "2024-01-15 10:30:00", date_seule: "2024-01-15" },
				],
			},
			{
				title: "DATE_ADD / DATE_SUB - Ajouter ou soustraire",
				sqlCode: `-- DATE_ADD(date, INTERVAL n UNIT) ajoute une durée
-- DATE_SUB(date, INTERVAL n UNIT) soustrait une durée
-- UNIT peut être : DAY, WEEK, MONTH, YEAR, HOUR, MINUTE...
SELECT 
    date_commande,
    DATE_ADD(date_commande, INTERVAL 7 DAY) AS livraison_prevue,
    DATE_SUB(date_commande, INTERVAL 1 MONTH) AS mois_precedent
FROM commandes
LIMIT 2;`,
				sqlResult: [
					{
						date_commande: "2024-01-15 10:30:00",
						livraison_prevue: "2024-01-22 10:30:00",
						mois_precedent: "2023-12-15 10:30:00",
					},
					{
						date_commande: "2024-02-10 16:20:00",
						livraison_prevue: "2024-02-17 16:20:00",
						mois_precedent: "2024-01-10 16:20:00",
					},
				],
			},
			{
				title: "DATEDIFF - Différence entre dates",
				sqlCode: `-- DATEDIFF(date1, date2) retourne le nombre de jours entre les deux dates
SELECT 
    numero_commande,
    date_commande,
    DATEDIFF(CURRENT_DATE, date_commande) AS jours_depuis
FROM commandes
ORDER BY date_commande DESC;`,
				sqlResult: [
					{
						numero_commande: "CMD004",
						date_commande: "2024-02-10 16:20:00",
						jours_depuis: 296,
					},
					{
						numero_commande: "CMD002",
						date_commande: "2024-01-15 10:30:00",
						jours_depuis: 322,
					},
					{
						numero_commande: "CMD003",
						date_commande: "2024-01-15 14:45:00",
						jours_depuis: 322,
					},
					{
						numero_commande: "CMD001",
						date_commande: "2023-11-20 09:15:00",
						jours_depuis: 378,
					},
				],
			},
		],
	},
	{
		title: "Fonctions conditionnelles",
		content:
			"Les fonctions conditionnelles permettent de gérer les valeurs NULL et d'appliquer une logique conditionnelle directement dans les requêtes.",
		sqlQueries: [
			{
				title: "COALESCE - Première valeur non NULL",
				sqlCode: `-- COALESCE(colonne, valeur_si_null)
-- Retourne la colonne si elle n'est pas NULL, sinon la valeur de remplacement
SELECT 
    prenom,
    COALESCE(telephone, 'Non renseigné') AS telephone 
FROM utilisateurs;`,
				sqlResult: [
					{ prenom: "Alice", telephone: "06 12 34 56 78" },
					{ prenom: "Bob", telephone: "07 98 76 54 32" },
					{ prenom: "Claire", telephone: "Non renseigné" },
					{ prenom: "David", telephone: "06 11 22 33 44" },
					{ prenom: "Emma", telephone: "Non renseigné" },
					{ prenom: "François", telephone: "Non renseigné" },
				],
			},
			{
				title: "COALESCE - Cascade de valeurs",
				sqlCode: `-- COALESCE(col1, col2, col3, valeur_defaut)
-- Teste chaque valeur dans l'ordre et retourne la première non NULL
SELECT 
    prenom,
    COALESCE(telephone, email, 'Aucun contact') AS contact 
FROM utilisateurs
LIMIT 4;`,
				sqlResult: [
					{ prenom: "Alice", contact: "06 12 34 56 78" },
					{ prenom: "Bob", contact: "07 98 76 54 32" },
					{ prenom: "Claire", contact: "claire@email.com" },
					{ prenom: "David", contact: "06 11 22 33 44" },
				],
			},
			{
				title: "CASE WHEN - Conditions multiples",
				sqlCode: `-- CASE WHEN condition THEN valeur [...] ELSE defaut END
-- Évalue les conditions dans l'ordre et retourne la première vraie
SELECT 
    prenom,
    age,
    CASE 
        WHEN age < 30 THEN 'Jeune'
        WHEN age < 40 THEN 'Adulte'
        ELSE 'Senior'
    END AS categorie
FROM utilisateurs;`,
				sqlResult: [
					{ prenom: "Alice", age: 28, categorie: "Jeune" },
					{ prenom: "Bob", age: 32, categorie: "Adulte" },
					{ prenom: "Claire", age: 25, categorie: "Jeune" },
					{ prenom: "David", age: 45, categorie: "Senior" },
					{ prenom: "Emma", age: 30, categorie: "Adulte" },
					{ prenom: "François", age: 25, categorie: "Jeune" },
				],
			},
			{
				title: "CASE WHEN - Avec calculs",
				sqlCode: `-- Applique des remises différentes selon la catégorie
SELECT 
    nom,
    categorie,
    prix,
    CASE 
        WHEN categorie = 'electronique' THEN ROUND(prix * 0.90, 2)
        WHEN categorie = 'livre' THEN ROUND(prix * 0.95, 2)
        ELSE prix
    END AS prix_remise
FROM produits
LIMIT 4;`,
				sqlResult: [
					{
						nom: "Ordinateur Portable",
						categorie: "electronique",
						prix: 899,
						prix_remise: 809.1,
					},
					{
						nom: "Smartphone Pro",
						categorie: "electronique",
						prix: 1299,
						prix_remise: 1169.1,
					},
					{
						nom: "Livre SQL",
						categorie: "livre",
						prix: 25,
						prix_remise: 23.75,
					},
					{ nom: "Stylo", categorie: "bureau", prix: 5, prix_remise: 5 },
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
