import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/BurnYourOwnStyle/' : '/',
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
  },
  preview: {
    port: 4173,
    open: false,
  },
}))
