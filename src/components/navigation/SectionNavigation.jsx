"use client";

import { BELT_COLORS } from "@/config/belts-config";
import { useNavigation } from "@/hooks/useNavigation";
import Link from "next/link";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function SectionNavigation() {
	const { getSectionNavigation } = useNavigation();
	const { previous, next, current } = getSectionNavigation();

	// Determine current belt from current page
	const currentBelt = current?.href?.split("/")[1];
	const colors = BELT_COLORS[currentBelt] || BELT_COLORS.white;

	// Show only if we have a previous or next link
	if (!previous && !next) return null;

	return (
		<div className="pt-12 pb-4">
			<div className="flex justify-between items-center">
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
					) : null}
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
					) : null}
				</div>
			</div>
		</div>
	);
}
