import Header from "@/components/layout/Header";
import { IBM_Plex_Sans, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800"],
	variable: "--font-plus-jakarta",
	display: "swap",
});

const ibmPlex = IBM_Plex_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-ibm-plex",
	display: "swap",
});

const outfit = Outfit({
	subsets: ["latin"],
	weight: ["600", "700", "800"],
	variable: "--font-outfit",
	display: "swap",
});

export const metadata = {
	title: "NoobSQL",
	description: "Apprenez SQL avec le système de ceintures des arts martiaux",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({ children }) {
	return (
		<html
			lang="fr"
			className={`${plusJakarta.variable} ${ibmPlex.variable} ${outfit.variable}`}
		>
			<body>
				<div className="min-h-screen flex flex-col">
					<Header />
					<main className="flex-1 flex flex-col">{children}</main>
				</div>
			</body>
		</html>
	);
}
