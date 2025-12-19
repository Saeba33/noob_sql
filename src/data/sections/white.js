import {
  MdDataset,
  MdKey,
  MdLink,
  MdNumbers,
  MdSecurity,
  MdSettings,
  MdTableChart,
  MdTextFormat,
  MdVerified,
} from "react-icons/md";

import BestPractices from "@/components/ui/sections/BestPractices";
import DatabaseArchitecture from "@/components/ui/sections/white/DatabaseArchitecture";
import DataTypes from "@/components/ui/sections/white/DataTypes";
import PrimaryForeignKeys from "@/components/ui/sections/white/PrimaryForeignKeys";
import SGBDDiagram from "@/components/ui/sections/white/SGBDDiagram";
import { BELT_COLORS } from "@/config/belts-config";

const menu = {
  summary: "Théorie et concepts fondamentaux",
  topics: [
    "SGBD",
    "Architecture BDD relationnelles",
    "Types de données",
    "Relations entre les tables",
    "Bonnes pratiques",
  ],
};

const header = {
  tag: "Ceinture Blanche",
  title: "Généralités & Concepts",
  description:
    "La ceinture blanche vous introduit aux concepts théoriques essentiels des bases de données. Comprenez ce qu'est un SGBD, explorez l'architecture relationnelle, découvrez la syntaxe SQL de base et familiarisez-vous avec les types de données. Cette base solide vous permettra d'aborder sereinement la pratique du SQL.",
};

