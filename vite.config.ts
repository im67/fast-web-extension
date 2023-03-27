import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "path";
import filePlugin from "./plugins/filePlugin";

// https://vitejs.dev/config/
export default defineConfig({
  base: "http://localhost:5173/",
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: './manifest.json',
          dest: '/dev.dist'
        }
      ]
    }),
    filePlugin()
  ],
  server: {
    host: true,
    port: 8000,
    watch: {
      ignored: ['src/template/**/*']
    }
  },
  resolve: {
    alias: [
      {
        find: /^@t\//,
        replacement: path.resolve(__dirname, 'src/template') + '/'
      }, // 模块路径alias
    ]
  }
})
