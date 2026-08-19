import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Soru Kutty chatbot: local dev proxy (see server/) holds the Groq
      // API key server-side. Swap the target when a production backend
      // replaces the local proxy.
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
    },
  },
})
