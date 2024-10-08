import { nextui } from "@nextui-org/react";
import { join } from "path";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    join(__dirname, "../../packages/**/*.{ts,tsx}"),
    join(
      __dirname,
      "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
    ),
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

export default config;
