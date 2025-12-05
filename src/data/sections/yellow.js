import BestPractices from "@/components/ui/sections/BestPractices";
import { MdBuild, MdKey, MdSecurity } from "react-icons/md";

const menu = {
	description: "Langage de définition de données",
	topics: ["CREATE TABLE", "ALTER TABLE", "DROP TABLE", "Bonnes pratiques"],
};

const header = {
	tag: "Ceinture Jaune",
	title: "DDL - Langage de Définition de Données",
	description:
		"La ceinture jaune vous enseigne le DDL (Data Definition Language), le langage pour définir et modifier la structure de vos bases de données. Apprenez à créer des tables, les modifier et les supprimer. Ces compétences sont essentielles pour concevoir et faire évoluer vos schémas de base de données.",
};

const accordions = [
	{
		title: "CREATE TABLE - Création de tables",
		sqlCode: `-- Création d'une table avec colonnes typées et contraintes de base
CREATE TABLE utilisateurs (
    id INTEGER PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    age INTEGER,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table avec clé étrangère référençant une autre table
CREATE TABLE commandes (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    utilisateur_id INTEGER NOT NULL REFERENCES utilisateurs(id),
    prix_total DECIMAL(10,2) NOT NULL,
    statut ENUM('en_attente', 'expediee', 'livree', 'annulee') DEFAULT 'en_attente',
    date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table avec contraintes CHECK pour valider les données
CREATE TABLE commande_details (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    commande_id INTEGER NOT NULL REFERENCES commandes(id),
    produit_id INTEGER NOT NULL REFERENCES produits(id),
    quantite INTEGER DEFAULT 1 CHECK (quantite > 0),
    prix_unitaire DECIMAL(10,2) NOT NULL
);`,
	},
	{
		title: "ALTER TABLE - Modification de structure",
		sqlCode: `-- Ajouter une colonne simple à une table existante
ALTER TABLE utilisateurs 
ADD COLUMN telephone VARCHAR(20);

-- Ajouter une colonne avec valeur par défaut et contrainte NOT NULL
ALTER TABLE utilisateurs 
ADD COLUMN statut VARCHAR(20) DEFAULT 'actif' NOT NULL;

-- Rendre une colonne existante obligatoire
ALTER TABLE utilisateurs 
ALTER COLUMN email SET NOT NULL;

-- Ajouter une contrainte CHECK pour valider les valeurs
ALTER TABLE utilisateurs 
ADD CONSTRAINT check_age CHECK (age >= 0 AND age <= 120);

-- Renommer une colonne (la syntaxe peut varier selon le SGBD)
ALTER TABLE utilisateurs 
RENAME COLUMN nom TO nom_complet;

-- Supprimer une colonne devenue inutile
ALTER TABLE utilisateurs 
DROP COLUMN telephone;`,
	},
	{
		title: "DROP TABLE - Suppression de tables",
		content: (
			<>
				Attention : l&apos;exécution d&apos;une commande DROP est{" "}
				<strong>
					<u>irréversible</u>
				</strong>{" "}
				! Soyez vigilant !
			</>
		),
		sqlCode: `-- Supprimer définitivement une table et toutes ses données
DROP TABLE ancienne_table;

-- Suppression conditionnelle (évite une erreur si la table n'existe pas)
DROP TABLE IF EXISTS table_temporaire;

-- Supprimer une table et les contraintes de clés étrangères qui en dépendent
DROP TABLE commandes CASCADE;

-- Vider une table sans supprimer sa structure
TRUNCATE TABLE logs;

-- Alternative : supprimer les données de la table
DELETE FROM logs;`,
	},
	{
		title: "Bonnes pratiques DDL",
		externalComponent: (
			<BestPractices
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
						rule: "Privilégier ALTER TABLE plutôt que la séquence DROP → CREATE",
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
						good: "DROP TABLE IF EXISTS table_temporaire;",
						bad: "DROP TABLE sans vérification ni backup",
						reason: "Évite les erreurs et la perte accidentelle de données.",
					},
				]}
			/>
		),
	},
];

export const yellowBeltContent = {
	...menu,
	header,
	accordions,
};
