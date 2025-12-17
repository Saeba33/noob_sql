import Footer from "@/components/layout/Footer";

export const metadata = {
	title: "Pratique SQL - Fight! | NoobSQL",
	description:
		"Mettez en pratique vos connaissances SQL avec des exercices interactifs. Testez vos compétences et progressez vers la maîtrise.",
	openGraph: {
		title: "Pratique SQL - Fight! | NoobSQL",
		description:
			"Mettez en pratique vos connaissances SQL avec des exercices interactifs.",
		type: "website",
	},
};

export default function PracticePage() {
	return (
		<div className="bg-slate-900/50 flex-1 flex flex-col pt-28 lg:pt-32">
			<main className="flex-1 flex items-center justify-center">
				<div className="max-w-[1500px] mx-auto px-4">
					<h1 className="text-4xl text-white text-center">
						Développement en cours, arrivée prochaine 👊🏻
					</h1>
				</div>
			</main>

			{/* Footer */}
			<Footer textColor="text-white/80" borderColor="border-white/30" />
		</div>
	);
}
