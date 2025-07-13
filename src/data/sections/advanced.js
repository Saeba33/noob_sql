export const advancedContent = {
  header: {
    title: "Fonctionnalités avancées",
    description:
      "Maîtrisez les techniques SQL avancées pour des bases de données complexes",
    tag: "Avancé",
  },

  pageDescription: {
    title: "Techniques SQL avancées",
    description:
      "Plongez dans les fonctionnalités SQL les plus sophistiquées : fonctions de fenêtre, CTE, procédures stockées, triggers et optimisation de performances. Ces techniques vous permettront de gérer des bases de données complexes et d'optimiser vos requêtes.",
  },

  accordions: [
    {
      id: "rank-functions",
      title: "ROW_NUMBER, RANK, DENSE_RANK",
      content:
        "Numérotez et classez vos données avec les fonctions de fenêtre.",
      sqlCode: `SELECT 
  name,
  salary,
  department,
  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as row_num,
  RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank,
  DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) as dense_rank
FROM employees;`,
      explanation:
        "Les fonctions de fenêtre permettent de calculer des valeurs sur un ensemble de lignes liées à la ligne courante.",
    },
    {
      id: "lag-lead",
      title: "LAG et LEAD",
      content: "Accédez aux valeurs des lignes précédentes et suivantes.",
      sqlCode: `SELECT 
  name,
  salary,
  LAG(salary, 1) OVER (ORDER BY hire_date) as previous_salary,
  LEAD(salary, 1) OVER (ORDER BY hire_date) as next_salary,
  salary - LAG(salary, 1) OVER (ORDER BY hire_date) as salary_diff
FROM employees
ORDER BY hire_date;`,
      explanation:
        "LAG accède aux valeurs précédentes, LEAD aux valeurs suivantes dans la fenêtre.",
    },
    {
      id: "basic-cte",
      title: "Common Table Expression (CTE)",
      content: "Simplifiez vos requêtes complexes avec les CTE.",
      sqlCode: `WITH department_stats AS (
  SELECT 
    department,
    AVG(salary) as avg_salary,
    COUNT(*) as employee_count
  FROM employees
  GROUP BY department
)
SELECT 
  e.name,
  e.salary,
  ds.avg_salary,
  e.salary - ds.avg_salary as salary_diff
FROM employees e
JOIN department_stats ds ON e.department = ds.department
WHERE e.salary > ds.avg_salary;`,
      explanation:
        "Les CTE permettent de définir des résultats temporaires réutilisables dans la requête principale.",
    },
    {
      id: "recursive-cte",
      title: "CTE récursive",
      content: "Explorez les structures hiérarchiques avec la récursivité.",
      sqlCode: `WITH RECURSIVE employee_hierarchy AS (
  -- Cas de base : les managers de niveau supérieur
  SELECT 
    id, 
    name, 
    manager_id, 
    0 as level,
    name as hierarchy_path
  FROM employees 
  WHERE manager_id IS NULL
  
  UNION ALL
  
  -- Cas récursif : les employés sous chaque manager
  SELECT 
    e.id,
    e.name,
    e.manager_id,
    eh.level + 1,
    eh.hierarchy_path || ' > ' || e.name
  FROM employees e
  JOIN employee_hierarchy eh ON e.manager_id = eh.id
)
SELECT * FROM employee_hierarchy
ORDER BY level, hierarchy_path;`,
      explanation:
        "Les CTE récursives permettent de naviguer dans des structures hiérarchiques comme les organigrammes.",
    },
  ],
};
