"use client";

import BeltIcon from "@/components/ui/BeltIcon";
import { BELT_COLORS } from "@/config/colors";
import { PAGES_CONFIG } from "@/config/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFistRaised } from "react-icons/fa";

export default function NavbarDesktop() {
	const pathname = usePathname();

	const navigationItems = PAGES_CONFIG;

	const isActive = (href) => pathname === href;

	return (
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
	);
}
