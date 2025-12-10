"use client";

import Accordion from "@/components/ui/Accordion";

export default function AccordionList({ accordions, colors }) {
	if (!accordions || accordions.length === 0) {
		return null;
	}

	return (
		<div>
			<div className="space-y-6 flex flex-col">
				{accordions.map((accordion, index) => (
					<Accordion
						key={index}
						section={accordion.section}
						content={accordion.content}
						examples={accordion.examples}
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
