import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#07101f",
        navy: "#07162b",
        deep: "#0b2548",
        royal: "#0b4fb3",
        electric: "#1f8fff",
        sky: "#7fd0ff",
        cyanline: "#54d6ff",
        steel: "#8ea5bd",
        platinum: "#eef6ff",
        graphite: "#152339",
      },
      boxShadow: {
        blue: "0 12px 28px rgba(11, 79, 179, 0.22)",
        glow: "0 0 42px rgba(31, 143, 255, 0.22)",
        panel: "0 18px 46px rgba(8, 25, 51, 0.12)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
