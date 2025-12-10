"use client";

import { BELTS_CONFIG } from "@/config/belts-config";
import Link from "next/link";
import { FaFistRaised } from "react-icons/fa";

// Import belt content
import { beltContent as blackBeltContent } from "@/data/sections/black";
import { beltContent as blueBeltContent } from "@/data/sections/blue";
import { beltContent as brownBeltContent } from "@/data/sections/brown";
import { beltContent as greenBeltContent } from "@/data/sections/green";
import { beltContent as orangeBeltContent } from "@/data/sections/orange";
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
		<div className="w-full lg:max-w-[1500px] lg:mx-auto px-4 py-12">
			<div className="flex flex-wrap justify-center gap-6">
				{/* Belt Cards */}
				{belts.map((page) => {
					return (
						<Link
							key={page.key}
							href={page.href}
							className={`home-card ${page.colors.text}`}
						>
							<h3 className="text-2xl font-bold mb-5 tracking-tight">
								{page.title}
							</h3>

							<p className="text-base text-gray-700 mb-6 leading-relaxed font-normal">
								{page.summary}
							</p>

							<div className="space-y-3">
								{page.topics.slice(0, 3).map((topic, index) => (
									<div
										key={index}
										className="text-sm text-gray-700 flex items-start font-medium"
									>
										<span className="text-gray-400 mr-3 font-bold">•</span>
										<span>{topic}</span>
									</div>
								))}
								{page.topics.length > 3 && (
									<div className="text-sm text-gray-500 mt-4 font-medium">
										+ {page.topics.length - 3} autre
										{page.topics.length - 3 > 1 ? "s" : ""} sujet
										{page.topics.length - 3 > 1 ? "s" : ""}
									</div>
								)}
							</div>
						</Link>
					);
				})}

				{/* Practice Card */}
				<Link
					href="/practice"
					className={`home-card ${BELTS_CONFIG.practice.colors.text}`}
				>
					<div className="flex items-center mb-5">
						<FaFistRaised
							size={28}
							style={{ color: BELTS_CONFIG.practice.colors.icon }}
							className="mr-3"
						/>
						<h3 className="text-2xl font-bold tracking-tight">
							Passez 1<sup className="text-base">ère</sup> DAN
						</h3>
					</div>

					<p className="text-base text-gray-700 mb-6 leading-relaxed font-normal">
						Testez vos connaissances au travers d'exercices pratiques
					</p>

					<div className="space-y-3">
						<div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
							Au programme :
						</div>
						<div className="text-sm text-gray-700 flex items-start font-medium">
							<span className="text-gray-400 mr-3 font-bold">•</span>
							<span>Exercices pratiques</span>
						</div>
						<div className="text-sm text-gray-700 flex items-start font-medium">
							<span className="text-gray-400 mr-3 font-bold">•</span>
							<span>Tests de niveau</span>
						</div>
						<div className="text-sm text-gray-700 flex items-start font-medium">
							<span className="text-gray-400 mr-3 font-bold">•</span>
							<span>Validation des acquis</span>
						</div>
					</div>
				</Link>
			</div>
		</div>
	);
}
