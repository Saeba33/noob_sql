import { SECTION_DATA_COLORS } from "@/config/colors";
export const yellowBeltContent = {
  // Belt configuration
  belt: "yellow",
  beltDisplayName: "jaune",
  beltBadge: "🟡",
  description: "Opérations de base - Créer, Lire, Modifier, Supprimer",
  topics: ["INSERT", "SELECT", "UPDATE", "DELETE", "WHERE"],
  colors: SECTION_DATA_COLORS.yellow,

  // Content sections
  header: {
    title: "CRUD - Opérations de Base",
    description: "Maîtrisez les opérations Créer, Lire, Modifier, Supprimer",
    tag: "Ceinture Jaune",
  },
  pageDescription: {
    title: "Manipulez Vos Données avec les Opérations CRUD",
    content:
      "La ceinture jaune vous apprend les quatre opérations fondamentales de manipulation de données : CREATE (INSERT), READ (SELECT), UPDATE et DELETE. Ces opérations forment l'épine dorsale de toute interaction avec une base de données. Vous apprendrez à insérer de nouvelles données, récupérer des informations, mettre à jour des enregistrements existants et supprimer des données obsolètes.",
  },
  accordions: [
    {
      title: "INSERT - Ajouter des Données",
      content:
        "Insérez de nouvelles données dans vos tables avec différentes méthodes.",
      sqlCode: `-- Insertion simple
INSERT INTO users (name, email, age) 
VALUES ('Alice Dupont', 'alice@email.com', 28);

-- Insertion multiple
INSERT INTO users (name, email, age) VALUES 
('Bob Martin', 'bob@email.com', 32),
('Claire Durand', 'claire@email.com', 25),
('David Moreau', 'david@email.com', 45);

-- Insertion avec toutes les colonnes
INSERT INTO users VALUES 
(5, 'Emma Bernard', 'emma@email.com', 30, '2024-01-15 10:30:00');

-- Insertion sélective (colonnes avec DEFAULT)
INSERT INTO users (name, email) 
VALUES ('François Petit', 'francois@email.com');`,
      sqlResult: `1 ligne insérée
3 lignes insérées
1 ligne insérée
1 ligne insérée`,
      description:
        "INSERT vous permet d'ajouter de nouvelles données dans vos tables de différentes manières.",
    },
    {
      title: "SELECT - Lire des Données",
      content:
        "Récupérez des données avec des requêtes SELECT de base à avancées.",
      sqlCode: `-- Sélection de toutes les colonnes
SELECT * FROM users;

-- Sélection de colonnes spécifiques
SELECT name, email FROM users;

-- Sélection avec alias
SELECT 
    name AS nom_complet,
    email AS adresse_email,
    age AS âge
FROM users;

-- Sélection avec calculs
SELECT 
    name,
    age,
    age + 10 AS age_dans_10_ans,
    CASE 
        WHEN age < 30 THEN 'Jeune'
        WHEN age < 50 THEN 'Adulte'
        ELSE 'Senior'
    END AS catégorie
FROM users;`,
      sqlResult: `5 lignes retournées
Alice Dupont | alice@email.com
Bob Martin | bob@email.com
...`,
      description:
        "SELECT est votre outil principal pour extraire et transformer des informations de votre base de données.",
    },
    {
      title: "UPDATE - Modifier des Données",
      content:
        "Mettez à jour des enregistrements existants avec précision et sécurité.",
      sqlCode: `-- Mise à jour simple
UPDATE users 
SET age = 29 
WHERE name = 'Alice Dupont';

-- Mise à jour multiple colonnes
UPDATE users 
SET 
    email = 'nouveau.email@domain.com',
    age = age + 1
WHERE id = 1;

-- Mise à jour conditionnelle
UPDATE users 
SET age = age + 1 
WHERE age < 50;

-- Mise à jour avec calculs
UPDATE products 
SET 
    price = price * 1.1,
    updated_at = CURRENT_TIMESTAMP
WHERE category = 'electronics';

-- Attention : UPDATE sans WHERE modifie TOUTES les lignes!
-- UPDATE users SET age = 25;  -- DANGEREUX!`,
      sqlResult: `1 ligne mise à jour
1 ligne mise à jour
3 lignes mises à jour
25 lignes mises à jour`,
      description:
        "UPDATE modifie des données existantes. Utilisez toujours WHERE sauf si vous voulez vraiment modifier toutes les lignes.",
    },
    {
      title: "DELETE - Supprimer des Données",
      content:
        "Supprimez des enregistrements de manière sélective et sécurisée.",
      sqlCode: `-- Suppression conditionnelle
DELETE FROM users 
WHERE age > 65;

-- Suppression par ID
DELETE FROM users 
WHERE id = 3;

-- Suppression avec conditions multiples
DELETE FROM orders 
WHERE status = 'cancelled' 
AND created_at < '2023-01-01';

-- Suppression basée sur une sous-requête
DELETE FROM users 
WHERE id IN (
    SELECT user_id FROM inactive_accounts
);

-- Attention : DELETE sans WHERE supprime TOUTES les lignes!
-- DELETE FROM users;  -- TRÈS DANGEREUX!

-- Alternative sûre : vider une table
TRUNCATE TABLE temp_data;`,
      sqlResult: `2 lignes supprimées
1 ligne supprimée
45 lignes supprimées
8 lignes supprimées`,
      description:
        "DELETE supprime définitivement des données. Toujours utiliser WHERE sauf pour vider complètement une table.",
    },
    {
      title: "Transactions - Sécurité des Opérations",
      content:
        "Groupez vos opérations CRUD dans des transactions pour maintenir la cohérence.",
      sqlCode: `-- Transaction simple
BEGIN TRANSACTION;

INSERT INTO users (name, email, age) 
VALUES ('Test User', 'test@email.com', 25);

UPDATE users 
SET age = 26 
WHERE email = 'test@email.com';

-- Valider les changements
COMMIT;

-- Transaction avec gestion d'erreur
BEGIN TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- Si tout va bien
COMMIT;

-- En cas de problème
-- ROLLBACK;`,
      description:
        "Les transactions garantissent que vos opérations multiples sont traitées comme un bloc atomique.",
    },
    {
      title: "Requêtes avec RETURNING/OUTPUT",
      content:
        "Récupérez les données modifiées directement après vos opérations.",
      sqlCode: `-- INSERT avec RETURNING (PostgreSQL/SQLite)
INSERT INTO users (name, email, age) 
VALUES ('Nouveau User', 'nouveau@email.com', 27)
RETURNING id, name, created_at;

-- UPDATE avec RETURNING
UPDATE users 
SET age = age + 1 
WHERE name LIKE 'Alice%'
RETURNING id, name, age;

-- DELETE avec RETURNING
DELETE FROM users 
WHERE age > 70
RETURNING id, name, email;

-- Insérer et récupérer l'ID généré
INSERT INTO products (name, price) 
VALUES ('Nouveau Produit', 29.99)
RETURNING id;`,
      sqlResult: `ID: 6, Name: Nouveau User, Created: 2024-01-15 10:45:30
ID: 1, Name: Alice Dupont, Age: 30
2 utilisateurs supprimés
Nouveau produit ID: 156`,
      description:
        "RETURNING vous permet de récupérer immédiatement les données affectées par vos opérations.",
    },
  ],
};
