export default function Title({ children, isOpen, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-t-lg ${
        isOpen ? "border-b-0" : "rounded-b-lg"
      } transition-colors duration-200 ${className}`}
    >
      <h3 className="text-lg font-semibold text-gray-900">{children}</h3>
      <ion-icon
        name="chevron-down-outline"
        class={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
      ></ion-icon>
    </button>
  );
}
