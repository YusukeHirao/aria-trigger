import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["umd", "es"],
      name: "aria-trigger",
      fileName(format) {
        if (format === "es") {
          return `${this.name}.mjs`;
        }
        return `${this.name}.${format}.js`;
      },
    },
  },
});
