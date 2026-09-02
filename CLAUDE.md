# NoobSQL — guide Claude Code

Site statique Next.js (App Router, JS, pas de TypeScript) pour apprendre SQL par « ceintures » d'arts martiaux. Contenu et UI en français.

## Commandes (pnpm uniquement, jamais npm/yarn)
- `pnpm dev` — dev (Turbopack par défaut)
- `pnpm lint` — ESLint 9 flat config (`next lint` n'existe plus en Next 16)
- `pnpm build` — build prod, doit rester vert (11 pages statiques)
- Validation standard avant de conclure : `pnpm lint && pnpm build` (skill `/verify`)

## Stack (mise à jour 2026-09-02)
Next 16.3 · React 19.2 · Tailwind 4.3 (PostCSS) · ESLint 9.39 · react-icons 5.7 · React Compiler activé · Node ≥ 20.9 · pnpm 11.

## Carte du code (src/)
- `app/[belt]/page.jsx` — page générique d'une ceinture (SSG via `generateStaticParams`)
- `app/(introduction)/Introduction.jsx` + `app/page.jsx` — accueil ; `app/practice/page.jsx` — placeholder FIGHT
- `config/belts-config.js` — source de vérité : ceintures, couleurs, routes, `getBeltData()`
- `config/sql-syntax.js` — tokenizer de coloration SQL, `parseSchema`, `formatQueryResult`
- `data/sections/<belt>.js` — contenu pédagogique (gros fichiers 180–810 lignes, exportent `beltContent`)
- `components/ui/Accordion.jsx` — rendu d'une section (contenu HTML, exemples, résultats, diagrammes)
- `components/ui/sql/*` — `SQLCodeBlock`, `SQLResultBlock`, `SQLTableDiagram`, `SQLLegend`
- `components/ui/sections/*` — composants pédagogiques spécifiques (white/, brown/, BestPractices)
- `components/navigation/*`, `components/layout/*`, `hooks/*` — navigation, header, footer
- `app/globals.css` — typographie (h1–h6, .text-*), classes `.squircle*`, `.home-card`, `.border-accordion`

## Règles de travail
- **Premier prompt d'une session = lecture seule** (prise de contexte via `/resume`, aucun code). Ensuite, dès qu'un point est validé dans la conversation, implémenter directement sans redemander d'accord ; ne redemander que si le périmètre change.
- **Consigner au fil de la session**, pas seulement à la fin : après chaque lot livré ou décision prise, compléter l'entrée du jour dans « Journal des sessions » (`docs/PLAN.md`), mettre à jour « État courant », et ajouter une ligne dans « Décisions actées » (`docs/CONTEXT.md`) si c'est une décision structurante.
- Économie de tokens : ne jamais lire un fichier `data/sections/*.js` en entier ; utiliser `grep -n "section:"` puis `sed -n a,b p`. Voir skill `/belt-content`.
- Style : tabulations, guillemets doubles, composants fonctionnels, `"use client"` seulement si hooks/état/événements.
- Les données de contenu sont des `.js` contenant du JSX (icônes, composants externes) : c'est voulu.
- Couleurs de ceinture : toujours via `BELTS_CONFIG`/`BELT_COLORS`, jamais en dur (sauf composants brown/white qui documentent leur exception).
- Coins arrondis : classes `squircle`, `squircle-t`, `squircle-b`, `squircle-sm` (pas `rounded-*` sur les cartes).
- Pas de tests pour l'instant ; toute modif de `sql-syntax.js` se vérifie avec le snippet du skill `/sql-highlight`.
- Ne pas committer sans demande explicite.

## Documentation de reprise
- `docs/CONTEXT.md` — 1. but, 2. stack et architecture, 3. documents de référence, 4. décisions actées, 5. conventions. Stable ; à compléter quand une décision est prise.
- `docs/PLAN.md` — état courant et prochaines étapes, phases (cases à cocher), journal des sessions. **À mettre à jour en fin de session.**

## Skills et agents
Skills communs : `/resume` (reprise de contexte, à lancer en début de session), `/deps` (bilan des mises à jour, lecture seule), `/verify` (validation standard). Skills du projet : `/belt-content` (contenu d'une ceinture), `/sql-highlight` (coloration SQL), `/section-component` (composant pédagogique).
Agents : `code-scout` (Haiku, exploration en lecture seule — l'utiliser pour toute recherche dans le code), `dev` (Sonnet, implémentation d'un lot validé par l'utilisateur), `build-checker` (Haiku, validation complète, ne renvoie que les erreurs).
