"use client";

import BeltIcon from "@/components/ui/BeltIcon";
import { BELT_COLORS } from "@/config/colors";
import { PAGES_CONFIG } from "@/config/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFistRaised } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

/**
 * Composant NavbarMobile - Bouton burger pour le menu mobile
 */
export function NavbarMobileButton({ isMenuOpen, toggleMenu }) {
	return (
		<button
			onClick={toggleMenu}
			className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
			aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
		>
			{isMenuOpen ? (
				<HiX className="w-6 h-6 text-gray-700" />
			) : (
				<HiMenu className="w-6 h-6 text-gray-700" />
			)}
		</button>
	);
}

/**
 * Composant NavbarMobileContent - Contenu déroulant du menu mobile
 */
export function NavbarMobileContent({ closeMenu }) {
	const pathname = usePathname();
	const navigationItems = PAGES_CONFIG;
	const isActive = (href) => pathname === href;

	return (
		<div className="md:hidden border-t border-gray-200/50 bg-white rounded-b-2xl">
			<div className="px-4 lg:px-6 py-4">
				<nav className="flex flex-col gap-2">
					{navigationItems.map((item, index) => {
						const beltKey = item.href.replace("/", "") || "white";
						const colors = BELT_COLORS[beltKey] || BELT_COLORS.white;
						const active = isActive(item.href);

						return (
							<Link
								key={`${beltKey}-${index}`}
								href={item.href}
								onClick={closeMenu}
								className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
									active
										? `${colors.bg} ${colors.text} font-bold shadow-sm border-2 ${colors.border}`
										: `text-gray-600 hover:bg-gray-50 border-2 border-transparent`
								}`}
							>
								{item.iconType === "belt" ? (
									<BeltIcon belt={beltKey} size={20} />
								) : (
									<FaFistRaised size={20} />
								)}
								<span className="font-medium">{item.title}</span>
							</Link>
						);
					})}
				</nav>
			</div>
		</div>
	);
}
