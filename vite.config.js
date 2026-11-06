import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const page = file => fileURLToPath(new URL(file, import.meta.url));

// base: './' permite abrir o build em qualquer subpasta (GitHub Pages, XAMPP...)
// Duas páginas: index.html (apresentação) e equipe.html (detalhes, aberta pelo QR Code)
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: page('./index.html'),
        equipe: page('./equipe.html')
      }
    }
  }
});
