---
name: resume
description: Reprendre le contexte du projet NoobSQL en début de session sans relire le code. Utiliser quand l'utilisateur dit "reprendre", "où en est-on", "contexte", ou au premier message d'une session de travail.
---

# Reprendre le contexte NoobSQL

Objectif : recharger l'essentiel en moins de 3 000 tokens, sans ouvrir `src/`.

1. Lire `docs/PLAN.md` en entier : phases (état et prochaines tâches) puis « Journal des décisions techniques » (dernière entrée = dernier état connu).
2. `git log --oneline -10` et `git status --short` pour voir ce qui a bougé depuis.
3. Ne lire `docs/CONTEXT.md` que si la tâche touche à l'architecture ou au modèle `beltContent` ; la section « Conventions » de `docs/CONTEXT.md` seulement avant d'écrire du contenu ou du CSS.
4. Résumer à l'utilisateur en 5 lignes max : état, dernière décision, tâche suggérée, puis attendre la consigne.
5. Ne vérifier les versions (`/deps`) que si l'utilisateur le demande ou si la dernière entrée du journal a plus d'un mois.

Interdits : lire `src/data/sections/*.js` en entier, lancer `pnpm build` « pour voir » (utiliser `/verify` quand il y a une modification à valider).
