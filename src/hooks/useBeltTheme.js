"use client";

import { getBeltStyles } from "@/config/colors";

// Hook minimal - juste un alias vers getBeltStyles
export const useBeltTheme = (belt) => getBeltStyles(belt || 'white');

// Utilitaire pour obtenir la ceinture depuis l'URL
export const useCurrentBelt = () => {
  if (typeof window === 'undefined') return 'white';
  return window.location.pathname.split('/')[1] || 'white';
};
