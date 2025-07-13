import Description from "@/components/ui/page-description/Description";
import Title from "@/components/ui/page-description/Title";

// Couleurs pour chaque ceinture
const BELT_COLORS = {
  white: { 
    bg: "bg-gray-50",
    text: "text-gray-700",
    border: "border-l-gray-400"
  },
  yellow: { 
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-l-yellow-400"
  },
  orange: { 
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-l-orange-400"
  },
  green: { 
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-l-green-400"
  },
  blue: { 
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-l-blue-400"
  },
  brown: { 
    bg: "bg-yellow-50",
    text: "text-yellow-800",
    border: "border-l-yellow-800"
  },
  black: { 
    bg: "bg-gray-50",
    text: "text-gray-800",
    border: "border-l-gray-800"
  },
};

export default function DescriptionSection({ pageDescription, currentBelt = null }) {
  const colors = BELT_COLORS[currentBelt] || BELT_COLORS.white;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <Title className="mb-6">{pageDescription.title}</Title>
        <div className={`${colors.bg} ${colors.border} border-l-4 p-6 rounded-r-lg`}>
          <Description className={`${colors.text} leading-relaxed`}>
            {pageDescription.content}
          </Description>
        </div>
      </div>
    </div>
  );
}
