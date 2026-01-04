"use client";

import { IoMdCheckmarkCircleOutline } from "react-icons/io";
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
					<p>{introduction}</p>
				</div>
			)}
			{/* Rules section */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{rules.map((rule, index) => (
					<div
						key={index}
						className="bg-white border border-gray-200 squircle px-6 pt-6 pb-2 shadow-sm grid gap-4"
						style={{
							gridRow: "span 6",
							gridTemplateRows: "subgrid",
						}}
					>
						{/* Rule header */}
						<div className="flex items-center space-x-3">
							<div className="flex-shrink-0" style={{ color: iconColor }}>
								<div className="[&>svg]:w-6 [&>svg]:h-6">{rule.icon}</div>
							</div>
							<h5 className="font-bold text-gray-900 leading-tight">
								{rule.section}
							</h5>
						</div>

						<p className="text-gray-700 leading-relaxed">
							{rule.rule}
						</p>

						{/* Recommended */}
						<div className="bg-gradient-to-br from-green-50 to-emerald-50 border-l-4 border-green-500 p-4 squircle-sm shadow-sm">
							<h6 className="text-gray-700 font-semibold mb-2 flex items-center gap-2 uppercase tracking-wide">
								<IoMdCheckmarkCircleOutline className="w-5 h-5 text-green-600" />
								À privilégier
							</h6>
							<code className="text-sm text-green-900 font-mono whitespace-pre-wrap break-words block bg-white/50 p-2 squircle shadow-xs">
								{rule.good}
							</code>
						</div>

						{/* Avoid */}
						<div className="bg-gradient-to-br from-red-50 to-rose-50 border-l-4 border-red-500 p-4 squircle-sm shadow-sm">
							<h6 className="text-gray-700 font-semibold mb-2 flex items-center gap-2 uppercase tracking-wide">
								<RiProhibited2Line className="w-5 h-5 text-red-600" /> À éviter
							</h6>
							<code className="text-sm text-red-900 font-mono whitespace-pre-wrap break-words block bg-white/50 p-2 squircle shadow-xs">
								{rule.bad}
							</code>
						</div>

						{/* Reason */}
						<div className="bg-gray-50 border-l-4 border-gray-300 p-4 squircle-sm shadow-sm">
							<h6 className="text-gray-700 font-semibold mb-2 flex items-center gap-2 uppercase tracking-wide">
								Pourquoi ?
							</h6>
							<p className="text-gray-600 leading-relaxed">
								{rule.reason}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
