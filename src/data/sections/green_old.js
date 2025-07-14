import { SECTION_DATA_COLORS } from "@/config/colors";
export const greenBeltContent = {
  // Belt configuration
  belt: "green",
  description: "Fonctions d'agrégation - Analysez vos données",
  topics: ["GROUP BY", "COUNT", "SUM", "AVG", "HAVING"],
  colors: SECTION_DATA_COLORS.green,

  // Content sections
  header: {
    title: "Agrégation - Analyse de Données",
    description: "Maîtrisez les fonctions d'agrégation et l'analyse de données",
    tag: "Ceinture Verte",
  },
  pageDescription: {
    title: "Analysez et Résumez Vos Données",
    content:
      "La ceinture verte vous initie au monde puissant de l'agrégation de données. Apprenez à utiliser GROUP BY pour regrouper vos données, maîtrisez les fonctions d'agrégation comme COUNT, SUM, AVG, MIN et MAX, et découvrez comment HAVING vous permet de filtrer vos groupes. Ces compétences transforment des données brutes en informations analytiques précieuses.",
  },
  accordions: [
    {
      title: "GROUP BY - Regroupement de Données",
      content:
        "Organisez vos données en groupes pour des analyses plus profondes.",
      sqlCode: `-- Regroupement simple
SELECT category, COUNT(*) as nombre_produits
FROM products 
GROUP BY category;

-- Regroupement par plusieurs colonnes
SELECT 
    category,
    brand,
    COUNT(*) as nombre_produits,
    AVG(price) as prix_moyen
FROM products 
GROUP BY category, brand
ORDER BY category, brand;

-- Regroupement avec expressions
SELECT 
    EXTRACT(YEAR FROM order_date) as annee,
    EXTRACT(MONTH FROM order_date) as mois,
    COUNT(*) as nombre_commandes
FROM orders 
GROUP BY 
    EXTRACT(YEAR FROM order_date),
    EXTRACT(MONTH FROM order_date)
ORDER BY annee, mois;`,
      sqlResult: `Electronics | 45
Clothing | 32
Books | 28

Electronics | Apple | 12 | 899.50
Electronics | Samsung | 15 | 650.25
...`,
      description:
        "GROUP BY transforme vos lignes individuelles en groupes significatifs pour l'analyse.",
    },
    {
      title: "COUNT - Comptage d'Enregistrements",
      content:
        "Comptez vos données de différentes manières avec la fonction COUNT.",
      sqlCode: `-- Compter toutes les lignes
SELECT COUNT(*) as total_users FROM users;

-- Compter les valeurs non-nulles
SELECT COUNT(email) as users_avec_email FROM users;

-- Compter les valeurs distinctes
SELECT COUNT(DISTINCT city) as nombre_villes FROM users;

-- Compter par groupe
SELECT 
    department,
    COUNT(*) as nombre_employes,
    COUNT(DISTINCT manager_id) as nombre_managers
FROM employees 
GROUP BY department;

-- Compter avec conditions
SELECT 
    COUNT(*) as total,
    COUNT(CASE WHEN age >= 18 THEN 1 END) as adultes,
    COUNT(CASE WHEN age < 18 THEN 1 END) as mineurs
FROM users;`,
      sqlResult: `Total users: 1,247
Users avec email: 1,198
Nombre de villes: 89

IT | 25 | 3
Sales | 18 | 2
...`,
      description:
        "COUNT est votre fonction de base pour quantifier vos données sous tous leurs aspects.",
    },
    {
      title: "SUM et AVG - Calculs Numériques",
      content:
        "Calculez des totaux et des moyennes pour analyser vos données numériques.",
      sqlCode: `-- Somme et moyenne simples
SELECT 
    SUM(price) as chiffre_affaires_total,
    AVG(price) as prix_moyen,
    COUNT(*) as nombre_ventes
FROM sales;

-- Calculs par groupe
SELECT 
    sales_person,
    SUM(amount) as total_ventes,
    AVG(amount) as vente_moyenne,
    COUNT(*) as nombre_transactions
FROM sales 
GROUP BY sales_person
ORDER BY total_ventes DESC;

-- Calculs avec conditions
SELECT 
    product_category,
    SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END) as ventes_confirmees,
    SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) as ventes_en_attente,
    AVG(CASE WHEN status = 'completed' THEN amount END) as panier_moyen
FROM orders 
GROUP BY product_category;`,
      sqlResult: `Chiffre d'affaires: 1,245,680.50
Prix moyen: 67.89
Nombre de ventes: 18,345

Alice Martin | 89,450.25 | 1,247.92 | 72
Bob Durand | 76,230.15 | 1,058.75 | 72
...`,
      description:
        "SUM et AVG vous donnent les totaux et moyennes essentiels pour l'analyse financière et statistique.",
    },
    {
      title: "MIN et MAX - Valeurs Extrêmes",
      content: "Trouvez les valeurs minimales et maximales dans vos données.",
      sqlCode: `-- Min et Max simples
SELECT 
    MIN(price) as prix_minimum,
    MAX(price) as prix_maximum,
    MAX(price) - MIN(price) as ecart_prix
FROM products;

-- Min et Max par groupe
SELECT 
    category,
    MIN(price) as prix_min,
    MAX(price) as prix_max,
    MAX(created_at) as dernier_ajout
FROM products 
GROUP BY category;

-- Trouver les enregistrements avec valeurs extrêmes
SELECT p1.*
FROM products p1
WHERE p1.price = (SELECT MAX(price) FROM products p2 WHERE p2.category = p1.category);

-- Dates min/max utiles
SELECT 
    MIN(order_date) as premiere_commande,
    MAX(order_date) as derniere_commande,
    MAX(order_date) - MIN(order_date) as periode_activite
FROM orders;`,
      sqlResult: `Prix min: 5.99
Prix max: 1,299.00
Écart: 1,293.01

Electronics | 29.99 | 1,299.00 | 2024-01-15
Books | 5.99 | 89.95 | 2024-01-14
...`,
      description:
        "MIN et MAX révèlent les limites de vos données et vous aident à identifier les valeurs exceptionnelles.",
    },
    {
      title: "HAVING - Filtrage des Groupes",
      content: "Filtrez vos groupes après agrégation avec la clause HAVING.",
      sqlCode: `-- HAVING avec COUNT
SELECT 
    city,
    COUNT(*) as nombre_clients
FROM customers 
GROUP BY city
HAVING COUNT(*) >= 10
ORDER BY nombre_clients DESC;

-- HAVING avec SUM
SELECT 
    customer_id,
    SUM(amount) as total_achats
FROM orders 
GROUP BY customer_id
HAVING SUM(amount) > 1000
ORDER BY total_achats DESC;

-- HAVING avec conditions multiples
SELECT 
    product_category,
    COUNT(*) as nombre_produits,
    AVG(price) as prix_moyen
FROM products 
GROUP BY product_category
HAVING 
    COUNT(*) >= 5 
    AND AVG(price) > 50
ORDER BY prix_moyen DESC;

-- HAVING vs WHERE
SELECT 
    department,
    COUNT(*) as employes_actifs
FROM employees 
WHERE status = 'active'  -- Filtre AVANT regroupement
GROUP BY department
HAVING COUNT(*) > 3;     -- Filtre APRÈS regroupement`,
      sqlResult: `Paris | 45
Lyon | 23
Marseille | 18
...

Customer #1234 | 2,456.78
Customer #5678 | 1,890.45
...`,
      description:
        "HAVING filtre les groupes après agrégation, contrairement à WHERE qui filtre avant regroupement.",
    },
    {
      title: "Fonctions d'Agrégation Avancées",
      content:
        "Découvrez des fonctions d'agrégation plus sophistiquées pour des analyses poussées.",
      sqlCode: `-- Fonctions statistiques avancées
SELECT 
    product_category,
    COUNT(*) as count,
    AVG(price) as moyenne,
    STDDEV(price) as ecart_type,
    VARIANCE(price) as variance,
    MEDIAN(price) as mediane
FROM products 
GROUP BY product_category;

-- Agrégation de chaînes
SELECT 
    customer_id,
    GROUP_CONCAT(product_name, ', ') as produits_achetes,
    COUNT(*) as nombre_achats
FROM order_items 
GROUP BY customer_id;

-- Percentiles et quartiles
SELECT 
    department,
    PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY salary) as Q1,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY salary) as mediane,
    PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY salary) as Q3
FROM employees 
GROUP BY department;

-- Premiers et derniers par groupe
SELECT 
    category,
    FIRST_VALUE(product_name) OVER (PARTITION BY category ORDER BY created_at) as premier_produit,
    LAST_VALUE(product_name) OVER (PARTITION BY category ORDER BY created_at ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) as dernier_produit
FROM products;`,
      description:
        "Les fonctions avancées offrent des analyses statistiques et des manipulations de données sophistiquées.",
    },
  ],
};
