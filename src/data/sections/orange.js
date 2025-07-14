import { SECTION_DATA_COLORS } from "@/config/colors";

export const orangeBeltContent = {
  // Belt configuration
  belt: "orange",
  description: "CRUD - Opérations de base sur les données",
  topics: ["SELECT", "INSERT", "UPDATE", "DELETE", "TRUNCATE"],
  colors: SECTION_DATA_COLORS.orange,

  // Content sections
  header: {
    title: "CRUD - Opérations de Base",
    description: "Maîtrisez les opérations Créer, Lire, Modifier, Supprimer",
    tag: "Ceinture Orange",
  },
  pageDescription: {
    title: "Manipulez Vos Données avec les Opérations CRUD",
    content:
      "La ceinture orange vous apprend les quatre opérations fondamentales de manipulation de données : CREATE (INSERT), READ (SELECT), UPDATE et DELETE. Ces opérations forment l'épine dorsale de toute interaction avec une base de données. Vous apprendrez également la différence entre DELETE et TRUNCATE.",
  },
  accordions: [
    {
      title: "SELECT - Lecture de Données",
      content: "Récupérez et consultez les données stockées dans vos tables.",
      sqlCode: `-- Sélectionner toutes les colonnes
SELECT * FROM utilisateurs;

-- Sélectionner des colonnes spécifiques
SELECT nom, email FROM utilisateurs;

-- Sélectionner avec alias
SELECT 
    nom AS nom_utilisateur,
    email AS adresse_email,
    age AS age_utilisateur
FROM utilisateurs;

-- Sélectionner des valeurs uniques
SELECT DISTINCT age FROM utilisateurs;

-- Limiter le nombre de résultats
SELECT nom, email 
FROM utilisateurs 
LIMIT 5;`,
      sqlResult: `5 lignes retournées
2 colonnes retournées
3 colonnes avec alias retournées
Ages uniques retournés
5 premiers utilisateurs retournés`,
      description:
        "SELECT est la commande la plus utilisée en SQL. Elle vous permet de lire et extraire des données.",
    },
    {
      title: "INSERT - Ajout de Données",
      content: "Insérez de nouvelles données dans vos tables.",
      sqlCode: `-- Insertion simple
INSERT INTO utilisateurs (nom, email, age) 
VALUES ('Alice Dupont', 'alice@email.com', 28);

-- Insertion multiple
INSERT INTO utilisateurs (nom, email, age) VALUES 
('Bob Martin', 'bob@email.com', 32),
('Claire Durand', 'claire@email.com', 25),
('David Moreau', 'david@email.com', 45);

-- Insertion avec toutes les colonnes
INSERT INTO utilisateurs VALUES 
(5, 'Emma Bernard', 'emma@email.com', 30, '2024-01-15 10:30:00');

-- Insertion depuis une autre table
INSERT INTO utilisateurs_archive 
SELECT * FROM utilisateurs 
WHERE age > 60;`,
      sqlResult: `1 ligne insérée
3 lignes insérées
1 ligne insérée
2 lignes copiées vers l'archive`,
      description:
        "INSERT vous permet d'ajouter de nouvelles données dans vos tables de différentes manières.",
    },
    {
      title: "UPDATE - Modification de Données",
      content: "Modifiez les données existantes dans vos tables.",
      sqlCode: `-- Mise à jour simple
UPDATE utilisateurs 
SET age = 29 
WHERE nom = 'Alice Dupont';

-- Mise à jour multiple
UPDATE utilisateurs 
SET email = 'nouveau@email.com', age = age + 1 
WHERE id = 2;

-- Mise à jour conditionnelle
UPDATE utilisateurs 
SET statut = 'senior' 
WHERE age >= 60;

-- Mise à jour avec calcul
UPDATE produits 
SET prix = prix * 1.05 
WHERE categorie = 'electronique';

-- Mise à jour avec sous-requête
UPDATE commandes 
SET statut = 'expedie' 
WHERE date_commande < '2024-01-01';`,
      sqlResult: `1 ligne mise à jour
1 ligne mise à jour
3 lignes mises à jour
15 produits mis à jour
25 commandes mises à jour`,
      description:
        "UPDATE modifie les données existantes. Toujours utiliser WHERE pour éviter de modifier toute la table !",
    },
    {
      title: "DELETE vs TRUNCATE - Suppression de Données",
      content:
        "Supprimez des données avec DELETE ou videz une table avec TRUNCATE.",
      sqlCode: `-- DELETE : suppression sélective
DELETE FROM utilisateurs 
WHERE age < 18;

-- DELETE avec sous-requête
DELETE FROM commandes 
WHERE utilisateur_id IN (
    SELECT id FROM utilisateurs 
    WHERE statut = 'inactif'
);

-- DELETE toutes les lignes (mais garde la structure)
DELETE FROM logs;

-- TRUNCATE : vide toute la table (plus rapide)
TRUNCATE TABLE sessions;

-- Différences importantes :
-- DELETE peut avoir WHERE, TRUNCATE non
-- DELETE déclenche les triggers, TRUNCATE non  
-- TRUNCATE remet les compteurs à zéro
-- TRUNCATE est plus rapide sur grandes tables`,
      sqlResult: `5 utilisateurs mineurs supprimés
12 commandes supprimées
Tous les logs supprimés
Table sessions vidée`,
      description:
        "DELETE pour une suppression sélective, TRUNCATE pour vider complètement une table rapidement.",
    },
  ],
};
