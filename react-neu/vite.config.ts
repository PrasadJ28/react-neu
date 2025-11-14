import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import path from "path";

const isLibraryMode = process.env.LIB === "true";

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  root: ".", // serves index.html for dev mode
  build: isLibraryMode
    ? {
        lib: {
          entry: path.resolve(__dirname, "src/index.ts"),
          name: "ReactNeu",
          fileName: "react-neu",
        },
        rollupOptions: {
          external: ["react", "react-dom"],
        },
      }
    : {},
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});

