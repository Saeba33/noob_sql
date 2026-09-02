# CONTEXT — NoobSQL

> **Rôle de ce fichier** : donner à une nouvelle conversation Claude ce qui ne change pas d'une session à l'autre (but, stack, décisions, conventions). L'état courant et le journal sont dans `docs/PLAN.md`. `CLAUDE.md` (carte du code, commandes) est chargé automatiquement.

## 1. But du projet

Apprendre SQL de zéro, en français, par paliers inspirés des ceintures d'arts martiaux. Chaque ceinture est une page composée d'accordéons ; chaque accordéon contient une explication, des exemples SQL colorés, leurs résultats sous forme de table, et parfois un composant pédagogique dédié (diagrammes SVG, tableaux de types, etc.). Une section « FIGHT » (1ère DAN, `/practice`) est prévue pour des exercices interactifs mais n'est encore qu'un placeholder.

Public : débutants complets. Ton : pédagogique, tutoiement absent (vouvoiement), vocabulaire expliqué.

## 2. Stack et architecture

Next 16.3 · React 19.2 · Tailwind 4.3 (PostCSS) · ESLint 9.39 · react-icons 5.7 · React Compiler · JavaScript (pas de TypeScript, choix assumé) · Node 24 global (Homebrew) · pnpm 11.

### Ceintures (ordre de navigation = ordre des clés de `BELTS_CONFIG`)

| Clé | Titre nav | Thème | Fichier data |
|---|---|---|---|
| white | Généralités | SGBD, architecture, types, clés, bonnes pratiques | `white.js` (+ composants `sections/white/*`) |
| yellow | DDL | CREATE / ALTER / DROP | `yellow.js` |
| orange | CRUD | SELECT / INSERT / UPDATE / DELETE | `orange.js` |
| green | Filtres | WHERE, opérateurs, ORDER BY, GROUP BY, LIMIT | `green.js` |
| blue | Fonctions | agrégation, texte, numérique, date, CASE/COALESCE | `blue.js` |
| brown | Jointures | INNER/LEFT/RIGHT/FULL/CROSS/SELF | `brown.js` (+ `sections/brown/*`) |
| black | Avancé | sous-requêtes, CTE, VIEW, UNION, INDEX, transactions | `black.js` |
| practice | FIGHT | exercices (à venir) | `practice.js` (résumé uniquement) |

Base d'exemple récurrente : bibliothèque (`utilisateurs`, `livres`, `emprunts`), parfois `commandes`/`produits`.

### Architecture et flux de rendu

