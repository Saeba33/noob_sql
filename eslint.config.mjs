import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
	...nextCoreWebVitals,
	{
		ignores: [".next/**", "out/**", "build/**", "node_modules/**"],
	},
	{
		rules: {
			// Contenu pédagogique en français : apostrophes et guillemets dans le JSX
			"react/no-unescaped-entities": "off",
		},
	},
];

export default eslintConfig;
