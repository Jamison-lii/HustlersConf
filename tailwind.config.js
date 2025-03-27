export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Poppins", "sans-serif"], // For titles
        body: ["Open Sans", "sans-serif"], // For body text
        legal: ["Crimson Text", "serif"], // For legal quotes/citations
      },
      colors: {
        primary: "#4b4efc",
        light: "#f5f6fc",
      },
    },
  },
  plugins: [],
};
