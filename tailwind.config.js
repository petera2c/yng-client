module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {},
    extend: {
      colors: {
        purple: {
          100: "rgb(238, 230, 255, 0.75)",
          200: "#bd99ff",
          300: "#9c66ff",
          400: "#7a33ff",
          500: "#5800FF",
          600: "#4700cc",
          700: "#360099",
          800: "#240066",
          900: "#120033",
        },
      },
    },
  },
  plugins: [],
};
