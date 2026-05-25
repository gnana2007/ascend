import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        mist: "#f6fbf8",
        ink: "#17211f",
        sage: "#9dd9c8",
        coral: "#ff9e8f",
        lilac: "#c9b8ff",
        honey: "#f5ca6b",
        skyglass: "#c8e8ff"
      },
      boxShadow: {
        glass: "0 24px 80px rgba(31, 41, 55, 0.12)",
        glow: "0 0 34px rgba(157, 217, 200, 0.45)"
      },
      borderRadius: {
        xl2: "1.4rem"
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" }
        },
        fill: {
          "0%": { height: "18%" },
          "100%": { height: "74%" }
        }
      },
      animation: {
        floaty: "floaty 5s ease-in-out infinite",
        fill: "fill 2.4s ease-in-out infinite alternate"
      }
    }
  },
  plugins: [animate]
} satisfies Config;