const accordions = [
	{
		section: "Qu'est-ce qu'un SGBD ?",
		externalComponent: <SGBDDiagram />,
	},
	{
		section: "Architecture d'un SGBDR",
		externalComponent: <DatabaseArchitecture />,
	},
	{
		section: "Relations entre les tables",
		externalComponent: <PrimaryForeignKeys />,
	},
	{
		section: "Types de données",
		externalComponent: <DataTypes />,
	},
	{
		section: "Bonnes pratiques",
		externalComponent: (
			<BestPractices
				iconColor={BELT_COLORS.white.theme}
				introduction="Une base de données bien conçue facilite le développement et évite les erreurs ! Les bonnes pratiques SQL essentielles pour concevoir des bases de données maintenables et performantes. Suivez ces règles fondamentales pour éviter les pièges courants."
				rules={[
					{
						section: "Normalisation des tables",
						icon: <MdTableChart />,
						rule: "Organiser les données en tables distinctes afin d’éviter les duplications. Une information ne doit exister qu’à un seul endroit.",
						good: "Tables séparées : utilisateurs, commandes, produits",
						bad: "Une table commandes avec nom_client répété à chaque ligne",
						reason: "Évite les incohérences, facilite les mises à jour.",
					},
					{
						section: "Conventions de nommage",
						icon: <MdDataset />,
						rule: "Utiliser des noms explicites. Par convention, les tables sont nommées au pluriel, les colonnes au singulier.",
						good: "Tables : utilisateurs, commandes \nColonnes : email, date_creation, utilisateur_id",
						bad: "Tables : utilisateur, commande \nColonnes : usr, nm, data1",
						reason: "Facilite la lecture, la compréhension et la maintenance.",
					},
					{
						section: "Convention snake_case",
						icon: <MdTextFormat />,
						rule: "Écrire les noms de tables et de colonnes en minuscules avec des underscores (snake_case).",
						good: "nom_utilisateur, date_creation, prix_total",
						bad: "Utilisateurs, dateCreation, prix-total",
						reason:
							"Standard universel limitant les erreurs d’interprétation des SGBD.",
					},
					{
						section: "Types de données appropriés",
						icon: <MdTextFormat />,
						rule: "Choisir le type de données adapté à chaque colonne.",
						good: "VARCHAR(255) pour emails, DECIMAL(10,2) pour montants, INTEGER pour identifiants",
						bad: "VARCHAR trop long, FLOAT pour des prix, TEXT pour des données courtes",
						reason: "Améliore le stockage, la précision et les performances.",
					},
					{
						section: "Contraintes de validation",
						icon: <MdDataset />,
						rule: "Ajouter des contraintes pour garantir la validité des données (NOT NULL, UNIQUE, CHECK...)",
						good: "email VARCHAR(255) UNIQUE NOT NULL, age INTEGER CHECK(age >= 0)",
						bad: "Colonnes sans contraintes, valeurs nulles ou incohérentes possibles",
						reason:
							"Renforce l'intégrité des données, évite les erreurs en amont.",
					},
					{
						section: "Relations entre les tables",
						icon: <MdLink />,
						rule: "Relier les tables logiquement grâce aux clés étrangères (FOREIGN KEY).",
						good: "commande.utilisateur_id → FOREIGN KEY vers utilisateurs.id",
						bad: "Stoker nom_client directement dans une table commandes",
						reason:
							"Assure la cohérence entre les tables et permet des jointures fiables.",
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

export const dataTypes = [
  {
    type: "common",
    category: "Nombres",
    tagColorClass: "bg-yellow-50 text-yellow-800 border-yellow-100",
    color: "gray",
    types: [
      {
        name: "INTEGER",
        description: "Nombres entiers",
        examples: ["1", "42", "-15", "0"],
        usage: "Identifiants, compteurs, âges",
      },
      {
        name: "DECIMAL(10,2)",
        description:
          "Nombre décimal précis. Dans cet exemple, on indique un nombre maximal de 10 chiffres au total, dont 2 après la virgule.",
        examples: ["19.99", "1500.00", "-25.50"],
        usage: "Prix, salaires, mesures",
      },
    ],
  },
  {
    type: "common",
    category: "Texte",
    tagColorClass: "bg-green-50 text-green-800 border-green-100",
    color: "gray",
    types: [
      {
        name: "VARCHAR(255)",
        description:
          "Texte variable. La valeur entre parenthèses représente le nombre de caractères maximum autorisé. Par convention, il est souvent défini à 255 caractères.",
        examples: ["'Marie Dubois'", "'contact@site.com'"],
        usage: "Noms, emails, titres, descriptions courtes",
      },
      {
        name: "TEXT",
        description: "Texte long (jusqu'à 65 000 caractères)",
        examples: ["'Description longue...'"],
        usage: "Articles, commentaires, descriptions détaillées",
      },
    ],
  },
  {
    type: "common",
    category: "Dates & heures",
    tagColorClass: "bg-purple-50 text-purple-800 border-purple-100",
    color: "gray",
    types: [
      {
        name: "DATE",
        description: "Date uniquement (format : YYYY-MM-DD)",
        examples: ["2025-01-15"],
        usage: "Dates de naissance, échéances",
      },
      {
        name: "TIMESTAMP",
        description: "Date et heure (format : YYYY-MM-DD HH:MM:SS)",
        examples: ["2025-01-15 14:30:00"],
        usage: "Logs, créations, modifications",
      },
    ],
  },
  {
    type: "common",
    category: "Autres",
    tagColorClass: "bg-blue-50 text-blue-800 border-blue-100",
    color: "gray",
    types: [
      {
        name: "BOOLEAN",
        description:
          "True / False. Souvent stocké comme 1 (true) ou 0 (false).",
        examples: ["TRUE", "FALSE", "1", "0"],
        usage: "États, bascules, indicateurs",
      },
    ],
  },
  {
    type: "uncommon",
    category: "Nombres",
    tagColorClass: "bg-yellow-50 text-yellow-800 border-yellow-100",
    color: "lightgray",
    types: [
      {
        name: "BIGINT",
        description: "Très grands nombres entiers",
        examples: ["9223372036854775807"],
        usage: "IDs très nombreux, timestamps Unix",
      },
      {
        name: "FLOAT / DOUBLE",
        description: "Nombres à virgule flottante (approximatifs)",
        examples: ["3.14159"],
        usage: "Calculs scientifiques, coordonnées GPS",
      },
      {
        name: "TINYINT",
        description: "Petits entiers (-128 à 127, ou 0 à 255 si UNSIGNED)",
        examples: ["1", "0", "255"],
        usage: "Indicateurs, petits compteurs, booléens",
      },
    ],
  },
  {
    type: "uncommon",
    category: "Texte",
    tagColorClass: "bg-green-50 text-green-800 border-green-100",
    color: "lightgray",
    types: [
      {
        name: "CHAR(10)",
        description:
          "Texte de longueur fixe (complété par des espaces). Dans cet exemple, si je tape FR, l'enregistrement sera complété par 8 espaces ",
        examples: ["'FR        '"],
        usage: "Codes pays, hash fixes, IDs formatés",
      },
      {
        name: "MEDIUMTEXT",
        description: "Texte moyen (jusqu'à 16 millions de caractères)",
        examples: ["'Très long contenu...'"],
        usage: "Livres, documentation extensive",
      },
      {
        name: "LONGTEXT",
        description: "Texte très long (jusqu'à 4 Go)",
        examples: ["'Contenu gigantesque...'"],
        usage: "Stockage de fichiers texte entiers",
      },
    ],
  },
  {
    type: "uncommon",
    category: "Autres",
    tagColorClass: "bg-blue-50 text-blue-800 border-blue-100",
    color: "lightgray",
    types: [
      {
        name: "ENUM('val1','val2')",
        description: "Liste de valeurs prédéfinies",
        examples: ["'actif'", "'inactif'"],
        usage: "Statuts, catégories fixes",
      },
      {
        name: "JSON",
        description: "Données structurées JSON",
        examples: ["{'nom': 'Marie', 'age': 30}"],
        usage: "Configurations, métadonnées flexibles",
      },
    ],
  },
];

export const constraints = [
	{
		name: "PRIMARY KEY",
		description: "Identifiant unique de la table",
		icon: <MdKey/>,
		example: "id INTEGER PRIMARY KEY AUTO_INCREMENT",
		usage: "Identifie de manière unique chaque enregistrement de la table",
	},
	{
		name: "FOREIGN KEY",
		description: "Référence vers une autre table",
		icon: <MdLink/>,
		example: "utilisateur_id INTEGER REFERENCES utilisateurs(id)",
		usage: "Assure l’intégrité référentielle entre deux tables",
	},
	{
		name: "UNIQUE",
		description: "Valeur unique dans la table",
		icon: <MdVerified/>,
		example: "email VARCHAR(255) UNIQUE",
		usage: "Empêche l’enregistrement de valeurs dupliquées",
	},
	{
		name: "NOT NULL",
		description: "Valeur obligatoire",
		icon: <MdSecurity/>,
		example: "nom VARCHAR(100) NOT NULL",
		usage: "Interdit les valeurs vides pour cette colonne",
	},
	{
		name: "DEFAULT",
		description: "Valeur par défaut",
		icon: <MdSettings/>,
		example: "statut VARCHAR(20) DEFAULT 'actif'",
		usage: "Applique une valeur par défaut à un enregistrement",
	},
	{
		name: "CHECK",
		description: "Contrainte de validation",
		icon: <MdVerified />,
		example: "age INTEGER CHECK (age >= 0 AND age <= 120)",
		usage: "Vérifie que la valeur rentre dans le périmètre défini",
	},
	{
		name: "AUTO_INCREMENT",
		description: "Incrémentation automatique",
		icon: <MdNumbers/>,
		example: "id INTEGER AUTO_INCREMENT",
		usage: "Génère automatiquement une valeur numérique incrémentée",
	},
];

export const exampleTypes = [
  {
    column: "id",
    type: "INTEGER PRIMARY KEY AUTO_INCREMENT",
    reason: "Clé primaire automatique",
    example: "1, 2, 3...",
    benefit: "Unique, incrémental, performant",
  },
  {
    column: "nom",
    type: "VARCHAR(100) NOT NULL",
    reason: "Noms rarement > 100 caractères",
    example: "'Marie Dubois'",
    benefit: "Obligatoire, taille optimale",
  },
  {
    column: "email",
    type: "VARCHAR(255) UNIQUE NOT NULL",
    reason: "Standard email + unicité",
    example: "'marie@site.com'",
    benefit: "Pas de doublons, connexion unique",
  },
  {
    column: "age",
    type: "INTEGER UNSIGNED CHECK(...)",
    reason: "Âge toujours positif + validation",
    example: "18",
    benefit: "Données cohérentes",
  },
  {
    column: "salaire",
    type: "DECIMAL(10,2) DEFAULT 0.00",
    reason: "Précision financière + défaut",
    example: "3500.50",
    benefit: "Calculs exacts",
  },
  {
    column: "actif",
    type: "BOOLEAN DEFAULT TRUE",
    reason: "État actif par défaut",
    example: "TRUE",
    benefit: "Gestion des comptes",
  },
  {
    column: "date_creation",
    type: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    reason: "Auto-remplissage à la création",
    example: "2025-01-15 14:30:00",
    benefit: "Traçabilité automatique",
  },
  {
    column: "date_naissance",
    type: "DATE NULL",
    reason: "Info optionnelle",
    example: "1990-05-20",
    benefit: "Flexibilité",
  },
  {
    column: "preferences",
    type: "JSON NULL",
    reason: "Données structurées flexibles",
    example: "{'theme': 'dark'}",
    benefit: "Extensibilité",
  },
];
