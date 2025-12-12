"use client";

import NavbarDesktop from "@/components/navigation/NavbarDesktop";
import NavbarMobile from "@/components/navigation/NavbarMobile";
import { useNavbar } from "@/hooks/useNavbar";
import Link from "next/link";

export default function Header() {
	const { isMenuOpen, isMobile, toggleMenu, closeMenu, menuRef } =
		useNavbar(1400);

	return (
		<header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 lg:px-6">
			<div className="w-full max-w-[1500px]">
				<div
					ref={menuRef}
					className="bg-white/80 backdrop-blur-lg border border-gray-200/60 shadow-lg rounded-lg"
				>
					<div className="py-3 px-3">
						<div className="flex justify-between items-center gap-4">
							{/* Title */}
							<Link
								href="/"
								className="flex items-center transition-all duration-300 group"
							>
								<div className="flex flex-col">
									<span className="text-xl font-bold tracking-tight leading-none text-gray-700 group-hover:text-gray-900 transition-colors">
										NoobSQL
									</span>
								</div>
							</Link>

							{/* Navigation */}
							<div className="flex items-center">
								{isMobile ? (
									<NavbarMobile
										isMenuOpen={isMenuOpen}
										toggleMenu={toggleMenu}
										closeMenu={closeMenu}
										renderButton
									/>
								) : (
									<NavbarDesktop />
								)}
							</div>
						</div>
					</div>

					{/* Mobile Menu Dropdown */}
					{isMobile && (
						<NavbarMobile
							isMenuOpen={isMenuOpen}
							toggleMenu={toggleMenu}
							closeMenu={closeMenu}
						/>
					)}
				</div>
			</div>
		</header>
	);
}
