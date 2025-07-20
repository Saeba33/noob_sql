import { usePathname } from "next/navigation";
import { PAGES_CONFIG } from "@/config/navigation";

export const useNavigation = () => {
  const pathname = usePathname();
  const currentIndex = PAGES_CONFIG.findIndex((item) => item.href === pathname);

  return {
    items: PAGES_CONFIG,
    current: currentIndex >= 0 ? PAGES_CONFIG[currentIndex] : null,
    isActive: (href) => pathname === href,
    getSectionNavigation: () => ({
      previous:
        currentIndex > 0
          ? PAGES_CONFIG[currentIndex - 1]
          : { href: "/", title: "Accueil" },
      next:
        currentIndex >= 0 && currentIndex < PAGES_CONFIG.length - 1
          ? PAGES_CONFIG[currentIndex + 1]
          : null,
      current: currentIndex >= 0 ? PAGES_CONFIG[currentIndex] : null,
    }),
  };
};
