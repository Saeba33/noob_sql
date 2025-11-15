import { lazy } from "react";
import {
	MdDataset,
	MdKey,
	MdLink,
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
const BestPractices = lazy(() =>
	import("@/components/ui/sections/BestPractices")
);

export const whiteBeltContent = {
	// Belt configuration
	belt: "white",
	description: "Théorie et concepts fondamentaux",
	topics: ["SGBD", "Architecture BDD", "Types de données", "Bonnes pratiques"],

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
			externalComponent: (
				<BestPractices
					introduction="Une base de données bien conçue facilite le développement et évite les erreurs ! Les bonnes pratiques SQL essentielles pour concevoir des bases de données maintenables et performantes. Suivez ces règles fondamentales pour éviter les pièges courants."
					rules={[
						{
							title: "Normalisation des tables",
							icon: <MdTableChart className="w-5 h-5 text-gray-600" />,
							rule: "Sépare les données en tables distinctes pour éviter la duplication. Chaque information ne doit apparaître qu'une seule fois dans la base.",
							good: "Tables: utilisateurs, commandes, produits (séparées)",
							bad: "Une table avec nom_client dupliqué dans chaque commande",
							reason: "Évite les incohérences, facilite les mises à jour",
						},
						{
							title: "Clés primaires simples",
							icon: <MdKey className="w-5 h-5 text-gray-600" />,
							rule: "Utilise des clés primaires simples et stables (id numérique)",
							good: "id INTEGER PRIMARY KEY AUTO_INCREMENT",
							bad: "Clés composées ou textuelles comme clé primaire",
							reason: "Performance optimale, simplicité des relations",
						},
						{
							title: "Clés étrangères",
							icon: <MdLink className="w-5 h-5 text-gray-600" />,
							rule: "Définis des clés étrangères pour assurer les relations",
							good: "utilisateur_id INTEGER REFERENCES utilisateurs(id)",
							bad: "Pas de contraintes, relations non déclarées",
							reason: "Intégrité référentielle garantie",
						},
						{
							title: "Convention snake_case",
							icon: <MdTextFormat className="w-5 h-5 text-gray-600" />,
							rule: "Utilise le snake_case pour les noms",
							good: "nom_utilisateur, date_creation, prix_total",
							bad: "nomUtilisateur, dateCreation, prixTotal",
							reason: "Standard universel, lisible dans tous les SGBD",
						},
						{
							title: "Noms explicites",
							icon: <MdDataset className="w-5 h-5 text-gray-600" />,
							rule: "Privilégie des noms explicites pour tables et colonnes",
							good: "utilisateurs, commande_id, prix_total",
							bad: "usr, cmd, tot, t1, c_id",
							reason: "Code auto-documenté, maintenance facilitée",
						},
						{
							title: "Index stratégiques",
							icon: <MdSpeed className="w-5 h-5 text-gray-600" />,
							rule: "Crée des index sur les colonnes de filtrage et jointure",
							good: "INDEX sur email, date_creation, statut",
							bad: "Aucun index sur les colonnes WHERE/JOIN",
							reason: "Performances optimales des requêtes",
						},
					]}
				/>
			),
		},
	],
};
