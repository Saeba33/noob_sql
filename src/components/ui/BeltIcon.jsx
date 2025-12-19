import { BELTS_CONFIG } from "@/config/belts-config";
import Image from "next/image";

export default function BeltIcon({ belt, size, className}) {
	const beltConfig = BELTS_CONFIG[belt];

	return (
		<Image
			src={beltConfig.image}
			alt=""
			width={size}
			height={size}
			className={className}
			aria-label={beltConfig.title}
			role="img"
		/>
	);
}
