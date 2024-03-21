import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@interfaces': '/src/interfaces',
      '@services': '/src/services',
      '@utils': '/src/utils',
      '@assets': '/src/assets',
    },
  },
  server: {
    fs: {
      strict: false,
    },
  },
})
