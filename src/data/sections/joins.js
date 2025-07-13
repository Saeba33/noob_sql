export const joinsContent = {
  header: {
    title: "Jointures SQL",
    description: "Maîtrisez l'art de combiner les données de plusieurs tables",
    tag: "Fondamental",
  },

  pageDescription: {
    title: "Les jointures, le cœur du SQL relationnel",
    description:
      "Les jointures permettent de combiner les données de plusieurs tables en utilisant des relations. C'est l'une des fonctionnalités les plus puissantes du SQL relationnel. Apprenez tous les types de jointures et quand les utiliser.",
  },

  accordions: [
    {
      id: "basic-inner-join",
      title: "INNER JOIN basique",
      content:
        "Combinez deux tables en ne gardant que les lignes qui ont une correspondance dans les deux tables.",
      sqlCode: `SELECT 
  u.name,
  u.email,
  o.order_date,
  o.amount
FROM users u
INNER JOIN orders o ON u.id = o.user_id;`,
      explanation:
        "INNER JOIN ne retourne que les utilisateurs qui ont passé au moins une commande.",
    },
    {
      id: "multiple-inner-joins",
      title: "Jointures multiples",
      content: "Combinez plus de deux tables avec plusieurs INNER JOIN.",
      sqlCode: `SELECT 
  u.name,
  o.order_date,
  p.product_name,
  oi.quantity,
  oi.price
FROM users u
INNER JOIN orders o ON u.id = o.user_id
INNER JOIN order_items oi ON o.id = oi.order_id
INNER JOIN products p ON oi.product_id = p.id
WHERE o.order_date >= '2024-01-01';`,
      explanation:
        "Cette requête joint 4 tables pour obtenir le détail des commandes avec les noms des produits.",
    },
    {
      id: "left-join",
      title: "LEFT JOIN",
      content:
        "Gardez toutes les lignes de la table de gauche, même sans correspondance à droite.",
      sqlCode: `SELECT 
  u.name,
  u.email,
  COUNT(o.id) as order_count,
  COALESCE(SUM(o.amount), 0) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name, u.email
ORDER BY total_spent DESC;`,
      explanation:
        "LEFT JOIN inclut tous les utilisateurs, même ceux qui n'ont jamais passé de commande.",
    },
    {
      id: "right-join",
      title: "RIGHT JOIN",
      content:
        "Gardez toutes les lignes de la table de droite, même sans correspondance à gauche.",
      sqlCode: `SELECT 
  u.name,
  o.order_date,
  o.amount,
  o.status
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;`,
      explanation:
        "RIGHT JOIN inclut toutes les commandes, même celles sans utilisateur associé (cas rare mais possible).",
    },
    {
      id: "full-outer-join",
      title: "FULL OUTER JOIN",
      content:
        "Combinez toutes les lignes des deux tables, avec ou sans correspondance.",
      sqlCode: `SELECT 
  COALESCE(u.name, 'Utilisateur supprimé') as user_name,
  COALESCE(o.order_date, 'Aucune commande') as order_info,
  o.amount
FROM users u
FULL OUTER JOIN orders o ON u.id = o.user_id
WHERE u.id IS NULL OR o.id IS NULL;`,
      explanation:
        "FULL OUTER JOIN trouve les utilisateurs sans commandes ET les commandes sans utilisateurs.",
    },
    {
      id: "self-join",
      title: "Auto-jointure (SELF JOIN)",
      content:
        "Joignez une table avec elle-même pour explorer les relations hiérarchiques.",
      sqlCode: `SELECT 
  e.name as employee_name,
  m.name as manager_name,
  e.department
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id
WHERE e.department = 'IT'
ORDER BY m.name, e.name;`,
      explanation:
        "L'auto-jointure permet de trouver les relations manager-employé dans la même table.",
    },
  ],
};
