import {
  BestPractices,
  DatabaseArchitecture,
  DataTypes,
  SGBDDiagram,
} from "@/components/ui/sections/white";
import { BELT_COLORS } from "@/config/colors";

export const whiteBeltContent = {
  // Belt configuration
  belt: "white",
  description: "Théorie et concepts fondamentaux",
  topics: ["SGBD", "Architecture BDD", "Types de données", "Bonnes pratiques"],
  colors: BELT_COLORS.white,

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
      title: "Types de Données",
      externalComponent: <DataTypes />,
    },
    {
      title: "Bonnes Pratiques",
      externalComponent: <BestPractices />,
    },
  ],
};
