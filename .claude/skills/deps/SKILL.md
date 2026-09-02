---
name: deps
description: Bilan des mises à jour disponibles (Node, pnpm, Next, React, Tailwind, TypeScript, ESLint et toutes les dépendances) avec recommandation appliquer / attendre, sans rien modifier. Utiliser quand l'utilisateur demande de vérifier les versions, les mises à jour ou la sécurité des dépendances.
---

# Bilan des versions et mises à jour

Lecture seule : ne rien installer ni modifier sans feu vert.

```bash
echo "Node local $(node -v) | pnpm local $(pnpm -v) | pnpm latest $(npm view pnpm version)"
curl -s https://nodejs.org/dist/index.json | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{const r=JSON.parse(d);const lts=r.find(x=>x.lts);console.log("Node LTS:",lts.version,"("+lts.lts+")","| latest:",r[0].version)})'
pnpm outdated 2>&1 | head -30
pnpm audit --prod 2>&1 | tail -5
```

## Incompatibilités connues (à re-vérifier, ne pas proposer tant qu'elles tiennent)
- **ESLint 10** : casse `eslint-config-next` (plugins react / import / jsx-a11y déclarent `eslint ^9`) — constaté le 2026-09-02. Re-tester quand `eslint-config-next` déclarera `eslint ^10`.
- **TypeScript 7** (compilateur natif) : non supporté par typescript-eslint / eslint-config-next au 2026-09-02.
- **@types/node** : rester sur la majeure du Node installé (24 aujourd'hui), pas sur `latest`.
- Après une montée de Next : lire `node_modules/next/dist/docs/` pour les breaking changes avant de conclure.

## Rapport attendu (en français, court)
```
Node : v24.x local / LTS v24.y → OK ou « mettre à jour via brew upgrade node@24 »
pnpm : OK / à mettre à jour (corepack)
| Paquet | Actuel | Dernier | Type (patch/mineur/majeur) | Recommandation |
Vulnérabilités : aucune / n (détail)
Proposition : « pnpm add ... » à lancer après feu vert, puis /verify
```
Une majeure = expliquer en une phrase ce qui change ; un patch/mineur sans breaking = « à appliquer ». Si tout est à jour : une seule ligne « Tout est à jour, aucune vulnérabilité ».
