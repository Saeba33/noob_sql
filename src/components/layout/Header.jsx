"use client";

import NavbarDesktop from "@/components/navigation/NavbarDesktop";
import {
	NavbarMobileButton,
	NavbarMobileContent,
} from "@/components/navigation/NavbarMobile";
import { useNavbar } from "@/hooks/useNavbar";
import Link from "next/link";

export default function Header() {
	const { isMenuOpen, isMobile, toggleMenu, closeMenu, menuRef } =
		useNavbar(1400);

	return (
		<header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
			<div className="w-full max-w-[1500px]">
				<div
					ref={menuRef}
					className="bg-white/70 backdrop-blur-md border border-gray-200/50 shadow-lg rounded-2xl"
				>
					<div className="py-2 px-4">
						<div className="flex justify-between items-center h-22 gap-4">
							{/* Logo + Title */}
							<Link
								href="/"
								className="flex items-center gap-3 transition-opacity duration-300 hover:opacity-70"
							>
								<span className="text-3xl">🥋</span>
								<div className="flex flex-col">
									<span className="text-xl font-bold tracking-tight leading-none bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
										NoobSQL
									</span>
								</div>
							</Link>

							{/* Navigation - Desktop ou Mobile */}
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
					{isMobile && (
						<NavbarMobileContent closeMenu={closeMenu} isOpen={isMenuOpen} />
					)}
				</div>
			</div>
		</header>
	);
}
