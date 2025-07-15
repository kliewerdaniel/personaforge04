import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'react-syntax-highlighter',
      'react-syntax-highlighter/dist/esm/light',
      'react-syntax-highlighter/dist/esm/styles/hljs',
      'react-syntax-highlighter/dist/esm/languages/hljs/json',
    ],
  },
});
