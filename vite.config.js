import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' permite abrir o build em qualquer subpasta do servidor
export default defineConfig({
  plugins: [react()],
  base: './'
});
