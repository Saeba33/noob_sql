import { SECTION_DATA_COLORS } from "@/config/colors";
export const orangeBeltContent = {
  // Belt configuration
  belt: "orange",
  description: "Jointures - Combinez des données de plusieurs tables",
  topics: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN", "Sous-requêtes"],
  colors: SECTION_DATA_COLORS.orange,
  
  // Content sections
  header: {
    title: "Jointures - Combiner les Tables",
    description: "Apprenez à combiner des données de plusieurs tables",
    tag: "Ceinture Orange",
  },
  pageDescription: {
    title: "Maîtrisez le Filtrage et le Tri des Données",
    content:
      "La ceinture orange se concentre sur le contrôle et l'organisation de vos données. Apprenez à utiliser efficacement les clauses WHERE, maîtrisez la recherche de motifs avec LIKE, triez vos résultats avec ORDER BY, et contrôlez la taille de sortie avec LIMIT. Ces compétences sont essentielles pour créer des requêtes significatives qui retournent exactement les données dont vous avez besoin.",
  },
  accordions: [
    {
      title: "WHERE Clause - Basic Filtering",
      content:
        "Filter your data based on specific conditions using comparison operators and logical operators.",
      sqlCode: `-- Basic WHERE conditions
SELECT * FROM users 
WHERE age > 25;

-- Multiple conditions with AND
SELECT name, email FROM users 
WHERE age > 25 AND department = 'Engineering';

-- Using OR for multiple possibilities
SELECT * FROM products 
WHERE category = 'Electronics' OR category = 'Computers';

-- BETWEEN for range filtering
SELECT * FROM employees 
WHERE salary BETWEEN 50000 AND 80000;`,
      explanation:
        "WHERE clauses filter rows based on conditions. Use comparison operators (=, >, <, >=, <=, !=) and combine conditions with AND/OR. BETWEEN is useful for range filtering.",
    },
    {
      title: "IN and NOT IN Operators",
      content: "Filter data based on a list of values.",
      sqlCode: `-- IN operator for multiple values
SELECT * FROM users 
WHERE department IN ('Engineering', 'Marketing', 'Sales');

-- NOT IN to exclude values
SELECT * FROM products 
WHERE category NOT IN ('Discontinued', 'Out of Stock');

-- Using IN with subqueries
SELECT * FROM orders 
WHERE customer_id IN (
  SELECT id FROM customers 
  WHERE country = 'USA'
);`,
      explanation:
        "IN and NOT IN operators allow you to filter based on a list of values. They're more efficient than multiple OR conditions.",
    },
    {
      title: "LIKE Pattern Matching",
      content: "Search for patterns in text data using wildcards.",
      sqlCode: `-- Starts with pattern
SELECT * FROM users 
WHERE name LIKE 'John%';

-- Contains pattern
SELECT * FROM products 
WHERE description LIKE '%phone%';

-- Ends with pattern
SELECT * FROM emails 
WHERE email LIKE '%@gmail.com';

-- Single character wildcard
SELECT * FROM products 
WHERE code LIKE 'A_123';`,
      explanation:
        "LIKE uses wildcards: % matches any sequence of characters, _ matches exactly one character. Great for flexible text searching.",
    },
    {
      title: "NULL Value Handling",
      content: "Work with NULL values using IS NULL and IS NOT NULL.",
      sqlCode: `-- Find NULL values
SELECT * FROM users 
WHERE phone IS NULL;

-- Find non-NULL values
SELECT * FROM users 
WHERE email IS NOT NULL;

-- Combine with other conditions
SELECT name, email FROM users 
WHERE email IS NOT NULL 
  AND department = 'Sales';`,
      explanation:
        "Use IS NULL and IS NOT NULL to handle missing data. Never use = NULL or != NULL as they won't work as expected.",
    },
    {
      title: "ORDER BY - Sorting Results",
      content: "Sort your query results in ascending or descending order.",
      sqlCode: `-- Single column sorting
SELECT name, salary FROM employees 
ORDER BY salary DESC;

-- Multiple column sorting
SELECT * FROM products 
ORDER BY category ASC, price DESC;

-- Sorting with calculated fields
SELECT name, (price * quantity) as total 
FROM order_items 
ORDER BY total DESC;

-- NULL values in sorting
SELECT * FROM users 
ORDER BY last_login DESC NULLS LAST;`,
      explanation:
        "ORDER BY sorts results. Use ASC (default) or DESC. Multiple columns create nested sorting. NULL values can be positioned with NULLS FIRST/LAST.",
    },
    {
      title: "LIMIT and OFFSET",
      content: "Control the number of rows returned and implement pagination.",
      sqlCode: `-- Limit number of results
SELECT * FROM users 
ORDER BY created_at DESC 
LIMIT 10;

-- Pagination with OFFSET
SELECT * FROM products 
ORDER BY name 
LIMIT 20 OFFSET 40;

-- Top N per group (modern SQL)
SELECT * FROM (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) as rn
  FROM products
) ranked 
WHERE rn <= 3;`,
      explanation:
        "LIMIT restricts the number of rows returned. OFFSET skips rows for pagination. Always use ORDER BY with LIMIT for consistent results.",
    },
  ],
};

export default orangeBeltContent;
