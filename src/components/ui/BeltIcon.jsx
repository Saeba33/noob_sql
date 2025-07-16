import { GiBlackBelt } from "react-icons/gi";
import { BELT_COLORS } from "@/config/colors";

export default function BeltIcon({ belt, className = "", size = 64 }) {
  const color = BELT_COLORS[belt]?.icon || BELT_COLORS.white.icon;
  
  return (
    <GiBlackBelt 
      size={size} 
      color={color} 
      className={className}
      title={`Ceinture ${belt}`}
    />
  );
}
