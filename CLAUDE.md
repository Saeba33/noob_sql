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
- Économie de tokens : ne jamais lire un fichier `data/sections/*.js` en entier ; utiliser `grep -n "section:"` puis `sed -n a,b p`. Voir skill `/belt-content`.
- Style : tabulations, guillemets doubles, composants fonctionnels, `"use client"` seulement si hooks/état/événements.
- Les données de contenu sont des `.js` contenant du JSX (icônes, composants externes) : c'est voulu.
- Couleurs de ceinture : toujours via `BELTS_CONFIG`/`BELT_COLORS`, jamais en dur (sauf composants brown/white qui documentent leur exception).
- Coins arrondis : classes `squircle`, `squircle-t`, `squircle-b`, `squircle-sm` (pas `rounded-*` sur les cartes).
- Pas de tests pour l'instant ; toute modif de `sql-syntax.js` se vérifie avec le snippet du skill `/sql-highlight`.
- Ne pas committer sans demande explicite.

## Documentation de reprise
- `docs/CONTEXT.md` — but, architecture, modèle de données `beltContent` ; section « Conventions » : règles de code et de contenu
- `docs/PLAN.md` — axes d'amélioration et plan par phases ; « Journal des décisions techniques » en fin de fichier (dont la migration 2026-09)

## Skills et agents disponibles
Skills : `/resume` (reprendre le contexte), `/belt-content`, `/sql-highlight`, `/section-component`, `/verify`.
Agents : `code-scout` (recherche read-only, modèle léger), `content-reviewer` (relecture SQL/pédagogie), `build-checker` (lint+build+smoke, ne remonte que les erreurs).
