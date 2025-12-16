import { BELTS_CONFIG } from "@/config/belts-config";
import Image from "next/image";

export default function BeltIcon({ belt, size, className}) {
	const beltConfig = BELTS_CONFIG[belt];

	return (
		<Image
			src={beltConfig.image}
			alt={`Ceinture ${belt}`}
			width={size}
			height={size}
			className={className}
			aria-hidden="true"
			title={`Ceinture ${belt}`}
		/>
	);
}
