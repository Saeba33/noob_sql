"use client";

import NavbarDesktop from "@/components/navigation/NavbarDesktop";
import NavbarMobile from "@/components/navigation/NavbarMobile";
import { useNavbar } from "@/hooks/useNavbar";
import Image from "next/image";
import Link from "next/link";

// Logo
const Logo = () => (
	<Link
		href="/"
		className="flex items-center transition-all duration-300 group"
	>
		<span className="text-2xl font-bold tracking-tight leading-none text-gray-800 group-hover:text-gray-950 transition-colors">
			NoobSQL
		</span>
	</Link>
);

// Practice Button
const Practice = () => (
	<Link
		href="/practice"
		className="group relative transition-all duration-200 px-4 py-2 flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400"
	>
		<Image src="/practice.png" width={28} height={28} alt="Practice icon" />
		<span className="tracking-wide">FIGHT</span>
	</Link>
);

export default function Header() {
	const { isMenuOpen, isMobile, toggleMenu, closeMenu, menuRef } =
		useNavbar(1500);

	return (
		<header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 lg:px-6">
			<div className="w-full max-w-[1500px]">
				<div
					ref={menuRef}
					className="bg-white/80 backdrop-blur-lg border border-gray-200/60 shadow-lg rounded-lg"
				>
					<div className="px-6 py-3">
						{!isMobile ? (
							<div className="grid grid-cols-[auto_1fr_auto] items-center gap-8">
								{/* Left zone */}
								<div className="flex items-center">
									<Logo />
								</div>

								{/* Center - Navigation */}
								<div className="flex justify-center">
									<NavbarDesktop />
								</div>

								{/* Right zone */}
								<div className="flex items-center">
									<Practice />
								</div>
							</div>
						) : (
							<div className="flex items-center">
								<Logo />
								<div className="flex-1" />
								<NavbarMobile
									isMenuOpen={isMenuOpen}
									toggleMenu={toggleMenu}
									closeMenu={closeMenu}
									menuRef={menuRef}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
