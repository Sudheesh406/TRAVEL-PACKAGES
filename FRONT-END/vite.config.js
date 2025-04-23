import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss()],
  build: {
    outDir: 'build',
  },
  preview: {
    host: true,               
    port: 4173,               
    allowedHosts: [
      'travel-packages-front-end.onrender.com', 
      '.onrender.com',          
      'localhost',              
    ],
  },
})
