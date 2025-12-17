export const BELTS_CONFIG = {
	white: {
		title: "Généralités",
		href: "/white",
		image: "/white.png",
		colors: {
			theme: "#9CA3AF",
			mobileHoverBg: "#F9FAFB",
			mobileHoverText: "#6B7280",
		},
	},
	yellow: {
		title: "DDL",
		href: "/yellow",
		image: "/yellow.png",
		colors: {
			theme: "#F2D12A",
			mobileHoverBg: "#FEFCE8",
			mobileHoverText: "#9A7A00",
		},
	},
	orange: {
		title: "CRUD",
		href: "/orange",
		image: "/orange.png",
		colors: {
			theme: "#F2993A",
			mobileHoverBg: "#FFF4E6",
			mobileHoverText: "#C46A1A",
		},
	},
	green: {
		title: "Filtres & Conditions",
		href: "/green",
		image: "/green.png",
		colors: {
			theme: "#4FAE6A",
			mobileHoverBg: "#ECFDF3",
			mobileHoverText: "#1F6F3A",
		},
	},
	blue: {
		title: "Fonctions SQL",
		href: "/blue",
		image: "/blue.png",
		colors: {
			theme: "#3B7FD6",
			mobileHoverBg: "#EFF6FF",
			mobileHoverText: "#1A4F8F",
		},
	},
	brown: {
		title: "Jointures",
		href: "/brown",
		image: "/brown.png",
		colors: {
			theme: "#9C6A3E",
			mobileHoverBg: "#FDF4EC",
			mobileHoverText: "#5B3518",
		},
	},
	black: {
		title: "Requêtes Avancées",
		href: "/black",
		image: "/black.png",
		colors: {
			theme: "#1A1A1A",
			mobileHoverBg: "#F9FAFB",
			mobileHoverText: "#000000",
		},
	},
	practice: {
		title: "FIGHT",
		href: "/practice",
		image: "/practice.png",
		colors: {
			theme: "#DC2626",
			mobileHoverBg: "#FEE2E2",
			mobileHoverText: "#991B1B",
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
