export const ddlContent = {
  header: {
    title: "DDL - Data Definition Language",
    description:
      "Apprenez à créer et modifier la structure de vos bases de données",
    tag: "Fondamental",
  },

  pageDescription: {
    title: "Maîtrisez le DDL",
    description:
      "Le DDL (Data Definition Language) vous permet de définir et modifier la structure de votre base de données. Découvrez comment créer des tables, des index, et gérer les contraintes.",
  },

  accordions: [
    {
      id: "create-basic",
      title: "CREATE TABLE basique",
      content:
        "Apprenez à créer une table simple avec différents types de données.",
      sqlCode: `CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
      diagram: `┌─ STRUCTURE DE LA BASE ─┐
│
├─ USERS
│  ├── id (INTEGER) [PK]
│  ├── name (VARCHAR) [NOT NULL]
│  ├── email (VARCHAR) [UNIQUE]
│  └── created_at (TIMESTAMP) [DEFAULT]
│
└─────────────────────────┘`,
      schema: [
        {
          name: "users",
          columns: [
            { name: "id", type: "INTEGER", constraints: "PRIMARY KEY" },
            { name: "name", type: "VARCHAR(100)", constraints: "NOT NULL" },
            { name: "email", type: "VARCHAR(255)", constraints: "UNIQUE" },
            {
              name: "created_at",
              type: "TIMESTAMP",
              constraints: "DEFAULT CURRENT_TIMESTAMP",
            },
          ],
        },
      ],
      result: [
        { message: "Table 'users' created successfully", rows_affected: 0 },
      ],
      table: [
        {
          id: 1,
          name: "Alice Dupont",
          email: "alice@example.com",
          created_at: "2024-01-15 10:30:00",
        },
        {
          id: 2,
          name: "Bob Martin",
          email: "bob@example.com",
          created_at: "2024-01-15 11:15:00",
        },
        {
          id: 3,
          name: "Claire Durand",
          email: "claire@example.com",
          created_at: "2024-01-15 14:22:00",
        },
      ],
      explanation:
        "Cette requête crée une table 'users' avec une clé primaire, des contraintes et des types de données appropriés.",
    },
    {
      id: "create-constraints",
      title: "Contraintes et clés étrangères",
      content:
        "Découvrez comment ajouter des contraintes pour maintenir l'intégrité des données.",
      sqlCode: `CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  amount DECIMAL(10,2) CHECK (amount > 0),
  status VARCHAR(20) DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES users(id)
);`,
      diagram: `┌─ RELATIONS BASE DE DONNÉES ─┐
│
├─ USERS                    ├─ ORDERS
│  ├── id [PK] ────────────────→ user_id [FK]
│  ├── name                 │  ├── id [PK]
│  ├── email                │  ├── amount [CHECK > 0]
│  └── created_at           │  └── status [DEFAULT]
│                           │
└─────────────────────────────┘`,
      schema: [
        {
          name: "orders",
          columns: [
            { name: "id", type: "INTEGER", constraints: "PRIMARY KEY" },
            {
              name: "user_id",
              type: "INTEGER",
              constraints: "FOREIGN KEY → users(id)",
            },
            {
              name: "amount",
              type: "DECIMAL(10,2)",
              constraints: "CHECK (amount > 0)",
            },
            {
              name: "status",
              type: "VARCHAR(20)",
              constraints: "DEFAULT 'pending'",
            },
          ],
        },
      ],
      result: [
        {
          message: "Table 'orders' created successfully",
          foreign_keys: 1,
          constraints: 1,
        },
      ],
      table: [
        { id: 1, user_id: 1, amount: 99.99, status: "pending" },
        { id: 2, user_id: 2, amount: 149.5, status: "completed" },
        { id: 3, user_id: 1, amount: 75.25, status: "cancelled" },
        { id: 4, user_id: 3, amount: 200.0, status: "pending" },
      ],
      explanation:
        "Ici nous ajoutons une contrainte CHECK et une clé étrangère pour lier les commandes aux utilisateurs.",
    },
    {
      id: "alter-add-column",
      title: "Ajouter une colonne",
      content:
        "Modifiez la structure d'une table existante en ajoutant de nouvelles colonnes.",
      sqlCode: `ALTER TABLE users 
ADD COLUMN phone VARCHAR(20),
ADD COLUMN birth_date DATE;`,
      explanation:
        "ALTER TABLE permet d'ajouter de nouvelles colonnes à une table existante sans perdre les données.",
    },
    {
      id: "alter-modify-column",
      title: "Modifier une colonne",
      content: "Changez le type ou les propriétés d'une colonne existante.",
      sqlCode: `ALTER TABLE users 
ALTER COLUMN name TYPE VARCHAR(150),
ALTER COLUMN email SET NOT NULL;`,
      explanation:
        "Vous pouvez modifier le type de données et ajouter ou supprimer des contraintes.",
    },
    {
      id: "drop-table",
      title: "Supprimer une table",
      content: "Supprimez complètement une table et toutes ses données.",
      sqlCode: `DROP TABLE IF EXISTS temp_table;`,
      explanation:
        "DROP TABLE supprime définitivement la table. IF EXISTS évite les erreurs si la table n'existe pas.",
    },
    {
      id: "drop-column",
      title: "Supprimer une colonne",
      content: "Retirez une colonne d'une table existante.",
      sqlCode: `ALTER TABLE users 
DROP COLUMN phone;`,
      explanation:
        "DROP COLUMN supprime la colonne et toutes ses données de manière permanente.",
    },
  ],
};
