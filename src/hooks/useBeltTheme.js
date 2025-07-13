"use client";

import { useMemo } from "react";
import { 
  BELT_ICON_COLORS, 
  NAVBAR_COLORS, 
  SECTION_HEADER_COLORS, 
  SECTION_DESC_COLORS, 
  SECTION_NAV_COLORS, 
  HOME_NAV_COLORS 
} from "@/config/colors";


export function useBeltTheme(beltLevel) {
  return useMemo(() => {
    // Belt level validation
    if (!beltLevel || typeof beltLevel !== 'string') {
      console.warn(`Invalid belt level: ${beltLevel}`);
      return null;
    }

    // Check if colors exist for this level
    const hasColors = BELT_ICON_COLORS[beltLevel] && 
                     NAVBAR_COLORS[beltLevel] && 
                     SECTION_HEADER_COLORS[beltLevel];

    if (!hasColors) {
      console.warn(`Colors not defined for belt: ${beltLevel}`);
      return null;
    }

    return {
      // Belt icon colors
      icon: BELT_ICON_COLORS[beltLevel],
      
      // Navbar colors
      navbar: NAVBAR_COLORS[beltLevel],
      
      // Section header colors
      header: SECTION_HEADER_COLORS[beltLevel],
      
      // Description colors
      description: SECTION_DESC_COLORS[beltLevel],
      
      // Section navigation colors
      navigation: SECTION_NAV_COLORS[beltLevel],
      
      // Home navigation colors
      home: HOME_NAV_COLORS[beltLevel],
      
      // Current belt level
      level: beltLevel,
      
      // Utility methods
      utils: {
        // Get all colors of a specific type
        getAllOfType: (type) => {
          const colorMaps = {
            icon: BELT_ICON_COLORS,
            navbar: NAVBAR_COLORS,
            header: SECTION_HEADER_COLORS,
            description: SECTION_DESC_COLORS,
            navigation: SECTION_NAV_COLORS,
            home: HOME_NAV_COLORS
          };
          return colorMaps[type] || {};
        },
        
        // Check if a belt exists
        isValidBelt: (belt) => Boolean(BELT_ICON_COLORS[belt]),
        
        // Get list of all available belts
        getAvailableBelts: () => Object.keys(BELT_ICON_COLORS)
      }
    };
  }, [beltLevel]);
}


export function useBeltNavigation(currentBelt) {
  const theme = useBeltTheme(currentBelt);
  
  return useMemo(() => {
    if (!theme) return null;
    
    return {
      current: theme.navigation,
      navbar: theme.navbar,
      home: theme.home,
      level: currentBelt,
      isValid: theme.utils.isValidBelt(currentBelt)
    };
  }, [theme, currentBelt]);
}


export function useBeltHeader(currentBelt) {
  const theme = useBeltTheme(currentBelt);
  
  return useMemo(() => {
    if (!theme) return null;
    
    return {
      header: theme.header,
      icon: theme.icon,
      level: currentBelt,
      isValid: theme.utils.isValidBelt(currentBelt)
    };
  }, [theme, currentBelt]);
}
