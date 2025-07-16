# Guide d'utilisation du nouveau système de couleurs

## Avantages du nouveau format

### Ancien format (généré automatiquement)
```javascript
const BELTS = [['white', '#E5E7EB', 'gray'], ...];
// Difficile à lire et maintenir
```

### Nouveau format (lisible et structuré)
```javascript
export const BELT_COLORS = {
  white: {
    iconColor: "#E5E7EB",
    button: { bg: "bg-gray-50", border: "border-gray-400", ... },
    section: { headerBorder: "border-gray-400", ... },
    // ... toutes les configurations pour cette ceinture
  }
}
```

## Comment utiliser les nouvelles couleurs

### 1. Utilisation directe (nouvelle méthode recommandée)
```javascript
import { BELT_COLORS } from "@/config/colors";

// Plus lisible et maintenable
const whiteColors = BELT_COLORS.white;
const buttonBg = whiteColors.button.bg; // "bg-gray-50"
const headerBorder = whiteColors.section.headerBorder; // "border-gray-400"
```

### 2. Utilisation avec les exports de compatibilité (ancien format conservé)
```javascript
import { NAVBAR_BUTTON_STYLES, SECTION_DATA_COLORS } from "@/config/colors";

// Fonctionne toujours comme avant
const buttonStyles = NAVBAR_BUTTON_STYLES.white;
const dataColors = SECTION_DATA_COLORS.white;
```

## Structure détaillée

Chaque ceinture contient maintenant les sections suivantes :

- **iconColor**: Couleur hexadécimale pour les icônes
- **primaryColor**: Couleur primaire hexadécimale
- **button**: Styles pour les boutons de navigation
- **section**: Styles pour les sections de contenu
- **home**: Styles pour la navigation d'accueil
- **data**: Styles pour les données de section
- **navbar**: Styles pour la barre de navigation

## Ajouter une nouvelle couleur

Pour ajouter une nouvelle configuration de couleur :

```javascript
// Dans BELT_COLORS
newBelt: {
  iconColor: "#HEXCOLOR",
  primaryColor: "#HEXCOLOR",
  button: {
    bg: "bg-color-50",
    border: "border-color-400",
    text: "text-color-800",
    iconBg: "bg-white"
  },
  // ... autres sections
}
```

## Compatibilité

Tous les exports existants sont conservés :
- `BELT_ICON_COLORS`
- `NAVBAR_BUTTON_STYLES` 
- `SECTION_HEADER_COLORS`
- `SECTION_DESC_COLORS`
- `SECTION_NAV_COLORS`
- `HOME_NAV_COLORS`
- `SECTION_DATA_COLORS`
- `NAVBAR_COLORS`

Aucune modification nécessaire dans les composants existants !
