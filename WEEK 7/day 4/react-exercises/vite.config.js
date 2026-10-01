import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { transformWithEsbuild } from 'vite'

function javascriptWithJsx() {
  return {
    name: 'javascript-with-jsx',
    enforce: 'pre',
    transform(code, id) {
      if (!id.includes('/src/') || !id.endsWith('.js')) return null
      return transformWithEsbuild(code, id, { loader: 'jsx', jsx: 'automatic' })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [javascriptWithJsx(), react({ include: /\.[jt]sx?$/ })],
})
