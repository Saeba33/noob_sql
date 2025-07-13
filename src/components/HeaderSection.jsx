import Description from "@/components/ui/page-header/Description";
import Tag from "@/components/ui/page-header/Tag";
import Title from "@/components/ui/page-header/Title";

// Couleurs de bordure pour chaque ceinture
const BELT_BORDER_COLORS = {
  white: "border-gray-400",
  yellow: "border-yellow-400", 
  orange: "border-orange-400",
  green: "border-green-400",
  blue: "border-blue-400",
  brown: "border-amber-700",
  black: "border-gray-800",
};

export default function HeaderSection({ header, beltColors = null, currentBelt = null }) {
  const borderColor = BELT_BORDER_COLORS[currentBelt] || "border-gray-400";

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
