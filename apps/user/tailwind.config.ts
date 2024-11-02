import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config/tailwind.config";
const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		...(sharedConfig.content as string[]),
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
export default config;
