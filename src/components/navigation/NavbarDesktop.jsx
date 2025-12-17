"use client";

import BeltIcon from "@/components/ui/BeltIcon";
import { BELT_COLORS, PAGES_CONFIG } from "@/config/belts-config";
import { useNavigation } from "@/hooks/useNavigation";
import Link from "next/link";

export default function NavbarDesktop() {
	const { isActive } = useNavigation();

	return (
		<nav className="flex items-center gap-4 " aria-label="Navigation principale">
			{PAGES_CONFIG.filter((item) => item.href !== "/practice").map(
				(item, index) => {
					const beltKey = item.href.replace("/", "") || "white";
					const active = isActive(item.href);

					return (
						<Link
							key={`${beltKey}-${index}`}
							href={item.href}
							aria-current={active ? "page" : undefined}
							className={`bg-transparent rounded-lg transition-all duration-200 px-2 pt-[7px] pb-[7px] flex items-center gap-2 text-sm ${
								active ? "font-semibold text-gray-900" : "font-light text-gray-600 hover:text-gray-900"
							} whitespace-nowrap`}
						>
							<BeltIcon belt={beltKey} size={32} className="pt-1.5"/>
							<span className="relative tracking-wide">
								{/* Invisible text with semibold to reserve space */}
								<span className="invisible font-semibold" aria-hidden="true">
									{item.title}
								</span>
								{/* Actual text positioned absolutely */}
								<span className="absolute inset-0">
									{item.title}
								</span>
							</span>
						</Link>
					);
				}
			)}
		</nav>
	);
}
