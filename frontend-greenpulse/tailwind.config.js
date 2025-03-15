/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkbg : "#3b3b3b",
        logoGreen: "#566e31", 
        card1bgcolor: "#fffdf2",
        card2bgcolor : "#f8fcf5",
        card3bgcolor : "#fcf8f2",
      },
      boxShadow: {
        greenshadow: "0px 0px 1px #566d2e",
      },
    },
  },
  plugins: [],
};
