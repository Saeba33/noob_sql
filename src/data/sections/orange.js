import {
	MdCode,
	MdFormatIndentIncrease,
	MdSpellcheck,
	MdTextFormat,
} from "react-icons/md";

import BestPractices from "@/components/ui/sections/BestPractices";
import { BELT_COLORS } from "@/config/belts-config";

const menu = {
	summary: "Opérations de base sur les données",
	topics: [
		"INSERT",
		"SELECT",
		"UPDATE",
		"DELETE",
		"TRUNCATE",
		"Bonnes Pratiques",
	],
};

const header = {
	title: "CRUD - Opérations de base",
	tag: "Ceinture Orange",
	description:
		"La ceinture orange vous apprend les quatre opérations fondamentales de manipulation de données : Create (commande INSERT), Read (commande SELECT), Update et Delete. Ces opérations forment l'épine dorsale de toute interaction avec une base de données.",
};

const accordions = [
	{
		section: "INSERT",
		content:
			"La commande INSERT permet d'ajouter de nouvelles lignes dans une table. Vous pouvez insérer une ou plusieurs lignes à la fois en listant les valeurs entre parenthèses.\nSi une colonne a une valeur par défaut ou accepte NULL, vous pouvez l'omettre de la requête.",
		examples: [
			{
				label: "Insertion d'un seul utilisateur",
				code: `INSERT INTO utilisateurs (prenom, nom, email, age) VALUES 
('Alice', 'Dupont', 'alice@email.com', 28);`,
				result: {
					message: "1 ligne insérée avec succès",
					type: "message",
				},
			},
			{
				label: "Insertion de plusieurs utilisateurs",
				code: `-- Insertion de plusieurs utilisateurs en une seule requête
INSERT INTO utilisateurs (prenom, nom, email, age) VALUES 
('Bob', 'Martin', 'bob@gmail.com', 32),
('Claire', 'Durand', 'claire@email.com', 25),
('David', 'Moreau', 'david@email.com', 45);`,
				result: {
					message: "3 lignes insérées avec succès",
					type: "message",
				},
			},
		],
	},
	{
		section: "SELECT",
		content:
			"La commande SELECT est la plus utilisée en SQL : elle permet de lire et récupérer des données.\nVous pouvez sélectionner toutes les colonnes avec le symbole * ou choisir uniquement celles dont tu as besoin.\nVous pouvez utiliser un alias (AS) pour renommer une colonne dans le résultat. C'est utile pour rendre les résultats plus lisibles ou nommer des calculs.\nOn peut combiner SELECT avec WHERE pour filtrer les résultats. La clause WHERE et ses opérateurs seront détaillés dans la prochaine ceinture.",
		examples: [
			{
				label: "Sélectionner toutes les colonnes",
				code: `-- Sélectionner toutes les colonnes de tous les utilisateurs
SELECT * 
FROM utilisateurs;`,
				result: [
					{
						id: 1,
						prenom: "Alice",
						nom: "Dupont",
						email: "alice@email.com",
						age: 28,
						ville: "Paris",
						telephone: "06 12 34 56 78",
					},
					{
						id: 2,
						prenom: "Bob",
						nom: "Martin",
						email: "bob@gmail.com",
						age: 32,
						ville: "Paris",
						telephone: "07 98 76 54 32",
					},
					{
						id: 3,
						prenom: "Claire",
						nom: "Durand",
						email: "claire@email.com",
						age: 25,
						ville: "Toulouse",
						telephone: null,
					},
					{
						id: 4,
						prenom: "David",
						nom: "Moreau",
						email: "david@email.com",
						age: 45,
						ville: "Lyon",
						telephone: "06 11 22 33 44",
					},
					{
						id: 5,
						prenom: "Emma",
						nom: "Bernard",
						email: "emma@email.com",
						age: 30,
						ville: "Toulouse",
						telephone: null,
					},
					{
						id: 6,
						prenom: "François",
						nom: "Petit",
						email: "francois@email.com",
						age: 25,
						ville: "Paris",
						telephone: null,
					},
				],
			},
			{
				label: "Sélectionner des colonnes spécifiques",
				code: `-- Sélectionner uniquement le prénom, nom et email
SELECT prenom, nom, email 
FROM utilisateurs;`,
				result: [
					{ prenom: "Alice", nom: "Dupont", email: "alice@email.com" },
					{ prenom: "Bob", nom: "Martin", email: "bob@gmail.com" },
					{ prenom: "Claire", nom: "Durand", email: "claire@email.com" },
					{ prenom: "David", nom: "Moreau", email: "david@email.com" },
					{ prenom: "Emma", nom: "Bernard", email: "emma@email.com" },
					{ prenom: "François", nom: "Petit", email: "francois@email.com" },
				],
			},
			{
				label: "Utiliser des alias",
				code: `-- Renommer les colonnes avec AS (alias)
SELECT 
    prenom AS "Prénom",
    nom AS "Nom de famille",
    age AS "Âge"
FROM utilisateurs;`,
				result: [
					{ Prénom: "Alice", "Nom de famille": "Dupont", Âge: 28 },
					{ Prénom: "Bob", "Nom de famille": "Martin", Âge: 32 },
					{ Prénom: "Claire", "Nom de famille": "Durand", Âge: 25 },
					{ Prénom: "David", "Nom de famille": "Moreau", Âge: 45 },
					{ Prénom: "Emma", "Nom de famille": "Bernard", Âge: 30 },
					{ Prénom: "François", "Nom de famille": "Petit", Âge: 25 },
				],
			},
			{
				label: "Filtrer avec WHERE",
				code: `-- Sélectionner les utilisateurs de plus de 30 ans
SELECT prenom, nom, age 
FROM utilisateurs 
WHERE age > 30;`,
				result: [
					{ prenom: "Bob", nom: "Martin", age: 32 },
					{ prenom: "David", nom: "Moreau", age: 45 },
				],
			},
		],
	},
	{
		section: "UPDATE",
		content:
			"La commande UPDATE modifie les valeurs existantes dans une table. Utilise SET pour définir les nouvelles valeurs et WHERE pour cibler les lignes à modifier.\n\nAttention : sans clause WHERE, toutes les lignes de la table seront modifiées !",
		examples: [
			{
				label: "Modifier une ligne spécifique",
				code: `-- Modifier l'âge d'un utilisateur spécifique
UPDATE utilisateurs 
SET age = 29 
WHERE prenom = 'Alice' AND nom = 'Dupont';`,
				result: {
					message: "1 ligne mise à jour avec succès",
					type: "message",
				},
			},
			{
				label: "Modifier plusieurs lignes avec condition",
				code: `-- Changer la ville de tous les utilisateurs de plus de 40 ans
UPDATE utilisateurs 
SET ville = 'Nice' 
WHERE age >= 40;`,
				result: {
					message: "1 ligne mise à jour avec succès",
					type: "message",
				},
			},
			{
				label: "Modifier toutes les lignes (sans WHERE)",
				code: `-- Augmenter l'âge de tous les utilisateurs d'un an
UPDATE utilisateurs 
SET age = age + 1;`,
				result: {
					message: "6 lignes mises à jour avec succès",
					type: "message",
				},
			},
		],
	},
	{
		section: "DELETE",
		content:
			"La commande DELETE supprime des lignes d'une table selon une condition WHERE. Pour vider entièrement une table, TRUNCATE est plus rapide car il ne journalise pas chaque suppression.\n\nAttention : un DELETE sans WHERE supprime toutes les lignes ! TRUNCATE supprime toutes les lignes (enregistrements) de la table sans modifier sa structure (colonnes, relations, contraintes) et remet aussi les compteurs auto-increment à zéro.",
		examples: [
			{
				label: "Supprimer avec condition",
				code: `-- Supprimer les utilisateurs de moins de 18 ans
DELETE FROM utilisateurs 
WHERE age < 18;`,
				result: {
					message: "0 ligne supprimée (aucun utilisateur de moins de 18 ans)",
					type: "message",
				},
			},
			{
				label: "Supprimer une ligne spécifique",
				code: `-- Supprimer un utilisateur spécifique avec plusieurs conditions
DELETE FROM utilisateurs 
WHERE prenom = 'Bob' 
  AND nom = 'Martin' 
  AND age > 30;`,
				result: {
					message: "1 ligne supprimée avec succès",
					type: "message",
				},
			},
			{
				label: "TRUNCATE - vider une table",
				code: `-- Vider complètement une table (plus rapide que DELETE)
TRUNCATE TABLE sessions;`,
				result: {
					message: "Table 'sessions' vidée",
					type: "message",
				},
			},
			{
				label: "DELETE vs TRUNCATE",
				code: `-- DELETE : suppression sélective avec WHERE
DELETE FROM logs 
WHERE date_creation < '2024-01-01';

-- TRUNCATE : vide toute la table, plus rapide, sans WHERE
TRUNCATE TABLE temp_data;`,
				result: {
					message: "DELETE : 1500 lignes supprimées | TRUNCATE : table vidée",
					type: "message",
				},
			},
		],
	},
	{
		section: "Bonnes Pratiques CRUD",
		externalComponent: (
			<BestPractices
				iconColor={BELT_COLORS.orange.theme}
				introduction="Un code SQL bien formaté est plus facile à lire, déboguer et maintenir ! Voici les conventions de syntaxe essentielles pour écrire du SQL propre et professionnel."
				rules={[
					{
						section: "Mots-clés en MAJUSCULES",
						icon: <MdSpellcheck />,
						rule: "Écrire tous les mots-clés SQL en lettres majuscules pour une meilleure lisibilité",
						good: "SELECT nom\nFROM utilisateurs\nWHERE age > 25;",
						bad: "select nom\nfrom utilisateurs\nwhere age > 25;",
						reason:
							"Standard universel, distinction claire entre mots-clés et noms",
					},
					{
						section: "Indentation cohérente",
						icon: <MdFormatIndentIncrease />,
						rule: "Indenter les clauses SQL pour structurer visuellement tes requêtes",
						good: "SELECT nom, email\nFROM utilisateurs\nWHERE age > 18\nORDER BY nom;",
						bad: "SELECT nom, email FROM utilisateurs WHERE age > 18 ORDER BY nom;",
						reason: "Code lisible, maintenance facilitée, moins d'erreurs",
					},
					{
						section: "Ponctuation : partie de la syntaxe",
						icon: <MdTextFormat />,
						rule: "La ponctuation n'est pas optionnelle : point-virgule en fin de requête, virgules entre colonnes (sauf la dernière)",
						good: "SELECT nom, prenom, email\nFROM utilisateurs;",
						bad: "SELECT nom prenom email\nFROM utilisateurs",
						reason:
							"Sans ponctuation = erreur de syntaxe, requête non exécutable",
					},
					{
						section: "Alias explicites avec AS",
						icon: <MdCode />,
						rule: "Utiliser AS pour renommer les colonnes dans le résultat. Indispensable pour les calculs et fonctions, et utile pour rendre les résultats plus lisibles",
						good: 'SELECT prenom AS "Prénom",\n       COUNT(*) AS total',
						bad: "SELECT prenom Prénom,\n       COUNT(*) total",
						reason: "Clarté du code, nommage explicite des colonnes calculées",
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
