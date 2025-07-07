/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Important pour le dark mode basé sur une classe
  theme: {
    extend: {
      fontFamily: {
        "open-sans": ["var(--font-open-sans)"],
        quicksand: ["var(--font-quicksand)"],
      },
    },
  },
  plugins: [],
};
