import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/pentestX/", // <-- Add this line with your repo name
  plugins: [tailwindcss(), react()],
});