1. `app/[belt]/page.jsx` (Server Component) → `getBeltData(belt)` (import dynamique de `data/sections/<belt>.js`, `notFound()` si clé inconnue) → injecte `colors` depuis `BELTS_CONFIG`.
2. `SectionHeader` (tag / titre / description) puis `AccordionList` → un `Accordion` (client) par entrée.
3. `Accordion` affiche, dans l'ordre : `content` (HTML via `dangerouslySetInnerHTML`, balises `<code>` stylées par `.content-html code`), `externalComponent`, puis chaque `example` :
   - `SQLCodeBlock` (coloration via `analyzeSqlCode`, bouton légende → modal `SQLLegend`)
   - si le code contient `CREATE TABLE` : `SQLTableDiagram` pour chaque table parsée par `sqlToTableDiagram`
   - si `result` défini : `SQLResultBlock` (tableau si array d'objets, encart bleu si `{ message }`)
4. `SectionNavigation` (précédent / suivant calculé par `useNavigation` sur `PAGES_CONFIG`) puis `Footer`.

Accueil : `Introduction.jsx` + `HomeNavigation` (cartes par ceinture, lit `summary`/`topics` de chaque `beltContent`, importés côté client).

Header : `Header.jsx` fixe, bascule desktop/mobile à 1500 px via `useNavbar` (`matchMedia` + `useSyncExternalStore`).

### Modèle de données `beltContent`

```js
export const beltContent = {
	summary: "phrase courte (carte d'accueil)",
	topics: ["sujet 1", "sujet 2", ...],          // 3 affichés + "n autres sujets"
	header: { tag: "Ceinture Verte", title: "...", description: "..." },
	accordions: [
		{
			section: "Titre de l'accordéon",        // sert aussi d'id DOM
			content: "Texte avec <code>SQL</code> et \n autorisés (HTML)",
			externalComponent: <MonComposant />,   // optionnel
			examples: [                             // optionnel
				{
					type: "schema" | "common" | "uncommon" | "message", // informatif, non exploité par l'UI
					label: "Titre de l'exemple",
					code: `SELECT ...;`,
					result: [{ col: val, ... }]      // tableau → SQLResultBlock table
					       | { message: "1 ligne insérée" } // → encart message
					       // absent → pas de conteneur gris
				},
			],
		},
	],
};
```
`white.js` exporte en plus `dataTypes`, `constraints`, `exampleTypes` consommés par `sections/white/DataTypes.jsx`.

### Fichiers de configuration

- `next.config.mjs` : `reactCompiler: true` (stable en Next 16).
- `eslint.config.mjs` : `eslint-config-next/core-web-vitals` en flat config, règle `react/no-unescaped-entities` désactivée.
- `postcss.config.mjs` : `@tailwindcss/postcss`.
- `jsconfig.json` : alias `@/*` → `src/*`.
- `pnpm-workspace.yaml` : `allowBuilds` pour `unrs-resolver`.

## 3. Documents de référence

- `CLAUDE.md` — carte du code, commandes, règles de travail (chargé automatiquement).
- `docs/PLAN.md` — état courant, phases, journal des sessions.
- Outillage : skills `.claude/skills/` (`resume`, `deps`, `verify` + skills métier), agents `.claude/agents/` (`code-scout` lecture seule, `dev` implémentation, `build-checker` validation).

## 4. Décisions actées

| Date | Décision |
|------|----------|
| 2026-09-02 | Projet repris : **pnpm uniquement** (jamais npm/yarn), Node 24 global via Homebrew, versions épinglées pour next / react / react-dom / eslint-config-next. |
| 2026-09-02 | **ESLint reste en 9.x** (ESLint 10 casse eslint-config-next) ; **pas de TypeScript** (projet JS assumé, JSDoc au besoin). |
| 2026-09-02 | Next 16 : `eslint .` remplace `next lint`, React Compiler activé, polices via `next/font` (plus d'appel Google Fonts), aucun `setState` synchrone dans un `useEffect` (`useSyncExternalStore`). |
| 2026-09-02 | **Aucune modification de code sans accord explicite de l'utilisateur** — proposer un plan d'abord. |
| 2026-09-02 | Doc de reprise = `docs/CONTEXT.md` + `docs/PLAN.md` ; outillage Claude harmonisé avec portfolio_v5 et routine-board (skills `/resume` `/deps` `/verify`, agents `code-scout` `dev` `build-checker`). |

## 5. Conventions

### Outils
- **pnpm** uniquement (`pnpm-lock.yaml` versionné ; ne jamais recréer `package-lock.json`).
- Node ≥ 20.9 (24 en local). Versions épinglées pour `next`, `react`, `react-dom`, `eslint-config-next`.
- `pnpm lint && pnpm build` doit passer avant toute conclusion.

### Style JavaScript / JSX
- Indentation : tabulations. Guillemets doubles. Point-virgules.
- Pas de TypeScript. JSDoc succinct sur les composants non triviaux.
- Composants fonctionnels, `export default function Nom()`.
- `"use client"` uniquement si le fichier utilise hooks, état, événements ou APIs navigateur. Les pages `app/**/page.jsx` restent Server Components.
- Imports via alias `@/` (`@/components/...`, `@/config/...`). Éviter les chemins relatifs `../../../` (encore présents dans `SQLCodeBlock` et `SQLResultBlock`, à corriger à l'occasion).
- Icônes : `react-icons` (`md`, `fa6`, `io`, `ri`, `si`). Ne pas ajouter d'autre lib d'icônes.
- Pas de `console.log` résiduel.

### Tailwind 4
- Configuration CSS-first : `@import "tailwindcss"` dans `globals.css`, pas de `tailwind.config.js`.
- Coins : classes maison `squircle`, `squircle-t`, `squircle-b`, `squircle-sm` (utilisent `corner-shape: squircle`, fallback `border-radius`).
- Typographie : ne pas mettre de `text-xl` sur les titres ; `h1`–`h6` et `.text-intro/.text-lead/.text-body/.text-nav/.text-footer/.text-topic` sont définis dans `globals.css`.
- Couleurs de ceinture : via `style={{ color: colors.theme }}` ou variables CSS `--theme-color`, jamais de hex en dur dans les composants génériques.
- Préférer `bg-linear-to-br` (Tailwind 4) à `bg-gradient-to-br` (alias déprécié) lors des prochaines retouches.

### Contenu pédagogique (`src/data/sections/*.js`)
- Langue : français, vouvoiement, typographie française (apostrophe `'` acceptée, la règle ESLint est désactivée).
- Un accordéon = une notion. Ordre conseillé : `content` (explication) → `examples` du plus simple au plus complexe → éventuellement « Bonnes pratiques » via `BestPractices` en dernier accordéon.
- `content` accepte du HTML minimal : `<code>`, `<strong>`, `\n` (rendu `whitespace-pre-line`). Pas de `<script>`, pas de style inline.
- Chaque exemple avec `result` doit avoir un résultat **cohérent avec les données de référence** de la ceinture (section « Données de référence » en tête de `green.js`, `blue.js`, `brown.js`, `black.js`).
- SQL : dialecte volontairement générique (proche SQLite/PostgreSQL) ; mots-clés en MAJUSCULES, identifiants en `snake_case`, tables au pluriel, colonnes au singulier, `;` final, commentaires `--`.
- Un `code` contenant `CREATE TABLE` déclenche automatiquement un diagramme de tables : les colonnes doivent être une par ligne, `FOREIGN KEY (...) REFERENCES t(c)` sur sa propre ligne ou `REFERENCES` inline.
- `result` : tableau d'objets aux clés = en-têtes (ordre conservé) ; `null` s'affiche « NULL ». Pour DDL/DML sans lignes : `{ message: "Table créée" }`.

### Coloration SQL (`src/config/sql-syntax.js`)
- Tokenizer par regex, chaque passe pousse des tokens avec une `priority` (1 = commentaire, 2 = chaîne, … 13 = ponctuation). Après tri par position puis priorité, le premier token qui couvre une plage gagne.
- Pour ajouter un mot-clé : l'ajouter à la regex de la bonne catégorie ; si ambigu (ex. `DATE` type vs fonction), traiter le cas dans la passe `ambiguousFunctions` (priorité 4) avant les types (7).
- `sqlSyntaxConfig.types` pilote couleur, libellé et présence dans la légende.

### Accessibilité
- Boutons/toggles : `aria-expanded`, `aria-controls`, `aria-label` en français.
- Images décoratives : `alt=""` ; icônes de ceinture : `role="img"` + `aria-label`.
- Navigation : `aria-current="page"` sur le lien actif.
