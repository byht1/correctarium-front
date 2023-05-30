import react from "@vitejs/plugin-react"
import checker from "vite-plugin-checker"
import { defineConfig } from "vite"
import path from "path"
import { readdirSync } from "fs"

const absolutePathAliases: { [key: string]: string } = {}
const srcPath = path.resolve("./")
const srcRootContent = readdirSync(srcPath, { withFileTypes: true }).map(
  dirent => dirent.name.replace(/(\.ts){1}(x?)/, "")
)

srcRootContent.forEach(directory => {
  absolutePathAliases[directory] = path.join(srcPath, directory)
})

// https://vitejs.dev/config/
export default defineConfig({
  root: "./",
  publicDir: "public",
  base: "/",
  resolve: {
    alias: {
      ...absolutePathAliases,
    },
  },

  build: {
    outDir: "dist",
  },
  server: {
    open: true,
    port: 3000,
  },
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"', // for example, lint .ts & .tsx
      },
    }),
  ],
})
