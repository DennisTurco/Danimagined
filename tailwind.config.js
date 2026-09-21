/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#242220",
        panel: "#1e1c1a",
        darkest: "#1a1816",
        marquee: "#1b1917",
        cream: "#f6f1e8",
        gold: "#c5a46d",
        goldlight: "#dbb48e",
        taupe: "#8e8276",
        aboutdark: "#3a352f",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-jost)", "sans-serif"],
      },
      animation: {
        kenburns: "kenburns 22s ease-in-out infinite alternate",
        slowzoom: "slowzoom 6.5s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        kenburns: {
          "0%": { transform: "scale(1.02)" },
          "100%": { transform: "scale(1.14)" },
        },
        slowzoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.12)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
