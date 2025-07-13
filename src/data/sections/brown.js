export const brownBeltContent = {
  // Belt configuration
  belt: "brown",
  beltDisplayName: "marron",
  beltBadge: "🟤",
  description: "Performance - Optimisez vos requêtes",
  topics: ["Index", "Plan d'exécution", "Optimisation", "EXPLAIN"],
  colors: {
    bg: "bg-amber-50",
    text: "text-amber-900",
    border: "border-amber-300",
    accent: "bg-amber-600",
    headerBorder: "border-amber-400",
    tagBg: "bg-amber-200",
    tagText: "text-amber-800",
    hover: "hover:bg-amber-100",
  },

  // Content sections
  header: {
    title: "Requêtes Avancées - Sous-requêtes et Vues",
    description: "Explorez les sous-requêtes, vues et transactions",
    tag: "Ceinture Marron",
  },
  pageDescription: {
    title: "Maîtrisez les Techniques SQL Avancées",
    content:
      "La ceinture marron vous élève vers l'expertise SQL avec des techniques sophistiquées. Apprenez les sous-requêtes pour des requêtes imbriquées puissantes, créez des vues pour simplifier des requêtes complexes, maîtrisez les transactions pour garantir l'intégrité des données, et découvrez les CTE et fonctions de fenêtre pour des analyses avancées.",
  },
  accordions: [
    {
      title: "Sous-requêtes - Requêtes Imbriquées",
      content:
        "Utilisez des requêtes à l'intérieur d'autres requêtes pour des analyses sophistiquées.",
      sqlCode: `-- Sous-requête dans WHERE
SELECT name, email, age
FROM users 
WHERE age > (
    SELECT AVG(age) 
    FROM users
);

-- Sous-requête avec IN
SELECT product_name, price
FROM products 
WHERE category_id IN (
    SELECT id 
    FROM categories 
    WHERE name IN ('Electronics', 'Books')
);

-- Sous-requête avec EXISTS
SELECT u.name, u.email
FROM users u
WHERE EXISTS (
    SELECT 1 
    FROM orders o 
    WHERE o.user_id = u.id 
    AND o.order_date >= '2024-01-01'
);

-- Sous-requête dans SELECT
SELECT 
    u.name,
    u.email,
    (SELECT COUNT(*) FROM orders WHERE user_id = u.id) as total_orders,
    (SELECT MAX(order_date) FROM orders WHERE user_id = u.id) as last_order
FROM users u;`,
      sqlResult: `Alice Dupont | alice@email.com | 28
David Moreau | david@email.com | 45
...

Laptop Dell | 899.99
Smartphone Samsung | 699.99
...`,
      description:
        "Les sous-requêtes permettent de créer des conditions et calculs dynamiques basés sur d'autres données.",
    },
    {
      title: "CTE - Common Table Expressions",
      content:
        "Créez des tables temporaires nommées pour des requêtes plus lisibles et réutilisables.",
      sqlCode: `-- CTE simple
WITH high_value_customers AS (
    SELECT 
        user_id,
        SUM(total_amount) as total_spent
    FROM orders 
    GROUP BY user_id
    HAVING SUM(total_amount) > 1000
)
SELECT 
    u.name,
    u.email,
    hvc.total_spent
FROM users u
INNER JOIN high_value_customers hvc ON u.id = hvc.user_id
ORDER BY hvc.total_spent DESC;

-- CTE multiple
WITH monthly_sales AS (
    SELECT 
        DATE_FORMAT(order_date, '%Y-%m') as month,
        SUM(total_amount) as sales
    FROM orders 
    GROUP BY DATE_FORMAT(order_date, '%Y-%m')
),
avg_monthly_sales AS (
    SELECT AVG(sales) as avg_sales
    FROM monthly_sales
)
SELECT 
    ms.month,
    ms.sales,
    ams.avg_sales,
    ms.sales - ams.avg_sales as difference
FROM monthly_sales ms
CROSS JOIN avg_monthly_sales ams
ORDER BY ms.month;

-- CTE récursive (hiérarchies)
WITH RECURSIVE employee_hierarchy AS (
    -- Cas de base : les managers de niveau supérieur
    SELECT id, name, manager_id, 0 as level
    FROM employees 
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Cas récursif : les employés sous les managers
    SELECT e.id, e.name, e.manager_id, eh.level + 1
    FROM employees e
    INNER JOIN employee_hierarchy eh ON e.manager_id = eh.id
)
SELECT * FROM employee_hierarchy
ORDER BY level, name;`,
      description:
        "Les CTE rendent vos requêtes complexes plus lisibles et permettent la récursion pour les hiérarchies.",
    },
    {
      title: "Fonctions de Fenêtre",
      content:
        "Effectuez des calculs sur des ensembles de lignes liées sans regroupement.",
      sqlCode: `-- ROW_NUMBER et RANK
SELECT 
    name,
    salary,
    department,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as row_num,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) as dense_rank
FROM employees;

-- Fonctions de décalage
SELECT 
    product_name,
    price,
    category_id,
    LAG(price, 1) OVER (PARTITION BY category_id ORDER BY price) as prev_price,
    LEAD(price, 1) OVER (PARTITION BY category_id ORDER BY price) as next_price,
    price - LAG(price, 1) OVER (PARTITION BY category_id ORDER BY price) as price_diff
FROM products;

-- Agrégations mobiles
SELECT 
    order_date,
    daily_sales,
    AVG(daily_sales) OVER (
        ORDER BY order_date 
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) as moving_avg_7_days,
    SUM(daily_sales) OVER (
        ORDER BY order_date 
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) as cumulative_sales
FROM (
    SELECT 
        order_date,
        SUM(total_amount) as daily_sales
    FROM orders 
    GROUP BY order_date
) daily_totals;

-- Percentiles
SELECT 
    name,
    salary,
    department,
    NTILE(4) OVER (ORDER BY salary) as quartile,
    PERCENT_RANK() OVER (ORDER BY salary) as percent_rank,
    CUME_DIST() OVER (ORDER BY salary) as cumulative_dist
FROM employees;`,
      description:
        "Les fonctions de fenêtre permettent des analyses sophistiquées tout en conservant le détail de chaque ligne.",
    },
    {
      title: "Vues - Requêtes Réutilisables",
      content:
        "Créez des vues pour simplifier l'accès à des requêtes complexes fréquemment utilisées.",
      sqlCode: `-- Vue simple
CREATE VIEW active_customers AS
SELECT 
    u.id,
    u.name,
    u.email,
    COUNT(o.id) as order_count,
    MAX(o.order_date) as last_order_date
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.order_date >= DATE('now', '-1 year')
GROUP BY u.id, u.name, u.email;

-- Utilisation de la vue
SELECT * FROM active_customers
WHERE order_count >= 5
ORDER BY last_order_date DESC;

-- Vue avec calculs complexes
CREATE VIEW product_analytics AS
SELECT 
    p.id,
    p.product_name,
    p.price,
    c.category_name,
    COUNT(oi.id) as times_ordered,
    SUM(oi.quantity) as total_quantity_sold,
    SUM(oi.quantity * oi.unit_price) as total_revenue,
    AVG(oi.unit_price) as avg_selling_price,
    (p.price - AVG(oi.unit_price)) as avg_discount
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN categories c ON p.category_id = c.id
GROUP BY p.id, p.product_name, p.price, c.category_name;

-- Vue matérialisée (si supportée)
CREATE MATERIALIZED VIEW monthly_revenue AS
SELECT 
    DATE_FORMAT(order_date, '%Y-%m') as month,
    SUM(total_amount) as revenue,
    COUNT(*) as order_count,
    AVG(total_amount) as avg_order_value
FROM orders 
GROUP BY DATE_FORMAT(order_date, '%Y-%m');

-- Rafraîchir la vue matérialisée
REFRESH MATERIALIZED VIEW monthly_revenue;`,
      description:
        "Les vues encapsulent des requêtes complexes et offrent une interface simplifiée pour vos données.",
    },
    {
      title: "Transactions Avancées",
      content:
        "Maîtrisez les transactions pour garantir la cohérence et l'intégrité de vos données.",
      sqlCode: `-- Transaction avec gestion d'erreur
BEGIN TRANSACTION;

DECLARE @error_count INT = 0;

-- Première opération
UPDATE accounts 
SET balance = balance - 500 
WHERE account_id = 1001;

IF @@ROWCOUNT = 0
    SET @error_count = @error_count + 1;

-- Deuxième opération
UPDATE accounts 
SET balance = balance + 500 
WHERE account_id = 1002;

IF @@ROWCOUNT = 0
    SET @error_count = @error_count + 1;

-- Vérification et validation
IF @error_count = 0
    COMMIT TRANSACTION;
ELSE
    ROLLBACK TRANSACTION;

-- Points de sauvegarde (Savepoints)
BEGIN TRANSACTION;

INSERT INTO orders (user_id, total_amount) 
VALUES (123, 150.00);

SAVEPOINT after_order;

INSERT INTO order_items (order_id, product_id, quantity)
VALUES (LAST_INSERT_ID(), 456, 2);

-- En cas de problème avec les items
IF @@ERROR <> 0
BEGIN
    ROLLBACK TO after_order;
    -- Mais garder la commande
END

COMMIT TRANSACTION;

-- Niveaux d'isolation
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
-- ou READ COMMITTED, REPEATABLE READ, SERIALIZABLE

-- Transaction avec verrous explicites
BEGIN TRANSACTION;

SELECT * FROM inventory 
WHERE product_id = 123
FOR UPDATE;  -- Verrouille la ligne

-- Traitement...

UPDATE inventory 
SET quantity = quantity - 1 
WHERE product_id = 123;

COMMIT;`,
      description:
        "Les transactions avancées avec savepoints et verrous garantissent l'intégrité même dans des scénarios complexes.",
    },
    {
      title: "Optimisation et Analyse",
      content:
        "Analysez et optimisez vos requêtes pour de meilleures performances.",
      sqlCode: `-- EXPLAIN pour analyser le plan d'exécution
EXPLAIN QUERY PLAN
SELECT 
    u.name,
    COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= '2024-01-01'
GROUP BY u.id, u.name
HAVING COUNT(o.id) >= 2;

-- Analyse des performances avec ANALYZE
EXPLAIN (ANALYZE, BUFFERS) 
SELECT * FROM products 
WHERE price BETWEEN 100 AND 500
AND category_id IN (1, 2, 3);

-- Index pour optimiser
CREATE INDEX idx_products_price_category 
ON products(category_id, price);

-- Réécriture de requête pour optimisation
-- AVANT (lent)
SELECT * FROM users 
WHERE id IN (
    SELECT user_id FROM orders 
    WHERE order_date >= '2024-01-01'
);

-- APRÈS (plus rapide)
SELECT DISTINCT u.* FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.order_date >= '2024-01-01';

-- Utilisation d'hints (spécifique à la DB)
SELECT /*+ USE_INDEX(users, idx_users_email) */
    name, email 
FROM users 
WHERE email LIKE '%@gmail.com';

-- Statistiques sur les requêtes
SHOW PROFILE FOR QUERY 1;
SELECT * FROM information_schema.PROCESSLIST;`,
      description:
        "L'analyse et l'optimisation sont cruciales pour maintenir de bonnes performances sur de gros volumes de données.",
    },
  ],
};
