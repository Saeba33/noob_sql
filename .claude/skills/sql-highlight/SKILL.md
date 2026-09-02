---
name: sql-highlight
description: Modifier ou déboguer la coloration syntaxique SQL et le parseur de schéma (src/config/sql-syntax.js) avec un test rapide en Node. Utiliser quand un mot-clé est mal coloré, qu'une table n'apparaît pas dans un diagramme ou pour ajouter un type de token.
---

# Coloration SQL et parseur de schéma

Fichier : `src/config/sql-syntax.js` (≈400 lignes). Lire seulement la passe concernée :
```bash
grep -n "// [0-9]*\.\|priority:" src/config/sql-syntax.js | head -40
```

## Fonctionnement
- `analyzeSqlCode(code)` : passes regex numérotées 1→13, chaque token a une `priority` (1 commentaire, 2 chaîne, 3 contraintes multi-mots, 4 fonctions ambiguës/temporelles, 5 mots-clés multi-mots + CASCADE après DROP TABLE, 6 mots-clés, 7 types, 8 contraintes, 9 fonctions, 10 nombres, 11 noms de tables, 12 opérateurs, 13 ponctuation).
- Tri par `start` puis `priority` ; un token qui chevauche un token déjà retenu est ignoré. Donc **la priorité la plus basse gagne** sur une même plage.
- `sqlSyntaxConfig.types[<type>]` : `style` (classes Tailwind du code), `color` + `label` + `showInLegend` (légende).
- `parseSchema(sql)` : lit ligne par ligne ; `CREATE TABLE x` ouvre une table, une ligne `nom TYPE ...` ajoute une colonne, `FOREIGN KEY (c) REFERENCES t(c)` ou `REFERENCES` inline crée une relation.

## Ajouter / corriger un mot
1. Choisir la catégorie (mot-clé, type, contrainte, fonction).
2. Si le mot est ambigu selon le contexte (ex. `DATE(` fonction vs `DATE` type), l'ajouter dans `ambiguousFunctions` (priorité 4) ou créer une passe contextuelle comme celle de `CASCADE`.
3. Ajouter au bon alternat `\b(...)\b`, en gardant l'ordre du plus long au plus court dans un même groupe.

## Tester sans lancer l'app
```bash
node --input-type=module -e '
import { analyzeSqlCode, parseSchema } from "./src/config/sql-syntax.js";
const sql = `SELECT DATE(created_at), COUNT(*) FROM commandes WHERE prix > 10;`;
console.table(analyzeSqlCode(sql).map(({text,type})=>({text,type})));
console.log(JSON.stringify(parseSchema(`CREATE TABLE a (\n id INTEGER PRIMARY KEY,\n b_id INTEGER REFERENCES b(id)\n);`), null, 1));
'
```
Puis `pnpm lint`. Vérifier visuellement dans `pnpm dev` seulement si le rendu (couleurs, légende) change.
