import { SECTION_DATA_COLORS } from "@/config/colors";

export const whiteBeltContent = {
  // Belt configuration
  belt: "white",
  beltDisplayName: "blanche",
  beltBadge: "⚪",
  description: "Langage de définition de données - Créez vos premières tables",
  topics: ["CREATE TABLE", "ALTER TABLE", "DROP TABLE", "Types de données", "Contraintes"],
  colors: SECTION_DATA_COLORS.white,
  
  // Content sections
  header: {
    title: "DDL - Langage de Définition de Données",
    description: "Créez vos premières tables et structures de base de données",
    tag: "Ceinture Blanche",
  },
  pageDescription: {
    title: "Maîtrisez les Fondamentaux des Bases de Données",
    content:
      "La ceinture blanche vous introduit aux concepts fondamentaux du SQL avec le DDL (Data Definition Language). Apprenez à créer des tables, définir des types de données, ajouter des contraintes, et gérer la structure de votre base de données. Ces compétences forment la base solide sur laquelle vous construirez toutes vos futures connaissances SQL.",
  },
  accordions: [
    {
      title: "CREATE TABLE - Création de Tables",
      content:
        "Créez vos premières tables avec différents types de données et contraintes de base.",
      sqlCode: `-- Création d'une table simple
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    age INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table avec clé étrangère
CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    product_name VARCHAR(200),
    quantity INTEGER DEFAULT 1,
    price DECIMAL(10,2),
    FOREIGN KEY (user_id) REFERENCES users(id)
);`,
      sqlResult: `Table "users" créée avec succès
Table "orders" créée avec succès`,
      description:
        "La commande CREATE TABLE est votre première étape vers la création d'une structure de données organisée.",
    },
    {
      title: "Types de Données",
      content:
        "Comprenez les différents types de données disponibles et quand les utiliser.",
      sqlCode: `-- Types de données courants
CREATE TABLE data_types_example (
    -- Nombres entiers
    small_number SMALLINT,
    regular_number INTEGER,
    big_number BIGINT,
    
    -- Nombres décimaux
    price DECIMAL(10,2),
    percentage FLOAT,
    
    -- Texte
    short_text VARCHAR(50),
    long_text TEXT,
    fixed_text CHAR(10),
    
    -- Dates et heures
    birth_date DATE,
    appointment_time TIME,
    created_at TIMESTAMP,
    
    -- Booléen
    is_active BOOLEAN
);`,
      description:
        "Choisir le bon type de données optimise les performances et garantit l'intégrité de vos données.",
    },
    {
      title: "Contraintes et Clés",
      content:
        "Apprenez à utiliser les contraintes pour garantir l'intégrité de vos données.",
      sqlCode: `-- Table avec contraintes avancées
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) CHECK (price > 0),
    category_id INTEGER NOT NULL,
    stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
    sku VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Contraintes nommées
CREATE TABLE customers (
    id INTEGER PRIMARY KEY,
    email VARCHAR(255),
    phone VARCHAR(20),
    
    CONSTRAINT unique_email UNIQUE (email),
    CONSTRAINT valid_phone CHECK (phone LIKE '+%' OR phone LIKE '0%')
);`,
      description:
        "Les contraintes protègent votre base de données contre les données incohérentes.",
    },
    {
      title: "ALTER TABLE - Modification de Structure",
      content:
        "Modifiez la structure de vos tables existantes sans perdre de données.",
      sqlCode: `-- Ajouter une nouvelle colonne
ALTER TABLE users 
ADD COLUMN phone VARCHAR(20);

-- Modifier une colonne existante
ALTER TABLE users 
ALTER COLUMN email SET NOT NULL;

-- Ajouter une contrainte
ALTER TABLE users 
ADD CONSTRAINT check_age CHECK (age >= 0 AND age <= 120);

-- Renommer une colonne
ALTER TABLE users 
RENAME COLUMN name TO full_name;

-- Supprimer une colonne
ALTER TABLE users 
DROP COLUMN phone;`,
      description:
        "ALTER TABLE vous permet de faire évoluer votre schéma de base de données au fil du temps.",
    },
    {
      title: "DROP - Suppression d'Objets",
      content:
        "Supprimez des tables, colonnes ou contraintes de manière sécurisée.",
      sqlCode: `-- Supprimer une table (attention : irréversible!)
DROP TABLE old_table;

-- Supprimer une table seulement si elle existe
DROP TABLE IF EXISTS temp_table;

-- Supprimer une contrainte
ALTER TABLE users 
DROP CONSTRAINT check_age;

-- Supprimer un index
DROP INDEX idx_user_email;

-- Vider une table (garder la structure)
TRUNCATE TABLE logs;`,
      description:
        "Utilisez DROP avec précaution - ces opérations sont généralement irréversibles.",
    },
    {
      title: "Index - Optimisation des Requêtes",
      content:
        "Créez des index pour accélérer vos requêtes les plus fréquentes.",
      sqlCode: `-- Index simple sur une colonne
CREATE INDEX idx_user_email ON users(email);

-- Index composé sur plusieurs colonnes
CREATE INDEX idx_order_user_date ON orders(user_id, created_at);

-- Index unique
CREATE UNIQUE INDEX idx_product_sku ON products(sku);

-- Index partiel avec condition
CREATE INDEX idx_active_users ON users(email) 
WHERE is_active = true;

-- Voir les index d'une table
PRAGMA index_list(users);`,
      description:
        "Les index améliorent drastiquement les performances de recherche au prix d'un peu d'espace de stockage.",
    },
  ],
};
