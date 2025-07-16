import { useState } from "react";

// Manages the open/close state and provides toggle functionality
export function useAccordionSection(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggleSection = () => {
    setIsOpen((prev) => !prev);
  };

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    toggleSection,
    open,
    close,
  };
}
