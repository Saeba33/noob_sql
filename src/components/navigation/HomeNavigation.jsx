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
							className="home-card"
							style={{
								"--theme-color": page.colors.theme,
								"--theme-hover-bg": page.colors.mobileHoverBg,
							}}
						>
							<h3 className="font-extrabold tracking-tight text-gray-800 mb-4">
								{page.title}
							</h3>

							<p className="text-body text-gray-700 mb-6 leading-relaxed">
								{page.summary}
							</p>

							<div className="space-y-2.5">
								{page.topics.slice(0, 3).map((topic, index) => (
									<div
										key={index}
										className="text-topic text-gray-600 flex items-start"
									>
										<span className="text-gray-400 mr-2.5">•</span>
										<span>{topic}</span>
									</div>
								))}
								{page.topics.length > 3 && (
									<div className="text-topic text-gray-500 flex items-center">
										<span className="text-gray-400 mr-2.5">+</span>
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
