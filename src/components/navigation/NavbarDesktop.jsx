"use client";

import BeltIcon from "@/components/ui/BeltIcon";
import { BELT_COLORS, PAGES_CONFIG } from "@/config/belts-config";
import { useNavigation } from "@/hooks/useNavigation";
import Link from "next/link";

export default function NavbarDesktop() {
	const { isActive } = useNavigation();

	// Helper functions
	const getDesktopLinkStyle = (active, colors) => ({
		className: `group relative bg-transparent rounded-lg ${
			active ? "nav-item-active" : ""
		} transition-all duration-200 px-2 pt-[7px] flex items-center gap-2 text-sm font-medium ${
			active ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
		} whitespace-nowrap`,
		style: active ? { "--border-color": colors.theme } : {},
	});

	const renderHoverBorder = (active, colors) =>
		!active && (
			<span
				className="absolute bottom-0 left-1/2 w-0 h-[1px] group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"
				style={{ backgroundColor: colors.theme, opacity: 0.3 }}
			/>
		);

	return (
		<nav className="flex items-center gap-4 " aria-label="Navigation principale">
			{PAGES_CONFIG.filter((item) => item.href !== "/practice").map(
				(item, index) => {
					const beltKey = item.href.replace("/", "") || "white";
					const colors = BELT_COLORS[beltKey];
					const active = isActive(item.href);

					return (
						<Link
							key={`${beltKey}-${index}`}
							href={item.href}
							aria-current={active ? "page" : undefined}
							{...getDesktopLinkStyle(active, colors)}
						>
							{renderHoverBorder(active, colors)}
							<BeltIcon belt={beltKey} size={32} />
							<span className="pb-[7px] font-light tracking-wide">
								{item.title}
							</span>
						</Link>
					);
				}
			)}
		</nav>
	);
}
