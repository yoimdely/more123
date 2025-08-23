/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Ubuntu", "Cantarell", "Noto Sans", "Arial"],
        display: ["Playfair Display", "Manrope", "serif"]
      },
      colors: {
        espresso: "#2B2118",
        sand: "#F6E6D9",
        terracotta: "#C65D3A",
        gold: "#D4A373",
        ink: "#1F1B16"
      },
      boxShadow: {
        soft: "0 6px 20px rgba(0,0,0,.06)"
      },
      borderRadius: {
        xl2: "1rem"
      }
    },
  },
  plugins: [],
};
