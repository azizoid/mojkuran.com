module.exports = {
  content: [
    "./pages/**/*.{jsx,tsx}",
    "./components/**/*.{jsx,tsx}",
    "./layouts/*.{jsx,tsx}",
    "./ui/**/*.{jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
}
