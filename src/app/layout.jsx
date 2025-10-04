import Header from "@/components/layout/Header";
import "./globals.css";

export const metadata = {
	title: "NoobSQL",
	description: "Apprenez SQL avec le système de ceintures",
};

export default function RootLayout({ children }) {
	return (
		<html lang="fr">
			<body>
				<div className="min-h-screen flex flex-col">
					<Header />
					<main className="flex-1 flex flex-col">{children}</main>
				</div>
			</body>
		</html>
	);
}
