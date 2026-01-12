import BestPractices from "@/components/ui/sections/BestPractices";
import { BELT_COLORS } from "@/config/belts-config";
import {
  MdDataset,
  MdSpeed,
  MdSync,
  MdTableView,
  MdViewList,
} from "react-icons/md";

const menu = {
  summary: "Techniques avancées et optimisation",
  topics: [
    "Sous-requêtes",
    "WITH (CTE)",
    "VIEW",
    "UNION",
    "INDEX",
    "Transactions",
  ],
};

const header = {
  tag: "Ceinture Noire",
  title: "Requêtes Avancées & Optimisation",
  description:
    "La ceinture noire valide votre expertise SQL. Au-delà de récupérer des données, vous apprenez à structurer des requêtes complexes, à optimiser les performances via l'indexation, et à garantir l'intégrité des données critiques avec les transactions. Des compétences indispensables pour les environnements de production.",
};

const accordions = [
  {
    section: "Sous-requêtes",
    content: "Les sous-requêtes permettent d'utiliser le résultat d'une requête à l'intérieur d'une autre. C'est utile pour filtrer des données sur la base de critères dynamiques.",
    examples: [
      {
        label: "Filtrer avec un résultat agrégé",
        code: `-- Trouver les produits plus chers que la moyenne
SELECT nom, prix 
FROM produits 
WHERE prix > (
    SELECT AVG(prix) 
    FROM produits
);`,
        result: [
          { nom: "Smartphone Pro", prix: 1299 },
          { nom: "Ordinateur Portable", prix: 899 },
        ],
      },
      {
        label: "EXISTS : Performance et vérification",
        code: `-- Trouver les utilisateurs ayant passé au moins une commande récente (Optimisé)
SELECT nom, email 
FROM utilisateurs u
WHERE EXISTS (
    SELECT 1 
    FROM commandes c 
    WHERE c.utilisateur_id = u.id 
    AND c.date_commande > '2024-01-01'
);`,
        result: [
          { nom: "Alice Dupont", email: "alice@email.com" },
          { nom: "Bob Martin", email: "bob@email.com" },
        ],
      },
    ],
  },
  {
    section: "WITH (CTE)",
    content:
      "Les CTE (Common Table Expressions) agissent comme des tables temporaires définies juste avant votre requête. Idéal pour isoler une logique complexe. Ici, nous reprenons les exemples des 'Sous-requêtes' pour montrer l'alternative.",
    examples: [
      {
        label: "Analogie 1 : Calcul de moyenne",
        code: `-- Version CTE de "Produits > Moyenne"
-- 1. On définit d'abord la moyenne dans une "boîte" nommée MoyennePrix
WITH MoyennePrix AS (
    SELECT AVG(prix) as valeur_moyenne 
    FROM produits
)
-- 2. On utilise cette boîte dans la requête principale
SELECT nom, prix 
FROM produits, MoyennePrix 
WHERE prix > MoyennePrix.valeur_moyenne;`,
        result: [
          { nom: "Smartphone Pro", prix: 1299 },
          { nom: "Ordinateur Portable", prix: 899 },
        ],
      },
      {
        label: "Analogie 2 : Filtrage (Equivalent EXISTS)",
        code: `-- Version CTE de "Utilisateurs avec commande récente"
-- 1. On isole d'abord les IDs des acheteurs récents
WITH AcheteursRecents AS (
    SELECT DISTINCT utilisateur_id 
    FROM commandes 
    WHERE date_commande > '2024-01-01'
)
-- 2. On fait une simple jointure avec cette liste
SELECT u.nom, u.email 
FROM utilisateurs u
JOIN AcheteursRecents ar ON u.id = ar.utilisateur_id;`,
        result: [
          { nom: "Alice Dupont", email: "alice@email.com" },
          { nom: "Bob Martin", email: "bob@email.com" },
        ],
      },
    ],
  },
  {
    section: "VIEW - Vues",
    content: "Une vue est une 'table virtuelle' basée sur une requête SQL. Elle permet de simplifier l'accès aux données complexes ou de restreindre l'accès à certaines colonnes sensibles.",
    examples: [
      {
        label: "Création d'une vue reporting",
        code: `-- Créer une vue qui consolide les informations de commande
CREATE VIEW vue_details_commandes AS
SELECT 
    c.numero_commande,
    c.date_commande,
    u.nom as client,
    u.email,
    p.nom as produit,
    c.montant
FROM commandes c
JOIN utilisateurs u ON c.utilisateur_id = u.id
LEFT JOIN produits p ON c.produit_id = p.id;`,
        result: {
          message: "Vue 'vue_details_commandes' créée avec succès",
          type: "message",
        },
      },
      {
        label: "Interrogation de la vue",
        code: `-- L'utilisateur final n'a plus besoin de connaître les jointures !
SELECT client, produit, montant
FROM vue_details_commandes
WHERE montant > 1000;`,
        result: [
          { client: "Alice Dupont", produit: "Smartphone Pro", montant: 1299 },
        ],
      },
    ],
  },
  {
    section: "UNION & UNION ALL",
    content: "Permet de combiner les résultats de deux tables ayant la même structure (mêmes colonnes). UNION supprime les doublons, UNION ALL les conserve (plus rapide).",
    examples: [
      {
        label: "Archivage : UNION ALL",
        code: `-- Combiner les commandes en cours et les archives
SELECT numero_commande, date_commande, montant, 'En Cours' as source
FROM commandes
UNION ALL
SELECT numero_commande, date_commande, montant_final, 'Archive' as source
FROM archives_commandes;`,
        result: [
          {
            numero_commande: "CMD002",
            date_commande: "2024-01-15",
            montant: 899,
            source: "En Cours",
          },
          {
            numero_commande: "ARC999",
            date_commande: "2022-12-10",
            montant: 120,
            source: "Archive",
          },
        ],
      },
      {
        label: "Consolidation : UNION",
        code: `-- Liste unique de tous les emails (clients + prospects)
SELECT email FROM utilisateurs
UNION
SELECT email FROM prospects_newsletter;`,
        result: [
          { email: "alice@email.com" },
          { email: "bob@email.com" },
          { email: "prospect@gmail.com" },
        ],
      },
    ],
  },
  {
    section: "INDEX - Optimisation",
    content: "Sans index, la base doit lire toute la table (SCAN) pour trouver une ligne. Avec un index, elle va directement au but (SEARCH). EXPLAIN QUERY PLAN permet de voir quelle méthode est utilisée.",
    examples: [
      {
        label: "Création d'Index",
        code: `-- Créer un index sur le nom pour accélérer les recherches
CREATE INDEX idx_utilisateurs_nom 
ON utilisateurs(nom);`,
        result: {
          message: "Index créé. La base a maintenant un 'sommaire' trié par nom.",
          type: "message",
        },
      },
      {
        label: "Comprendre le QUERY PLAN",
        code: `-- 1. Sans Index (= SCAN TABLE) : La base lit tout le livre. (LENT)
-- EXPLAIN QUERY PLAN SELECT * FROM utilisateurs WHERE age = 25;
-- Résultat : SCAN TABLE utilisateurs

-- 2. Avec Index (= SEARCH TABLE) : Accès direct via l'index. (RAPIDE)
EXPLAIN QUERY PLAN 
SELECT * FROM utilisateurs WHERE nom = 'Dupont';`,
        result: [
          {
            detail: "SEARCH TABLE utilisateurs USING INDEX idx_utilisateurs_nom (nom=?)",
            explication: "SEARCH = La base a utilisé l'index. C'est ce qu'on veut !",
          },
        ],
      },
      {
        label: "Index Unique (Contrainte)",
        code: `-- Un index unique sert aussi de validation de données
CREATE UNIQUE INDEX idx_produits_sku 
ON produits(sku);`,
        result: {
          message: "Index unique créé. Rejettera tout doublon de SKU.",
          type: "message",
        },
      },
    ],
  },
  {
    section: "Transactions",
    content: "Une transaction garantit qu'une série d'opérations est exécutée entièrement ou pas du tout (Atomicité). C'est crucial pour l'intégrité des données (paiements, stocks).",
    examples: [
      {
        label: "Transaction E-commerce (Succès)",
        code: `-- Scénario : Nouvelle commande (= Création commande + Baisse stock)
BEGIN TRANSACTION;

    -- 1. Créer la commande
    INSERT INTO commandes (utilisateur_id, montant, date_commande) 
    VALUES (1, 899, NOW());
    
    -- 2. Décrémenter le stock du produit acheté
    UPDATE produits 
    SET stock = stock - 1 
    WHERE id = 5;

COMMIT; -- Valide définitivement les deux changements`,
        result: {
          message: "Transaction validée : Commande créée et stock mis à jour.",
          type: "message",
        },
      },
      {
        label: "Transaction annulée (ROLLBACK)",
        code: `-- Scénario : Erreur de paiement en plein processus
BEGIN TRANSACTION;

    UPDATE produits SET stock = stock - 1 WHERE id = 5;
    
    -- Oups ! Erreur détectée (ex: paiement refusé)
    -- On annule tout pour ne pas fausser le stock
ROLLBACK;`,
        result: {
          message: "Transaction annulée : Le stock est revenu à sa valeur initiale.",
          type: "message",
        },
      },
    ],
  },
  {
		section: "Bonnes pratiques Avancées",
		externalComponent: (
			<BestPractices
				iconColor={BELT_COLORS.black.theme}
				introduction="Avec la puissance vient la responsabilité. Les requêtes complexes peuvent ralentir tout un système si elles sont mal écrites. Voici les règles d'or de l'optimisation."
				rules={[
					{
						section: "Indexation intelligente",
						icon: <MdSpeed />,
						rule: "N'indexez pas tout ! Les index accélèrent la lecture (SELECT) mais ralentissent l'écriture (INSERT/UPDATE).",
						good: "Index sur les colonnes de recherche (WHERE) et de jointure (JOIN)",
						bad: "Index sur chaque colonne de la table",
						reason:
							"Compromis performance lecture/écriture.",
					},
					{
						section: "Transactions courtes",
						icon: <MdSync />,
						rule: "Gardez les transactions aussi courtes que possible pour ne pas verrouiller la base de données.",
						good: "BEGIN; INSERT; UPDATE; COMMIT;",
						bad: "BEGIN; ... traitement long ou attente utilisateur ... COMMIT;",
						reason: "Évite les blocages (locks) qui gèlent l'application.",
					},
					{
						section: "Éviter SELECT *",
						icon: <MdViewList />,
						rule: "Dans les vues et le code de production, listez explicitement les colonnes.",
						good: "SELECT id, nom, email FROM utilisateurs",
						bad: "SELECT * FROM utilisateurs",
						reason:
							"Performance réseau et stabilité si la structure change.",
					},
                    {
						section: "Utilisation des CTE",
						icon: <MdTableView />,
						rule: "Préférez les CTE aux sous-requêtes imbriquées pour la lisibilité.",
						good: "WITH Sales AS (...) SELECT ... FROM Sales",
						bad: "SELECT ... FROM (SELECT ... FROM (SELECT ...))",
						reason:
							"Le code est lu plus souvent qu'il n'est écrit.",
					},
				]}
			/>
		),
	},
];

export const beltContent = {
	...menu,
	header,
	accordions,
};