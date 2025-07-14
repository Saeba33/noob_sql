import { SECTION_DATA_COLORS } from "@/config/colors";

export const yellowBeltContent = {
  // Belt configuration
  belt: "yellow",
  description: "Langage de définition de données",
  topics: ["CREATE TABLE", "ALTER TABLE", "DROP TABLE"],
  colors: SECTION_DATA_COLORS.yellow,

  // Content sections
  header: {
    title: "DDL - Langage de Définition de Données",
    description: "Créez et gérez la structure de vos bases de données",
    tag: "Ceinture Jaune",
  },
  pageDescription: {
    title: "Maîtrisez la structure de vos bases de données",
    content:
      "La ceinture jaune vous enseigne le DDL (Data Definition Language), le langage pour définir et modifier la structure de vos bases de données. Apprenez à créer des tables, les modifier et les supprimer. Ces compétences sont essentielles pour concevoir et faire évoluer vos schémas de base de données.",
  },
  accordions: [
    {
      title: "CREATE TABLE - Création de Tables",
      content:
        "Créez vos premières tables avec différents types de données et contraintes.",
      sqlCode: `-- Création d'une table simple
CREATE TABLE utilisateurs (
    id INTEGER PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    age INTEGER,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table avec clés étrangères
CREATE TABLE commandes (
    id INTEGER PRIMARY KEY,
    utilisateur_id INTEGER,
    produit VARCHAR(200),
    quantite INTEGER DEFAULT 1,
    prix DECIMAL(10,2),
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id)
);

-- Table avec contraintes avancées
CREATE TABLE produits (
    id INTEGER PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prix DECIMAL(10,2) CHECK (prix > 0),
    stock INTEGER DEFAULT 0 CHECK (stock >= 0),
    sku VARCHAR(50) UNIQUE NOT NULL
);`,
    },
    {
      title: "ALTER TABLE - Modification de Structure",
      content:
        "Modifiez la structure de vos tables existantes sans perdre de données.",
      sqlCode: `-- Ajouter une nouvelle colonne
ALTER TABLE utilisateurs 
ADD COLUMN telephone VARCHAR(20);

-- Ajouter une colonne avec contrainte
ALTER TABLE utilisateurs 
ADD COLUMN statut VARCHAR(20) DEFAULT 'actif' NOT NULL;

-- Modifier une colonne existante
ALTER TABLE utilisateurs 
ALTER COLUMN email SET NOT NULL;

-- Ajouter une contrainte
ALTER TABLE utilisateurs 
ADD CONSTRAINT check_age CHECK (age >= 0 AND age <= 120);

-- Renommer une colonne
ALTER TABLE utilisateurs 
RENAME COLUMN nom TO nom_complet;

-- Supprimer une colonne
ALTER TABLE utilisateurs 
DROP COLUMN telephone;`,
    },
    {
      title: "DROP TABLE - Suppression de Tables",
      content:
        "Supprimez des tables de manière sécurisée avec les bonnes pratiques.",
      sqlCode: `-- Supprimer une table (attention : irréversible!)
DROP TABLE ancienne_table;

-- Suppression conditionnelle
DROP TABLE IF EXISTS table_temporaire;

-- Supprimer avec CASCADE (supprime les dépendances)
DROP TABLE commandes CASCADE;

-- Vider une table sans la supprimer
TRUNCATE TABLE logs;

-- Alternative : supprimer toutes les données
DELETE FROM sessions;

-- Voir les tables existantes
SELECT name FROM sqlite_master 
WHERE type='table';`,
    },
  ],
};
