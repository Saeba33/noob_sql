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
						<div className="flex justify-between items-center gap-6">
							{/* Title */}
							<Link
								href="/"
								className="flex items-center transition-all duration-300 group flex-shrink-0"
							>
								<span className="text-2xl font-bold tracking-tight leading-none text-gray-800 group-hover:text-gray-950 transition-colors">
									NoobSQL
								</span>
							</Link>

							{/* Navigation */}
							<div className="flex items-center flex-1 justify-center">
								{isMobile ? (
									<NavbarMobile
										isMenuOpen={isMenuOpen}
										toggleMenu={toggleMenu}
										closeMenu={closeMenu}
										menuRef={menuRef}
									/>
								) : (
									<NavbarDesktop />
								)}
							</div>

							{/* CTA Fight - Desktop only */}
							{!isMobile && (
								<Link
									href="/practice"
									className="group relative rounded-lg transition-all duration-200 px-4 py-2 flex items-center gap-2 text-sm font-medium whitespace-nowrap border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 flex-shrink-0"
								>
									<svg width="28" height="28" viewBox="0 0 100 100" fill="none">
										<image href="/practice.png" width="100" height="100" />
									</svg>
									<span>FIGHT</span>
								</Link>
							)}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
