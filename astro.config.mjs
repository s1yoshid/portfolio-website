import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mermaid from 'astro-mermaid';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    mermaid({
      theme: 'dark',
      autoTheme: false
    })
  ],
});
