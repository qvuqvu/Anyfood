/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      h1: "36px",
      h2: "32px",
      h3: "24px",
      h4: "20px",
      h5: "18px",
      h6: "16px",
      h7: "14px",
    },
    screens: {
      mobile: "320px",
      tablet: "768px",
      laptop: "1024px",
      large: "1280px",
      huge: "1536px"
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      pops: ["Poppins", "sans-serif"],
    },

    extend: { 
      colors: {
        primary: "#1D3E9C",
        dark_primary: "#132866",
        secondary: "#FDCD00",
        pumpkin: "#FF6D3B",
        light_grey: "#f9f9f9",
        accent_light: "#FE99C5",
        accent_dark: "#8FD8B5",
        border_light: "#FFFFFF",
        border_dark: "#484848",
        border_gray: "#EBE8F4",
        border_dark: "#CAC6DA"
      },
      spacing: {
        1: "1px",
      },
      keyframes: {
        lightbounce: {
          "0%, 100%": {
            transform: "translateY(-25%)",
          },
          "50%": {
            transform: "translateY(-20%)",
          },
        },
        growth: {
          from: {
            transform: "scale(0.7)",
          },
          to: {
            transform: "scale(1)",
          },
        },
        fadeIn: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
        fadeOut: {
          from: {
            opacity: "1",
          },
          to: {
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
