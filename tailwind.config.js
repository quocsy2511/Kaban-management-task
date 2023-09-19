/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: "#2b2c37",
        secondary: "#635fc7",
        secondaryHover: "#635fc740",
        btnSecondary: "#635fc71a",
        darkDropDown: "#00000080",
        darkShadow: "#364e7e1a",
        darkSecondary: "#20212c",
        sideBarBg: "#d6e3f8",
        textCol: "#828fa3",
        bgSubtask: "#f4f7fd",
        text4: "#B2B3BD",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
