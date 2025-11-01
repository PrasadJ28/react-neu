import { defineConfig } from 'vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  build: {
  lib: {
    entry: path.resolve(__dirname, 'src/index.ts'),
    name: 'ReactNeu',
    fileName: 'react-neu'
  },
  rollupOptions: {
    external: ['react', 'react-dom']
  }
}
})
