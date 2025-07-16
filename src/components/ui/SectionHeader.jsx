export default function SectionHeader({ title, description, tag, tagProps, className = "", subtitle, subtitleClassName = "", descriptionClassName = "", currentBelt = null, pageDescriptionColors = null, headerColors = null }) {
  const colors = pageDescriptionColors || headerColors || {};

  return (
    <header className={`py-16 bg-white ${className}`}>
      <div className="px-4 text-center space-y-4">
        {title && (
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
        )}
        {subtitle && (
          <h2 className={`text-3xl font-semibold text-gray-900 mb-4 ${subtitleClassName}`}>
            {subtitle}
          </h2>
        )}
        {description && (
          <div className={`text-gray-700 leading-relaxed ${descriptionClassName}`}>
            <div className={`${colors.bg} ${colors.border} border-l-4 p-6 rounded-r-lg`}>
              {description}
            </div>
          </div>
        )}
        {tag && (
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${tagProps?.beltColors || tagProps?.variant || "bg-blue-100 text-blue-800 border-blue-200"}`}
          >
            {tag}
          </span>
        )}
      </div>
    </header>
  );
}
