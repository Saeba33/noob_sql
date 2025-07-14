import { SECTION_DATA_COLORS } from "@/config/colors";
import { BestPractices } from "@/components/ui/sections/orange";

export const orangeBeltContent = {
  // Belt configuration
  belt: "orange",
  description: "Opérations de base sur les données",
  topics: ["SELECT", "INSERT", "UPDATE", "DELETE", "TRUNCATE"],
  colors: SECTION_DATA_COLORS.orange,

  // Content sections
  header: {
    title: "CRUD - Opérations de Base",
    description: "Maîtrisez les opérations Créer, Lire, Modifier, Supprimer",
    tag: "Ceinture Orange",
  },
  pageDescription: {
    title: "Manipulez Vos Données avec les Opérations CRUD",
    content:
      "La ceinture orange vous apprend les quatre opérations fondamentales de manipulation de données : CREATE (INSERT), READ (SELECT), UPDATE et DELETE. Ces opérations forment l'épine dorsale de toute interaction avec une base de données. Vous apprendrez également la différence entre DELETE et TRUNCATE.",
  },
  accordions: [
    {
      title: "SELECT - Lecture de Données",
      content: "Récupérez et consultez les données stockées dans vos tables.",
      sqlQueries: [
        {
          title: "Sélectionner toutes les colonnes",
          sqlCode: `SELECT * FROM utilisateurs;`,
          sqlResult: [
            { id: 1, nom: "Alice Dupont", email: "alice@email.com", age: 28, statut: "actif" },
            { id: 2, nom: "Bob Martin", email: "bob@email.com", age: 32, statut: "actif" },
            { id: 3, nom: "Claire Durand", email: "claire@email.com", age: 25, statut: "inactif" },
            { id: 4, nom: "David Moreau", email: "david@email.com", age: 45, statut: "actif" },
            { id: 5, nom: "Emma Bernard", email: "emma@email.com", age: 30, statut: "actif" }
          ]
        },
        {
          title: "Sélectionner des colonnes spécifiques",
          sqlCode: `SELECT nom, email FROM utilisateurs;`,
          sqlResult: [
            { nom: "Alice Dupont", email: "alice@email.com" },
            { nom: "Bob Martin", email: "bob@email.com" },
            { nom: "Claire Durand", email: "claire@email.com" },
            { nom: "David Moreau", email: "david@email.com" },
            { nom: "Emma Bernard", email: "emma@email.com" }
          ]
        },
        {
          title: "Sélectionner avec conditions",
          sqlCode: `SELECT nom, age FROM utilisateurs WHERE age > 25;`,
          sqlResult: [
            { nom: "Alice Dupont", age: 28 },
            { nom: "Bob Martin", age: 32 },
            { nom: "David Moreau", age: 45 },
            { nom: "Emma Bernard", age: 30 }
          ]
        },
        {
          title: "Ordonner les résultats",
          sqlCode: `SELECT nom, email FROM utilisateurs ORDER BY nom ASC;`,
          sqlResult: [
            { nom: "Alice Dupont", email: "alice@email.com" },
            { nom: "Bob Martin", email: "bob@email.com" },
            { nom: "Claire Durand", email: "claire@email.com" },
            { nom: "David Moreau", email: "david@email.com" },
            { nom: "Emma Bernard", email: "emma@email.com" }
          ]
        },
        {
          title: "Compter les résultats",
          sqlCode: `SELECT COUNT(*) as total_utilisateurs FROM utilisateurs;`,
          sqlResult: [
            { total_utilisateurs: 5 }
          ]
        }
      ],
      description:
        "SELECT est la commande la plus utilisée en SQL. Elle vous permet de lire et extraire des données.",
    },
    {
      title: "INSERT - Ajout de Données",
      content: "Insérez de nouvelles données dans vos tables.",
      sqlQueries: [
        {
          title: "Insertion simple",
          sqlCode: `INSERT INTO utilisateurs (nom, email, age) 
VALUES ('Alice Dupont', 'alice@email.com', 28);`,
          sqlResult: { 
            message: "1 ligne insérée avec succès",
            type: "message"
          }
        },
        {
          title: "Insertion multiple",
          sqlCode: `INSERT INTO utilisateurs (nom, email, age) VALUES 
('Bob Martin', 'bob@email.com', 32),
('Claire Durand', 'claire@email.com', 25),
('David Moreau', 'david@email.com', 45);`,
          sqlResult: { 
            message: "3 lignes insérées avec succès",
            type: "message"
          }
        },
        {
          title: "Vérification des insertions",
          sqlCode: `SELECT nom, email, age FROM utilisateurs 
WHERE nom IN ('Alice Dupont', 'Bob Martin', 'Claire Durand');`,
          sqlResult: [
            { nom: "Alice Dupont", email: "alice@email.com", age: 28 },
            { nom: "Bob Martin", email: "bob@email.com", age: 32 },
            { nom: "Claire Durand", email: "claire@email.com", age: 25 }
          ]
        }
      ],
      description:
        "INSERT vous permet d'ajouter de nouvelles données dans vos tables de différentes manières.",
    },
    {
      title: "UPDATE - Modification de Données",
      content: "Modifiez les données existantes dans vos tables.",
      sqlQueries: [
        {
          title: "Mise à jour simple",
          sqlCode: `UPDATE utilisateurs 
SET age = 29 
WHERE nom = 'Alice Dupont';`,
          sqlResult: { 
            message: "1 ligne mise à jour avec succès",
            type: "message"
          }
        },
        {
          title: "Vérification de la mise à jour",
          sqlCode: `SELECT nom, age FROM utilisateurs 
WHERE nom = 'Alice Dupont';`,
          sqlResult: [
            { nom: "Alice Dupont", age: 29 }
          ]
        },
        {
          title: "Mise à jour multiple avec calcul",
          sqlCode: `UPDATE produits 
SET prix = prix * 1.05 
WHERE categorie = 'electronique';`,
          sqlResult: { 
            message: "3 lignes mises à jour avec succès",
            type: "message"
          }
        },
        {
          title: "Résultats après mise à jour des prix",
          sqlCode: `SELECT nom, prix, categorie FROM produits 
WHERE categorie = 'electronique';`,
          sqlResult: [
            { nom: "Smartphone", prix: "525.00", categorie: "electronique" },
            { nom: "Tablette", prix: "315.00", categorie: "electronique" },
            { nom: "Ordinateur", prix: "1050.00", categorie: "electronique" }
          ]
        }
      ],
      description:
        "UPDATE modifie les données existantes. Toujours utiliser WHERE pour éviter de modifier toute la table !",
    },
    {
      title: "DELETE vs TRUNCATE - Suppression de Données",
      content:
        "Supprimez des données avec DELETE ou videz une table avec TRUNCATE.",
      sqlQueries: [
        {
          title: "DELETE sélectif",
          sqlCode: `DELETE FROM utilisateurs 
WHERE age < 18;`,
          sqlResult: { 
            message: "2 lignes supprimées avec succès",
            type: "message"
          }
        },
        {
          title: "Vérification après suppression",
          sqlCode: `SELECT COUNT(*) as nb_utilisateurs, 
       MIN(age) as age_minimum 
FROM utilisateurs;`,
          sqlResult: [
            { nb_utilisateurs: 5, age_minimum: 25 }
          ]
        },
        {
          title: "DELETE avec condition complexe",
          sqlCode: `DELETE FROM commandes 
WHERE utilisateur_id IN (
    SELECT id FROM utilisateurs 
    WHERE statut = 'inactif'
);`,
          sqlResult: { 
            message: "8 commandes supprimées avec succès",
            type: "message"
          }
        },
        {
          title: "TRUNCATE - Vider complètement une table",
          sqlCode: `TRUNCATE TABLE sessions;`,
          sqlResult: { 
            message: "Table 'sessions' vidée complètement",
            type: "message"
          }
        }
      ],
      description:
        "DELETE pour une suppression sélective, TRUNCATE pour vider complètement une table rapidement.",
    },
    {
      title: "Bonnes Pratiques CRUD",
      content:
        "Découvrez les bonnes pratiques essentielles pour manipuler vos données en toute sécurité et avec performance.",
      externalComponent: <BestPractices />,
    },
  ],
};
