import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // These paths match your folder structure (Root level)
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    
    // Keeping these just in case you create a 'src' folder later
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        power: {
          black: "#050505",      // Deep Background
          dark: "#121212",       // Card Background
          red: "#D72638",        // YOUR LOGO RED (Power Red)
          silver: "#E5E5E5",     // Metallic Text
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'], 
      },
    },
  },
  plugins: [],
};
export default config;