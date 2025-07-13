export const intermediateContent = {
  header: {
    title: "Fonctionnalités intermédiaires",
    description:
      "Explorez les fonctionnalités SQL pour des requêtes plus sophistiquées",
    tag: "Intermédiaire",
  },

  pageDescription: {
    title: "Passez au niveau supérieur",
    description:
      "Découvrez les fonctionnalités SQL intermédiaires qui vous permettront d'écrire des requêtes plus puissantes et efficaces. Index, vues, sous-requêtes et fonctions d'agrégation n'auront plus de secrets pour vous.",
  },

  accordions: [
    {
      id: "basic-aggregates",
      title: "COUNT, SUM, AVG",
      content: "Les fonctions d'agrégation de base pour analyser vos données.",
      sqlCode: `SELECT 
  COUNT(*) as total_users,
  AVG(age) as average_age,
  SUM(salary) as total_salary
FROM employees;`,
      explanation:
        "Les fonctions d'agrégation permettent de calculer des statistiques sur un ensemble de lignes.",
    },
    {
      id: "group-by",
      title: "GROUP BY et HAVING",
      content: "Groupez vos données et filtrez les groupes avec HAVING.",
      sqlCode: `SELECT 
  department,
  COUNT(*) as employee_count,
  AVG(salary) as avg_salary
FROM employees 
GROUP BY department
HAVING COUNT(*) > 5;`,
      explanation:
        "GROUP BY regroupe les lignes, HAVING filtre les groupes (comme WHERE mais pour les groupes).",
    },
    {
      id: "basic-subquery",
      title: "Sous-requête simple",
      content: "Utilisez une requête à l'intérieur d'une autre requête.",
      sqlCode: `SELECT name, salary
FROM employees
WHERE salary > (
  SELECT AVG(salary) 
  FROM employees
);`,
      explanation:
        "Cette sous-requête trouve tous les employés avec un salaire supérieur à la moyenne.",
    },
    {
      id: "correlated-subquery",
      title: "Sous-requête corrélée",
      content: "Une sous-requête qui référence la requête externe.",
      sqlCode: `SELECT e1.name, e1.salary, e1.department
FROM employees e1
WHERE e1.salary = (
  SELECT MAX(e2.salary)
  FROM employees e2
  WHERE e2.department = e1.department
);`,
      explanation:
        "Cette sous-requête corrélée trouve l'employé le mieux payé de chaque département.",
    },
    {
      id: "create-view",
      title: "Créer une vue",
      content:
        "Les vues sont des requêtes sauvegardées qui se comportent comme des tables.",
      sqlCode: `CREATE VIEW employee_summary AS
SELECT 
  department,
  COUNT(*) as employee_count,
  AVG(salary) as avg_salary,
  MAX(salary) as max_salary
FROM employees
GROUP BY department;`,
      explanation:
        "Une vue simplifie l'accès à des requêtes complexes et peut être utilisée comme une table.",
    },
    {
      id: "create-index",
      title: "Créer un index",
      content:
        "Les index accélèrent les requêtes sur les colonnes fréquemment utilisées.",
      sqlCode: `CREATE INDEX idx_employee_email 
ON employees(email);

CREATE INDEX idx_employee_dept_salary 
ON employees(department, salary);`,
      explanation:
        "Les index améliorent les performances des requêtes WHERE, ORDER BY et JOIN.",
    },
    {
      id: "example-all-components",
      title: "Exemple complet",
      content: "Démonstration de tous les composants SQL disponibles.",
      sqlCode: `SELECT COUNT(*) as total_users,
  AVG(age) as average_age
FROM employees
WHERE department = 'IT';`,
      explanation:
        "Cette requête calcule le nombre total d'employés et l'âge moyen dans le département IT.",
      diagram: `┌─ BASE DE DONNÉES ─┐
│
├─ EMPLOYEES
│  ├── id (INTEGER)
│  ├── name (VARCHAR)
│  ├── age (INTEGER)
│  └── department (VARCHAR)
│
└────────────────────┘`,
      schema: [
        {
          name: "employees",
          columns: [
            { name: "id", type: "INTEGER", constraints: "PRIMARY KEY" },
            { name: "name", type: "VARCHAR(100)", constraints: "NOT NULL" },
            { name: "age", type: "INTEGER", constraints: "" },
            { name: "department", type: "VARCHAR(50)", constraints: "" },
          ],
        },
      ],
      result: [{ total_users: 15, average_age: 32.5 }],
      table: [
        { id: 1, name: "Alice", age: 30, department: "IT" },
        { id: 2, name: "Bob", age: 35, department: "IT" },
        { id: 3, name: "Charlie", age: 28, department: "IT" },
      ],
    },
  ],
};
