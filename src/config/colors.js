// Configuration simplifiée des couleurs par ceinture
export const BELT_COLORS = {
  white: {
    icon: "#6B7280",
    bg: "bg-gray-50", 
    text: "text-gray-800",
  },
  yellow: {
    icon: "#EAB308",
    bg: "bg-yellow-50",
    text: "text-yellow-800",
  },
  orange: {
    icon: "#F97316", 
    bg: "bg-orange-50",
    text: "text-orange-800",
  },
  green: {
    icon: "#22C55E",
    bg: "bg-green-50", 
    text: "text-green-800",
  },
  blue: {
    icon: "#3B82F6",
    bg: "bg-blue-50",
    text: "text-blue-800", 
  },
  brown: {
    icon: "#8B4513",
    bg: "bg-amber-50",
    text: "text-amber-800",
  },
  black: {
    icon: "#1F2937",
    bg: "bg-gray-50",
    text: "text-gray-900",
  },
  practice: {
    icon: "#DC2626",
    bg: "bg-red-50", 
    text: "text-red-800",
  },
};

// Export simplifié pour compatibilité
export const BELT_ICON_COLORS = Object.fromEntries(
  Object.entries(BELT_COLORS).map(([belt, colors]) => [belt, colors.icon])
);

