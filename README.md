# Noob SQL

## 🥋 Organisation des Ceintures

### ⚪ Ceinture Blanche - Généralités
**Base théorique et concepts fondamentaux**
- Définition d'un SGBD avec schéma de ramification (SGBD vs NoSQL)
- Architecture d'une base de données (table, colonne, ligne)
- Relations entre les tables
- Types de données (INTEGER, TEXT, etc.)
- Bonnes pratiques

### 🟡 Ceinture Jaune - DDL (Data Definition Language)
**Structure et définition des données**
- CREATE : Création de tables
- ALTER : Modification de structure
- DROP : Suppression de tables
- Bonnes pratiques DDL

### 🟠 Ceinture Orange - CRUD (Create, Read, Update, Delete)
**Opérations de base sur les données**
- SELECT : Lecture de données
- INSERT : Ajout de données
- UPDATE : Modification de données
- DELETE : Suppression de données
- Bonnes Pratiques CRUD

### 🟢 Ceinture Verte - Filtres et Conditions
**Contrôle et filtrage des données**
- Clause WHERE
- Opérateurs de comparaison (=, !=, <, >)
- Opérateurs logiques (AND, OR)
- Mots clés de filtrages (IN, BETWEEN, LIKE, IS NULL ...)
- Tri des résultats (ORDER BY)
- Regroupement (GROUP BY, HAVING)
- Pagination (LIMIT, OFFSET)

### 🔵 Ceinture Bleue - Agrégations
**Calculs et regroupements**
- Fonctions d'agrégation (COUNT, SUM, AVG, MIN, MAX)
- Fonctions de texte (UPPER, LOWER, LENGTH, CONCAT, SUBSTRING, TRIM, REPLACE)
- Fonctions numériques (ROUND, CEIL, FLOOR)
- Fonctions de date (NOW, DATE, DATEDIFF)
- Fonctions conditionnelles (COALESCE, CASE/WHEN)

### 🟤 Ceinture Marron - Jointures
**Relations entre les tables**
- Types de jointures
- Clés primaires et étrangères : Conditions nécessaires aux jointures
- JOIN (INNER JOIN) : Jointure interne
- LEFT JOIN (LEFT OUTER JOIN) : Jointure externe gauche
- RIGHT JOIN (RIGHT OUTER JOIN) : Jointure externe droite
- FULL JOIN (FULL OUTER JOIN) : Jointure externe complète
- CROSS JOIN : Produit cartésien
- SELF JOIN : Auto-jointure

### ⚫ Ceinture Noire - Requêtes Avancées
**Techniques avancées et optimisation**
- Sous-requêtes dans WHERE, SELECT, IN, EXISTS
- WITH (CTE – Common Table Expression) version simple
- Création et utilisation de VIEW
- Opérations de combinaison avec UNION, UNION ALL
- INDEX : Optimisation des performances
- Transactions : BEGIN, COMMIT, ROLLBACK

### 🟣 1ère DAN - Mise en Pratique
**Application pratique des connaissances acquises**
*(Développement ultérieur)*
## 🛠️ Développement

Projet Next.js 16 (App Router, JavaScript) géré avec **pnpm**.

```bash
pnpm install   # dépendances
pnpm dev       # http://localhost:3000
pnpm lint      # ESLint
pnpm build     # build de production (pages statiques)
pnpm start     # sert le build
```

Documentation de reprise dans `docs/` (`PROJECT.md`, `CONVENTIONS.md`, `ROADMAP.md`, `DECISIONS.md`) et `CLAUDE.md` pour le travail assisté.
