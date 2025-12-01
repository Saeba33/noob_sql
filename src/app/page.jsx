import IntroductionPage from "@/app/(introduction)/Introduction";

export const metadata = {
	title: "NoobSQL - Apprendre SQL avec le système de ceintures",
	description:
		"Maîtrisez SQL étape par étape grâce à notre méthode progressive inspirée des arts martiaux. De la ceinture blanche à la ceinture noire, devenez un expert SQL.",
	openGraph: {
		title: "NoobSQL - Apprendre SQL avec le système de ceintures",
		description:
			"Maîtrisez SQL étape par étape grâce à notre méthode progressive inspirée des arts martiaux.",
		type: "website",
	},
};

export default function Home() {
  return <IntroductionPage />;
}
