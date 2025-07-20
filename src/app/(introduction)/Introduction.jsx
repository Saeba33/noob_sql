"use client";

import HomeNavigation from "@/components/navigation/HomeNavigation";

export default function IntroductionPage() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 flex-1">
      {/* Introduction Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Apprenez le SQL par Niveaux
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Maîtrisez les bases du langage SQL à travers différents niveaux de difficulté, 
            représentés par les ceintures du judo. Commencez par la ceinture blanche et 
            progressez jusqu'à la ceinture noire en apprenant les concepts essentiels 
            des bases de données. Vous pourrez ensuite confronter vos connaissances 
            au travers d'exercices pratiques en passant votre 1ère DAN dans la partie FIGHT.
          </p>
        </div>
      </div>

      {/* Navigation Cards */}
      <HomeNavigation />
    </div>
  );
}
