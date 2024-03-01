import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
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
};
export default config;
