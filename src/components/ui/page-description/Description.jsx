export default function Description({ children, className = "" }) {
  return (
    <div className={`text-gray-700 leading-relaxed ${className}`}>
      {children}
    </div>
  );
}
