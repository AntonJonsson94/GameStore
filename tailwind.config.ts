import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],

  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        gamerTheme: {
          primary: "#DA1096",
          secondary: "#00C0B4",
          accent: "#2D2E30",
          neutral: "#E7EFFF",
          "base-100": "#172144",
          info: "#32D1C7",
          success: "#9BF116",
          warning: "#FFCC33",
          error: "#FF0000"
        }
      }
    ]
  }
};

export default config;
