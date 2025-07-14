import { SECTION_DATA_COLORS } from "@/config/colors";

export const blackBeltContent = {
  // Belt configuration
  belt: "black",
  description: "Techniques avancées et optimisation",
  topics: ["Sous-requêtes", "WITH (CTE)", "VIEW", "UNION", "INDEX", "Transactions"],
  colors: SECTION_DATA_COLORS.black,

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
      content:
        "Utilisez des requêtes imbriquées pour des analyses complexes.",
      sqlCode: `-- Sous-requête dans WHERE
SELECT nom, age 
FROM utilisateurs 
WHERE age > (SELECT AVG(age) FROM utilisateurs);

-- Sous-requête dans SELECT
SELECT 
    nom,
    age,
    (SELECT COUNT(*) FROM commandes WHERE utilisateur_id = u.id) AS nb_commandes
FROM utilisateurs u;

-- Sous-requête avec IN
SELECT nom, email 
FROM utilisateurs 
WHERE id IN (
    SELECT utilisateur_id 
    FROM commandes 
    WHERE montant > 100
);

-- Sous-requête avec EXISTS
SELECT nom, email 
FROM utilisateurs u
WHERE EXISTS (
    SELECT 1 
    FROM commandes c 
    WHERE c.utilisateur_id = u.id 
    AND c.date_commande > '2024-01-01'
);`,
      sqlResult: `12 utilisateurs au-dessus de la moyenne
Utilisateurs avec compte de commandes
8 utilisateurs avec commandes > 100€
15 utilisateurs actifs en 2024`,
      description:
        "Les sous-requêtes permettent des analyses sophistiquées en combinant plusieurs niveaux de données.",
    },
    {
      title: "WITH (CTE - Common Table Expression) Version Simple",
      content:
        "Organisez vos requêtes complexes avec des expressions de table commune.",
      sqlCode: `-- CTE simple
WITH utilisateurs_actifs AS (
    SELECT id, nom, email 
    FROM utilisateurs 
    WHERE derniere_connexion > '2024-01-01'
)
SELECT * FROM utilisateurs_actifs;

-- CTE avec calculs
WITH statistiques_commandes AS (
    SELECT 
        utilisateur_id,
        COUNT(*) AS nb_commandes,
        SUM(montant) AS total_depense,
        AVG(montant) AS panier_moyen
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
WHERE s.total_depense > 1000;`,
      sqlResult: `Utilisateurs actifs sélectionnés
Gros clients identifiés`,
      description:
        "Les CTE rendent les requêtes complexes plus lisibles et réutilisables.",
    },
    {
      title: "Création et Utilisation de VIEW",
      content:
        "Créez des vues pour simplifier et sécuriser l'accès aux données.",
      sqlCode: `-- Création d'une vue simple
CREATE VIEW vue_utilisateurs_actifs AS
SELECT id, nom, email, age
FROM utilisateurs 
WHERE statut = 'actif' AND derniere_connexion > '2024-01-01';

-- Vue avec jointures
CREATE VIEW vue_commandes_detaillees AS
SELECT 
    c.id,
    c.numero_commande,
    u.nom AS client,
    u.email,
    c.montant,
    c.date_commande,
    c.statut
FROM commandes c
JOIN utilisateurs u ON c.utilisateur_id = u.id;

-- Utilisation des vues
SELECT * FROM vue_utilisateurs_actifs;
SELECT * FROM vue_commandes_detaillees WHERE montant > 100;

-- Supprimer une vue
DROP VIEW vue_utilisateurs_actifs;`,
      sqlResult: `Vue créée avec succès
Vue avec jointures créée
Données récupérées des vues
Vue supprimée`,
      description:
        "Les vues simplifient les requêtes complexes et fournissent une couche d'abstraction sécurisée.",
    },
    {
      title: "Opérations de Combinaison avec UNION, UNION ALL",
      content:
        "Combinez les résultats de plusieurs requêtes avec UNION.",
      sqlCode: `-- UNION : combine et élimine les doublons
SELECT nom, email FROM utilisateurs WHERE age < 25
UNION
SELECT nom, email FROM clients WHERE statut = 'prospect';

-- UNION ALL : combine sans éliminer les doublons (plus rapide)
SELECT 'utilisateur' AS type, nom, email FROM utilisateurs
UNION ALL
SELECT 'admin' AS type, nom, email FROM administrateurs;

-- UNION avec ORDER BY
SELECT nom, email, age FROM utilisateurs WHERE ville = 'Paris'
UNION
SELECT nom, email, age FROM utilisateurs WHERE ville = 'Lyon'
ORDER BY age DESC;`,
      sqlResult: `Jeunes utilisateurs et prospects combinés
Tous les utilisateurs avec leur type
Utilisateurs Paris/Lyon triés par âge`,
      description:
        "UNION combine les résultats de plusieurs requêtes. UNION élimine les doublons, UNION ALL les conserve.",
    },
    {
      title: "INDEX - Optimisation des Performances",
      content:
        "Optimisez vos requêtes avec des index stratégiquement placés.",
      sqlCode: `-- Index simple sur une colonne
CREATE INDEX idx_utilisateurs_email ON utilisateurs(email);

-- Index composé sur plusieurs colonnes
CREATE INDEX idx_commandes_user_date ON commandes(utilisateur_id, date_commande);

-- Index unique
CREATE UNIQUE INDEX idx_produits_sku ON produits(sku);

-- Index partiel avec condition
CREATE INDEX idx_commandes_actives 
ON commandes(date_commande) 
WHERE statut = 'en_cours';

-- Analyser l'utilisation des index
EXPLAIN QUERY PLAN 
SELECT * FROM utilisateurs WHERE email = 'test@email.com';

-- Supprimer un index
DROP INDEX idx_utilisateurs_email;`,
      sqlResult: `Index créés avec succès
Plan d'exécution affiché
Index supprimé`,
      description:
        "Les index accélèrent drastiquement les requêtes de lecture au prix d'un ralentissement des écritures.",
    },
    {
      title: "Transactions - BEGIN, COMMIT, ROLLBACK",
      content:
        "Gérez l'intégrité des données avec les transactions.",
      sqlCode: `-- Transaction simple
BEGIN TRANSACTION;
    INSERT INTO utilisateurs (nom, email) VALUES ('Test User', 'test@email.com');
    INSERT INTO commandes (utilisateur_id, montant) VALUES (LAST_INSERT_ROWID(), 99.99);
COMMIT;

-- Transaction avec gestion d'erreur
BEGIN TRANSACTION;
    UPDATE comptes SET solde = solde - 100 WHERE id = 1;
    UPDATE comptes SET solde = solde + 100 WHERE id = 2;
    
    -- Vérifier que les soldes restent positifs
    SELECT CASE 
        WHEN EXISTS(SELECT 1 FROM comptes WHERE id IN (1,2) AND solde < 0) 
        THEN RAISE(ABORT, 'Solde insuffisant')
    END;
COMMIT;

-- Transaction avec ROLLBACK
BEGIN TRANSACTION;
    DELETE FROM logs WHERE date_creation < '2024-01-01';
    -- Si on change d'avis...
ROLLBACK;`,
      sqlResult: `Transaction validée
Virement bancaire sécurisé
Suppression annulée`,
      description:
        "Les transactions garantissent la cohérence des données : tout réussit ou tout échoue.",
    }
  ],
};
