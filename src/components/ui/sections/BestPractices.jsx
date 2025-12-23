"use client";

import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { BsInfoCircle } from "react-icons/bs";
import { RiProhibited2Line } from "react-icons/ri";

export default function BestPractices({
	introduction,
	rules = [],
	iconColor = "#6B7280",
}) {

	return (
		<div>
			{/* Introduction */}
			{introduction && (
				<div className="mb-8 space-y-4 text-gray-700 leading-relaxed">
					<p className="text-body">{introduction}</p>
				</div>
			)}
			{/* Rules section */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{rules.map((rule, index) => (
					<div
						key={index}
						className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm grid gap-3"
						style={{ gridRow: "span 7", gridTemplateRows: "subgrid" }}
					>
						{/* Rule header */}
						<div className="flex items-center space-x-3">
							<div
								className="w-5 h-5 min-w-[20px] flex-shrink-0"
								style={{ color: iconColor }}
							>
								{rule.icon}
							</div>
							<h5 className="font-bold text-gray-900">{rule.section}</h5>
						</div>
						<p className="text-body text-gray-700">{rule.rule}</p>
						<div></div>

						{/* Recommended */}
						<div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
							<h6 className=" text-gray-600 font-semibold mb-1 flex items-center gap-1">
								<IoMdCheckmarkCircleOutline className="w-5 h-5 text-green-600" />{" "}
								À PRIVILÉGIER
							</h6>
							<code className="text-sm text-green-800 font-mono whitespace-pre-wrap break-words">
								{rule.good}
							</code>
						</div>

						{/* Avoid */}
						<div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
							<h6 className=" text-gray-600 font-semibold mb-1 flex items-center gap-1">
								<RiProhibited2Line className="w-5 h-5 text-red-600" /> À ÉVITER
							</h6>
							<code className="text-sm text-red-800 font-mono whitespace-pre-wrap break-words">
								{rule.bad}
							</code>
						</div>

						{/* Flexible spacer 2 */}
						<div></div>

						{/* Reason */}
						<div className="text-xs text-gray-600 italic flex items-center gap-1">
							<BsInfoCircle className="w-5 h-5 mr-1 " />
							{rule.reason}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
