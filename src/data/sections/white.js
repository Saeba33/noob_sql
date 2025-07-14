import {
  DatabaseArchitecture,
  DataTypes,
  SGBDDiagram,
} from "@/components/ui/sections/white";
import { SECTION_DATA_COLORS } from "@/config/colors";

export const whiteBeltContent = {
  // Belt configuration
  belt: "white",
  description: "Théorie et concepts fondamentaux",
  topics: [
    "SGBD",
    "SGBDR",
    "Architecture BDD",
    "Syntaxe SQL",
    "Types de données",
    "Commentaires",
  ],
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
      externalComponent: <SGBDDiagram />,
    },
    {
      title: "Architecture d'une Base De Données Relationnelles",
      externalComponent: <DatabaseArchitecture />,
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
      externalComponent: <DataTypes />,
    },
  ],
};
