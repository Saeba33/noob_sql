export default function Tag({
  children,
  variant = "primary",
  className = "",
  beltColors = null,
}) {
  const variants = {
    primary: "bg-blue-100 text-blue-800 border-blue-200",
    success: "bg-green-100 text-green-800 border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    danger: "bg-red-100 text-red-800 border-red-200",
  };

  // Use belt colors if provided, otherwise fall back to variant
  const colorClasses = beltColors
    ? `${beltColors.tagBg} ${beltColors.tagText} ${beltColors.border}`
    : variants[variant];

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${colorClasses} ${className}`}
    >
      {children}
    </span>
  );
}
