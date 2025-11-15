export const BELTS_CONFIG = {
	white: {
		title: "Généralités",
		href: "/white",
		colors: {
			icon: "#9CA3AF",
			bg: "bg-gray-50",
			text: "text-gray-500",
			border: "border-gray-100",
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
		},
	},
	blue: {
		title: "Agrégations",
		href: "/blue",
		colors: {
			icon: "#3B82F6",
			bg: "bg-blue-50",
			text: "text-blue-800",
			border: "border-blue-300",
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
		},
	},
	practice: {
		title: "FIGHT !",
		href: "/practice",
		colors: {
			icon: "#DC2626",
			bg: "bg-red-50",
			text: "text-red-800",
			border: "border-red-300",
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
		const contentKey = `${belt}BeltContent`;
		const beltContent = beltModule[contentKey];

		if (!beltContent) {
			console.error(`Content key "${contentKey}" not found in belt module`);
			notFound();
		}

		return { beltContent };
	} catch (error) {
		console.error(`Failed to load content for belt: ${belt}`, error);
		notFound();
	}
}
