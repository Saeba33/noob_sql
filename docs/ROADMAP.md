# Feuille de route et axes d'amélioration

État au 2026-09-02 : contenu des 7 ceintures rédigé, migration Next 16 / pnpm faite, aucun test, page FIGHT vide.

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
