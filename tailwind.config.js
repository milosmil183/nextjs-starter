module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0369a1"
        },
        error: {
          DEFAULT: "#991b1b"
        }
      }
    }
  },
  plugins: []
};
