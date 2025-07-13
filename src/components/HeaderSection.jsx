import Description from "@/components/ui/page-header/Description";
import Tag from "@/components/ui/page-header/Tag";
import Title from "@/components/ui/page-header/Title";

export default function HeaderSection({ title, description, tag }) {
  return (
    <div className="bg-white border-b border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Title>{title}</Title>
          <Description>{description}</Description>
          {tag && (
            <div className="mb-4">
              <Tag variant="primary">{tag}</Tag>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
