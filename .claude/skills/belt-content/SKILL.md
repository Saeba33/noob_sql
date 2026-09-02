---
name: belt-content
description: Ajouter ou modifier un accordéon, un exemple SQL ou un résultat dans un fichier de ceinture (src/data/sections/*.js) en lisant le minimum de lignes. Utiliser pour toute demande sur le contenu pédagogique d'une ceinture.
---

# Éditer le contenu d'une ceinture

Les fichiers `src/data/sections/<belt>.js` font 180 à 810 lignes : ne jamais les lire en entier.

## Localiser
```bash
grep -n "section:" src/data/sections/<belt>.js          # plan des accordéons
grep -n "label:" src/data/sections/<belt>.js            # exemples
sed -n '<début>,<fin>p' src/data/sections/<belt>.js     # lire la seule plage utile
```
Les données de référence (tables `utilisateurs`, `livres`, `emprunts`…) sont dans l'accordéon « Données de référence » en tête de `green.js`, `blue.js`, `brown.js`, `black.js` ; un `result` doit rester cohérent avec elles.

## Schéma d'un accordéon
```js
{
	section: "Titre",                         // unique dans la ceinture, sert d'id DOM
	content: "Explication, <code>MOT_CLE</code> autorisé, \n pour les retours",
	externalComponent: <Composant />,         // optionnel, importé en tête de fichier
	examples: [
		{ label: "Titre", code: `SELECT ...;`, result: [{ col: val }] },
		{ label: "DDL", code: `CREATE TABLE ...;`, result: { message: "Table créée" } },
		{ label: "Sans résultat", code: `...` },
	],
},
```
- `type` (`schema`/`common`/`uncommon`/`message`) est informatif seulement.
- Un `code` contenant `CREATE TABLE` génère un diagramme : une colonne par ligne.
- `null` dans un `result` s'affiche « NULL ».

## Règles de rédaction
Français, vouvoiement, mots-clés SQL en MAJUSCULES, identifiants `snake_case`, tables au pluriel, `;` final, commentaires `--`. Ordre des exemples : du plus simple au plus complexe. « Bonnes pratiques » (`BestPractices`) reste le dernier accordéon.

## Édition
Modifier avec `Edit` sur la plage lue (ou `perl -0pi` pour un remplacement ciblé). Insérer un accordéon avant `];` du tableau `accordions` ou après l'accordéon voisin identifié par `grep`.

## Vérifier
`pnpm lint` suffit pour une modif de données (le build n'est utile que si un composant externe est ajouté). Pour contrôler un `result` complexe, demander l'agent `content-reviewer` sur la plage modifiée.
