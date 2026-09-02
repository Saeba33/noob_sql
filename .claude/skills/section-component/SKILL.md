---
name: section-component
description: Créer un composant pédagogique dédié (diagramme, tableau, schéma) branché comme externalComponent d'un accordéon de ceinture. Utiliser quand une notion a besoin d'un rendu visuel au-delà du texte et des exemples SQL.
---

# Créer un composant de section

Emplacement : `src/components/ui/sections/<belt>/<Nom>.jsx` (modèles existants : `white/SGBDDiagram.jsx` texte + icônes, `brown/JoinsDiagram.jsx` SVG Venn, `white/DataTypes.jsx` tableau via `ScrollableTable`).

## Squelette
```jsx
"use client"; // seulement si état/événements ; sinon l'omettre

import { MdInfo } from "react-icons/md";
import { BELT_COLORS } from "@/config/belts-config";

export default function MonDiagramme() {
	const { theme } = BELT_COLORS.<belt>;
	return (
		<div className="flex flex-col gap-6">
			<p className="text-body text-gray-700 leading-relaxed">Explication…</p>
			<div className="bg-white border border-gray-200 squircle p-5 shadow-sm">…</div>
		</div>
	);
}
```

## Règles
- Le composant est rendu **dans** un `Accordion` (fond blanc, padding 24 px) : pas de titre h2/h3, commencer à `h5`/`h6` ou `p.text-body`.
- Coins : `squircle`, `squircle-sm` ; pas de `rounded-*`.
- Couleur de ceinture via `BELT_COLORS.<belt>.theme` en `style`, gris Tailwind pour le reste.
- Tableaux larges : utiliser `ScrollableTable` (`columns`, `data`, `renderCell`) qui gère l'indicateur de scroll.
- SVG : `viewBox` + `className="w-full h-auto"`, ids uniques si plusieurs instances (voir `JoinsDiagram`).
- Textes en français, `aria-hidden` sur les SVG décoratifs.

## Branchement
Dans `src/data/sections/<belt>.js` : importer en tête, puis dans `accordions` :
```js
{ section: "Titre", content: "…", externalComponent: <MonDiagramme /> },
```

## Vérifier
`pnpm lint && pnpm build` (skill `/verify`) ; ouvrir la page en `pnpm dev` si le rendu est visuel.
