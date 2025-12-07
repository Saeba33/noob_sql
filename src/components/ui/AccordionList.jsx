"use client";

import Accordion from "@/components/ui/Accordion";

export default function AccordionList({ accordions, colors }) {
	if (!accordions || accordions.length === 0) {
		return null;
	}

	return (
		<div className="py-8">
			<div className="space-y-8 flex flex-col">
				{accordions.map((accordion, index) => (
					<Accordion
						key={index}
						title={accordion.title}
						content={accordion.content}
						sqlCode={accordion.sqlCode}
						sqlQueries={accordion.sqlQueries}
						sqlResult={accordion.sqlResult}
						externalComponent={accordion.externalComponent}
						colors={colors}
					/>
				))}
			</div>
		</div>
	);
}
