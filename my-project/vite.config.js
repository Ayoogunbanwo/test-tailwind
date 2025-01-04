// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer'; // Import the visualizer plugin

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }) // Add the visualizer plugin here
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Use '@' as an alias for 'src'
    },
  },
});