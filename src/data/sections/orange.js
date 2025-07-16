import BestPractices from "@/components/ui/sections/orange/BestPractices";
import { BELT_COLORS } from "@/config/colors";

export const orangeBeltContent = {
  // Belt configuration
  belt: "orange",
  description: "Opérations de base sur les données",
  topics: ["SELECT", "INSERT", "UPDATE", "DELETE", "TRUNCATE"],
  colors: BELT_COLORS.orange,

  // Content sections
  header: {
    title: "CRUD - Opérations de Base",
    description: "Maîtrisez les opérations Créer, Lire, Modifier, Supprimer",
    tag: "Ceinture Orange",
  },
  pageDescription: {
    title: "Manipulez vos données avec les opérations CRUD",
    content:
      "La ceinture orange vous apprend les quatre opérations fondamentales de manipulation de données : CREATE (commande INSERT), READ (commande SELECT), UPDATE et DELETE. Ces opérations forment l'épine dorsale de toute interaction avec une base de données.",
  },
  accordions: [
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
            type: "message",
          },
        },
        {
          title: "Insertion multiple",
          sqlCode: `INSERT INTO utilisateurs (nom, email, age) VALUES 
('Bob Martin', 'bob@email.com', 32),
('Claire Durand', 'claire@email.com', 25),
('David Moreau', 'david@email.com', 45);`,
          sqlResult: {
            message: "3 lignes insérées avec succès",
            type: "message",
          },
        },
        {
          title: "Insertion avec valeurs par défaut",
          sqlCode: `INSERT INTO utilisateurs (nom, email) 
VALUES ('Emma Bernard', 'emma@email.com');`,
          sqlResult: {
            message: "1 ligne insérée avec succès (âge par défaut appliqué)",
            type: "message",
          },
        },
      ],
      description:
        "INSERT vous permet d'ajouter de nouvelles données dans vos tables. C'est la première étape du CRUD.",
    },
    {
      title: "SELECT - Lecture de Données",
      content: "Récupérez et consultez les données stockées dans vos tables.",
      sqlQueries: [
        {
          title: "Sélectionner toutes les colonnes",
          sqlCode: `SELECT * FROM utilisateurs;`,
          sqlResult: [
            {
              id: 1,
              nom: "Alice Dupont",
              email: "alice@email.com",
              age: 28,
              statut: "actif",
            },
            {
              id: 2,
              nom: "Bob Martin",
              email: "bob@email.com",
              age: 32,
              statut: "actif",
            },
            {
              id: 3,
              nom: "Claire Durand",
              email: "claire@email.com",
              age: 25,
              statut: "actif",
            },
            {
              id: 4,
              nom: "David Moreau",
              email: "david@email.com",
              age: 45,
              statut: "actif",
            },
            {
              id: 5,
              nom: "Emma Bernard",
              email: "emma@email.com",
              age: 30,
              statut: "actif",
            },
          ],
        },
        {
          title: "Sélectionner des colonnes spécifiques",
          sqlCode: `SELECT nom, email FROM utilisateurs;`,
          sqlResult: [
            { nom: "Alice Dupont", email: "alice@email.com" },
            { nom: "Bob Martin", email: "bob@email.com" },
            { nom: "Claire Durand", email: "claire@email.com" },
            { nom: "David Moreau", email: "david@email.com" },
            { nom: "Emma Bernard", email: "emma@email.com" },
          ],
        },
        {
          title: "Sélectionner avec conditions",
          sqlCode: `SELECT nom, age FROM utilisateurs WHERE age > 30;`,
          sqlResult: [
            { nom: "Bob Martin", age: 32 },
            { nom: "David Moreau", age: 45 },
          ],
        },
        {
          title: "Ordonner les résultats",
          sqlCode: `SELECT nom, email FROM utilisateurs ORDER BY nom ASC;`,
          sqlResult: [
            { nom: "Alice Dupont", email: "alice@email.com" },
            { nom: "Bob Martin", email: "bob@email.com" },
            { nom: "Claire Durand", email: "claire@email.com" },
            { nom: "David Moreau", email: "david@email.com" },
            { nom: "Emma Bernard", email: "emma@email.com" },
          ],
        },
        {
          title: "Compter les résultats",
          sqlCode: `SELECT COUNT(*) as total_utilisateurs FROM utilisateurs;`,
          sqlResult: [{ total_utilisateurs: 5 }],
        },
      ],
      description:
        "SELECT est la commande la plus utilisée en SQL. Elle vous permet de lire et extraire des données.",
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
            type: "message",
          },
        },
        {
          title: "Mise à jour multiple avec condition",
          sqlCode: `UPDATE utilisateurs 
SET statut = 'senior' 
WHERE age >= 40;`,
          sqlResult: {
            message: "1 ligne mise à jour avec succès",
            type: "message",
          },
        },
        {
          title: "Mise à jour avec calcul",
          sqlCode: `UPDATE utilisateurs 
SET age = age + 1 
WHERE statut = 'actif';`,
          sqlResult: {
            message: "4 lignes mises à jour avec succès",
            type: "message",
          },
        },
      ],
      description:
        "UPDATE modifie les données existantes. Toujours utiliser WHERE pour éviter de modifier toute la table !",
    },
    {
      title: "DELETE - Suppression de Données",
      content:
        "Supprimez des données avec DELETE ou videz une table avec TRUNCATE.",
      sqlQueries: [
        {
          title: "DELETE sélectif",
          sqlCode: `DELETE FROM utilisateurs 
WHERE age < 18;`,
          sqlResult: {
            message: "0 ligne supprimée (aucun utilisateur mineur)",
            type: "message",
          },
        },
        {
          title: "DELETE avec condition complexe",
          sqlCode: `DELETE FROM utilisateurs 
WHERE nom = 'Bob Martin' AND age > 30;`,
          sqlResult: {
            message: "1 ligne supprimée avec succès",
            type: "message",
          },
        },
        {
          title: "TRUNCATE - Vider complètement une table",
          sqlCode: `TRUNCATE TABLE sessions;`,
          sqlResult: {
            message: "Table 'sessions' vidée complètement",
            type: "message",
          },
        },
        {
          title: "Différence DELETE vs TRUNCATE",
          sqlCode: `-- DELETE : suppression sélective, peut avoir WHERE
DELETE FROM logs WHERE date_creation < '2024-01-01';

-- TRUNCATE : vide toute la table, plus rapide
TRUNCATE TABLE temp_data;`,
          sqlResult: {
            message: "DELETE : 1500 lignes supprimées | TRUNCATE : table vidée",
            type: "message",
          },
        },
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
