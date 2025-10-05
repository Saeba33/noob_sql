"use client";

import NavbarDesktop from "@/components/navigation/NavbarDesktop";
import {
	NavbarMobileButton,
	NavbarMobileContent,
} from "@/components/navigation/NavbarMobile";
import { useNavbar } from "@/hooks/useNavbar";
import Link from "next/link";

export default function Header() {
	// Hook personnalisé pour gérer la navbar (breakpoint à 768px par défaut = md)
	const { isMenuOpen, isMobile, toggleMenu, closeMenu } = useNavbar(1400);

	return (
		<header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-[1500px] px-4">
			<div className="bg-white/70 backdrop-blur-md border border-gray-200/50 shadow-lg rounded-2xl">
				<div className="mx-auto px-4 lg:px-6">
					<div className="flex justify-between items-center h-20 lg:h-24 gap-4">
						{/* Logo + Title */}
						<Link
							href="/"
							className="flex items-center gap-3 transition-opacity duration-300 hover:opacity-70"
						>
							<span className="text-3xl lg:text-3xl">🥋</span>
							<div className="flex flex-col">
								<span className="text-xl lg:text-2xl font-bold tracking-tight leading-none bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
									NoobSQL
								</span>
							</div>
						</Link>

						{/* Navigation - Desktop ou Mobile selon le hook */}
						<div className="flex items-center">
							{isMobile ? (
								<NavbarMobileButton
									isMenuOpen={isMenuOpen}
									toggleMenu={toggleMenu}
								/>
							) : (
								<NavbarDesktop />
							)}
						</div>
					</div>
				</div>

				{/* Mobile Menu Dropdown */}
				{isMobile && isMenuOpen && (
					<NavbarMobileContent closeMenu={closeMenu} />
				)}
			</div>
		</header>
	);
}
