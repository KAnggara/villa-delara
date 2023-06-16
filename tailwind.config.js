/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./**/*.{html,js}"],
  theme: {
    container: {
      center: true,
      padding: "16px",
    },
    extend: {
      colors: {
        primary: "#14b8a6",
        dark: "#0f172a",
        ocean: "#FEE2E2",
        yellow: "#FDE68A",
      },
      screens: {
        "2xl": "1320px",
      },
    },
  },
  plugins: [],
};
