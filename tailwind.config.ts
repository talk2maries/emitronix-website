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
        ink: "#1E293B",
        charcoal: "#1E293B",
        graphite: "#334155",
        steel: "#64748B",
        silver: "#D6E9FF",
        platinum: "#EAF5FF",
        pearl: "#F8FBFF",
        smoke: "#F8FBFF",
        mist: "#F8FBFF",
        brand: "#194991",
        "brand-deep": "#123A73",
        "brand-dark": "#0B1F3A",
        "brand-bright": "#1EA7FF",
        "brand-sky": "#54D6FF",
        "brand-soft": "#EAF5FF",
        "brand-pale": "#F8FBFF",
        "brand-border": "#D6E9FF",
        sapphire: "#1EA7FF",
        royal: "#194991",
        navy: "#0B1F3A",
        primary: "#194991",
        secondary: "#1EA7FF",
        accent: "#0EA5E9",
      },
      boxShadow: {
        blue: "0 22px 54px rgba(25, 73, 145, 0.18)",
        glow: "0 0 64px rgba(30, 167, 255, 0.16)",
        panel: "0 24px 80px rgba(15, 40, 82, 0.08)",
        luxe: "0 34px 120px rgba(25, 73, 145, 0.14)",
        hairline: "inset 0 0 0 1px rgba(255,255,255,0.64)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
