"use client";

import { BELT_COLORS } from "@/config/colors";
import { useNavigation } from "@/hooks/useNavigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function SectionNavigation() {
	const { getSectionNavigation } = useNavigation();
	const { previous, next } = getSectionNavigation();
	const pathname = usePathname();

	// Determine current belt
	const currentBelt = pathname?.split("/")[1];
	const colors = BELT_COLORS[currentBelt] || BELT_COLORS.white;

	// Show only if we have a previous or next link
	if (!previous && !next) return null;

	// Determine button labels
	const getPreviousLabel = () => {
		if (!previous) return "";
		if (previous.href === "/") return "Retour à l'accueil";
		return `Précédent : ${previous.title}`;
	};

	const getNextLabel = () => {
		if (!next) return "";
		return `Suivant : ${next.title}`;
	};

	return (
		<div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">

				{/* Previous Link */}
				<div className="flex-1">
					{previous ? (
						<Link
							href={previous.href}
							className={`group inline-flex items-center gap-3 transition-all duration-200 hover:translate-x-[-4px] ${
								colors.text || "text-gray-700"
							}`}
						>
							<MdChevronLeft
								className={`w-6 h-6 transition-transform group-hover:scale-110 opacity-60`}
							/>
							<span className="text-xs uppercase tracking-wider opacity-60 font-medium group-hover:opacity-80">
								Précédent
							</span>
						</Link>
					) : (
						<div></div>
					)}
				</div>

				{/* Next Link */}
				<div className="flex-1 flex justify-end">
					{next ? (
						<Link
							href={next.href}
							className={`group inline-flex items-center gap-3 transition-all duration-200 hover:translate-x-[4px] ${
								colors.text || "text-gray-700"
							}`}
						>
							<span className="text-xs uppercase tracking-wider opacity-60 font-medium group-hover:opacity-80">
								Suivant
							</span>
							<MdChevronRight
								className={`w-6 h-6 transition-transform group-hover:scale-110 opacity-60`}
							/>
						</Link>
					) : (
						<div></div>
					)}
				</div>

		</div>
	);
}
