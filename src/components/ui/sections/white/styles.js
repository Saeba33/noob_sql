// Configuration commune pour l'harmonisation visuelle des composants white
export const WHITE_SECTION_STYLES = {
  // Couleurs principales (palette sobre)
  colors: {
    primary: 'text-gray-600',
    success: 'text-green-600',
    warning: 'text-red-600',
    info: 'text-blue-600',
  },
  
  // Tailles d'icônes standardisées
  iconSizes: {
    large: 'w-7 h-7',  // Titres de sections
    medium: 'w-5 h-5', // Icônes principales
    small: 'w-4 h-4',  // Icônes secondaires
  },
  
  // Espacements standardisés
  spacing: {
    sectionPadding: 'p-6',
    cardPadding: 'p-4',
    marginBottom: 'mb-6',
    marginBottomLarge: 'mb-8',
    gap: 'gap-6',
  },
  
  // Styles de cartes
  cards: {
    primary: 'bg-white border border-gray-300 rounded-lg',
    container: 'border border-gray-300 rounded-lg bg-gray-50',
  },
  
  // Styles d'état
  states: {
    good: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      icon: 'text-green-600',
    },
    bad: {
      bg: 'bg-red-100', 
      text: 'text-red-800',
      icon: 'text-red-600',
    },
    info: {
      bg: 'bg-blue-50',
      text: 'text-blue-800', 
      icon: 'text-blue-600',
    },
  },
};

// Icônes standardisées pour la cohérence
export const WHITE_SECTION_ICONS = {
  // Icônes principales
  checkCircle: 'MdCheckCircle',
  warning: 'MdWarning',
  lightbulb: 'MdLightbulb',
  storage: 'MdStorage',
  
  // Icônes de contraintes (harmonisées)
  primaryKey: 'MdKey',
  foreignKey: 'MdLink', 
  security: 'MdSecurity',
  settings: 'MdSettings',
  verified: 'MdVerified',
  numbers: 'MdNumbers',
  
  // Icônes de données
  textFields: 'MdTextFields',
  schedule: 'MdSchedule',
  dataset: 'MdDataset',
  tableChart: 'MdTableChart',
  textFormat: 'MdTextFormat',
  speed: 'MdSpeed',
};
