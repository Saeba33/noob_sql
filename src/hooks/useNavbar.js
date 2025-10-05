"use client";

import { useEffect, useState } from "react";

/**
 * Hook personnalisé pour gérer l'état et le comportement de la navbar
 * @param {number} breakpoint - Taille de l'écran en pixels à partir de laquelle le menu mobile s'applique (default: 768px = md breakpoint)
 * @returns {object} - État et méthodes pour gérer la navbar
 */
export function useNavbar(breakpoint = 1400) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		// Fonction pour vérifier la taille de l'écran
		const checkScreenSize = () => {
			setIsMobile(window.innerWidth < breakpoint);
		};

		// Vérification initiale
		checkScreenSize();

		// Écouter les changements de taille d'écran
		window.addEventListener("resize", checkScreenSize);

		// Nettoyage
		return () => window.removeEventListener("resize", checkScreenSize);
	}, [breakpoint]);

	// Fermer le menu si on passe en mode desktop
	useEffect(() => {
		if (!isMobile && isMenuOpen) {
			setIsMenuOpen(false);
		}
	}, [isMobile, isMenuOpen]);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
	const openMenu = () => setIsMenuOpen(true);
	const closeMenu = () => setIsMenuOpen(false);

	return {
		isMenuOpen,
		isMobile,
		toggleMenu,
		openMenu,
		closeMenu,
		setIsMenuOpen,
	};
}
