import Description from "@/components/ui/page-description/Description";
import Title from "@/components/ui/page-description/Title";

export default function DescriptionSection({ title, description }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gray-50 rounded-lg p-6">
        <Title>{title}</Title>
        <Description>{description}</Description>
      </div>
    </div>
  );
}
