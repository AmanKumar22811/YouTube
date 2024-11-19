/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        blink: "blink 1.5s infinite ease-in-out",
      },
      keyframes: {
        blink: {
          " 0%, 44%": {
            transform: "translateY(0)",
          },
          "28% ": {
            opacity: 0.4,
            transform: "translateY(-4px)",
          },
          "44%": {
            opacity: 0.2,
          },
        },
      },
    },
  },
  plugins: [],
};
