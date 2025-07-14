import { SECTION_DATA_COLORS } from "@/config/colors";
import { SGBDDiagram, DatabaseArchitecture } from "@/components/ui/sections/white";

export const whiteBeltContent = {
  // Belt configuration
  belt: "white",
  description: "Théorie et concepts fondamentaux",
  topics: ["SGBD", "SGBDR", "Architecture BDD", "Syntaxe SQL", "Types de données", "Commentaires"],
  colors: SECTION_DATA_COLORS.white,
  
  // Content sections
  header: {
    title: "Généralités & Concepts",
    description: "Base théorique et concepts fondamentaux du SQL",
    tag: "Ceinture Blanche",
  },
  pageDescription: {
    title: "Découvrez les fondamentaux des Bases De Données (BDD)",
    content:
      "La ceinture blanche vous introduit aux concepts théoriques essentiels des bases de données. Comprenez ce qu'est un SGBD, explorez l'architecture relationnelle, découvrez la syntaxe SQL de base et familiarisez-vous avec les types de données. Cette base solide vous permettra d'aborder sereinement la pratique du SQL.",
  },
  accordions: [
    {
      title: "Qu'est-ce qu'un SGBD ?",
      content:
        "Découvrez les différents types de systèmes de gestion de base de données et leurs caractéristiques.",
      externalComponent: <SGBDDiagram />,
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
      externalComponent: <DatabaseArchitecture />,
      sqlSchema: `CREATE TABLE utilisateurs (
    id INTEGER PRIMARY KEY,
    nom VARCHAR(50),
    email VARCHAR(100),
    age INTEGER
);`,
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
