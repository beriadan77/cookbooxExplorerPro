/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        heartbeat: "heartbeat 1.5s ease-in-out infinite",
      },
      keyframes: {
        heartbeat: {
          "0%": { transform: "scale(1)" },
          "10%": { transform: "scale(1.3)" },
          "20%": { transform: "scale(1)" },
          "30%": { transform: "scale(1.15)" },
          "40%": { transform: "scale(1)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
