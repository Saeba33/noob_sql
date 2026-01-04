# Rapport de cohérence hiérarchique typographique

## 📊 Hiérarchie globale définie dans globals.css

### Tailles des balises de titres

| Balise | Mobile | Tablet (≥640px) | Desktop (≥1024px) | Font Weight |
|--------|--------|-----------------|-------------------|-------------|
| **h1** | 44px   | 64px           | 80px              | 800         |
| **h2** | 32px   | 48px           | 60px              | 700         |
| **h3** | 18px   | 20px           | 22px              | 700         |
| **h4** | 16px   | 17px           | 18px              | 600         |
| **h5** | 15px   | 16px           | 17px              | 600         |
| **h6** | 14px   | 15px           | 16px              | 500         |

### Tailles des paragraphes

| Classe      | Mobile | Tablet (≥640px) | Desktop (≥1024px) | Usage                           |
|-------------|--------|-----------------|-------------------|---------------------------------|
| `p`         | 14px   | 16px           | 16px              | Texte standard                  |
| `.text-intro` | 17px | 19px           | 21px              | Introduction de section         |
| `.text-lead`  | 16px | 18px           | 19px              | Texte d'accroche                |
| `.text-body`  | 14px | 16px           | 16px              | Texte de corps (identique à p)  |

## ✅ Corrections effectuées

### 1. BestPractices.jsx
**Problème détecté** : Le titre h5 des cartes était visuellement plus petit que les sous-titres h6 en uppercase.

**Corrections appliquées** :
- ✅ **h5** (titre de carte) : Supprimé `text-lg` pour respecter les tailles CSS globales
- ✅ **h6** (sous-titres) : 
  - Changé `font-bold` → `font-semibold` (aligné sur le poids standard h6)
  - Supprimé `text-sm` pour respecter les tailles CSS globales
- ✅ **Paragraphe rule** : Supprimé `text-body` pour utiliser la taille standard
- ✅ **Paragraphe reason** : Supprimé `text-xs` pour utiliser la taille standard

**Avant** :
```jsx
<h5 className="font-bold text-gray-900 text-lg">  // 18px fixe ❌
<h6 className="font-bold text-sm uppercase">      // 14px + uppercase ❌
<p className="text-body">                          // Redondant ❌
<p className="text-xs">                            // 12px trop petit ❌
```

**Après** :
```jsx
<h5 className="font-bold text-gray-900">          // 15-17px responsive ✅
<h6 className="font-semibold uppercase">          // 14-16px responsive ✅
<p className="text-gray-700">                     // 14-16px responsive ✅
<p className="text-gray-600">                     // 14-16px responsive ✅
```

### 2. SQLResultBlock.jsx
**Problème détecté** : Les h6 utilisaient `text-sm` qui forçait une taille de 14px fixe.

**Corrections appliquées** :
- ✅ Supprimé `text-sm` sur tous les h6 (3 occurrences)
- ✅ Les h6 respectent maintenant la hiérarchie globale (14-16px responsive)

**Avant** :
```jsx
<h6 className="text-blue-800 font-semibold text-sm">  // ❌
<h6 className="text-gray-700 font-semibold text-sm">  // ❌
<h6 className="text-gray-800 font-semibold text-sm">  // ❌
```

**Après** :
```jsx
<h6 className="text-blue-800 font-semibold">  // ✅
<h6 className="text-gray-700 font-semibold">  // ✅
<h6 className="text-gray-800 font-semibold">  // ✅
```

## ✅ Composants vérifiés et conformes

Les composants suivants respectent déjà la hiérarchie typographique :

### DatabaseArchitecture.jsx
- **h5** : Utilisés sans classes de taille → ✅ Conforme
- Titres de tables et sections correctement hiérarchisés

### PrimaryForeignKeys.jsx
- **h5** : Utilisés sans classes de taille → ✅ Conforme

### JoinsDiagram.jsx
- **h5** : Utilisé sans classe de taille → ✅ Conforme

### DataTypes.jsx
- **h5** : Utilisés sans classes de taille → ✅ Conforme

### Accordion.jsx
- **h4** : Sans classe de taille → ✅ Conforme
- **h6** : Sans classe de taille → ✅ Conforme

### SQLTableDiagram.jsx
- **h6** : Sans classe de taille → ✅ Conforme

### SQLLegend.jsx
- **h4** et **h6** : Sans classes de taille → ✅ Conforme

## 🎯 Règles à respecter

### Principe fondamental
**Ne jamais utiliser les classes Tailwind de taille de texte sur les balises h1-h6** :
- ❌ INTERDIT : `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, etc.
- ✅ AUTORISÉ : Les classes de couleur, poids, espacement, etc.

### Classes Tailwind à éviter sur h1-h6
```jsx
// ❌ À NE PAS FAIRE
<h5 className="text-lg">         // Écrase la hiérarchie
<h6 className="text-sm">         // Écrase la hiérarchie
<h3 className="text-2xl">        // Écrase la hiérarchie

// ✅ CORRECT
<h5 className="font-bold">       // OK, modifie le poids
<h6 className="text-gray-700">   // OK, modifie la couleur
<h3 className="mb-4">            // OK, ajoute de la marge
```

### Poids recommandés par niveau
- **h1, h2** : `font-bold` ou `font-extrabold`
- **h3, h4, h5** : `font-bold` ou `font-semibold`
- **h6** : `font-semibold` ou `font-medium`

### Cas particuliers acceptables
L'effet uppercase sur les h6 est acceptable car il améliore la lisibilité sans casser la hiérarchie :
```jsx
<h6 className="uppercase tracking-wide">  // ✅ OK
```

## 📋 Checklist de vérification

Avant de créer un nouveau composant avec des titres :

- [ ] Les balises h1-h6 n'ont pas de classes `text-*` (sauf exceptions justifiées)
- [ ] La hiérarchie visuelle respecte l'ordre sémantique (h2 > h3 > h4 > h5 > h6)
- [ ] Les poids de police sont cohérents avec le niveau de titre
- [ ] Sur mobile et desktop, la hiérarchie reste claire
- [ ] Les paragraphes utilisent les classes appropriées (`.text-intro`, `.text-lead`, ou rien)

## 🔍 Commandes de vérification

Pour vérifier la cohérence dans le projet :

```bash
# Rechercher les h5/h6 avec des classes de taille (potentiellement problématiques)
grep -r "h[56].*text-\(xs\|sm\|lg\|xl\)" src/

# Rechercher tous les titres avec classes de taille
grep -r "h[1-6].*text-" src/
```

## 🎨 Impact visuel attendu

Après ces corrections :

1. **Hiérarchie claire** : Les titres de niveau supérieur sont toujours plus grands que ceux de niveau inférieur
2. **Responsive cohérent** : Toutes les tailles s'adaptent automatiquement aux breakpoints
3. **Maintenance facilitée** : Modifier globals.css ajuste tout le site uniformément
4. **Accessibilité améliorée** : La structure sémantique HTML correspond à la hiérarchie visuelle

---

✨ **Projet maintenant conforme à la hiérarchie typographique définie !**
