const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		filter: {
			"black": "invert(0%) sepia(100%) saturate(31%) hue-rotate(83deg) brightness(94%) contrast(107%)"
		},
		fontFamily: {
			'jersey': ['"Jersey 10"', '"MS UI Gothic"', 'sans-serif'],
			"sans": ["'MS UI Gothic'", "nec_apc3", "Verdana", "sans-serif"],
			"mono": ["JetBrains Mono", "monospace"],
			"display": ["Funnel Display", "MS UI Gothic", "Verdana", "sans-serif"],
			"pixel": ["Zpix", "nec_apc3"],
			"ds": ["Nintendo DS", "Zpix", "nec_apc3"],
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
			},
			textShadow: {
				DEFAULT: "2px 2px 0px var(--tw-shadow-color)",
				lg: "2px 2px 4px var(--tw-shadow-color)",
			}
		},
	},
	plugins: [require("@catppuccin/tailwindcss")({
		defaultFlavour: "mocha"
	}),
	require("tailwindcss-highlights"),
	plugin(function( { matchUtilities, theme } ) {
		matchUtilities({
			"text-shadow": (value) => ({
				textShadow: value,
			}),
		}, { values: theme("textShadow") })
	})],
}
