import Description from "@/components/ui/page-description/Description";
import Title from "@/components/ui/page-description/Title";

export default function DescriptionSection({ pageDescription }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <Title className="mb-4">{pageDescription.title}</Title>
        <Description className="text-gray-700 leading-relaxed">
          {pageDescription.content}
        </Description>
      </div>
    </div>
  );
}
