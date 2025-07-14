import { SECTION_DATA_COLORS } from "@/config/colors";

export const whiteBeltContent = {
  // Belt configuration
  belt: "white",
  description: "Base théorique et concepts fondamentaux",
  topics: ["SGBD", "SGBDR", "Architecture BDD", "Syntaxe SQL", "Types de données", "Commentaires"],
  colors: SECTION_DATA_COLORS.white,
  
  // Content sections
  header: {
    title: "Généralités - Concepts Fondamentaux",
    description: "Base théorique et concepts fondamentaux du SQL",
    tag: "Ceinture Blanche",
  },
  pageDescription: {
    title: "Découvrez les Fondamentaux des Bases de Données",
    content:
      "La ceinture blanche vous introduit aux concepts théoriques essentiels des bases de données. Comprenez ce qu'est un SGBD, explorez l'architecture relationnelle, découvrez la syntaxe SQL de base et familiarisez-vous avec les types de données. Cette base solide vous permettra d'aborder sereinement la pratique du SQL.",
  },
  accordions: [
    {
      title: "Qu'est-ce qu'un SGBD ?",
      content:
        "Découvrez les différents types de systèmes de gestion de base de données et leurs caractéristiques.",
      sqlDiagram: `SGBD (Système de Gestion de Base de Données)
├── Relationnels (SGBDR)
│   ├── MySQL
│   ├── PostgreSQL
│   ├── SQLite
│   └── SQL Server
└── Non-Relationnels (NoSQL)
    ├── Documents (MongoDB)
    ├── Clé-Valeur (Redis)
    ├── Colonnes (Cassandra)
    └── Graphes (Neo4j)`,
      description:
        "Un SGBD est un logiciel qui permet de stocker, organiser et récupérer des données de manière efficace et sécurisée.",
    },
    {
      title: "Le SGBDR (Relationnel)",
      content:
        "Comprenez les principes des bases de données relationnelles et leur organisation.",
      sqlDiagram: `Base de Données Relationnelle
├── Tables (Relations)
├── Lignes (Tuples/Enregistrements)  
├── Colonnes (Attributs/Champs)
├── Clés Primaires
├── Clés Étrangères
└── Relations entre tables`,
      description:
        "Les SGBDR organisent les données en tables liées entre elles par des relations, garantissant l'intégrité et la cohérence.",
    },
    {
      title: "Architecture d'une Base de Données",
      content:
        "Explorez la structure fondamentale : tables, colonnes et lignes.",
      sqlSchema: `CREATE TABLE utilisateurs (
    id INTEGER PRIMARY KEY,
    nom VARCHAR(50),
    email VARCHAR(100),
    age INTEGER
);`,
      sqlTable: {
        headers: ["id", "nom", "email", "age"],
        rows: [
          [1, "Alice", "alice@example.com", 28],
          [2, "Bob", "bob@example.com", 35],
          [3, "Charlie", "charlie@example.com", 22]
        ]
      },
      description:
        "Une table est composée de colonnes (structure) et de lignes (données). Chaque ligne représente un enregistrement unique.",
    },
    {
      title: "Syntaxe de Base d'une Requête SQL",
      content:
        "Apprenez la structure fondamentale d'une requête SQL.",
      sqlCode: `-- Structure de base d'une requête SQL
SELECT colonne1, colonne2
FROM nom_table
WHERE condition
ORDER BY colonne1;

-- Exemple concret
SELECT nom, email
FROM utilisateurs  
WHERE age > 25
ORDER BY nom;`,
      description:
        "Chaque requête SQL suit une structure logique : SELECT (quoi), FROM (où), WHERE (condition), ORDER BY (tri).",
    },
    {
      title: "Mots-clés, Indentation et Commentaires",
      content:
        "Maîtrisez les bonnes pratiques de formatage et de documentation du code SQL.",
      sqlCode: `-- Commentaire sur une ligne

/*
   Commentaire 
   sur plusieurs lignes
*/

-- Bonnes pratiques d'indentation
SELECT 
    nom,
    email,
    age
FROM utilisateurs
WHERE 
    age BETWEEN 18 AND 65
    AND email IS NOT NULL
ORDER BY 
    nom ASC,
    age DESC;`,
      description:
        "Un code SQL bien formaté et commenté améliore la lisibilité et la maintenance. Les mots-clés SQL ne sont pas sensibles à la casse.",
    },
    {
      title: "Types de Données",
      content:
        "Comprenez les différents types de données disponibles en SQL.",
      sqlCode: `-- Types de données courants

-- NOMBRES
INTEGER     -- Nombres entiers : 1, 42, -15
DECIMAL(10,2) -- Nombres décimaux : 19.99, 1500.00  
FLOAT       -- Nombres à virgule flottante

-- TEXTE
VARCHAR(50) -- Texte variable jusqu'à 50 caractères
TEXT        -- Texte de longueur variable
CHAR(10)    -- Texte fixe de 10 caractères

-- DATES ET HEURES  
DATE        -- Date : 2025-01-15
TIME        -- Heure : 14:30:00
TIMESTAMP   -- Date et heure : 2025-01-15 14:30:00

-- AUTRES
BOOLEAN     -- Vrai/Faux : TRUE, FALSE
NULL        -- Valeur absente/inconnue`,
      description:
        "Chaque type de données a ses spécificités. Bien les choisir optimise les performances et l'intégrité des données.",
    }
  ],
};
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
