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
				dark: "#0f172a",
				ocean: "#FEE2E2",
				yellow: "#FDE68A",
				secondary: "#f8f8f8",
			},
			screens: {
				"2xl": "1320px",
			},
		},
	},
	plugins: [],
};
