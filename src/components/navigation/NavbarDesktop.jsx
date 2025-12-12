"use client";

import BeltIcon from "@/components/ui/BeltIcon";
import { BELT_COLORS, PAGES_CONFIG } from "@/config/belts-config";
import { useNavigation } from "@/hooks/useNavigation";
import Link from "next/link";

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
				const active = isActive(item.href);

				return (
					<Link
						key={`${beltKey}-${index}`}
						href={item.href}
						aria-current={active ? "page" : undefined}
						className={`
							group
							relative
							bg-transparent rounded-lg
							${active ? "nav-item-active" : ""}
							transition-all duration-200 
							px-4 py-2
							flex items-center gap-2
							text-sm
							font-medium
							${
								active
									? "text-gray-900"
									: "text-gray-600 hover:text-gray-900"
							}
							whitespace-nowrap
						`}
						style={
							active
								? {
										"--border-color": colors.theme,
								  }
								: {}
						}
					>
						{/* Border hover */}
						{!active && (
							<span
								className="absolute bottom-0 left-1/2 w-0 h-0.5 group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"
								style={{ backgroundColor: colors.theme, opacity: 0.3 }}
							/>
						)}

						<BeltIcon belt={beltKey} size={24} />
						<span>{item.title}</span>
					</Link>
				);
			})}
		</nav>
	);
}
