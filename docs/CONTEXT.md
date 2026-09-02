# NoobSQL — présentation du projet

## But
Apprendre SQL de zéro, en français, par paliers inspirés des ceintures d'arts martiaux. Chaque ceinture est une page composée d'accordéons ; chaque accordéon contient une explication, des exemples SQL colorés, leurs résultats sous forme de table, et parfois un composant pédagogique dédié (diagrammes SVG, tableaux de types, etc.). Une section « FIGHT » (1ère DAN, `/practice`) est prévue pour des exercices interactifs mais n'est encore qu'un placeholder.

Public : débutants complets. Ton : pédagogique, tutoiement absent (vouvoiement), vocabulaire expliqué.

## Ceintures (ordre de navigation = ordre des clés de `BELTS_CONFIG`)
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

## Architecture et flux de rendu
1. `app/[belt]/page.jsx` (Server Component) → `getBeltData(belt)` (import dynamique de `data/sections/<belt>.js`, `notFound()` si clé inconnue) → injecte `colors` depuis `BELTS_CONFIG`.
2. `SectionHeader` (tag / titre / description) puis `AccordionList` → un `Accordion` (client) par entrée.
3. `Accordion` affiche, dans l'ordre : `content` (HTML via `dangerouslySetInnerHTML`, balises `<code>` stylées par `.content-html code`), `externalComponent`, puis chaque `example` :
   - `SQLCodeBlock` (coloration via `analyzeSqlCode`, bouton légende → modal `SQLLegend`)
   - si le code contient `CREATE TABLE` : `SQLTableDiagram` pour chaque table parsée par `sqlToTableDiagram`
   - si `result` défini : `SQLResultBlock` (tableau si array d'objets, encart bleu si `{ message }`)
4. `SectionNavigation` (précédent / suivant calculé par `useNavigation` sur `PAGES_CONFIG`) puis `Footer`.

Accueil : `Introduction.jsx` + `HomeNavigation` (cartes par ceinture, lit `summary`/`topics` de chaque `beltContent`, importés côté client).

Header : `Header.jsx` fixe, bascule desktop/mobile à 1500 px via `useNavbar` (`matchMedia` + `useSyncExternalStore`).

## Modèle de données `beltContent`
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

## Fichiers de configuration
- `next.config.mjs` : `reactCompiler: true` (stable en Next 16).
- `eslint.config.mjs` : `eslint-config-next/core-web-vitals` en flat config, règle `react/no-unescaped-entities` désactivée.
- `postcss.config.mjs` : `@tailwindcss/postcss`.
- `jsconfig.json` : alias `@/*` → `src/*`.
- `pnpm-workspace.yaml` : `allowBuilds` pour `unrs-resolver`.

## Points d'attention connus
- `HomeNavigation` importe les 8 fichiers de contenu côté client (poids JS de l'accueil).
- `AccordionList` transmet des props (`sqlCode`, `sqlQueries`, `sqlResult`, `colors`) que `Accordion` n'utilise pas.
- La coloration SQL est heuristique (regex + priorités) ; voir `docs/CONVENTIONS.md` et le skill `/sql-highlight`.
