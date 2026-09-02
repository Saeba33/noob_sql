# Conventions de code et de contenu

## Outils
- **pnpm** uniquement (`pnpm-lock.yaml` versionné ; ne jamais recréer `package-lock.json`).
- Node ≥ 20.9 (24 en local). Versions épinglées pour `next`, `react`, `react-dom`, `eslint-config-next`.
- `pnpm lint && pnpm build` doit passer avant toute conclusion.

## Style JavaScript / JSX
- Indentation : tabulations. Guillemets doubles. Point-virgules.
- Pas de TypeScript. JSDoc succinct sur les composants non triviaux.
- Composants fonctionnels, `export default function Nom()`.
- `"use client"` uniquement si le fichier utilise hooks, état, événements ou APIs navigateur. Les pages `app/**/page.jsx` restent Server Components.
- Imports via alias `@/` (`@/components/...`, `@/config/...`). Éviter les chemins relatifs `../../../` (encore présents dans `SQLCodeBlock` et `SQLResultBlock`, à corriger à l'occasion).
- Icônes : `react-icons` (`md`, `fa6`, `io`, `ri`, `si`). Ne pas ajouter d'autre lib d'icônes.
- Pas de `console.log` résiduel.

## Tailwind 4
- Configuration CSS-first : `@import "tailwindcss"` dans `globals.css`, pas de `tailwind.config.js`.
- Coins : classes maison `squircle`, `squircle-t`, `squircle-b`, `squircle-sm` (utilisent `corner-shape: squircle`, fallback `border-radius`).
- Typographie : ne pas mettre de `text-xl` sur les titres ; `h1`–`h6` et `.text-intro/.text-lead/.text-body/.text-nav/.text-footer/.text-topic` sont définis dans `globals.css`.
- Couleurs de ceinture : via `style={{ color: colors.theme }}` ou variables CSS `--theme-color`, jamais de hex en dur dans les composants génériques.
- Préférer `bg-linear-to-br` (Tailwind 4) à `bg-gradient-to-br` (alias déprécié) lors des prochaines retouches.

## Contenu pédagogique (`src/data/sections/*.js`)
- Langue : français, vouvoiement, typographie française (apostrophe `'` acceptée, la règle ESLint est désactivée).
- Un accordéon = une notion. Ordre conseillé : `content` (explication) → `examples` du plus simple au plus complexe → éventuellement « Bonnes pratiques » via `BestPractices` en dernier accordéon.
- `content` accepte du HTML minimal : `<code>`, `<strong>`, `\n` (rendu `whitespace-pre-line`). Pas de `<script>`, pas de style inline.
- Chaque exemple avec `result` doit avoir un résultat **cohérent avec les données de référence** de la ceinture (section « Données de référence » en tête de `green.js`, `blue.js`, `brown.js`, `black.js`).
- SQL : dialecte volontairement générique (proche SQLite/PostgreSQL) ; mots-clés en MAJUSCULES, identifiants en `snake_case`, tables au pluriel, colonnes au singulier, `;` final, commentaires `--`.
- Un `code` contenant `CREATE TABLE` déclenche automatiquement un diagramme de tables : les colonnes doivent être une par ligne, `FOREIGN KEY (...) REFERENCES t(c)` sur sa propre ligne ou `REFERENCES` inline.
- `result` : tableau d'objets aux clés = en-têtes (ordre conservé) ; `null` s'affiche « NULL ». Pour DDL/DML sans lignes : `{ message: "Table créée" }`.

## Coloration SQL (`src/config/sql-syntax.js`)
- Tokenizer par regex, chaque passe pousse des tokens avec une `priority` (1 = commentaire, 2 = chaîne, … 13 = ponctuation). Après tri par position puis priorité, le premier token qui couvre une plage gagne.
- Pour ajouter un mot-clé : l'ajouter à la regex de la bonne catégorie ; si ambigu (ex. `DATE` type vs fonction), traiter le cas dans la passe `ambiguousFunctions` (priorité 4) avant les types (7).
- `sqlSyntaxConfig.types` pilote couleur, libellé et présence dans la légende.

## Accessibilité
- Boutons/toggles : `aria-expanded`, `aria-controls`, `aria-label` en français.
- Images décoratives : `alt=""` ; icônes de ceinture : `role="img"` + `aria-label`.
- Navigation : `aria-current="page"` sur le lien actif.
