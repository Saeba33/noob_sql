export default function Description({ children, className = "" }) {
  return (
    <p className={`text-lg text-gray-600 mb-6 leading-relaxed ${className}`}>
      {children}
    </p>
  );
}
