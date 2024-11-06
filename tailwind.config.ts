import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          blue: {
            DEFAULT: "hsl(var(--primary-blue))",
            dark: "hsl(var(--primary-blue-dark))",
            darker: "hsl(var(--primary-blue-darker))",
          },
          green: {
            DEFAULT: "hsl(var(--primary-green))",
            dark: "hsl(var(--primary-green-dark))",
            darker: "hsl(var(--primary-green-darker))",
          },
          orange: {
            DEFAULT: "hsl(var(--primary-orange))",
            dark: "hsl(var(--primary-orange-dark))",
            darker: "hsl(var(--primary-orange-darker))",
          },
          neutral: {
            DEFAULT: "hsl(var(--neutral))",
          },
        },
      },
      fontFamily: {
        uncage: "var(--font-uncage)",
        nebulas: "var(--font-nebulas)",
      },
    },
  },
  plugins: [],
}
export default config
