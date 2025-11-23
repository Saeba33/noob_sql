import { BiSolidErrorAlt } from "react-icons/bi";
import { IoMdCheckmarkCircleOutline, IoMdInformation } from "react-icons/io";
import { MdLightbulb } from "react-icons/md";

export default function BestPractices({
	title = "Bonnes pratiques",
	introduction,
	rules = [],
	tips = [],
	accentColor = "gray-600",
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
			<div className="border border-gray-300 rounded-lg bg-gray-50 p-6">
				<div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
					style={{ gridAutoRows: "auto auto 1fr auto auto 1fr auto" }}
				>
					{rules.map((rule, index) => (
						<div
							key={index}
							className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm grid gap-3"
							style={{ gridRow: "span 7", gridTemplateRows: "subgrid" }}
						>
							{/* Rule header */}
							<div className="flex items-center space-x-3">
								{rule.icon}
								<h3 className="text-base font-bold text-gray-900">
									{rule.title}
								</h3>
							</div>

							{/* Rule description */}
							<p className="text-gray-700 text-sm">{rule.rule}</p>

							{/* Flexible spacer 1 */}
							<div></div>

							{/* Recommended */}
							<div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
								<p className="text-xs text-gray-600 font-semibold mb-1 flex items-center gap-1">
									<IoMdCheckmarkCircleOutline className="w-5 h-5 text-green-600" />{" "}
									À FAIRE
								</p>
								<code className="text-sm text-green-800 font-mono whitespace-pre-wrap break-words">
									{rule.good}
								</code>
							</div>

							{/* Avoid */}
							<div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
								<p className="text-xs text-gray-600 font-semibold mb-1 flex items-center gap-1">
									<BiSolidErrorAlt className="w-5 h-5 text-red-600" /> À ÉVITER
								</p>
								<code className="text-sm text-red-800 font-mono whitespace-pre-wrap break-words">
									{rule.bad}
								</code>
							</div>

							{/* Flexible spacer 2 */}
							<div></div>

							{/* Info */}
							<div className="text-xs text-gray-600 italic flex items-center gap-1">
								<div className="mr-1 bg-blue-100 rounded-full flex-shrink-0">
									<IoMdInformation className="w-6 h-6 text-blue-600"  />
								</div>
								{rule.reason}
							</div>
						</div>
					))}
				</div>
			</div>{" "}
			{/* Tips section (optional) */}
			{tips && tips.length > 0 && (
				<div className="mt-6 border border-gray-300 rounded-lg bg-gray-50 p-6">
					<h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
						<MdLightbulb className={`w-5 h-5 text-${accentColor} mr-3`} />
						Conseils Pratiques
					</h2>
					<div className="space-y-4">
						{tips.map((tip, index) => (
							<div
								key={index}
								className="bg-white p-4 rounded-lg border border-gray-300"
							>
								<h3 className="font-bold text-gray-900 mb-2">{tip.title}</h3>
								<p className="text-sm text-gray-700 mb-2">{tip.tip}</p>
								{tip.example && (
									<code className="text-xs bg-gray-100 p-2 rounded block font-mono">
										{tip.example}
									</code>
								)}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
