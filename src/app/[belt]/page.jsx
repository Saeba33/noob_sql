import Footer from "@/components/layout/Footer";
import SectionNavigation from "@/components/navigation/SectionNavigation";
import AccordionList from "@/components/ui/AccordionList";
import SectionHeader from "@/components/ui/SectionHeader";
import { BELTS_CONFIG, getBeltData } from "@/config/belts-config";

export async function generateMetadata({ params }) {
	const { belt } = await params;
	const { beltContent } = await getBeltData(belt);

	return {
		title: `${beltContent.header.title} | NoobSQL`,
		description: beltContent.header.description,
		openGraph: {
			title: `${beltContent.header.title} | NoobSQL`,
			description: beltContent.header.description,
			type: "article",
		},
	};
}

export default async function BeltPage({ params }) {
	const { belt } = await params;
	const { beltContent } = await getBeltData(belt);

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
			<main className="w-full max-w-[1500px] mx-auto mt-24 mb-16 px-4 lg:px-6 flex-1">
				<SectionHeader
					title={beltContent.header.title}
					description={beltContent.header.description}
					tag={beltContent.header.tag}
					descriptionClassName="text-gray-700 leading-relaxed"
					className="mb-8"
				/>

				<AccordionList
					accordions={beltContent.accordions}
					colors={beltContent.colors}
				/>
				<SectionNavigation />
			</main>

			<Footer />
		</div>
	);
}

export async function generateStaticParams() {
	return Object.keys(BELTS_CONFIG)
		.filter((key) => key !== "practice")
		.map((belt) => ({ belt }));
}
