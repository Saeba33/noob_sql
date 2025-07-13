import Description from "@/components/ui/page-description/Description";
import Title from "@/components/ui/page-description/Title";
import { SECTION_DESC_COLORS } from "@/config/colors";

export default function DescriptionSection({ pageDescription, currentBelt = null }) {
  const colors = SECTION_DESC_COLORS[currentBelt] || SECTION_DESC_COLORS.white;

  return (
    <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
