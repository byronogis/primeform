import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import { ViteEjsPlugin } from 'vite-plugin-ejs'
import pkg from '../package.json'

export default defineConfig({
  base: '/primeform',
  plugins: [
    UnoCSS(),
    ViteEjsPlugin({
      title: `primeform | Playground`,
      name: 'primeform',
      version: pkg.version,
      repo: pkg.repository.url,
    }),
  ],
})
