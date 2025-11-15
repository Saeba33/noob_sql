"use client";

import Accordion from "@/components/ui/Accordion";

export default function AccordionList({ accordions }) {
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
						explanation={accordion.explanation}
						sqlDiagram={accordion.sqlDiagram}
						sqlSchema={accordion.sqlSchema}
						sqlResult={accordion.sqlResult}
						sqlTable={accordion.sqlTable}
						externalComponent={accordion.externalComponent}
						description={accordion.description}
					/>
				))}
			</div>
		</div>
	);
}
