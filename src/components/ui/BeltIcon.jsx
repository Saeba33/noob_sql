import { BELT_COLORS } from "@/config/belts-config";
import { GiBlackBelt } from "react-icons/gi";

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
