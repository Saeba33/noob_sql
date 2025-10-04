import AccordionList from "@/components/AccordionList";
import Footer from "@/components/layout/Footer";
import SectionNavigation from "@/components/navigation/SectionNavigation";
import SectionHeader from "@/components/ui/SectionHeader";
import { getBeltData, VALID_BELTS } from "@/lib/getBeltData";

export default async function BeltPage({ params }) {
	const { belt } = await params;
	const { beltContent } = await getBeltData(belt);

	return (
		<div className={`min-h-screen ${beltContent.colors.bg} flex flex-col`}>
			<main className="w-full mx-auto mt-20 mb-12 flex-1">
				<SectionHeader
					title={beltContent.header.title}
					description={beltContent.pageDescription.content}
					tag={beltContent.header.tag}
					tagProps={{ beltColors: beltContent.colors }}
					descriptionClassName={`${beltContent.colors.text} leading-relaxed`}
					className="mb-6"
				/>

				<AccordionList accordions={beltContent.accordions} />
				<SectionNavigation currentLevel={belt} />
			</main>

			{/* Footer */}
			<Footer
				textColor={beltContent.colors.text}
				borderColor={beltContent.colors.border}
			/>
		</div>
	);
}

export async function generateStaticParams() {
	return Array.from(VALID_BELTS, (belt) => ({ belt }));
}
