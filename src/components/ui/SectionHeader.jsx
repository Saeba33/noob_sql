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
      className={`relative py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden ${className}`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6">
          {/* Tag en premier pour hiérarchie visuelle */}
          {tag && (
            <div className="inline-flex items-center justify-center">
              <span
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold shadow-sm backdrop-blur-sm ${
                  colors.bg && colors.text
                    ? `${colors.bg} ${colors.text} border-2 border-blue-200`
                    : "bg-blue-100/80 text-blue-800 border-2 border-blue-200"
                }`}
              >
                {tag}
              </span>
            </div>
          )}

          {/* Titre principal avec animation */}
          {title && (
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-tight">
                {title}
              </h1>
            </div>
          )}

          {/* Sous-titre */}
          {subtitle && (
            <h2
              className={`text-2xl sm:text-3xl font-medium text-gray-700 max-w-3xl mx-auto ${subtitleClassName}`}
            >
              {subtitle}
            </h2>
          )}

          {/* Description avec design amélioré */}
          {description && (
            <div className="max-w-4xl mx-auto mt-8">
              <div
                className={`relative backdrop-blur-sm bg-white/70 border border-gray-200/50 rounded-2xl p-8 shadow-lg ${
                  colors.bg ? `${colors.bg}/20` : ""
                } ${
                  colors.border
                    ? `border-l-4 ${colors.border}`
                    : "border-l-4 border-blue-500"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-2xl"></div>
                <div className="relative">
                  <div
                    className={`text-lg leading-relaxed ${
                      colors.text || "text-gray-700"
                    } ${descriptionClassName}`}
                  >
                    {description}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
