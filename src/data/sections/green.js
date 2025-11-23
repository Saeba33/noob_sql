import {
	MdCode,
	MdFormatIndentIncrease,
	MdSpellcheck,
	MdTextFormat,
} from "react-icons/md";

import BestPractices from "@/components/ui/sections/BestPractices";

export const greenBeltContent = {
	// Belt configuration
	belt: "green",
	description: "Opérations de base sur les données",
	topics: [
		"INSERT",
		"SELECT",
		"UPDATE",
		"DELETE",
		"TRUNCATE",
		"Bonnes Pratiques",
	],

	// Content sections
	header: {
		title: "CRUD - Opérations de base",
		description: "Maîtrisez les opérations Créer, Lire, Modifier, Supprimer",
		tag: "Ceinture Verte",
	},
	pageDescription: {
		title: "Manipulez vos données avec les opérations CRUD",
		content:
			"La ceinture verte vous apprend les quatre opérations fondamentales de manipulation de données : Create (commande INSERT), Read (commande SELECT), Update et Delete. Ces opérations forment l'épine dorsale de toute interaction avec une base de données.",
	},
	accordions: [
		{
			title: "INSERT - Ajout de données",
			content: "Insérez de nouvelles données dans vos tables.",
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
('Bob', 'Martin', 'bob@email.com', 32),
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
			content: "Récupérez et consultez les données stockées dans vos tables.",
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
						},
						{
							id: 2,
							prenom: "Bob",
							nom: "Martin",
							email: "bob@email.com",
							age: 32,
							ville: "Paris",
						},
						{
							id: 3,
							prenom: "Claire",
							nom: "Durand",
							email: "claire@email.com",
							age: 25,
							ville: "Toulouse",
						},
						{
							id: 4,
							prenom: "David",
							nom: "Moreau",
							email: "david@email.com",
							age: 45,
							ville: "Lyon",
						},
						{
							id: 5,
							prenom: "Emma",
							nom: "Bernard",
							email: "emma@email.com",
							age: 30,
							ville: "Toulouse",
						},
					],
				},
				{
					sqlCode: `-- Sélectionner uniquement le prénom, nom et email
SELECT prenom, nom, email 
FROM utilisateurs;`,
					sqlResult: [
						{ prenom: "Alice", nom: "Dupont", email: "alice@email.com" },
						{ prenom: "Bob", nom: "Martin", email: "bob@email.com" },
						{ prenom: "Claire", nom: "Durand", email: "claire@email.com" },
						{ prenom: "David", nom: "Moreau", email: "david@email.com" },
						{ prenom: "Emma", nom: "Bernard", email: "emma@email.com" },
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
						{ prenom: "Bob", nom: "Martin", email: "bob@email.com" },
						{ prenom: "David", nom: "Moreau", email: "david@email.com" },
					],
				},
			],
		},
		{
			title: "UPDATE - Modification de données",
			content: "Modifiez les données existantes dans vos tables.",
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
						message: "5 lignes mises à jour avec succès",
						type: "message",
					},
				},
			],
		},
		{
			title: "DELETE - Suppression de données",
			content:
				"Supprimez des données avec DELETE ou videz une table avec TRUNCATE.",
			sqlQueries: [
				{
					sqlCode: `-- Supprimer les utilisateurs de moins de 18 ans
DELETE FROM utilisateurs 
WHERE age < 18;`,
					sqlResult: {
						message: "0 ligne supprimée (aucun utilisateur mineur)",
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
						message: "Table 'sessions' vidée complètement",
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
			content:
				"Découvrez les bonnes pratiques essentielles pour manipuler vos données en toute sécurité et avec performance.",
			externalComponent: (
				<BestPractices
					title="Conventions de Syntaxe"
					accentColor="green-600"
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
							icon: (
								<MdFormatIndentIncrease className="w-5 h-5 text-green-600" />
							),
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
							rule: "Utilise des alias clairs avec AS pour renommer les colonnes",
							good: "SELECT COUNT(*) AS nombre_total",
							bad: "SELECT COUNT(*) nombre_total",
							reason: "Clarté du code, intention explicite",
						},
					]}
				/>
			),
		},
	],
};
