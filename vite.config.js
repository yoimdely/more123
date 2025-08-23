import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Базовый путь для GitHub Pages:
 * - Локально (npm run dev) будет '/' — всё работает как обычно.
 * - На GitHub Actions переменная GITHUB_REPOSITORY есть всегда, из неё берём имя репозитория.
 *   В проде base станет '/<repo-name>/' и пути к бандлам будут корректными.
 */
const repoName =
  process.env.GITHUB_REPOSITORY?.split('/')?.pop() || ''

export default defineConfig({
  plugins: [react()],
  base: repoName ? `/${repoName}/` : '/', // <- ключевая строка
  build: {
    outDir: 'dist',
    // можно включить манифест (не обязательно)
    // manifest: true,
  },
})
