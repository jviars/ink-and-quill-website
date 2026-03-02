import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";


export default defineConfig({
  base: "/ink-and-quill-website/",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: [

    react(),
    cloudflare(),
  ],
  server: {
    allowedHosts: true,
  },
  build: {
    chunkSizeWarningLimit: 5000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
