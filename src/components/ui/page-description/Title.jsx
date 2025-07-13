export default function Title({ children, className = "" }) {
  return (
    <h2 className={`text-3xl font-semibold text-gray-900 mb-4 ${className}`}>
      {children}
    </h2>
  );
}
