import { GiBlackBelt } from "react-icons/gi";
import { BELT_ICON_COLORS } from "@/config/colors";

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
