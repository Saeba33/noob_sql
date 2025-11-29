import BestPractices from "@/components/ui/sections/BestPractices";
import { MdBuild, MdKey, MdSecurity } from "react-icons/md";

export const yellowBeltContent = {
	// Belt configuration
	belt: "yellow",
	description: "Langage de définition de données",
	topics: ["CREATE TABLE", "ALTER TABLE", "DROP TABLE", "Bonnes pratiques"],

	// Content sections
	header: {
		tag: "Ceinture Jaune",
		title: "DDL - Langage de Définition de Données",
		description:
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
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    utilisateur_id INTEGER NOT NULL REFERENCES utilisateurs(id),
    produit VARCHAR(200) NOT NULL,
    quantite INTEGER DEFAULT 1,
    prix DECIMAL(10,2) NOT NULL,
    date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table avec contraintes
CREATE TABLE produits (
    id INTEGER PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prix DECIMAL(10,2) CHECK (prix > 0),
    stock INTEGER DEFAULT 0 CHECK (stock >= 0),
    sku VARCHAR(50) UNIQUE NOT NULL
);`,
		},
		{
			title: "ALTER TABLE - Modification de structure",
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
			content: `Supprimez des tables de manière sécurisée avec les bonnes pratiques. Attention l'exécution d'une commande "DROP" est irréversible ! Soyez vigilant !`,
			sqlCode: `-- Supprimer une table (attention : irréversible!)
DROP TABLE ancienne_table;

-- Suppression conditionnelle
DROP TABLE IF EXISTS table_temporaire;

-- Supprimer avec CASCADE (supprime les dépendances)
DROP TABLE commandes CASCADE;

-- Vider une table sans la supprimer
TRUNCATE TABLE logs;

-- Alternative : supprimer toutes les données
DELETE FROM logs;`,
		},
		{
			title: "Bonnes pratiques DDL",
			externalComponent: (
				<BestPractices
					title="Bonnes pratiques DDL"
					introduction="Le DDL définit la structure de votre base. Une conception rigoureuse dès le départ vous évitera des migrations complexes ! Voici les pratiques essentielles pour CREATE, ALTER et DROP."
					rules={[
						{
							title: "Clés primaires auto-incrémentées",
							icon: <MdKey className="w-5 h-5 text-yellow-600" />,
							rule: "Toujours définir une clé primaire auto-incrémentée avec PRIMARY KEY",
							good: "id INTEGER PRIMARY KEY AUTO_INCREMENT",
							bad: "Table sans clé primaire ou clé composite complexe",
							reason:
								"Garantit l'unicité et simplifie les relations entre tables",
						},
						{
							title: "Valeurs par défaut",
							icon: <MdBuild className="w-5 h-5 text-yellow-600" />,
							rule: "Utiliser DEFAULT pour les colonnes avec valeurs récurrentes",
							good: "statut VARCHAR(20) DEFAULT 'actif', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
							bad: "Forcer l'utilisateur à spécifier chaque valeur",
							reason: "Simplifie les INSERT et garantit la cohérence",
						},
						{
							title: "Documentation des tables",
							icon: <MdBuild className="w-5 h-5 text-yellow-600" />,
							rule: "Ajouter des commentaires sur les tables et colonnes complexes",
							good: "CREATE TABLE utilisateurs (...) COMMENT 'Stocke les utilisateurs actifs de l'application'",
							bad: "Tables sans documentation, logique métier non expliquée",
							reason: "Facilite la maintenance et la compréhension du schéma",
						},
						{
							title: "Migrations ALTER TABLE",
							icon: <MdBuild className="w-5 h-5 text-yellow-600" />,
							rule: "Privilégier ALTER TABLE plutôt que la séquence DROP/CREATE",
							good: "ALTER TABLE utilisateurs ADD COLUMN telephone VARCHAR(20)",
							bad: "DROP TABLE puis CREATE TABLE (perte de données)",
							reason: "Préserve les données existantes lors des modifications",
						},
						{
							title: "Sauvegardes avant DDL",
							icon: <MdSecurity className="w-5 h-5 text-yellow-600" />,
							rule: "Toujours sauvegarder avant les opérations DDL critiques",
							good: "mysqldump database > backup.sql avant ALTER/DROP",
							bad: "Modifier la structure sans backup",
							reason: "Les opérations DDL sont souvent irréversibles",
						},
						{
							title: "DROP TABLE avec précaution",
							icon: <MdSecurity className="w-5 h-5 text-yellow-600" />,
							rule: "Utiliser DROP TABLE IF EXISTS pour éviter les erreurs",
							good: "DROP TABLE IF EXISTS table_temporaire; -- Vérifier avant!",
							bad: "DROP TABLE sans vérification ni backup",
							reason: "Évite les erreurs et la perte accidentelle de données.",
						},
					]}
				/>
			),
		},
	],
};
