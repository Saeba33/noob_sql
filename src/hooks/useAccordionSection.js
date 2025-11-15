import { useCallback, useState } from "react";

// Accordion state management hook
export function useAccordionSection(initialState = false) {
	const [isOpen, setIsOpen] = useState(initialState);

	const toggle = useCallback(() => setIsOpen((open) => !open), []);
	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);

	return { isOpen, toggle, open, close };
}
