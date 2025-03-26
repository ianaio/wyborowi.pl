/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      backdropBlur: {
        xs: "2px", // Custom smaller blur if needed
      },
      backgroundOpacity: {
        5: "0.05", // Even more subtle transparency
      },
    },
  },
  plugins: [],
};
