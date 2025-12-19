"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hook pour détecter si un élément a du scroll horizontal
 * et afficher conditionnellement l'indicateur de scroll
 * @returns {Object} { ref, hasScroll }
 */
export function useScrollIndicator() {
	const ref = useRef(null);
	const [hasScroll, setHasScroll] = useState(false);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const checkScroll = () => {
			// Vérifie si le contenu déborde horizontalement
			const hasHorizontalScroll = element.scrollWidth > element.clientWidth;
			setHasScroll(hasHorizontalScroll);
		};

		// Vérifier au montage
		checkScroll();

		// Vérifier lors du redimensionnement
		const resizeObserver = new ResizeObserver(checkScroll);
		resizeObserver.observe(element);

		// Cleanup
		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	return { ref, hasScroll };
}
