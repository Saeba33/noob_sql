"use client";

import { useEffect, useRef, useState } from "react";

// Default breakpoint for mobile/desktop detection
const DEFAULT_BREAKPOINT = 1500;

export function useNavbar(breakpoint = DEFAULT_BREAKPOINT) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const menuRef = useRef(null);

	// Check screen size and update mobile state
	useEffect(() => {
		const checkScreenSize = () => {
			setIsMobile(window.innerWidth < breakpoint);
		};

		checkScreenSize();
		window.addEventListener("resize", checkScreenSize);

		return () => window.removeEventListener("resize", checkScreenSize);
	}, [breakpoint]);

	// Close menu when switching to desktop mode
	useEffect(() => {
		if (!isMobile && isMenuOpen) {
			setIsMenuOpen(false);
		}
	}, [isMobile, isMenuOpen]);

	// Close menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				isMenuOpen &&
				menuRef.current &&
				!menuRef.current.contains(event.target)
			) {
				setIsMenuOpen(false);
			}
		};

		if (isMenuOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isMenuOpen]);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
	const closeMenu = () => setIsMenuOpen(false);

	return {
		isMenuOpen,
		isMobile,
		toggleMenu,
		closeMenu,
		menuRef,
	};
}
