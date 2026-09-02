# PLAN — NoobSQL

> Suivi : cocher les cases au fil de l'eau et reporter l'avancement dans « État courant » et « Journal des sessions » ci-dessous. Une phase = un commit dédié.

## État courant & prochaines étapes

**Où on en est** : contenu des 7 ceintures rédigé, migration Next 16 / pnpm faite, aucun test, page FIGHT vide. (dernière mise à jour 2026-09-02)

**Prochaine étape** : Phase 0 — dette immédiate (petit, sans risque).

**Points d'attention connus** :
- `HomeNavigation` importe les 8 fichiers de contenu côté client (poids JS de l'accueil).
- `AccordionList` transmet des props (`sqlCode`, `sqlQueries`, `sqlResult`, `colors`) que `Accordion` n'utilise pas.
- La coloration SQL est heuristique (regex + priorités) ; voir la section « Conventions » de `docs/CONTEXT.md` et le skill `/sql-highlight`.

**Git & méthode** : branche `main` ; validations `/verify` avant tout commit ; premier prompt en lecture seule puis implémentation directe des points validés ; journal complété au fil de la session ; commits par l'utilisateur ou sur sa demande, trailer Claude-Session.

## Phase 0 — dette immédiate (petit, sans risque)

- [ ] Nettoyer `AccordionList` (props `sqlCode`, `sqlQueries`, `sqlResult`, `colors` inutilisées par `Accordion`).
- [ ] `SQLCodeBlock` : supprimer l'import `MdClose` inutilisé ; passer les imports relatifs en `@/`.
- [ ] `SQLLegend` variante `default` : `item.examples` n'existe pas dans la config → soit ajouter `examples` à `sqlSyntaxConfig.types`, soit retirer la variante.
- [ ] `Footer` : année en dur « 2025 » → `new Date().getFullYear()`.
- [ ] `bg-gradient-to-br` → `bg-linear-to-br` (pages `[belt]`, `Introduction`, `BestPractices`).
- [ ] README : ajouter la section développement (pnpm) et aligner les intitulés (config dit « Fonctions » pour la bleue, README dit « Agrégations »).
- [ ] Vérifier `next.config.mjs` : ajouter `images.formats`/`metadataBase` si déploiement Vercel.

## Phase 1 — qualité du contenu (issu de TODO.md historique)

- [ ] Relire le contenu de chaque ceinture (cohérence SQL ↔ résultats affichés, fautes, vouvoiement). Utiliser l'agent `content-reviewer` ceinture par ceinture.
- [ ] Menus en table des matières : ancre par accordéon (`id` déjà généré : `accordion-<section>`), sommaire en haut de page ou dans le header mobile.
- [ ] Décider pour Google Analytics (ou Vercel Analytics / Plausible, plus léger et RGPD-friendly).

## Phase 2 — performance et robustesse

- [ ] `HomeNavigation` importe les 8 fichiers de contenu côté client : déplacer `summary`/`topics` dans `BELTS_CONFIG` (ou un `belts-meta.js`) pour alléger le bundle de l'accueil.
- [ ] `getBeltData` : remplacer l'import dynamique par template string par une map statique (`{ white: () => import("@/data/sections/white") }`) pour un tree-shaking fiable.
- [ ] Ajouter `sitemap.js` et `robots.js` dans `app/` (Next les génère), `metadataBase` dans `layout`.
- [ ] Tests unitaires Vitest sur `sql-syntax.js` (`analyzeSqlCode`, `parseSchema`, `formatQueryResult`) — c'est la logique la plus fragile du projet.
- [ ] `prefers-reduced-motion` pour les transitions (`home-card`, accordéons, menu mobile).

## Phase 3 — FIGHT (1ère DAN, `/practice`)

Objectif : exercices SQL exécutés dans le navigateur, sans backend.
- [ ] Moteur : `sql.js` (SQLite compilé en WASM) chargé côté client ; base bibliothèque pré-remplie à partir des données de référence existantes.
- [ ] Modèle d'exercice : `{ belt, title, statement, expected: rows | (rows) => bool, hints[] }` dans `data/exercises/<belt>.js`.
- [ ] UI : éditeur (textarea + coloration `SQLCodeBlock` en lecture), bouton Exécuter, `SQLResultBlock` pour le résultat, comparaison avec l'attendu, progression stockée en `localStorage`.
- [ ] Filtrer par ceinture, badge « 1ère DAN » quand tout est validé.

## Idées non planifiées

- Mode sombre (les tokens de couleur sont déjà centralisés dans `globals.css`).
- Export PDF / impression d'une ceinture.
- Recherche plein texte dans les accordéons.
- i18n (anglais) — structure `data/sections` à dupliquer par locale.

---

---

## Journal des sessions

### 2026-09-02 — Session : harmonisation de l'outillage Claude ✅
- Squelette commun aux trois projets (noob_sql, portfolio_v5, routine-board) : `CONTEXT.md` = but / stack et architecture / documents de référence / décisions actées / conventions ; `PLAN.md` = état courant / phases / journal des sessions.
- Skills `/resume`, `/deps`, `/verify` et agent `build-checker` générés depuis un gabarit unique + bloc « Spécificités du projet » ; agents `code-scout` (Haiku, lecture seule) et `dev` (Sonnet, implémentation) sur les trois projets ; `.claude/settings.json` identique.
- Règle « aucune modification de code sans accord explicite » inscrite dans les trois `CLAUDE.md`.
- Aucun code applicatif modifié.
- Règle de travail précisée le même jour par l'utilisateur : **seul le premier prompt de reprise est en lecture seule** ; un point validé dans la conversation s'implémente sans redemander. Journalisation **au fil de la session** (journal, état courant, décisions), plus seulement en fin de session.

### 2026-09-02 — Session 1 : reprise du projet : migration des dépendances et passage à pnpm
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
