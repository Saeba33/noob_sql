import { MdExpandMore } from "react-icons/md";

export default function Title({ children, isOpen, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-6 flex items-center justify-between bg-white hover:bg-gray-50 border border-gray-200 rounded-t-lg ${
        isOpen ? "border-b-0 bg-gray-50" : "rounded-b-lg shadow-sm"
      } transition-all duration-200 group ${className}`}
    >
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700">
        {children}
      </h3>
      <MdExpandMore
        className={`w-5 h-5 text-gray-500 transition-transform duration-200 group-hover:text-gray-700 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
  );
}
