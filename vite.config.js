import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Use relative paths for built assets so dist/index.html works when opened directly
  base: './', // Set the base path for your project
  plugins: [react()],build: {
    // Specify your custom build directory here
    outDir: '../build/jadwal_bola', 
    
    // Optional: Empty the directory if it's outside the project root
    emptyOutDir: true, 
  },
})
 