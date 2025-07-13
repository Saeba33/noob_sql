import Description from "@/components/ui/page-header/Description";
import Tag from "@/components/ui/page-header/Tag";
import Title from "@/components/ui/page-header/Title";
import { SECTION_HEADER_COLORS } from "@/config/colors";

export default function HeaderSection({ header, beltColors = null, currentBelt = null }) {
  const borderColor = SECTION_HEADER_COLORS[currentBelt] || SECTION_HEADER_COLORS.white;

  return (
    <div className={`py-16 bg-white border-b-3 ${borderColor}`}>
      <div className="px-4 text-center space-y-4">
        <Title className={`${beltColors ? beltColors.text : 'text-gray-900'}`}>
          {header.title}
        </Title>
        <Description className={`${beltColors ? beltColors.text : 'text-gray-600'} text-lg max-w-2xl mx-auto`}>
          {header.description}
        </Description>
        {header.tag && (
          <Tag beltColors={beltColors}>
            {header.tag}
          </Tag>
        )}
      </div>
    </div>
  );
}
