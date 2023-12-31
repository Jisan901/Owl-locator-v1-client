import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'axios': '@bundled-es-modules/axios/axios.js',
      "socket.io-client": "socket.io-client/dist/socket.io.js",
    },
  },
})
