import Footer from "@/components/layout/Footer";

export default function PracticePage() {
	return (
		<div className="bg-red-900 flex-1 flex flex-col pt-28 lg:pt-32">
			<div className="flex-1 flex items-center justify-center">
				<h1 className="text-4xl text-white">
					Développement en cours, arrivée prochaine 👊🏻
				</h1>
			</div>

			{/* Footer */}
			<Footer textColor="text-white/80" borderColor="border-white/30" />
		</div>
	);
}
