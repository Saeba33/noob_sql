"use client";

import NavbarDesktop from "@/components/navigation/NavbarDesktop";
import NavbarMobile from "@/components/navigation/NavbarMobile";
import { useNavbar } from "@/hooks/useNavbar";
import Image from "next/image";
import Link from "next/link";

// Logo
const Logo = ({ onClick }) => (
	<Link
		href="/"
		onClick={onClick}
		className="flex items-center transition-all duration-300 group"
	>
		<span className="text-xl sm:text-2xl font-bold tracking-tight leading-none text-gray-800 group-hover:text-gray-950 transition-colors">
			NoobSQL
		</span>
	</Link>
);

// Practice Button
const Practice = () => (
	<Link
		href="/practice"
		className="group relative transition-all duration-200 px-4 py-2 flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap border hover:border-gray-400 rounded-lg bg-gray-100 border-gray-200"
	>
		<Image src="/practice.png" width={28} height={28} alt="Practice icon" />
		<span className="tracking-wide">FIGHT</span>
	</Link>
);

export default function Header() {
	const { isMenuOpen, isMobile, toggleMenu, closeMenu, menuRef } =
		useNavbar(1500);

	return (
		<header className="fixed top-6 left-0 right-0 z-50 flex justify-center">
			<div className="w-full max-w-[1500px] px-4 lg:px-6">
				<div
					ref={menuRef}
					className={`border border-gray-200/60 shadow-lg rounded-lg ${
						isMobile ? "bg-white" : "bg-white/80 backdrop-blur-lg"
					}`}
				>
					<div className="px-6 py-3">
						{!isMobile ? (
							<div className="grid grid-cols-[auto_1fr_auto] items-center gap-8">
								{/* Left zone */}
								<div className="flex items-center">
								<Logo onClick={closeMenu} />
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
								<Logo onClick={closeMenu} />
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
