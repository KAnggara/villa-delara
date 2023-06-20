/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./**/*.{html,js}"],
	theme: {
		extend: {
			fontFamily: {
				poppins: ["Poppins"],
			},
			container: {
				center: true,
			},
			colors: {
				primary: "#14b8a6",
				secondary: "#f8f8f6",
				greenLite: "#dee8e0",
				peach: "#f5e3db",
				paletA: "#a9def9",
				paletB: "#d0f4de",
				paletD: "#fcf6bd",
				dark: "#0f172a",
				ocean: "#FEE2E2",
				yellow: "#FDE68A",
				airbnb: "#FF5A5F",
				whatsapp: "#25D366",
			},
			screens: {
				"2xl": "1320px",
			},
		},
	},
	plugins: [],
};
