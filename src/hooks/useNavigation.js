"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { PAGES_CONFIG } from "@/config/navigation";

// Hook ultra-simplifié - plus de sort, plus de Object.values
export const useNavigation = () => {
  const pathname = usePathname();

  const currentIndex = useMemo(() => 
    PAGES_CONFIG.findIndex(item => item.href === pathname), [pathname]
  );

  return {
    items: PAGES_CONFIG,
    current: PAGES_CONFIG[currentIndex] || null,
    isActive: (href) => pathname === href,
    // Navigation pour les sections
    getSectionNavigation: () => ({
      previous: currentIndex === 0 
        ? { href: "/", title: "Accueil" }
        : currentIndex > 0 ? PAGES_CONFIG[currentIndex - 1] : null,
      next: currentIndex < PAGES_CONFIG.length - 1 ? PAGES_CONFIG[currentIndex + 1] : null
    })
  };
};
