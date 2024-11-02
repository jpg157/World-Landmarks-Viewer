import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/frontend/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  // daisyui: {
  //   themes: [
  //     {
  //       mytheme: {
  //         "primary": "#a991f7",
  //         "secondary": "#f6d860",
  //         "accent": "#37cdbe",
  //         "neutral": "#3d4451",
  //         "base-100": "#ffffff",
  //       },
  //     },
  //   ],
  // },
  // darkMode: ['class', '[data-theme="night"]'],
};
export default config;
