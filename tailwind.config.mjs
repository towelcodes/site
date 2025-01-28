/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			'jersey': ['"Jersey 10"', '"MS UI Gothic"', 'sans-serif'],
			"sans": ["'MS UI Gothic'", "nec_apc3", "Verdana", "sans-serif"]
		},
		extend: {
			boxShadow: {
				"card": "5px 5px 0px rgba(0, 0, 0, 0.2)",
				"glow": "0px 0px 30px 0px #d7b0ff, inset 0px 0px 30px 20px rgba(241, 165, 255, 0.4)"
			},
			dropShadow: {
				"glow": "0 0 10px #9836d9",
			},
			animation: {
				"wave": "wave 1s cubic-bezier(.6,.01,.47,.99) infinite alternate",
				"scrollup": "scrollup 8s linear infinite, pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
			},
			keyframes: {
				"wave": {
					"0%": { transform: "translateY(-10px)" },
					"100%": { transform: "translateY(10px)" }
				},
				"scrollup": {
					"0%": { transform: "translateY(0px)" },
					"100%": { transform: "translateY(-50%)" }
				}
			}
		},
	},
	plugins: [require("@catppuccin/tailwindcss")({
		defaultFlavour: "mocha"
	})],
}
