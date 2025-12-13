import { PAGES_CONFIG } from "@/config/belts-config";
import { usePathname } from "next/navigation";

// Navigation hook for active state and section traversal
export const useNavigation = () => {
	const pathname = usePathname();
	const currentIndex = PAGES_CONFIG.findIndex((item) => item.href === pathname);

	const previous =
		currentIndex > 0
			? PAGES_CONFIG[currentIndex - 1]
			: { href: "/", title: "Accueil" };
	const next =
		currentIndex >= 0 && currentIndex < PAGES_CONFIG.length - 1
			? PAGES_CONFIG[currentIndex + 1]
			: null;
	const current = currentIndex >= 0 ? PAGES_CONFIG[currentIndex] : null;

	return {
		current,
		previous,
		next,
		isActive: (href) => pathname === href,
	};
};
