import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        barclays: {
          blue: '#00395D',
          'blue-light': '#005999',
          teal: '#00AEEF',
          'teal-dark': '#0097CF',
          cyan: '#00B2E2',
          gold: '#FFB800',
          gray: '#6B7280',
          'gray-light': '#F4F6F8',
          'gray-border': '#D1D5DB',
          dark: '#1A1A1A',
        },
      },
    },
  },
  plugins: [],
};
export default config;
