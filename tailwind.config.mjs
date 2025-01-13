/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			boxShadow: {
				"card": "5px 5px 0px rgba(0, 0, 0, 0.2)"
			}
		},
	},
	plugins: [require("@catppuccin/tailwindcss")({
		defaultFlavour: "mocha"
	})],
}
