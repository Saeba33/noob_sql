// Configuration ultra-simplifiée - Un seul array ordonné
export const PAGES_CONFIG = [
  { title: "Généralités", href: "/white", iconType: "belt" },
  { title: "DDL", href: "/yellow", iconType: "belt" },
  { title: "CRUD", href: "/orange", iconType: "belt" },
  { title: "Filtres & Conditions", href: "/green", iconType: "belt" },
  { title: "Agrégations", href: "/blue", iconType: "belt" },
  { title: "Jointures", href: "/brown", iconType: "belt" },
  { title: "Requêtes Avancées", href: "/black", iconType: "belt" },
  { title: "FIGHT !", href: "/practice", iconType: "fist" }
];

// Utilitaire pour obtenir la clé de la ceinture depuis l'href
export const getBeltKey = (href) => href.replace('/', '') || 'white';
