export const BELTS_CONFIG = {
	white: {
		title: "Généralités",
		href: "/white",
		image: "/white.png",
		colors: {
			theme: "#9CA3AF",
			mobileHoverBg: "rgb(249 250 251)",
			mobileHoverText: "rgb(107 114 128)",
		},
	},
	yellow: {
		title: "DDL",
		href: "/yellow",
		image: "/yellow.png",
		colors: {
			theme: "#F2D12A",
			mobileHoverBg: "rgb(254 252 232)",
			mobileHoverText: "rgb(202 138 4)",
		},
	},
	orange: {
		title: "CRUD",
		href: "/orange",
		image: "/orange.png",
		colors: {
			theme: "#F2993A",
			mobileHoverBg: "rgb(255 237 213)",
			mobileHoverText: "rgb(194 65 12)",
		},
	},
	green: {
		title: "Filtres & Conditions",
		href: "/green",
		image: "/green.png",
		colors: {
			theme: "#4FAE6A",
			mobileHoverBg: "rgb(240 253 244)",
			mobileHoverText: "rgb(22 101 52)",
		},
	},
	blue: {
		title: "Fonctions SQL",
		href: "/blue",
		image: "/blue.png",
		colors: {
			theme: "#3B7FD6",
			mobileHoverBg: "rgb(239 246 255)",
			mobileHoverText: "rgb(30 64 175)",
		},
	},
	brown: {
		title: "Jointures",
		href: "/brown",
		image: "/brown.png",
		colors: {
			theme: "#9C6A3E",
			mobileHoverBg: "rgb(254 249 195)",
			mobileHoverText: "rgb(133 77 14)",
		},
	},
	black: {
		title: "Requêtes Avancées",
		href: "/black",
		image: "/black.png",
		colors: {
			theme: "#1F2937",
			mobileHoverBg: "rgb(249 250 251)",
			mobileHoverText: "rgb(17 24 39)",
		},
	},
	practice: {
		title: "FIGHT",
		href: "/practice",
		image: "/practice.png",
		colors: {
			theme: "#1F2937",
			mobileHoverBg: "rgb(249 250 251)",
			mobileHoverText: "rgb(17 24 39)",
			cardHoverBg: "#f9fafb",
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
