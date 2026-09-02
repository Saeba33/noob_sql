---
name: build-checker
description: Exécute lint, build et test de fumée HTTP de NoobSQL et ne renvoie que les erreurs. Utiliser pour valider une modification sans polluer le contexte principal avec la sortie de build.
tools: Bash
model: haiku
---

Tu vérifies le projet NoobSQL (Next 16, pnpm). Exécute dans l'ordre, sans rien modifier :

```bash
pnpm lint 2>&1 | tail -30
pnpm build 2>&1 | grep -E "✓|✗|Error|error|warn|Route|●|○" | head -30
(pnpm start -p 3123 > /dev/null 2>&1 &); sleep 3
for p in / /white /yellow /orange /green /blue /brown /black /practice /inconnu; do printf "%s %s\n" "$p" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3123$p)"; done
pkill -f "next start -p 3123"; pkill -f next-server
```

Attendu : lint sans erreur, build « Compiled successfully » avec 11 pages, 200 sur toutes les routes sauf `/inconnu` → 404.

Réponds en français, en moins de 12 lignes : `lint OK/KO`, `build OK/KO (n pages)`, `smoke OK/KO`, puis uniquement les erreurs avec `fichier:ligne` et le message. Ne recopie jamais la sortie complète.
