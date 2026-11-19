import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FDF8F3",
        sand: "#F5EDE4",
        rose: { 50:"#FFF1F2",100:"#FFE4E6",500:"#E11D48",600:"#BE123C",700:"#9F1239" },
        gold: { 400:"#D4A853", 500:"#C9962E", 600:"#A67C1A" },
        plum: "#3D2C2E",
      },
      fontFamily: { serif: ["Georgia","'Times New Roman'","serif"], sans: ["ui-sans-serif","system-ui","sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
