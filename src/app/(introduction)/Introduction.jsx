"use client";

import Footer from "@/components/layout/Footer";
import HomeNavigation from "@/components/navigation/HomeNavigation";

export default function IntroductionPage() {
	return (
		<div className="bg-gradient-to-br from-gray-50 to-blue-50 flex-1 pt-28 lg:pt-32 flex flex-col">
			
			{/* Introduction Section */}
			<div className="py-16">
				<div className="text-center mb-2 px-4">
					<h1 className="font-bold text-gray-900 mb-8 tracking-tight">
						Apprenez le SQL
					</h1>
					<p className="text-intro text-gray-700 text-left max-w-4xl mx-auto leading-relaxed font-normal">
						Maîtrisez les bases du langage SQL à travers différents niveaux de
						difficulté, représentés par les ceintures des arts martiaux.
						Commencez par la ceinture blanche et progressez jusqu'à la ceinture
						noire en apprenant les concepts essentiels des bases de données.
						Vous pourrez ensuite confronter vos connaissances au travers
						d'exercices pratiques en passant votre 1ère DAN dans la partie
						FIGHT.
					</p>
				</div>
			</div>

			{/* Navigation Cards */}
			<HomeNavigation />

			{/* Footer */}
			<Footer />
		</div>
	);
}
