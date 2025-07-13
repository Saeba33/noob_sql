"use client";

import { PAGES_CONFIG } from "@/config/navigation";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const useNavigation = () => {
  const pathname = usePathname();

  // Ordering pages
  const allNavigationItems = useMemo(() => {
    return Object.entries(PAGES_CONFIG)
      .map(([key, config]) => ({
        key,
        ...config,
      }))
      .sort((a, b) => a.order - b.order);
  }, []);

  // Determine the active page
  const activeItem = useMemo(() => {
    return allNavigationItems.find((item) => item.href === pathname) || null;
  }, [pathname, allNavigationItems]);

  const isActive = (href) => pathname === href;

  // FUNCTION 1: Navigation for Header/Introduction (same logic : return all pages except the homepage (handled by the logo))
  const getPageNavigation = () => {
    const items = allNavigationItems.filter((item) => item.key !== "home");

    return {
      items,
      isActive,
      pathname,
    };
  };

  // FUNCTION 2: Navigation in Sections (top/bottom - same logic)
  const getSectionNavigation = () => {
    const currentIndex = allNavigationItems.findIndex(
      (item) => item.href === pathname
    );

    // Pour la première page (white), on ajoute un lien vers l'accueil
    const previous = currentIndex === 0 
      ? { href: "/", title: "Accueil" }
      : currentIndex > 0 
        ? allNavigationItems[currentIndex - 1] 
        : null;
        
    const next =
      currentIndex < allNavigationItems.length - 1
        ? allNavigationItems[currentIndex + 1]
        : null;

    return {
      previous,
      next,
      current: activeItem,
      isActive,
      pathname,
    };
  };

  return {
    allNavigationItems,
    activeItem,
    pathname,
    isActive,
    getPageNavigation, // Specialized function for Header and Introduction components
    getSectionNavigation, // Specialized function for Top and Bottom Section Navigation
  };
};
