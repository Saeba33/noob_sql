import Description from "@/components/ui/page-header/Description";
import Tag from "@/components/ui/page-header/Tag";
import Title from "@/components/ui/page-header/Title";

export default function HeaderSection({ title, description, tag, beltColors = null }) {
  return (
    <div className={`py-16 ${beltColors ? beltColors.bg : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 text-center">
        {tag && (
          <Tag beltColors={beltColors} className="mb-4">
            {tag}
          </Tag>
        )}
        <Title className={beltColors ? beltColors.text : 'text-gray-900'}>
          {title}
        </Title>
        <Description className={beltColors ? beltColors.text : 'text-gray-600'}>
          {description}
        </Description>
      </div>
    </div>
  );
}
