/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: "#E5E7EB",
        main: "#333333",
        light: "#999999",
        "light-border": "#EEEEEE",
        "dark-border": "#DDDDDD",
      },
      opacity: {
        15: ".15",
      },
      lineHeight: {
        0: "0",
      },
      spacing: {
        4.5: "1.125rem",
        5.5: "1.375rem",
        18: "4.5rem",
        22: "5.5rem",
        72: "18rem",
        76: "19rem",
      },
      animation: {
        move: "move 6s linear infinite",
      },
    },
  },
  plugins: [],
};
