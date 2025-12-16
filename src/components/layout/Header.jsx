"use client";

import NavbarDesktop from "@/components/navigation/NavbarDesktop";
import NavbarMobile from "@/components/navigation/NavbarMobile";
import { useNavbar } from "@/hooks/useNavbar";
import Image from "next/image";
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
					<div className="p-3">
						<div className="flex justify-between items-center">
							{!isMobile ? (
								<>
									{/* Left zone- title */}
									<div className="flex justify-center ml-3">
										<Link
											href="/"
											className="flex items-center transition-all duration-300 group"
										>
											<span className="text-2xl font-bold tracking-tight leading-none text-gray-800 group-hover:text-gray-950 transition-colors">
												NoobSQL
											</span>
										</Link>
										<div className="h-8 w-px bg-gray-300 ml-6" />
									</div>

									{/* Nav */}
									<div className="flex  justify-center">
										<NavbarDesktop />
									</div>

									{/* Right zone - practice */}
									<div className="flex justify-center mr-3">
										<div className="h-8 w-px bg-gray-300 mr-6" />
										<Link
											href="/practice"
											className="group relative transition-all duration-200 px-1 pt-[7px] flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap"
										>
											<Image
												src="/practice.png"
												width={24}
												height={24}
												alt="Practice icon"
											/>
											<span className="pb-[7px]  tracking-wide">FIGHT !</span>
										</Link>
									</div>
								</>
							) : (
								<>
									{/* Title mobile */}
									<Link
										href="/"
										className="flex items-center transition-all duration-300 group flex-shrink-0"
									>
										<span className="text-2xl font-bold tracking-tight leading-none text-gray-800 group-hover:text-gray-950 transition-colors">
											NoobSQL
										</span>
									</Link>

									{/* Spacer */}
									<div className="flex-1" />

									{/* BurgerMenu*/}
									<NavbarMobile
										isMenuOpen={isMenuOpen}
										toggleMenu={toggleMenu}
										closeMenu={closeMenu}
										menuRef={menuRef}
									/>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
