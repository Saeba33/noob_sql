import { lazy } from "react";
import {
	MdDataset,
	MdSpeed,
	MdTableChart,
	MdTextFormat,
} from "react-icons/md";

// Lazy load of components
const SGBDDiagram = lazy(() =>
	import("@/components/ui/sections/white/SGBDDiagram")
);
const DatabaseArchitecture = lazy(() =>
	import("@/components/ui/sections/white/DatabaseArchitecture")
);
const DataTypes = lazy(() =>
	import("@/components/ui/sections/white/DataTypes")
);
const PrimaryForeignKeys = lazy(() =>
	import("@/components/ui/sections/white/PrimaryForeignKeys")
);
const BestPractices = lazy(() =>
	import("@/components/ui/sections/BestPractices")
);

export const whiteBeltContent = {
	// Belt configuration
	belt: "white",
	description: "Théorie et concepts fondamentaux",
	topics: [
		"SGBD",
		"Architecture BDD relationnelles",
		"Types de données",
		"Relations entre les tables",
		"Bonnes pratiques",
	],

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
			title: "Architecture d'une base de données relationnelles",
			externalComponent: <DatabaseArchitecture />,
		},
		{
			title: "Relations entre les tables",
			externalComponent: <PrimaryForeignKeys />,
		},
		{
			title: "Types de données",
			externalComponent: <DataTypes />,
		},
		{
			title: "Bonnes pratiques",
			externalComponent: (
				<BestPractices
					introduction="Une base de données bien conçue facilite le développement et évite les erreurs ! Les bonnes pratiques SQL essentielles pour concevoir des bases de données maintenables et performantes. Suivez ces règles fondamentales pour éviter les pièges courants."
					rules={[
						{
							title: "Normalisation des tables",
							icon: <MdTableChart className="w-5 h-5 text-gray-600" />,
							rule: "Séparer les données en tables distinctes pour éviter la duplication. Chaque information ne doit apparaître qu'une seule fois dans la base.",
							good: "Tables: utilisateurs, commandes, produits (séparées)",
							bad: "Une table avec nom_client dupliqué dans chaque commande",
							reason: "Évite les incohérences, facilite les mises à jour",
						},
						{
							title: "Convention snake_case",
							icon: <MdTextFormat className="w-5 h-5 text-gray-600" />,
							rule: "Utiliser le snake_case pour les noms",
							good: "nom_utilisateur, date_creation, prix_total",
							bad: "nomUtilisateur, dateCreation, prixTotal",
							reason: "Standard universel de nommage",
						},
						{
							title: "Noms explicites",
							icon: <MdDataset className="w-5 h-5 text-gray-600" />,
							rule: "Privilégier des noms explicites pour tables et colonnes",
							good: "utilisateurs, commande_id, prix_total",
							bad: "usr, cmd, tot, t1, c_id",
							reason: "Maintenance facilitée",
						},
					{
						title: "Index stratégiques",
						icon: <MdSpeed className="w-5 h-5 text-gray-600" />,
						rule: "Créer des index sur les colonnes de filtrage et jointure (détails en Ceinture Noire)",
						good: "INDEX sur email, date_creation, statut",
						bad: "Aucun index sur les colonnes WHERE/JOIN",
						reason: "Performances optimales des requêtes",
					},
					{
						title: "Types de données appropriés",
						icon: <MdTextFormat className="w-5 h-5 text-gray-600" />,
						rule: "Choisir le type de données adapté à chaque colonne",
						good: "VARCHAR(255) pour emails, DECIMAL(10,2) pour prix, INTEGER AUTO_INCREMENT pour IDs",
						bad: "VARCHAR trop long, FLOAT pour montants, TEXT pour données courtes",
						reason: "Optimise la mémoire, garantit la précision des calculs",
					},
					{
						title: "Contraintes de validation",
						icon: <MdDataset className="w-5 h-5 text-gray-600" />,
						rule: "Utiliser NOT NULL, UNIQUE, CHECK pour garantir la qualité des données",
						good: "email VARCHAR(255) UNIQUE NOT NULL, age INTEGER CHECK(age >= 0)",
						bad: "Colonnes sans contraintes, données incohérentes possibles",
						reason: "Intégrité des données, évite les erreurs en amont",
					},
					]}
				/>
			),
		},
	],
};
