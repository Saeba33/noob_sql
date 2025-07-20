export default function SectionHeader({
  title,
  description,
  tag,
  tagProps,
  className = "",
  subtitle,
  subtitleClassName = "",
  descriptionClassName = "",
  currentBelt = null,
}) {
  const colors = tagProps?.beltColors || {};

  return (
    <header
      className={`relative py-16 overflow-hidden ${className}`}
    >
      
      <div className="relative max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6">
          {/* Tag avec style non-cliquable */}
          {tag && (
            <div className="inline-flex items-center justify-center">
              <span
                className={`border-simple text-sm font-medium ${
                  colors.text || "text-gray-700"
                }`}
              >
                {tag}
              </span>
            </div>
          )}

          {/* Titre principal */}
          {title && (
            <div className="space-y-2">
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight ${
                colors.text || "text-gray-900"
              }`}>
                {title}
              </h1>
            </div>
          )}

          {/* Sous-titre */}
          {subtitle && (
            <h2
              className={`text-xl sm:text-2xl font-medium text-gray-600 max-w-3xl mx-auto ${subtitleClassName}`}
            >
              {subtitle}
            </h2>
          )}

          {/* Description avec style non-cliquable */}
          {description && (
            <div className="max-w-4xl mx-auto mt-8">
              <div
                className={`border-accent p-6 shadow-sm ${
                  colors.text || "text-gray-700"
                }`}
              >
                <div
                  className={`text-base leading-relaxed ${descriptionClassName}`}
                >
                  {description}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
