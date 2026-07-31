import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design plan: "Midnight Constellation"
        midnight: {
          950: "#070818",
          900: "#0B0F2E",
          800: "#121638",
          700: "#1B2050",
        },
        blush: {
          400: "#FF9FC0",
          500: "#FF6FA5",
          600: "#E8548C",
        },
        gold: {
          300: "#F6DFA6",
          400: "#F4C77A",
          500: "#E3AC4F",
        },
        cream: "#F8F5F0",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      backgroundImage: {
        "star-radial": "radial-gradient(circle at center, rgba(244,199,122,0.9), transparent 70%)",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.2", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        driftUp: {
          "0%": { transform: "translateY(0) translateX(0)", opacity: "0" },
          "10%": { opacity: "1" },
          "100%": { transform: "translateY(-100vh) translateX(20px)", opacity: "0" },
        },
      },
      animation: {
        twinkle: "twinkle 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        driftUp: "driftUp 8s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
