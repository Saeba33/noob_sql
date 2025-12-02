import {
	MdCode,
	MdFormatIndentIncrease,
	MdSpellcheck,
	MdTextFormat,
} from "react-icons/md";

import BestPractices from "@/components/ui/sections/BestPractices";

const menu = {
	description: "Opérations de base sur les données",
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
		title: "INSERT - Ajout de données",
		content:
			"La commande INSERT permet d'ajouter de nouvelles lignes dans une table. Tu peux insérer une seule ligne ou plusieurs à la fois en listant les valeurs entre parenthèses.\n\nSi une colonne a une valeur par défaut ou accepte NULL, tu peux l'omettre dans ta requête.",
		sqlQueries: [
			{
				sqlCode: `-- Insertion d'un seul utilisateur
INSERT INTO utilisateurs (prenom, nom, email, age) VALUES 
('Alice', 'Dupont', 'alice@email.com', 28);`,
				sqlResult: {
					message: "1 ligne insérée avec succès",
					type: "message",
				},
			},
			{
				sqlCode: `-- Insertion de plusieurs utilisateurs en une seule requête
INSERT INTO utilisateurs (prenom, nom, email, age) VALUES 
('Bob', 'Martin', 'bob@gmail.com', 32),
('Claire', 'Durand', 'claire@email.com', 25),
('David', 'Moreau', 'david@email.com', 45);`,
				sqlResult: {
					message: "3 lignes insérées avec succès",
					type: "message",
				},
			},
			{
				sqlCode: `-- Insertion sans spécifier l'âge (valeur par défaut ou NULL)
INSERT INTO utilisateurs (prenom, nom, email) VALUES 
('Emma', 'Bernard', 'emma@email.com');`,
				sqlResult: {
					message: "1 ligne insérée avec succès (âge par défaut appliqué)",
					type: "message",
				},
			},
		],
	},
	{
		title: "SELECT - Lecture de données",
		content:
			"La commande SELECT est la plus utilisée en SQL : elle permet de lire et récupérer des données. Tu peux sélectionner toutes les colonnes avec * ou choisir uniquement celles dont tu as besoin.\n\nUtilise AS pour renommer une colonne dans le résultat (alias). C'est utile pour rendre les résultats plus lisibles ou nommer des calculs.\n\nOn peut combiner SELECT avec WHERE pour filtrer les résultats. La clause WHERE et ses opérateurs seront détaillés à la ceinture verte.",
		sqlQueries: [
			{
				sqlCode: `-- Sélectionner toutes les colonnes de tous les utilisateurs
SELECT * 
FROM utilisateurs;`,
				sqlResult: [
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
				sqlCode: `-- Sélectionner uniquement le prénom, nom et email
SELECT prenom, nom, email 
FROM utilisateurs;`,
				sqlResult: [
					{ prenom: "Alice", nom: "Dupont", email: "alice@email.com" },
					{ prenom: "Bob", nom: "Martin", email: "bob@gmail.com" },
					{ prenom: "Claire", nom: "Durand", email: "claire@email.com" },
					{ prenom: "David", nom: "Moreau", email: "david@email.com" },
					{ prenom: "Emma", nom: "Bernard", email: "emma@email.com" },
					{ prenom: "François", nom: "Petit", email: "francois@email.com" },
				],
			},
			{
				sqlCode: `-- Renommer les colonnes avec AS (alias)
SELECT 
    prenom AS "Prénom",
    nom AS "Nom de famille",
    age AS "Âge"
FROM utilisateurs
LIMIT 3;`,
				sqlResult: [
					{ Prénom: "Alice", "Nom de famille": "Dupont", Âge: 28 },
					{ Prénom: "Bob", "Nom de famille": "Martin", Âge: 32 },
					{ Prénom: "Claire", "Nom de famille": "Durand", Âge: 25 },
				],
			},
			{
				sqlCode: `-- Sélectionner les utilisateurs de plus de 30 ans
SELECT prenom, nom, age 
FROM utilisateurs 
WHERE age > 30;`,
				sqlResult: [
					{ prenom: "Bob", nom: "Martin", age: 32 },
					{ prenom: "David", nom: "Moreau", age: 45 },
				],
			},
			{
				sqlCode: `-- Sélectionner tous les utilisateurs triés par nom de famille
SELECT prenom, nom, email 
FROM utilisateurs 
ORDER BY nom ASC;`,
				sqlResult: [
					{ prenom: "Emma", nom: "Bernard", email: "emma@email.com" },
					{ prenom: "Alice", nom: "Dupont", email: "alice@email.com" },
					{ prenom: "Claire", nom: "Durand", email: "claire@email.com" },
					{ prenom: "Bob", nom: "Martin", email: "bob@gmail.com" },
					{ prenom: "David", nom: "Moreau", email: "david@email.com" },
					{ prenom: "François", nom: "Petit", email: "francois@email.com" },
				],
			},
		],
	},
	{
		title: "UPDATE - Modification de données",
		content:
			"La commande UPDATE modifie les valeurs existantes dans une table. Utilise SET pour définir les nouvelles valeurs et WHERE pour cibler les lignes à modifier.\n\n⚠️ Attention : sans clause WHERE, toutes les lignes de la table seront modifiées ! La clause WHERE sera détaillée à la ceinture verte.",
		sqlQueries: [
			{
				sqlCode: `-- Modifier l'âge d'un utilisateur spécifique
UPDATE utilisateurs 
SET age = 29 
WHERE prenom = 'Alice' AND nom = 'Dupont';`,
				sqlResult: {
					message: "1 ligne mise à jour avec succès",
					type: "message",
				},
			},
			{
				sqlCode: `-- Changer la ville de tous les utilisateurs de plus de 40 ans
UPDATE utilisateurs 
SET ville = 'Nice' 
WHERE age >= 40;`,
				sqlResult: {
					message: "1 ligne mise à jour avec succès",
					type: "message",
				},
			},
			{
				sqlCode: `-- Augmenter l'âge de tous les utilisateurs d'un an
UPDATE utilisateurs 
SET age = age + 1;`,
				sqlResult: {
					message: "6 lignes mises à jour avec succès",
					type: "message",
				},
			},
		],
	},
	{
		title: "DELETE - Suppression de données",
		content:
			"La commande DELETE supprime des lignes d'une table selon une condition WHERE. Pour vider entièrement une table, TRUNCATE est plus rapide car il ne journalise pas chaque suppression.\n\n⚠️ Attention : DELETE sans WHERE supprime toutes les lignes ! TRUNCATE remet aussi les compteurs auto-increment à zéro. La clause WHERE sera détaillée à la ceinture verte.",
		sqlQueries: [
			{
				sqlCode: `-- Supprimer les utilisateurs de moins de 18 ans
DELETE FROM utilisateurs 
WHERE age < 18;`,
				sqlResult: {
					message: "0 ligne supprimée (aucun utilisateur de moins de 18 ans)",
					type: "message",
				},
			},
			{
				sqlCode: `-- Supprimer un utilisateur spécifique avec plusieurs conditions
DELETE FROM utilisateurs 
WHERE prenom = 'Bob' 
  AND nom = 'Martin' 
  AND age > 30;`,
				sqlResult: {
					message: "1 ligne supprimée avec succès",
					type: "message",
				},
			},
			{
				sqlCode: `-- Vider complètement une table (plus rapide que DELETE)
TRUNCATE TABLE sessions;`,
				sqlResult: {
					message: "Table 'sessions' vidée",
					type: "message",
				},
			},
			{
				sqlCode: `-- DELETE : suppression sélective avec WHERE
DELETE FROM logs 
WHERE date_creation < '2024-01-01';

-- TRUNCATE : vide toute la table, plus rapide, sans WHERE
TRUNCATE TABLE temp_data;`,
				sqlResult: {
					message: "DELETE : 1500 lignes supprimées | TRUNCATE : table vidée",
					type: "message",
				},
			},
		],
	},
	{
		title: "Bonnes Pratiques CRUD",
		externalComponent: (
			<BestPractices
				introduction="Un code SQL bien formaté est plus facile à lire, déboguer et maintenir ! Voici les conventions de syntaxe essentielles pour écrire du SQL propre et professionnel."
				rules={[
					{
						title: "Mots-clés en MAJUSCULES",
						icon: <MdSpellcheck className="w-5 h-5 text-green-600" />,
						rule: "Écris tous les mots-clés SQL en lettres majuscules pour une meilleure lisibilité",
						good: "SELECT nom\nFROM utilisateurs\nWHERE age > 25",
						bad: "select nom\nfrom utilisateurs\nwhere age > 25",
						reason:
							"Standard universel, distinction claire entre mots-clés et noms",
					},
					{
						title: "Indentation cohérente",
						icon: <MdFormatIndentIncrease className="w-5 h-5 text-green-600" />,
						rule: "Indente les clauses SQL pour structurer visuellement tes requêtes",
						good: "SELECT nom, email\nFROM utilisateurs\nWHERE age > 18\nORDER BY nom",
						bad: "SELECT nom, email FROM utilisateurs WHERE age > 18 ORDER BY nom",
						reason: "Code lisible, maintenance facilitée, moins d'erreurs",
					},
					{
						title: "Ponctuation : partie de la syntaxe",
						icon: <MdTextFormat className="w-5 h-5 text-green-600" />,
						rule: "La ponctuation n'est pas optionnelle : point-virgule en fin de requête, virgules entre colonnes (sauf la dernière)",
						good: "SELECT nom, prenom, email\nFROM utilisateurs;",
						bad: "SELECT nom prenom email\nFROM utilisateurs",
						reason:
							"Sans ponctuation = erreur de syntaxe, requête non exécutable",
					},
					{
						title: "Alias explicites avec AS",
						icon: <MdCode className="w-5 h-5 text-green-600" />,
						rule: "Utilise AS pour renommer les colonnes dans le résultat. Indispensable pour les calculs et fonctions, et utile pour rendre les résultats plus lisibles",
						good: 'SELECT prenom AS "Prénom",\n       COUNT(*) AS total',
						bad: "SELECT prenom Prénom,\n       COUNT(*) total",
						reason: "Clarté du code, nommage explicite des colonnes calculées",
					},
				]}
			/>
		),
	},
];

export const orangeBeltContent = {
	...menu,
	header,
	accordions,
};
