"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

// Default breakpoint for mobile/desktop detection
const DEFAULT_BREAKPOINT = 1500;

// Subscribe to a media query without setState-in-effect (SSR-safe: desktop by default)
function useIsMobile(breakpoint) {
	const query = `(max-width: ${breakpoint - 1}px)`;
	const subscribe = useCallback(
		(callback) => {
			const mql = window.matchMedia(query);
			mql.addEventListener("change", callback);
			return () => mql.removeEventListener("change", callback);
		},
		[query]
	);
	return useSyncExternalStore(
		subscribe,
		() => window.matchMedia(query).matches,
		() => false
	);
}

export function useNavbar(breakpoint = DEFAULT_BREAKPOINT) {
	const [menuRequested, setMenuRequested] = useState(false);
	const isMobile = useIsMobile(breakpoint);
	const menuRef = useRef(null);

	// Derived state: the menu can only be open on mobile
	const isMenuOpen = isMobile && menuRequested;

	// Close menu when clicking outside
	useEffect(() => {
		if (!isMenuOpen) return;

		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setMenuRequested(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isMenuOpen]);

	const toggleMenu = () => setMenuRequested((open) => !open);
	const closeMenu = () => setMenuRequested(false);

	return {
		isMenuOpen,
		isMobile,
		toggleMenu,
		closeMenu,
		menuRef,
	};
}
