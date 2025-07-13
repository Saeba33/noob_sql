export const crudContent = {
  header: {
    title: "CRUD - Create, Read, Update, Delete",
    description: "Maîtrisez les opérations fondamentales sur les données",
    tag: "Essentiel",
  },

  pageDescription: {
    title: "Les opérations CRUD",
    description:
      "CRUD représente les quatre opérations de base pour manipuler les données : Create (créer), Read (lire), Update (mettre à jour) et Delete (supprimer). Ces opérations forment le cœur de toute application utilisant une base de données.",
  },

  accordions: [
    {
      id: "insert-basic",
      title: "INSERT basique",
      content: "Ajoutez de nouvelles données dans une table avec INSERT INTO.",
      sqlCode: `INSERT INTO users (name, email) 
VALUES ('Jean Dupont', 'jean@example.com');`,
      explanation:
        "INSERT INTO ajoute une nouvelle ligne dans la table users avec les valeurs spécifiées.",
    },
    {
      id: "insert-multiple",
      title: "Insertion multiple",
      content:
        "Insérez plusieurs lignes en une seule requête pour optimiser les performances.",
      sqlCode: `INSERT INTO users (name, email) 
VALUES 
  ('Marie Martin', 'marie@example.com'),
  ('Pierre Durand', 'pierre@example.com'),
  ('Sophie Leroy', 'sophie@example.com');`,
      explanation:
        "Vous pouvez insérer plusieurs lignes simultanément en séparant les valeurs par des virgules.",
    },
    {
      id: "select-basic",
      title: "SELECT simple",
      content:
        "Récupérez des données avec SELECT, la requête la plus utilisée en SQL.",
      sqlCode: `SELECT name, email 
FROM users 
WHERE id = 1;`,
      explanation:
        "SELECT permet de récupérer des colonnes spécifiques d'une table avec des conditions.",
    },
    {
      id: "select-all",
      title: "Sélectionner toutes les colonnes",
      content: "Utilisez * pour récupérer toutes les colonnes d'une table.",
      sqlCode: `SELECT * 
FROM users 
ORDER BY created_at DESC 
LIMIT 10;`,
      explanation:
        "L'astérisque (*) sélectionne toutes les colonnes. ORDER BY trie les résultats et LIMIT restreint le nombre.",
    },
    {
      id: "update-basic",
      title: "UPDATE simple",
      content: "Modifiez des données existantes avec UPDATE SET.",
      sqlCode: `UPDATE users 
SET email = 'nouveau@example.com' 
WHERE id = 1;`,
      explanation:
        "UPDATE modifie les valeurs existantes. La clause WHERE est cruciale pour cibler les bonnes lignes.",
    },
    {
      id: "update-multiple",
      title: "Mise à jour multiple",
      content: "Modifiez plusieurs colonnes ou plusieurs lignes simultanément.",
      sqlCode: `UPDATE users 
SET 
  name = 'Jean-Pierre Dupont',
  email = 'jp.dupont@example.com',
  updated_at = CURRENT_TIMESTAMP
WHERE id IN (1, 2, 3);`,
      explanation:
        "Vous pouvez modifier plusieurs colonnes et utiliser IN pour cibler plusieurs lignes.",
    },
    {
      id: "delete-basic",
      title: "DELETE simple",
      content: "Supprimez des données avec DELETE FROM.",
      sqlCode: `DELETE FROM users 
WHERE id = 1;`,
      explanation:
        "DELETE supprime définitivement les lignes correspondant à la condition WHERE.",
    },
    {
      id: "delete-conditional",
      title: "Suppression conditionnelle",
      content: "Utilisez des conditions complexes pour supprimer précisément.",
      sqlCode: `DELETE FROM users 
WHERE created_at < DATE('now', '-1 year') 
  AND last_login IS NULL;`,
      explanation:
        "Supprime les utilisateurs créés il y a plus d'un an et qui ne se sont jamais connectés.",
    },
  ],
};
