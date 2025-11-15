import { BELT_COLORS } from "@/config/belts-config";

export const blackBeltContent = {
	// Belt configuration
	belt: "black",
	description: "Techniques avancées et optimisation",
	topics: [
		"Sous-requêtes",
		"WITH (CTE)",
		"VIEW",
		"UNION",
		"INDEX",
		"Transactions",
	],
	colors: BELT_COLORS.black,

	// Content sections
	header: {
		title: "Requêtes Avancées",
		description: "Maîtrisez les techniques avancées et l'optimisation SQL",
		tag: "Ceinture Noire",
	},
	pageDescription: {
		title: "Excellez dans les Techniques SQL Avancées",
		content:
			"La ceinture noire vous enseigne les techniques SQL les plus sophistiquées. Maîtrisez les sous-requêtes complexes, les CTE (Common Table Expressions), les vues, les opérations d'union, l'optimisation avec les index et la gestion des transactions. Ces compétences vous permettront de résoudre les problèmes les plus complexes.",
	},
	accordions: [
		{
			title: "Sous-requêtes dans WHERE, SELECT, IN, EXISTS",
			content: "Utilisez des requêtes imbriquées pour des analyses complexes.",
			sqlQueries: [
				{
					title: "Sous-requête dans WHERE",
					sqlCode: `SELECT nom, age 
FROM utilisateurs 
WHERE age > (SELECT AVG(age) FROM utilisateurs);`,
					sqlResult: [
						{ nom: "Bob Martin", age: 32 },
						{ nom: "David Moreau", age: 45 },
					],
				},
				{
					title: "Sous-requête dans SELECT",
					sqlCode: `SELECT 
    nom,
    age,
    (SELECT COUNT(*) FROM commandes WHERE utilisateur_id = u.id) AS nb_commandes
FROM utilisateurs u;`,
					sqlResult: [
						{ nom: "Alice Dupont", age: 28, nb_commandes: 1 },
						{ nom: "Bob Martin", age: 32, nb_commandes: 1 },
						{ nom: "Claire Durand", age: 25, nb_commandes: 1 },
						{ nom: "David Moreau", age: 45, nb_commandes: 1 },
						{ nom: "Emma Bernard", age: 30, nb_commandes: 0 },
					],
				},
				{
					title: "Sous-requête avec IN",
					sqlCode: `SELECT nom, email 
FROM utilisateurs 
WHERE id IN (
    SELECT utilisateur_id 
    FROM commandes 
    WHERE prix > 100
);`,
					sqlResult: [
						{ nom: "Alice Dupont", email: "alice@email.com" },
						{ nom: "David Moreau", email: "david@email.com" },
					],
				},
				{
					title: "Sous-requête avec EXISTS",
					sqlCode: `SELECT nom, email 
FROM utilisateurs u
WHERE EXISTS (
    SELECT 1 
    FROM commandes c 
    WHERE c.utilisateur_id = u.id 
    AND c.date_commande > '2024-01-01'
);`,
					sqlResult: [
						{ nom: "Alice Dupont", email: "alice@email.com" },
						{ nom: "Bob Martin", email: "bob@email.com" },
						{ nom: "Claire Durand", email: "claire@email.com" },
						{ nom: "David Moreau", email: "david@email.com" },
					],
				},
			],
			description:
				"Les sous-requêtes permettent des analyses sophistiquées en combinant plusieurs niveaux de données.",
		},
		{
			title: "WITH (CTE - Common Table Expression)",
			content:
				"Organisez vos requêtes complexes avec des expressions de table commune.",
			sqlQueries: [
				{
					title: "CTE simple",
					sqlCode: `WITH utilisateurs_actifs AS (
    SELECT id, nom, email, age 
    FROM utilisateurs 
    WHERE age >= 30
)
SELECT * FROM utilisateurs_actifs
ORDER BY age;`,
					sqlResult: [
						{ id: 2, nom: "Bob Martin", email: "bob@email.com", age: 32 },
						{ id: 5, nom: "Emma Bernard", email: "emma@email.com", age: 30 },
						{ id: 4, nom: "David Moreau", email: "david@email.com", age: 45 },
					],
				},
				{
					title: "CTE avec calculs d'agrégation",
					sqlCode: `WITH statistiques_commandes AS (
    SELECT 
        utilisateur_id,
        COUNT(*) AS nb_commandes,
        SUM(prix) AS total_depense,
        AVG(prix) AS panier_moyen
    FROM commandes
    GROUP BY utilisateur_id
)
SELECT 
    u.nom,
    s.nb_commandes,
    s.total_depense,
    s.panier_moyen
FROM utilisateurs u
JOIN statistiques_commandes s ON u.id = s.utilisateur_id
WHERE s.total_depense > 500;`,
					sqlResult: [
						{
							nom: "Alice Dupont",
							nb_commandes: 1,
							total_depense: 1299,
							panier_moyen: 1299.0,
						},
						{
							nom: "David Moreau",
							nb_commandes: 1,
							total_depense: 799,
							panier_moyen: 799.0,
						},
					],
				},
				{
					title: "CTE récursif - Hiérarchie d'employés",
					sqlCode: `WITH RECURSIVE hierarchie_employes AS (
    -- Cas de base : les managers de niveau 1
    SELECT id, nom, manager_id, 1 as niveau
    FROM employes 
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Cas récursif : les employés sous chaque manager
    SELECT e.id, e.nom, e.manager_id, h.niveau + 1
    FROM employes e
    JOIN hierarchie_employes h ON e.manager_id = h.id
)
SELECT nom, niveau, 
       REPEAT('  ', niveau - 1) || nom AS nom_indente
FROM hierarchie_employes
ORDER BY niveau, nom;`,
					sqlResult: [
						{ nom: "Alice Dupont", niveau: 1, nom_indente: "Alice Dupont" },
						{ nom: "Bob Martin", niveau: 2, nom_indente: "  Bob Martin" },
						{
							nom: "Claire Durand",
							niveau: 3,
							nom_indente: "    Claire Durand",
						},
						{ nom: "David Moreau", niveau: 3, nom_indente: "    David Moreau" },
						{ nom: "Emma Bernard", niveau: 3, nom_indente: "    Emma Bernard" },
					],
				},
			],
			description:
				"Les CTE rendent les requêtes complexes plus lisibles et réutilisables. Les CTE récursifs permettent de parcourir des hiérarchies.",
		},
		{
			title: "Création et Utilisation de VIEW",
			content:
				"Créez des vues pour simplifier et sécuriser l'accès aux données.",
			sqlQueries: [
				{
					title: "Création d'une vue simple",
					sqlCode: `CREATE VIEW vue_utilisateurs_actifs AS
SELECT id, nom, email, age
FROM utilisateurs 
WHERE age >= 25;`,
					sqlResult: {
						message: "Vue 'vue_utilisateurs_actifs' créée avec succès",
						type: "message",
					},
				},
				{
					title: "Vue avec jointures complexes",
					sqlCode: `CREATE VIEW vue_commandes_detaillees AS
SELECT 
    c.id,
    u.nom AS client,
    u.email,
    p.nom AS produit,
    c.prix,
    c.date_commande
FROM commandes c
JOIN utilisateurs u ON c.utilisateur_id = u.id
JOIN produits p ON c.produit_id = p.id;`,
					sqlResult: {
						message: "Vue 'vue_commandes_detaillees' créée avec succès",
						type: "message",
					},
				},
				{
					title: "Utilisation des vues",
					sqlCode: `SELECT * FROM vue_utilisateurs_actifs
WHERE age > 30;`,
					sqlResult: [
						{ id: 2, nom: "Bob Martin", email: "bob@email.com", age: 32 },
						{ id: 4, nom: "David Moreau", email: "david@email.com", age: 45 },
						{ id: 5, nom: "Emma Bernard", email: "emma@email.com", age: 30 },
					],
				},
				{
					title: "Requête sur vue avec jointures",
					sqlCode: `SELECT client, produit, prix
FROM vue_commandes_detaillees 
WHERE prix > 100
ORDER BY prix DESC;`,
					sqlResult: [
						{ client: "Alice Dupont", produit: "Laptop Pro", prix: 1299 },
						{ client: "David Moreau", produit: "Smartphone", prix: 799 },
					],
				},
			],
			description:
				"Les vues simplifient les requêtes complexes et fournissent une couche d'abstraction sécurisée.",
		},
		{
			title: "Opérations de Combinaison avec UNION, UNION ALL",
			content: "Combinez les résultats de plusieurs requêtes avec UNION.",
			sqlQueries: [
				{
					title: "UNION - Combine et élimine les doublons",
					sqlCode: `SELECT nom, email FROM utilisateurs WHERE age < 30
UNION
SELECT nom, email FROM utilisateurs WHERE nom LIKE 'A%';`,
					sqlResult: [
						{ nom: "Alice Dupont", email: "alice@email.com" },
						{ nom: "Claire Durand", email: "claire@email.com" },
					],
				},
				{
					title: "UNION ALL - Combine sans éliminer les doublons",
					sqlCode: `SELECT 'utilisateur' AS type, nom, email FROM utilisateurs
UNION ALL
SELECT 'admin' AS type, nom, email_admin FROM administrateurs;`,
					sqlResult: [
						{
							type: "utilisateur",
							nom: "Alice Dupont",
							email: "alice@email.com",
						},
						{ type: "utilisateur", nom: "Bob Martin", email: "bob@email.com" },
						{
							type: "utilisateur",
							nom: "Claire Durand",
							email: "claire@email.com",
						},
						{
							type: "utilisateur",
							nom: "David Moreau",
							email: "david@email.com",
						},
						{
							type: "utilisateur",
							nom: "Emma Bernard",
							email: "emma@email.com",
						},
						{
							type: "admin",
							nom: "Admin Système",
							email: "admin@entreprise.com",
						},
						{
							type: "admin",
							nom: "Super Admin",
							email: "superadmin@entreprise.com",
						},
					],
				},
				{
					title: "UNION avec ORDER BY global",
					sqlCode: `SELECT nom, email, age, 'Paris' as ville FROM utilisateurs WHERE id IN (1,2)
UNION
SELECT nom, email, age, 'Lyon' as ville FROM utilisateurs WHERE id IN (3,4)
ORDER BY age DESC;`,
					sqlResult: [
						{
							nom: "David Moreau",
							email: "david@email.com",
							age: 45,
							ville: "Lyon",
						},
						{
							nom: "Bob Martin",
							email: "bob@email.com",
							age: 32,
							ville: "Paris",
						},
						{
							nom: "Alice Dupont",
							email: "alice@email.com",
							age: 28,
							ville: "Paris",
						},
						{
							nom: "Claire Durand",
							email: "claire@email.com",
							age: 25,
							ville: "Lyon",
						},
					],
				},
			],
			description:
				"UNION combine les résultats de plusieurs requêtes. UNION élimine les doublons, UNION ALL les conserve.",
		},
		{
			title: "INDEX - Optimisation des Performances",
			content: "Optimisez vos requêtes avec des index stratégiquement placés.",
			sqlQueries: [
				{
					title: "Index simple sur une colonne",
					sqlCode: `CREATE INDEX idx_utilisateurs_email ON utilisateurs(email);`,
					sqlResult: {
						message: "Index 'idx_utilisateurs_email' créé avec succès",
						type: "message",
					},
				},
				{
					title: "Index composé sur plusieurs colonnes",
					sqlCode: `CREATE INDEX idx_commandes_user_date 
ON commandes(utilisateur_id, date_commande);`,
					sqlResult: {
						message: "Index composé 'idx_commandes_user_date' créé avec succès",
						type: "message",
					},
				},
				{
					title: "Index unique pour contraintes",
					sqlCode: `CREATE UNIQUE INDEX idx_produits_sku ON produits(sku);`,
					sqlResult: {
						message: "Index unique 'idx_produits_sku' créé avec succès",
						type: "message",
					},
				},
				{
					title: "Index partiel avec condition",
					sqlCode: `CREATE INDEX idx_commandes_recentes 
ON commandes(date_commande) 
WHERE date_commande > '2024-01-01';`,
					sqlResult: {
						message: "Index partiel 'idx_commandes_recentes' créé avec succès",
						type: "message",
					},
				},
				{
					title: "Analyser l'utilisation des index",
					sqlCode: `EXPLAIN QUERY PLAN 
SELECT * FROM utilisateurs WHERE email = 'alice@email.com';`,
					sqlResult: [
						{
							selectid: 0,
							order: 0,
							from: 0,
							detail:
								"SEARCH utilisateurs USING INDEX idx_utilisateurs_email (email=?)",
						},
					],
				},
			],
			description:
				"Les index accélèrent drastiquement les requêtes de lecture au prix d'un ralentissement des écritures.",
		},
		{
			title: "Transactions - BEGIN, COMMIT, ROLLBACK",
			content: "Gérez l'intégrité des données avec les transactions.",
			sqlQueries: [
				{
					title: "Transaction simple",
					sqlCode: `BEGIN TRANSACTION;
    INSERT INTO utilisateurs (nom, email, age) 
    VALUES ('Nouvel Utilisateur', 'nouveau@email.com', 35);
    
    INSERT INTO commandes (utilisateur_id, produit_id, prix) 
    VALUES (LAST_INSERT_ROWID(), 1, 99.99);
COMMIT;`,
					sqlResult: {
						message:
							"Transaction validée : utilisateur et commande créés avec succès",
						type: "message",
					},
				},
				{
					title: "Transaction avec vérification",
					sqlCode: `BEGIN TRANSACTION;
    UPDATE utilisateurs SET age = age + 1 WHERE id = 1;
    
    -- Vérifier que l'âge reste dans une plage acceptable
    SELECT CASE 
        WHEN age > 120 THEN RAISE(ABORT, 'Âge non réaliste')
        ELSE 'OK'
    END 
    FROM utilisateurs WHERE id = 1;
COMMIT;`,
					sqlResult: {
						message: "Transaction validée : âge mis à jour avec vérification",
						type: "message",
					},
				},
				{
					title: "Transaction de transfert bancaire",
					sqlCode: `BEGIN TRANSACTION;
    UPDATE comptes SET solde = solde - 200 WHERE id = 1;
    UPDATE comptes SET solde = solde + 200 WHERE id = 2;
    
    -- Vérifier qu'aucun compte n'est en négatif
    SELECT CASE 
        WHEN EXISTS(SELECT 1 FROM comptes WHERE solde < 0) 
        THEN RAISE(ABORT, 'Solde insuffisant')
        ELSE 'Transfert OK'
    END;
COMMIT;`,
					sqlResult: {
						message:
							"Transaction validée : transfert de 200€ effectué avec succès",
						type: "message",
					},
				},
				{
					title: "Transaction avec ROLLBACK",
					sqlCode: `BEGIN TRANSACTION;
    DELETE FROM logs WHERE date_creation < '2024-01-01';
    
    -- Après réflexion, on garde les logs...
ROLLBACK;`,
					sqlResult: {
						message: "Transaction annulée : aucune suppression effectuée",
						type: "message",
					},
				},
			],
			description:
				"Les transactions garantissent la cohérence des données : tout réussit ou tout échoue (ACID).",
		},
	],
};
