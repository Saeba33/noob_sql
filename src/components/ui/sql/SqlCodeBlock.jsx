"use client";

import { analyzeSqlCode, sqlSyntaxConfig } from "../../../config/sql-syntax.js";
import { useScrollIndicator } from "@/hooks/useScrollIndicator";
import SQLLegend from "./SQLLegend.jsx";
import { useState, useEffect } from "react";
import { MdInfoOutline, MdClose } from "react-icons/md";

export default function SQLCodeBlock({ children, className = "" }) {
	const { ref, hasScroll } = useScrollIndicator();
	const [showPopover, setShowPopover] = useState(false);

	// Fermer la modal avec la touche Escape uniquement
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === "Escape") setShowPopover(false);
		};

		if (showPopover) {
			document.addEventListener("keydown", handleEscape);
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
		};
	}, [showPopover]);

	// Function to colorize SQL code using the configuration
	const renderColorizedCode = (code) => {
		if (!code) return null;

		const parts = analyzeSqlCode(code);
		if (!parts || parts.length === 0) {
			return <span className={sqlSyntaxConfig.types.default.style}>{code}</span>;
		}

		let result = [];
		let currentIndex = 0;
		let key = 0;

		for (let part of parts) {
			// Add text before this part
			if (currentIndex < part.start) {
				result.push(
					<span key={key++} className={sqlSyntaxConfig.types.default.style}>
						{code.slice(currentIndex, part.start)}
					</span>
				);
			}
			// Add the coloured part
			const styleClass =
				sqlSyntaxConfig.types[part.type]?.style || sqlSyntaxConfig.types.default.style;

			result.push(
				<span key={key++} className={styleClass}>
					{part.text}
				</span>
			);

			currentIndex = part.end;
		}

		// Add the rest of the text
		if (currentIndex < code.length) {
			result.push(
				<span key={key++} className={sqlSyntaxConfig.types.default.style}>
					{code.slice(currentIndex)}
				</span>
			);
		}

		return result;
	};

	return (
		<div className={`relative ${className}`}>
			<div className="bg-gray-900 border-gray-700 border squircle overflow-hidden shadow-md">
				{/* Terminal Header */}
				<div className="bg-gray-800 px-4 py-2 flex items-center justify-between relative">
					<div className="flex items-center space-x-2">
						<div className="flex space-x-1">
							<div className="w-3 h-3 bg-red-500 rounded-full"></div>
							<div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
							<div className="w-3 h-3 bg-green-500 rounded-full"></div>
						</div>
						<span className="text-gray-400 text-sm font-mono ml-3">
							SQL Query
						</span>
					</div>

					{/* Info Icon */}
					<button
						onClick={() => setShowPopover(!showPopover)}
						className="text-gray-400 hover:text-gray-200 transition-colors p-1 squircle-sm hover:bg-gray-700 relative z-10 cursor-pointer"
						aria-label="Afficher la légende"
					>
						<MdInfoOutline className="w-5 h-5" />
					</button>
				</div>

				{/* Code Content */}
				<div className="p-4 relative">
					{/* Scroll indicator - affiché uniquement si scroll */}
					{hasScroll && <div className="scroll-indicator-dark" />}
					<pre ref={ref} className="text-sm font-mono leading-relaxed overflow-x-auto">
						<code>{renderColorizedCode(children)}</code>
					</pre>
				</div>
			</div>

			{/* Modal Popover - centré sur l'écran */}
			{showPopover && (
				<>
					{/* Backdrop */}
					<div
						className="fixed inset-0 bg-black/50 z-[100] animate-in fade-in duration-200"
						onClick={() => setShowPopover(false)}
					/>
					{/* Modal centré */}
					<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] animate-in fade-in zoom-in-95 duration-200">
						<SQLLegend variant="popover" onClose={() => setShowPopover(false)} />
					</div>
				</>
			)}
		</div>
	);
}
