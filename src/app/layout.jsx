import Header from "@/components/layout/Header";
import "./globals.css";

export const metadata = {
	title: "NoobSQL",
	description: "Apprenez SQL avec le système de ceintures des arts martiaux",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="fr">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Outfit:wght@600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body>
				<div className="min-h-screen flex flex-col">
					<Header />
					<main className="flex-1 flex flex-col">{children}</main>
				</div>
			</body>
		</html>
	);
}
