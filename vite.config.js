import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@providers",
        replacement: path.resolve(__dirname, "./src/providers"),
      },
      {
        find: "@providers/*",
        replacement: path.resolve(__dirname, "./src/providers/*"),
      },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "./src/components"),
      },
      {
        find: "@components/*",
        replacement: path.resolve(__dirname, "./src/components/*"),
      },
    ],
  },
});
