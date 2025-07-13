import { GiBlackBelt } from "react-icons/gi";

const BELT_ICON_COLORS = {
  white: "#E5E7EB", // gray-200 - plus clair que gray-400
  yellow: "#FCD34D", // yellow-400
  orange: "#FB923C", // orange-400
  green: "#4ADE80", // green-400
  blue: "#60A5FA", // blue-400
  brown: "#92400E", // brown-700
  black: "#111827", // gray-900 - plus foncé que gray-800
};

export default function BeltIcon({ belt, className = "", size = 64 }) {
  const color = BELT_ICON_COLORS[belt] || BELT_ICON_COLORS.white;
  
  return (
    <GiBlackBelt 
      size={size} 
      color={color} 
      className={className}
      title={`Ceinture ${belt}`}
    />
  );
}
