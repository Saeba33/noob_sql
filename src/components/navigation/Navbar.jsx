"use client";

import BeltIcon from "@/components/ui/BeltIcon";
import { BELT_COLORS } from "@/config/colors";
import { PAGES_CONFIG } from "@/config/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaFistRaised } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const navigationItems = PAGES_CONFIG;

	const isActive = (href) => pathname === href;

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
	const closeMenu = () => setIsMenuOpen(false);

	return (
		<>
			{/* Desktop Navigation */}
			<nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
				{navigationItems.map((item, index) => {
					const beltKey = item.href.replace("/", "") || "white";
					const colors = BELT_COLORS[beltKey] || BELT_COLORS.white;
					const isPractice = beltKey === "practice";

					return (
						<Link
							key={`${beltKey}-${index}`}
							href={item.href}
							className={`border-pop ${isActive(item.href) ? "active" : ""} ${
								isPractice
									? `${colors.bg} border-2 ${colors.border}`
									: "bg-white border-2 border-gray-300"
							} ${
								colors.text
							} hover:bg-opacity-80 transition-colors rounded-lg px-3 py-2 lg:px-4 lg:py-2 flex items-center text-sm lg:text-base`}
						>
							{item.iconType === "belt" ? (
								<BeltIcon
									belt={beltKey}
									size={14}
									className="lg:w-4 lg:h-4 mr-2"
								/>
							) : (
								<FaFistRaised size={14} className="lg:w-4 lg:h-4 mr-2" />
							)}
							<span className="font-medium">{item.title}</span>
						</Link>
					);
				})}
			</nav>

			{/* Mobile Menu Button */}
			<button
				onClick={toggleMenu}
				className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
				aria-label="Toggle menu"
			>
				{isMenuOpen ? (
					<HiX className="w-6 h-6 text-gray-700" />
				) : (
					<HiMenu className="w-6 h-6 text-gray-700" />
				)}
			</button>

			{/* Mobile Menu Overlay */}
			{isMenuOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40 md:hidden"
					onClick={closeMenu}
				/>
			)}

			{/* Mobile Menu */}
			<nav
				className={`fixed top-24 right-4 left-4 bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-lg rounded-2xl p-4 z-50 md:hidden transition-all duration-300 ${
					isMenuOpen
						? "opacity-100 translate-y-0"
						: "opacity-0 -translate-y-4 pointer-events-none"
				}`}
			>
				<div className="flex flex-col space-y-3">
					{navigationItems.map((item, index) => {
						const beltKey = item.href.replace("/", "") || "white";
						const colors = BELT_COLORS[beltKey] || BELT_COLORS.white;
						const isPractice = beltKey === "practice";

						return (
							<Link
								key={`mobile-${beltKey}-${index}`}
								href={item.href}
								onClick={closeMenu}
								className={`border-pop ${isActive(item.href) ? "active" : ""} ${
									isPractice
										? `${colors.bg} border-2 ${colors.border}`
										: "bg-white border-2 border-gray-300"
								} ${
									colors.text
								} hover:bg-opacity-80 transition-colors rounded-lg px-4 py-3 flex items-center text-base`}
							>
								{item.iconType === "belt" ? (
									<BeltIcon belt={beltKey} size={16} className="mr-3" />
								) : (
									<FaFistRaised size={16} className="mr-3" />
								)}
								<span className="font-medium">{item.title}</span>
							</Link>
						);
					})}
				</div>
			</nav>
		</>
	);
}
