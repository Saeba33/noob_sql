export default function Title({ children, className = "" }) {
  return (
    <h1 className={`text-4xl font-bold text-gray-900 mb-4 ${className}`}>
      {children}
    </h1>
  );
}
