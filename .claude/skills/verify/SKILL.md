---
name: verify
description: Valider une modification de NoobSQL (lint, build, test de fumée HTTP) et ne rapporter que les problèmes. Utiliser avant de conclure une tâche de code, ou quand l'utilisateur demande de vérifier / tester.
---

# Vérification standard — NoobSQL

```bash
pnpm lint 2>&1 | tail -20
pnpm build 2>&1 | grep -E "✓|✗|Error|error|warn|○|●" | head -20
```
Attendu :
- `pnpm lint` → 0 erreur
- `pnpm build` → « Compiled successfully », 11 pages statiques

Test de fumée (uniquement si page, layout, provider/contexte, hook ou config a changé) :
```bash
(pnpm start -p 3123 > /dev/null 2>&1 &); sleep 3
for r in / /white /brown /practice /inconnu; do printf "%-10s %s\n" "$r" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3123$r)"; done
pkill -f "next start -p 3123"; pkill -f next-server
```
Attendu : 200 sur chaque route, 404 sur `/inconnu`.

Rapport : uniquement les erreurs, warnings avec fichier:ligne. Si tout est vert, une seule ligne « lint OK, build OK (11 pages), smoke OK ». Ne pas coller la sortie complète.

Pour déléguer et économiser le contexte : agent `build-checker`.
