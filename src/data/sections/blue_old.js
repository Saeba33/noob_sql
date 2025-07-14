import { SECTION_DATA_COLORS } from "@/config/colors";
export const blueBeltContent = {
  // Belt configuration
  belt: "blue",
  description: "Fonctions avancées - Explorez les requêtes complexes",
  topics: ["Fonctions de fenêtre", "CTE", "CASE WHEN", "Fonctions de date"],
  colors: SECTION_DATA_COLORS.blue,

  // Content sections
  header: {
    title: "Jointures Avancées - Techniques Complexes",
    description: "Maîtrisez l'art de combiner les tables avec des techniques avancées",
    tag: "Ceinture Bleue",
  },
  pageDescription: {
    title: "Unissez Vos Données avec les Jointures",
    content:
      "La ceinture bleue vous enseigne l'art crucial des jointures, qui permettent de combiner des données provenant de plusieurs tables. Maîtrisez INNER JOIN pour les correspondances exactes, LEFT et RIGHT JOIN pour inclure toutes les données d'une table, FULL JOIN pour tout combiner, et découvrez les cas d'usage spéciaux comme CROSS JOIN et les auto-jointures.",
  },
  accordions: [
    {
      title: "INNER JOIN - Correspondances Exactes",
      content:
        "Combinez des tables en ne gardant que les lignes qui ont des correspondances dans les deux tables.",
      sqlCode: `-- INNER JOIN de base
SELECT 
    users.name,
    users.email,
    orders.order_date,
    orders.total_amount
FROM users
INNER JOIN orders ON users.id = orders.user_id;

-- INNER JOIN avec alias
SELECT 
    u.name as client_name,
    o.order_date,
    o.total_amount,
    p.product_name,
    oi.quantity
FROM users u
INNER JOIN orders o ON u.id = o.user_id
INNER JOIN order_items oi ON o.id = oi.order_id
INNER JOIN products p ON oi.product_id = p.id;

-- INNER JOIN avec conditions supplémentaires
SELECT 
    u.name,
    o.order_date,
    o.total_amount
FROM users u
INNER JOIN orders o ON u.id = o.user_id 
    AND o.status = 'completed'
    AND o.order_date >= '2024-01-01';`,
      sqlResult: `Alice Dupont | alice@email.com | 2024-01-15 | 89.99
Bob Martin | bob@email.com | 2024-01-14 | 156.50
...

Alice Dupont | 2024-01-15 | Laptop Dell | 1
Alice Dupont | 2024-01-15 | Souris USB | 2
...`,
      description:
        "INNER JOIN ne retourne que les lignes qui ont des correspondances dans toutes les tables jointes.",
    },
    {
      title: "LEFT JOIN - Tout de la Table de Gauche",
      content:
        "Incluez toutes les lignes de la table de gauche, même sans correspondance à droite.",
      sqlCode: `-- LEFT JOIN de base
SELECT 
    u.name,
    u.email,
    o.order_date,
    o.total_amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- Trouver les utilisateurs sans commandes
SELECT 
    u.name,
    u.email,
    COUNT(o.id) as nombre_commandes
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name, u.email
HAVING COUNT(o.id) = 0;

-- LEFT JOIN avec agrégation
SELECT 
    u.name,
    u.email,
    COUNT(o.id) as total_orders,
    COALESCE(SUM(o.total_amount), 0) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name, u.email
ORDER BY total_spent DESC;

-- LEFT JOIN multiple
SELECT 
    u.name,
    COUNT(DISTINCT o.id) as orders,
    COUNT(DISTINCT r.id) as reviews
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
LEFT JOIN reviews r ON u.id = r.user_id
GROUP BY u.id, u.name;`,
      sqlResult: `Alice Dupont | alice@email.com | 2024-01-15 | 89.99
Bob Martin | bob@email.com | 2024-01-14 | 156.50
Claire Durand | claire@email.com | NULL | NULL

Claire Durand | claire@email.com | 0
Emma Bernard | emma@email.com | 0
...`,
      description:
        "LEFT JOIN garantit que toutes les lignes de la table de gauche apparaissent dans le résultat.",
    },
    {
      title: "RIGHT JOIN - Tout de la Table de Droite",
      content:
        "Incluez toutes les lignes de la table de droite, même sans correspondance à gauche.",
      sqlCode: `-- RIGHT JOIN de base
SELECT 
    u.name,
    u.email,
    o.order_date,
    o.total_amount
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;

-- Équivalent LEFT JOIN (plus couramment utilisé)
SELECT 
    u.name,
    u.email,
    o.order_date,
    o.total_amount
FROM orders o
LEFT JOIN users u ON o.user_id = u.id;

-- Trouver les commandes orphelines
SELECT 
    o.id,
    o.order_date,
    o.total_amount,
    u.name
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id
WHERE u.id IS NULL;

-- RIGHT JOIN avec conditions
SELECT 
    p.product_name,
    p.price,
    c.category_name
FROM categories c
RIGHT JOIN products p ON c.id = p.category_id
WHERE p.price > 100;`,
      sqlResult: `Alice Dupont | alice@email.com | 2024-01-15 | 89.99
Bob Martin | bob@email.com | 2024-01-14 | 156.50
NULL | NULL | 2024-01-10 | 75.25

Order #1001 | 2024-01-10 | 75.25 | NULL
Order #1005 | 2024-01-12 | 45.00 | NULL
...`,
      description:
        "RIGHT JOIN est moins utilisé que LEFT JOIN mais utile dans certaines situations spécifiques.",
    },
    {
      title: "FULL OUTER JOIN - Tout de Partout",
      content:
        "Combinez toutes les lignes des deux tables, avec ou sans correspondances.",
      sqlCode: `-- FULL OUTER JOIN
SELECT 
    u.name,
    u.email,
    o.order_date,
    o.total_amount
FROM users u
FULL OUTER JOIN orders o ON u.id = o.user_id;

-- Simulation avec UNION (si FULL OUTER JOIN non supporté)
SELECT 
    u.name,
    u.email,
    o.order_date,
    o.total_amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
UNION
SELECT 
    u.name,
    u.email,
    o.order_date,
    o.total_amount
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;

-- Analyser les correspondances
SELECT 
    CASE 
        WHEN u.id IS NOT NULL AND o.id IS NOT NULL THEN 'Correspondance'
        WHEN u.id IS NOT NULL AND o.id IS NULL THEN 'Utilisateur sans commande'
        WHEN u.id IS NULL AND o.id IS NOT NULL THEN 'Commande orpheline'
    END as status,
    COUNT(*) as count
FROM users u
FULL OUTER JOIN orders o ON u.id = o.user_id
GROUP BY 
    CASE 
        WHEN u.id IS NOT NULL AND o.id IS NOT NULL THEN 'Correspondance'
        WHEN u.id IS NOT NULL AND o.id IS NULL THEN 'Utilisateur sans commande'
        WHEN u.id IS NULL AND o.id IS NOT NULL THEN 'Commande orpheline'
    END;`,
      description:
        "FULL OUTER JOIN vous donne une vue complète de vos données, avec toutes les correspondances et non-correspondances.",
    },
    {
      title: "CROSS JOIN - Produit Cartésien",
      content: "Créez toutes les combinaisons possibles entre deux tables.",
      sqlCode: `-- CROSS JOIN simple
SELECT 
    colors.name as color,
    sizes.name as size
FROM colors
CROSS JOIN sizes;

-- CROSS JOIN avec condition
SELECT 
    u.name as user_name,
    p.product_name,
    p.price
FROM users u
CROSS JOIN products p
WHERE p.category = 'promotion';

-- Générer des combinaisons pour planning
SELECT 
    employees.name,
    shifts.shift_name,
    shifts.start_time,
    shifts.end_time
FROM employees
CROSS JOIN shifts
WHERE employees.department = 'sales'
ORDER BY employees.name, shifts.start_time;

-- ATTENTION: CROSS JOIN peut générer énormément de lignes!
-- 1000 users × 5000 products = 5,000,000 lignes!`,
      sqlResult: `Rouge | S
Rouge | M
Rouge | L
Rouge | XL
Bleu | S
Bleu | M
...

Alice | Produit Promo 1 | 19.99
Alice | Produit Promo 2 | 29.99
Bob | Produit Promo 1 | 19.99
...`,
      description:
        "CROSS JOIN génère toutes les combinaisons possibles. Utilisez avec précaution sur de grandes tables!",
    },
    {
      title: "Auto-Jointures et Jointures Complexes",
      content:
        "Joignez une table avec elle-même et créez des jointures sophistiquées.",
      sqlCode: `-- Auto-jointure : employés et leurs managers
SELECT 
    emp.name as employee_name,
    mgr.name as manager_name,
    emp.department
FROM employees emp
LEFT JOIN employees mgr ON emp.manager_id = mgr.id;

-- Trouver les collègues (même département)
SELECT 
    e1.name as employee1,
    e2.name as employee2,
    e1.department
FROM employees e1
INNER JOIN employees e2 ON e1.department = e2.department
    AND e1.id < e2.id  -- Éviter les doublons
ORDER BY e1.department, e1.name;

-- Jointure avec sous-requête
SELECT 
    u.name,
    u.email,
    recent_orders.last_order_date,
    recent_orders.order_count
FROM users u
INNER JOIN (
    SELECT 
        user_id,
        MAX(order_date) as last_order_date,
        COUNT(*) as order_count
    FROM orders 
    WHERE order_date >= DATE('now', '-30 days')
    GROUP BY user_id
) recent_orders ON u.id = recent_orders.user_id;

-- Jointure conditionnelle complexe
SELECT 
    p1.product_name as product1,
    p2.product_name as product2,
    p1.price + p2.price as bundle_price
FROM products p1
INNER JOIN products p2 ON p1.category_id = p2.category_id
    AND p1.id < p2.id
    AND ABS(p1.price - p2.price) < 50;`,
      description:
        "Les jointures avancées permettent des analyses sophistiquées et des relations complexes entre vos données.",
    },
  ],
};
