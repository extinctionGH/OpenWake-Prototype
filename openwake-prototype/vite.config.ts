import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Recharts is intentionally bundled for a single offline-first static experience.
    chunkSizeWarningLimit: 700,
  },
})
