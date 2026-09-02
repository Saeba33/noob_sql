---
name: verify
description: Valider une modification de NoobSQL (lint, build, test de fumée HTTP) et ne rapporter que les problèmes. Utiliser avant de conclure une tâche de code, ou quand l'utilisateur demande de vérifier / tester.
---

# Vérification standard

```bash
pnpm lint 2>&1 | tail -20
pnpm build 2>&1 | grep -E "✓|✗|Error|error|warn|Route" | head -20
```
Le build doit afficher 11 pages (`/`, `/_not-found`, 7 ceintures, `/practice`).

Test de fumée (uniquement si une page, un layout, la config ou un hook a changé) :
```bash
(pnpm start -p 3123 > /dev/null 2>&1 &); sleep 3
for p in / /white /brown /practice /inconnu; do printf "%-10s %s\n" "$p" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3123$p)"; done
pkill -f "next start -p 3123"; pkill -f next-server
```
Attendu : 200 partout sauf `/inconnu` → 404.

Rapport : lister uniquement les erreurs et avertissements avec fichier:ligne. Si tout est vert, une seule ligne « lint OK, build OK (11 pages), smoke OK ». Ne pas coller la sortie complète.

Pour déléguer et économiser le contexte : agent `build-checker`.
