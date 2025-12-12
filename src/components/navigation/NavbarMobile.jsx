"use client";

import BeltIcon from "@/components/ui/BeltIcon";
import { BELT_COLORS, PAGES_CONFIG } from "@/config/belts-config";
import { useNavigation } from "@/hooks/useNavigation";
import Link from "next/link";
import { FaFistRaised } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

// Burger button
export function NavbarMobileButton({ isMenuOpen, toggleMenu }) {
	return (
		<button
			onClick={toggleMenu}
			className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
			aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
			aria-expanded={isMenuOpen}
			aria-controls="mobile-menu"
		>
			{isMenuOpen ? (
				<HiX className="w-6 h-6 text-gray-700" />
			) : (
				<HiMenu className="w-6 h-6 text-gray-700" />
			)}
		</button>
	);
}

// Content menu
export function NavbarMobileContent({ closeMenu, isOpen }) {
	const { isActive } = useNavigation();

	return (
		<div
			id="mobile-menu"
			aria-hidden={!isOpen}
			className={`border-t border-gray-200/50 bg-white rounded-b-2xl overflow-hidden transition-all duration-500 ease-in-out ${
				isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
			}`}
		>
			<div className="px-4 py-4">
				<nav className="flex flex-col gap-2" aria-label="Navigation mobile">
					{PAGES_CONFIG.map((item, index) => {
						const beltKey = item.href.replace("/", "") || "white";
						const colors = BELT_COLORS[beltKey];
						const active = isActive(item.href);
						const isPractice = beltKey === "practice";

						return (
							<Link
								key={`${beltKey}-${index}`}
								href={item.href}
								onClick={closeMenu}
								aria-current={active ? "page" : undefined}
								className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 ${
									active
										? "bg-gray-100 text-gray-900 font-bold border-2 border-gray-300"
										: isPractice
										? "text-red-700"
										: "text-gray-600"
								}`}
								style={{
									"--hover-bg": colors.mobileHoverBg,
									"--hover-text": colors.mobileHoverText,
								}}
								onMouseEnter={(e) => {
									if (!active) {
										e.currentTarget.style.backgroundColor =
											colors.mobileHoverBg;
										e.currentTarget.style.color = colors.mobileHoverText;
									}
								}}
								onMouseLeave={(e) => {
									if (!active) {
										e.currentTarget.style.backgroundColor = "";
										e.currentTarget.style.color = "";
									}
								}}
							>
								{beltKey === "practice" ? (
									<FaFistRaised size={28} aria-hidden="true" />
								) : (
									<BeltIcon belt={beltKey} size={32} />
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
