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
		className="flex items-center transition-all duration-300 group h-[40px]"
	>
		<span className="logo text-gray-700 group-hover:text-gray-950 transition-colors leading-none">
			NoobSQL
		</span>
	</Link>
);

// Practice Button
const Practice = () => (
	<Link
		href="/practice"
		className=" squircle group relative transition-all duration-300 px-4 py-2 flex items-center gap-2.5 whitespace-nowrap border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 hover:shadow-md h-[40px] max-h-[40px]"
	>
		<Image 
			src="/practice.png" 
			width={22} 
			height={22} 
			alt="Practice icon"
			className="transition-all duration-300 group-hover:scale-105 group-hover:brightness-110 block" 
		/>
		<span className="tracking-wide font-semibold text-gray-600 group-hover:text-gray-900 transition-colors duration-300 text-sm leading-none">FIGHT</span>
	</Link>
);

export default function Header() {
	const { isMenuOpen, isMobile, toggleMenu, closeMenu, menuRef } =
		useNavbar(1500);

	return (
		<header className="fixed top-6 left-0 right-0 z-50 flex justify-center">
			<div className="w-full max-w-[1500px] px-6">
				<div ref={menuRef} className="relative">
					<div
						className={`border border-gray-200/60 shadow-lg overflow-hidden ${
						isMobile && isMenuOpen ? "squircle-t" : "squircle"
						} ${isMobile ? "bg-white" : "bg-white/80 backdrop-blur-lg"}`}
					>
						<div className="px-6 h-[74px] flex items-center">
							{!isMobile ? (
								<div className="grid grid-cols-[auto_1fr_auto] items-center gap-6 w-full">
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
								<div className="flex items-center justify-between w-full">
									<Logo />
									<NavbarMobile
										isMenuOpen={isMenuOpen}
										toggleMenu={toggleMenu}
										closeMenu={closeMenu}
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
