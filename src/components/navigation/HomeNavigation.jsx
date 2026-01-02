"use client";

import { BELTS_CONFIG } from "@/config/belts-config";
import Link from "next/link";

// Import belt content
import { beltContent as blackBeltContent } from "@/data/sections/black";
import { beltContent as blueBeltContent } from "@/data/sections/blue";
import { beltContent as brownBeltContent } from "@/data/sections/brown";
import { beltContent as greenBeltContent } from "@/data/sections/green";
import { beltContent as orangeBeltContent } from "@/data/sections/orange";
import { beltContent as practiceBeltContent } from "@/data/sections/practice";
import { beltContent as whiteBeltContent } from "@/data/sections/white";
import { beltContent as yellowBeltContent } from "@/data/sections/yellow";

// Belt content mapping
const BELT_CONTENTS = {
	white: whiteBeltContent,
	yellow: yellowBeltContent,
	orange: orangeBeltContent,
	green: greenBeltContent,
	blue: blueBeltContent,
	brown: brownBeltContent,
	black: blackBeltContent,
	practice: practiceBeltContent,
};

export default function HomeNavigation() {
	// Navigation data
	const belts = Object.entries(BELTS_CONFIG)
		.filter(([key]) => BELT_CONTENTS[key])
		.map(([key, config]) => ({
			...config,
			key,
			summary: BELT_CONTENTS[key].summary,
			topics: BELT_CONTENTS[key].topics,
		}));

	return (
		<div className="w-full lg:max-w-[1500px] lg:mx-auto px-4 lg:px-6 py-12">
			<div className="flex flex-wrap justify-center gap-4 sm:gap-5 md:gap-6">
				{belts.map((page) => {
					return (
						<Link
							key={page.key}
							href={page.href}
							className="home-card group "
							style={{
								"--theme-color": page.colors.theme,
/* 								"--theme-hover-bg": page.colors.mobileHoverBg, */
							}}
						>
							{/* Header avec titre, point et ligne animée */}
							<div className="mb-5">


									<h3 className="font-extrabold tracking-tight text-gray-800 transition-colors duration-300">
										{page.title}
									</h3>

								{/* Ligne animée sous le titre */}
								<div className="mt-2 h-[2px] bg-gray-200 rounded-full overflow-hidden">
									<div 
										className="h-full w-0 group-hover:w-full transition-all duration-300 ease-out rounded-full"
										style={{ backgroundColor: page.colors.theme }}
									/>
								</div>
							</div>

							{/* Description */}
							<p className="text-body text-gray-600 mb-6 leading-relaxed">
								{page.summary}
							</p>

							{/* Topics */}
							<div className="space-y-2">
								{page.topics.slice(0, 3).map((topic, index) => (
									<div
										key={index}
										className="text-topic text-gray-500 flex items-start"
									>
										<span className="text-gray-300 mr-2">•</span>
										<span>{topic}</span>
									</div>
								))}
								{page.topics.length > 3 && (
									<div className="text-topic text-gray-400 flex items-start">
										<span className="mr-2 -translate-y-[0.1em]">+</span>
										<span>
											{page.topics.length - 3} autre
											{page.topics.length - 3 > 1 ? "s" : ""} sujet
											{page.topics.length - 3 > 1 ? "s" : ""}
										</span>
									</div>
								)}
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
