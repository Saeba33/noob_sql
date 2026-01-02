"use client";

import BeltIcon from "@/components/ui/BeltIcon";
import { PAGES_CONFIG } from "@/config/belts-config";
import { useNavigation } from "@/hooks/useNavigation";
import Link from "next/link";

export default function NavbarDesktop() {
	const { isActive } = useNavigation();

	return (
		<nav
			className="flex items-center gap-4 h-[40px] max-h-[40px]"
			aria-label="Navigation principale"
		>
			{PAGES_CONFIG.filter((item) => item.href !== "/practice").map(
				(item, index) => {
					const beltKey = item.href.replace("/", "") || "white";
					const active = isActive(item.href);

					return (
						<Link
							key={`${beltKey}-${index}`}
							href={item.href}
							aria-current={active ? "page" : undefined}
						className={`navbar-item bg-transparent rounded-lg transition-all duration-200 px-2 py-2 flex items-center gap-2 h-[40px] max-h-[40px] ${
								active
									? "font-bold text-gray-900"
									: "font-light text-gray-600 hover:text-gray-900"
							} whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 rounded-lg`}
						>
							<BeltIcon belt={beltKey} size={32} className="block translate-y-[3px]" />
							<span className="relative tracking-wide">
								<span className="invisible font-bold" aria-hidden="true">
									{item.title}
								</span>
								<span className="absolute inset-0">{item.title}</span>
							</span>
						</Link>
					);
				}
			)}
		</nav>
	);
}
