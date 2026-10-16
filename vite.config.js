import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// O site fica em frontend/ (com o index.html) e usa a landing page de landing/.
export default defineConfig({
  root: 'frontend',
  plugins: [react()],
  server: {
    // libera o acesso à pasta landing/, que fica fora de frontend/
    fs: { allow: ['..'] },
    // no "npm run dev", /api/... vai para o backend local (porta 3000) sem o /api
    // (regex com a barra, para não desviar o módulo /api.js do próprio frontend)
    proxy: {
      '^/api/': {
        target: 'http://localhost:3000',
        rewrite: (caminho) => caminho.replace(/^\/api/, ''),
      },
    },
  },
  // o build vai para dist/ na raiz do projeto
  build: { outDir: '../dist', emptyOutDir: true },
})
