export const BELTS_CONFIG = {
	white: {
		title: "Généralités",
		href: "/white",
		colors: {
			icon: "#9CA3AF",
			bg: "bg-gray-50",
			text: "text-gray-500",
			border: "border-gray-100",
			// Mobile menu hover
			mobileHoverBg: "rgb(249 250 251)",
			mobileHoverText: "rgb(107 114 128)",
		},
	},
	yellow: {
		title: "DDL",
		href: "/yellow",
		colors: {
			icon: "#EAB308",
			bg: "bg-yellow-50",
			text: "text-yellow-600",
			border: "border-yellow-400",
			mobileHoverBg: "rgb(254 252 232)",
			mobileHoverText: "rgb(202 138 4)",
		},
	},
	orange: {
		title: "CRUD",
		href: "/orange",
		colors: {
			icon: "#F97316",
			bg: "bg-orange-100",
			text: "text-orange-700",
			border: "border-orange-300",
			mobileHoverBg: "rgb(255 237 213)",
			mobileHoverText: "rgb(194 65 12)",
		},
	},
	green: {
		title: "Filtres & Conditions",
		href: "/green",
		colors: {
			icon: "#22C55E",
			bg: "bg-green-50",
			text: "text-green-800",
			border: "border-green-300",
			mobileHoverBg: "rgb(240 253 244)",
			mobileHoverText: "rgb(22 101 52)",
		},
	},
	blue: {
		title: "Fonctions SQL",
		href: "/blue",
		colors: {
			icon: "#3B82F6",
			bg: "bg-blue-50",
			text: "text-blue-800",
			border: "border-blue-300",
			mobileHoverBg: "rgb(239 246 255)",
			mobileHoverText: "rgb(30 64 175)",
		},
	},
	brown: {
		title: "Jointures",
		href: "/brown",
		colors: {
			icon: "#8B4513",
			bg: "bg-yellow-100",
			text: "text-yellow-800",
			border: "border-yellow-600",
			mobileHoverBg: "rgb(254 249 195)",
			mobileHoverText: "rgb(133 77 14)",
		},
	},
	black: {
		title: "Requêtes Avancées",
		href: "/black",
		colors: {
			icon: "#1F2937",
			bg: "bg-gray-50",
			text: "text-gray-900",
			border: "border-gray-400",
			mobileHoverBg: "rgb(249 250 251)",
			mobileHoverText: "rgb(17 24 39)",
		},
	},
	practice: {
		title: "FIGHT !",
		href: "/practice",
		colors: {
			icon: "#DC2626",
			bg: "bg-red-50",
			text: "text-red-700",
			border: "border-red-600",
			// Mobile menu hover
			mobileHoverBg: "rgb(254 242 242)",
			mobileHoverText: "rgb(153 27 27)",
			// Home card hover
			cardHoverBg: "#fef2f2",
			cardHoverBorder: "#dc2626",
		},
	},
};

// Derived constants for navigation
export const PAGES_CONFIG = Object.values(BELTS_CONFIG).map(
	({ title, href }) => ({ title, href })
);

// Derived constants for colors
export const BELT_COLORS = Object.fromEntries(
	Object.entries(BELTS_CONFIG).map(([key, { colors }]) => [key, colors])
);

// Utility function to validate and load belt data
export async function getBeltData(belt) {
	const { notFound } = await import("next/navigation");

	if (!Object.keys(BELTS_CONFIG).includes(belt)) {
		notFound();
	}

	try {
		const beltModule = await import(`@/data/sections/${belt}`);
		const beltContent = beltModule.beltContent;

		if (!beltContent) {
			console.error(`beltContent not found in ${belt} module`);
			notFound();
		}

		// Inject colors from BELTS_CONFIG
		const colors = BELTS_CONFIG[belt]?.colors;

		return {
			beltContent: {
				...beltContent,
				colors,
			},
		};
	} catch (error) {
		console.error(`Failed to load content for belt: ${belt}`, error);
		notFound();
	}
}
