// === BASE COLORS ===
const BASE_COLORS = {
  white: {
    primary: "#E5E7EB",
    bg50: "bg-gray-50",
    bg100: "bg-gray-100",
    bg200: "bg-gray-200",
    border300: "border-gray-300",
    border400: "border-gray-400",
    border800: "border-gray-800",
    text700: "text-gray-700",
    text800: "text-gray-800",
    text900: "text-gray-900",
    iconBg: "bg-gray-700"
  },
  yellow: {
    primary: "#EAB308",
    bg50: "bg-yellow-50",
    bg100: "bg-yellow-100",
    bg200: "bg-yellow-200",
    border300: "border-yellow-300",
    border400: "border-yellow-400",
    border900: "border-yellow-900",
    text700: "text-yellow-700",
    text800: "text-yellow-800",
    text900: "text-yellow-900",
    text950: "text-yellow-950",
    iconBg: "bg-white"
  },
  orange: {
    primary: "#F97316",
    bg50: "bg-orange-50",
    bg100: "bg-orange-100",
    bg200: "bg-orange-200",
    border300: "border-orange-300",
    border400: "border-orange-400",
    text700: "text-orange-700",
    text800: "text-orange-800",
    text900: "text-orange-900",
    iconBg: "bg-white"
  },
  green: {
    primary: "#22C55E",
    bg50: "bg-green-50",
    bg100: "bg-green-100",
    bg200: "bg-green-200",
    border300: "border-green-300",
    border400: "border-green-400",
    text700: "text-green-700",
    text800: "text-green-800",
    text900: "text-green-900",
    iconBg: "bg-white"
  },
  blue: {
    primary: "#3B82F6",
    bg50: "bg-blue-50",
    bg100: "bg-blue-100",
    bg200: "bg-blue-200",
    border300: "border-blue-300",
    border400: "border-blue-400",
    text700: "text-blue-700",
    text800: "text-blue-800",
    text900: "text-blue-900",
    iconBg: "bg-white"
  },
  brown: {
    primary: "#8B4513",
    bg50: "bg-amber-50", // Note: utilise amber au lieu de brown
    bg100: "bg-yellow-100",
    bg200: "bg-yellow-200",
    border300: "border-yellow-300",
    border400: "border-yellow-400",
    border600: "border-amber-600",
    border900: "border-yellow-900",
    text700: "text-yellow-700",
    text800: "text-amber-800",
    text900: "text-yellow-900",
    text950: "text-yellow-950",
    iconBg: "bg-white"
  },
  black: {
    primary: "#1F2937",
    bg50: "bg-gray-50",
    bg100: "bg-gray-100",
    bg700: "bg-gray-700",
    bg800: "bg-gray-800",
    bg900: "bg-gray-900",
    border500: "border-gray-500",
    border600: "border-gray-600",
    border800: "border-gray-800",
    border900: "border-gray-900",
    text100: "text-gray-100",
    text800: "text-gray-800",
    text900: "text-gray-900",
    iconBg: "bg-white"
  },
  practice: {
    primary: "#DC2626",
    bg50: "bg-red-50",
    border500: "border-red-500",
    text800: "text-red-800",
    iconBg: "bg-white"
  }
};

// === BELT ICON COLORS ===
export const BELT_ICON_COLORS = Object.fromEntries(
  Object.entries(BASE_COLORS).map(([key, colors]) => [key, colors.primary])
);

// === NAVBAR BUTTON STYLES ===
export const NAVBAR_BUTTON_STYLES = Object.fromEntries(
  Object.entries(BASE_COLORS).map(([key, colors]) => [
    key,
    {
      bg: colors.bg50 || colors.bg100,
      border: colors.border400 || colors.border500 || colors.border600,
      text: colors.text800,
      iconBg: colors.iconBg
    }
  ])
);

// === SECTION STYLES (Générés automatiquement) ===
export const SECTION_HEADER_COLORS = Object.fromEntries(
  Object.entries(BASE_COLORS).map(([key, colors]) => [
    key,
    colors.border400 || colors.border800
  ])
);

export const SECTION_DESC_COLORS = Object.fromEntries(
  Object.entries(BASE_COLORS).map(([key, colors]) => [
    key,
    {
      bg: colors.bg50,
      text: colors.text800 || colors.text900,
      border: colors.border400?.replace('border-', 'border-l-') || `border-l-gray-400`
    }
  ])
);

export const SECTION_NAV_COLORS = Object.fromEntries(
  Object.entries(BASE_COLORS).map(([key, colors]) => [
    key,
    colors.text800 || colors.text900
  ])
);

export const HOME_NAV_COLORS = Object.fromEntries(
  Object.entries(BASE_COLORS).map(([key, colors]) => [
    key,
    {
      border: colors.border400?.replace('border-', 'border-l-') || `border-l-gray-400`,
      text: colors.text700 || colors.text800,
      bg: "bg-white"
    }
  ])
);

export const SECTION_DATA_COLORS = Object.fromEntries(
  Object.entries(BASE_COLORS).map(([key, colors]) => [
    key,
    {
      bg: colors.bg50,
      text: colors.text900,
      border: colors.border300,
      accent: key === 'black' ? 'bg-gray-600' : `bg-${key}-600`,
      headerBorder: colors.border400,
      tagBg: colors.bg200,
      tagText: colors.text800,
      hover: colors.bg100?.replace('bg-', 'hover:bg-') || 'hover:bg-gray-100'
    }
  ])
);

// === NAVBAR_COLORS pour compatibilité avec useBeltTheme.js ===
export const NAVBAR_COLORS = Object.fromEntries(
  Object.entries(BASE_COLORS).map(([key, colors]) => [
    key,
    {
      ring: key === 'practice' ? 'ring-red-600' : `ring-${key}-400`,
      hover: colors.bg50?.replace('bg-', 'hover:bg-') || 'hover:bg-gray-50',
      text: colors.text700 || colors.text800,
      activeText: colors.text800 || colors.text900,
      activeBg: colors.bg50,
      hoverBorder: colors.border400?.replace('border-', 'hover:border-') || 'hover:border-gray-400'
    }
  ])
);
