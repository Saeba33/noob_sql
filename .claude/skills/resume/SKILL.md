---
name: resume
description: Reprendre le contexte de NoobSQL en début de session sans relire le code. Utiliser quand l'utilisateur dit "reprendre", "où en est-on", "contexte", ou au premier message d'une session de travail.
---

# Reprendre le contexte — NoobSQL

Objectif : recharger l'essentiel sans ouvrir `src/`. `CLAUDE.md` est déjà chargé : ne pas le relire.

1. Lire `docs/PLAN.md` : « État courant & prochaines étapes » en tête, cases des phases, puis la dernière entrée du « Journal des sessions » en fin de fichier.
2. `git branch --show-current`, `git log --oneline -10`, `git status --short`.
3. Ne lire `docs/CONTEXT.md` (but, stack, décisions actées, conventions) que si la tâche touche à l'architecture, aux choix techniques ou nécessite d'écrire du code ou du contenu.
4. Résumer à l'utilisateur en 5 lignes max : état, dernière décision, tâche suggérée, puis **attendre la consigne**.
5. Ne vérifier les versions (`/deps`) que si l'utilisateur le demande ou si la dernière entrée du journal a plus d'un mois.

Règles communes : **ce premier prompt est en lecture seule** ; ensuite, tout point validé dans la conversation s'implémente directement, sans redemander. Explorer le code via l'agent `code-scout`, jamais en relisant les fichiers soi-même. Ne pas lancer `pnpm build` « pour voir » (`/verify` quand il y a une modification à valider). **Consigner au fil de la session** : après chaque lot livré ou décision, compléter l'entrée du jour du « Journal des sessions » et « État courant » dans `docs/PLAN.md`, et « Décisions actées » dans `docs/CONTEXT.md` pour une décision structurante — ne pas attendre la fin de session.

## Spécificités du projet
- Ne jamais lire un fichier `src/data/sections/*.js` en entier (180–810 lignes) : `grep -n "section:"` puis `sed -n a,b p` — voir `/belt-content`.
- Toute modification de `src/config/sql-syntax.js` se vérifie avec le snippet Node de `/sql-highlight`.
