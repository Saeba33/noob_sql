"use client";

import BeltIcon from "@/components/ui/BeltIcon";
import { BELT_COLORS, PAGES_CONFIG } from "@/config/belts-config";
import { useNavigation } from "@/hooks/useNavigation";
import Link from "next/link";
import { FaFistRaised } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

/**
 * Composant NavbarMobile - Bouton burger pour le menu mobile
 */
export function NavbarMobileButton({ isMenuOpen, toggleMenu }) {
	return (
		<button
			onClick={toggleMenu}
			className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
	const { isActive } = useNavigation();

	return (
		<div className=" border-t border-gray-200/50 bg-white rounded-b-2xl">
			<div className="px-4 py-4">
				<nav className="flex flex-col gap-2">
					{PAGES_CONFIG.map((item, index) => {
						const beltKey = item.href.replace("/", "") || "white";
						const colors = BELT_COLORS[beltKey];
						const active = isActive(item.href);

						return (
							<Link
								key={`${beltKey}-${index}`}
								href={item.href}
								onClick={closeMenu}
								className={`mobile-menu-item mobile-menu-${beltKey} ${
									active
										? `${colors.bg} ${colors.text} font-bold shadow-sm ${colors.border}`
										: "text-gray-600"
								}`}
							>
								{beltKey === "practice" ? (
									<FaFistRaised size={20} />
								) : (
									<BeltIcon belt={beltKey} size={20} />
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
