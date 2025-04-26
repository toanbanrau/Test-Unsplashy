import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Đảm bảo quét các file trong app/ folder
    "./components/**/*.{js,ts,jsx,tsx}", // Quét cả folder components nếu có
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'], // Dùng font Inter
      },
    },
  },
  plugins: [],
};

export default config;
