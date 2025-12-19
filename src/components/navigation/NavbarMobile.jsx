"use client";

import BeltIcon from "@/components/ui/BeltIcon";
import { BELT_COLORS, PAGES_CONFIG } from "@/config/belts-config";
import { useNavigation } from "@/hooks/useNavigation";
import Link from "next/link";
import { createPortal } from "react-dom";
import { HiMenu, HiX } from "react-icons/hi";

export default function NavbarMobile({
	isMenuOpen,
	toggleMenu,
	closeMenu,
	menuRef,
}) {
	const { isActive } = useNavigation();

	// Helper functions
	const getMobileLinkStyle = (active, colors) => ({
		className: `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 border-l-4 ${
			active
				? "bg-[var(--active-bg)] text-gray-900 font-medium border-[var(--active-color)]"
				: "text-gray-600 hover:bg-[var(--hover-bg)] hover:text-[var(--hover-text)] border-transparent"
		}`,
		style: {
			"--hover-bg": colors.mobileHoverBg,
			"--hover-text": colors.mobileHoverText,
			"--active-bg": `${colors.theme}15`,
			"--active-color": colors.theme,
		},
	});

	const menu = (
		<div
			id="mobile-menu"
			aria-hidden={!isMenuOpen}
			className={`border-t border-gray-200/50 bg-white rounded-b-2xl overflow-hidden transition-all duration-300 ease-out ${
				isMenuOpen ? "max-h-[600px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"
			}`}
		>
			<div className="px-4 py-4">
				<nav className="flex flex-col gap-2" aria-label="Navigation mobile" style={{ animation: isMenuOpen ? 'slideIn 0.3s ease-out' : 'none' }}>
					{PAGES_CONFIG.map((item, index) => {
						const beltKey = item.href.replace("/", "") || "white";
						const colors = BELT_COLORS[beltKey];
						const active = isActive(item.href);

						return (
							<Link
								key={`${beltKey}-${index}`}
								href={item.href}
								onClick={closeMenu}
								aria-current={active ? "page" : undefined}
								{...getMobileLinkStyle(active, colors)}
							>
								<BeltIcon belt={beltKey} size={32} className="pt-1.5" />
								<span className=" font-medium">{item.title}</span>
							</Link>
						);
					})}
				</nav>
			</div>
		</div>
	);

	return (
		<>
			<button
				onClick={toggleMenu}
				className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
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
			{menuRef?.current && createPortal(menu, menuRef.current)}
		</>
	);
}
