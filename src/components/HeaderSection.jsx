import Description from "@/components/ui/page-header/Description";
import Tag from "@/components/ui/page-header/Tag";
import Title from "@/components/ui/page-header/Title";

export default function HeaderSection({ header, beltColors = null }) {
  return (
    <div className={`py-20 ${beltColors ? beltColors.bg : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 text-center max-w-4xl">
        {header.tag && (
          <Tag beltColors={beltColors} className="mb-6">
            {header.tag}
          </Tag>
        )}
        <Title className={`${beltColors ? beltColors.text : 'text-gray-900'} mb-6`}>
          {header.title}
        </Title>
        <Description className={`${beltColors ? beltColors.text : 'text-gray-600'} text-lg max-w-2xl mx-auto`}>
          {header.description}
        </Description>
      </div>
    </div>
  );
}
