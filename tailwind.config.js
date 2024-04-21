/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
    fontFamily: {
      barlow: ["Barlow", "sans-serif"],
      handlee: ["Handlee", "cursive"],
    },
    extend: {
      colors: {
        orange: "#F89223",
        jet: "#2e2f31",
        gray: "#7D7F82",
        "battleship-gray": "#8c8e91",
        green: "#6fb43f",
        danger: "#dc3545",
      },
    },
  },
  plugins: [],
};
