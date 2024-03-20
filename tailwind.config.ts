import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  plugins: [require("daisyui")],
  gamerTheme: {
      primary: "#00C0B4",
      secondary: "#D10382",
      accent: "#32D1C7",
      neutral: "#172144",
      "base-100": "#1742144",
      info: "#f3f4f6",
      success: "#84cc16",
      warning: "#d97706",
      error: "#e11d48",
    },
  }
  
export default config;
