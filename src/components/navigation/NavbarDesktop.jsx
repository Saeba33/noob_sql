"use client";

import BeltIcon from "@/components/ui/BeltIcon";
import { BELT_COLORS, PAGES_CONFIG } from "@/config/belts-config";
import { useNavigation } from "@/hooks/useNavigation";
import Link from "next/link";
import { FaFistRaised } from "react-icons/fa";

export default function NavbarDesktop() {
	const { isActive } = useNavigation();

	return (
		<nav
			className="hidden md:flex items-center gap-3"
			aria-label="Navigation principale"
		>
			{PAGES_CONFIG.map((item, index) => {
				const beltKey = item.href.replace("/", "") || "white";
				const colors = BELT_COLORS[beltKey];
				const isPractice = beltKey === "practice";
				const active = isActive(item.href);

				// Couleurs de hover spécifiques par ceinture
				const hoverTextClass = !isPractice
					? {
							white: "hover:text-gray-500",
							yellow: "hover:text-yellow-600",
							orange: "hover:text-orange-600",
							green: "hover:text-green-600",
							blue: "hover:text-blue-600",
							brown: "hover:text-amber-700",
							black: "hover:text-gray-900",
					  }[beltKey]
					: "";

				return (
					<Link
						key={`${beltKey}-${index}`}
						href={item.href}
						aria-current={active ? "page" : undefined}
						className={`
							group
							relative
							${
								isPractice
									? "bg-red-50 border border-red-600 text-red-700 hover:bg-red-100 hover:border-red-700 rounded-lg"
									: "bg-transparent rounded-lg"
							}
							${active && !isPractice ? "nav-item-active" : ""}
							transition-all duration-200 
							px-4 py-2
							flex items-center gap-2
							text-sm
							font-medium
							${
								!isPractice
									? active
										? "text-gray-900"
										: `text-gray-600 ${hoverTextClass}`
									: ""
							}
							whitespace-nowrap
						`}
						style={
							active && !isPractice 
								? { 
									'--border-color': colors.icon
								} 
								: {}
						}
					>
						{/* Bordure hover qui se déplie */}
						{!isPractice && !active && (
							<span
								className="absolute bottom-0 left-1/2 w-0 h-0.5 group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"
								style={{ backgroundColor: colors.icon, opacity: 0.3 }}
							/>
						)}

						{beltKey === "practice" ? (
							<FaFistRaised size={16} aria-hidden="true" />
						) : (
							<BeltIcon belt={beltKey} size={20} aria-hidden="true" />
						)}
						<span className={isPractice ? "font-semibold" : ""}>
							{item.title}
						</span>
					</Link>
				);
			})}
		</nav>
	);
}
