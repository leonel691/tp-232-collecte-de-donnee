import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mind: {
          navy: "#0F172A",
          indigo: "#4338CA",
          mint: "#34D399",
          violet: "#A78BFA"
        }
      }
    }
  },
  plugins: []
};

export default config;
