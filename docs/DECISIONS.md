# Journal des décisions techniques

## 2026-09-02 — Reprise du projet : migration des dépendances et passage à pnpm
Contexte : projet dormant depuis janvier 2026 (Next 15.3, React 19.0, Tailwind 4.1, ESLint 9, npm).

| Paquet | Avant | Après | Note |
|---|---|---|---|
| next | 15.3.5 | 16.3.4 | Turbopack par défaut, `next lint` supprimé |
| react / react-dom | ^19.0.0 | 19.2.8 | |
| react-icons | ^5.5.0 | ^5.7.0 | |
| tailwindcss / @tailwindcss/postcss | ^4.1.11 | ^4.3.3 | |
| eslint | ^9 | ^9.39.5 | ESLint 10 testé puis abandonné (voir ci-dessous) |
| eslint-config-next | 15.3.5 | 16.3.4 | exporte du flat config natif |
| babel-plugin-react-compiler | absent | ^1.0.0 | requis par `reactCompiler: true` |
| @tailwindcss/vite | ^4.1.11 | supprimé | plugin Vite inutile dans un projet Next/PostCSS |
| @eslint/eslintrc | ^3 | supprimé | `FlatCompat` plus nécessaire |

Décisions :
- **ESLint reste en 9.x** : ESLint 10.9 plante (`scopeManager.addGlobals is not a function`) avec `eslint-plugin-react` / `eslint-plugin-import` / `jsx-a11y` tirés par `eslint-config-next`, qui ne déclarent que `eslint ^9`. Re-tester quand `eslint-config-next` déclarera ESLint 10.
- **Script `lint` = `eslint .`** car `next lint` n'existe plus en Next 16. Règle `react/no-unescaped-entities` désactivée (contenu français).
- **`reactCompiler: true` au niveau racine** de `next.config.mjs` (sortie d'`experimental` en Next 16).
- **Polices via `next/font/google`** (IBM Plex Sans, Outfit, Plus Jakarta Sans) exposées en variables CSS `--font-ibm-plex`, `--font-outfit`, `--font-plus-jakarta` ; `globals.css` les consomme. Supprime la requête vers fonts.googleapis.com et l'avertissement `@next/next/no-page-custom-font`.
- **`useNavbar` réécrit** : `useSyncExternalStore` + `matchMedia` pour `isMobile`, état « menu ouvert » dérivé (`isMobile && menuRequested`). Motivation : la nouvelle règle `react-hooks/set-state-in-effect` (plugin 7.x livré avec eslint-config-next 16) interdisait le `setState` dans l'effet de fermeture ; le pattern dérivé supprime un rendu en cascade.
- **pnpm 11** : champ `packageManager` dans `package.json`, `pnpm-workspace.yaml` avec `allowBuilds: { unrs-resolver: true }` (pnpm 11 ne lit plus `pnpm.onlyBuiltDependencies` dans `package.json`). `package-lock.json` et le cache `.next` (615 Mo) supprimés.
- Avertissement peer-deps résiduel : `eslint-plugin-import@2.32` etc. acceptent `eslint ^9` — sans effet.

Vérification : `pnpm lint` propre, `pnpm build` génère 11 pages statiques, `pnpm start` répond 200 sur `/`, `/white`, `/brown`, `/practice` et 404 sur une route inconnue.
