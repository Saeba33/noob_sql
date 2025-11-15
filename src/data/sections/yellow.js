import { lazy } from "react";
import {
	MdBuild,
	MdDataset,
	MdKey,
	MdSecurity,
	MdSpeed,
	MdTableChart,
} from "react-icons/md";

// Lazy load du composant
const BestPractices = lazy(() =>
	import("@/components/ui/sections/BestPractices")
);

export const yellowBeltContent = {
	// Belt configuration
	belt: "yellow",
	description: "Langage de définition de données",
	topics: ["CREATE TABLE", "ALTER TABLE", "DROP TABLE"],

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
			title: "CREATE TABLE - Création de tables",
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
			title: "ALTER TABLE - Modification de dtructure",
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
			title: "DROP TABLE - Suppression de tables",
			content: `Supprimez des tables de manière sécurisée avec les bonnes pratiques. Attention l'exécution d'une commande "DROP" est <strong>irréversible</strong> ! Soyez vigilant !`,
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
		{
			title: "Bonnes Pratiques DDL",
			externalComponent: (
				<BestPractices
					title="Bonnes Pratiques DDL"
					accentColor="yellow-600"
					introduction="Le Data Definition Language (DDL) est la fondation de votre base de données. Une structure bien pensée dès le départ vous évitera des heures de refactoring plus tard ! Voici les bonnes pratiques essentielles pour créer des tables robustes et maintenables."
					rules={[
						{
							title: "Nommage des Tables",
							icon: <MdTableChart className="w-5 h-5 text-yellow-600" />,
							rule: "Utilise des noms explicites au singulier pour les tables",
							good: "utilisateur, commande, produit",
							bad: "user, cmd, t1, data_table",
							reason: "Clarity et cohérence dans le schéma de base",
						},
						{
							title: "Clés Primaires",
							icon: <MdKey className="w-5 h-5 text-yellow-600" />,
							rule: "Toujours définir une clé primaire auto-incrémentée",
							good: "id INTEGER PRIMARY KEY AUTO_INCREMENT",
							bad: "Pas de clé primaire ou clé composite complexe",
							reason: "Performance et simplicité des relations",
						},
						{
							title: "Types de Données",
							icon: <MdDataset className="w-5 h-5 text-yellow-600" />,
							rule: "Choisis le type de données le plus approprié et restrictif",
							good: "age INTEGER CHECK (age >= 0), email VARCHAR(255)",
							bad: "age TEXT, email TEXT",
							reason: "Optimisation de l'espace et validation automatique",
						},
						{
							title: "Contraintes NOT NULL",
							icon: <MdSecurity className="w-5 h-5 text-yellow-600" />,
							rule: "Applique NOT NULL aux colonnes obligatoires",
							good: "nom VARCHAR(100) NOT NULL, email VARCHAR(255) NOT NULL",
							bad: "Laisser des colonnes critiques sans contrainte",
							reason: "Garantit l'intégrité des données essentielles",
						},
						{
							title: "Valeurs par Défaut",
							icon: <MdBuild className="w-5 h-5 text-yellow-600" />,
							rule: "Définis des valeurs par défaut logiques",
							good: "statut VARCHAR(20) DEFAULT 'actif', date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
							bad: "Laisser les colonnes sans valeur par défaut",
							reason: "Simplifie les insertions et évite les erreurs",
						},
						{
							title: "Index Stratégiques",
							icon: <MdSpeed className="w-5 h-5 text-yellow-600" />,
							rule: "Crée des index sur les colonnes de recherche fréquente",
							good: "CREATE INDEX idx_email ON utilisateur(email)",
							bad: "Aucun index sur les colonnes WHERE/JOIN",
							reason: "Améliore drastiquement les performances",
						},
					]}
					tips={[
						{
							title: "Documentation",
							tip: "Ajoute des commentaires aux tables et colonnes complexes",
							example:
								"COMMENT 'Stocke les informations des utilisateurs actifs'",
						},
						{
							title: "Migration",
							tip: "Utilise ALTER TABLE pour les modifications en production",
							example:
								"ALTER TABLE utilisateur ADD COLUMN telephone VARCHAR(20)",
						},
						{
							title: "Sauvegarde",
							tip: "Toujours sauvegarder avant les modifications DDL",
							example: "mysqldump database > backup_before_alter.sql",
						},
					]}
				/>
			),
		},
	],
};
