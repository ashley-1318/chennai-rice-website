import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // host: true binds every interface (IPv4 + IPv6), so the dev server is
  // reachable at 127.0.0.1 and from a phone on the same network.
  server: { port: 5173, host: true, open: false },
  preview: { port: 5173, host: true },
  build: { outDir: "dist", assetsInlineLimit: 2048 }
});
