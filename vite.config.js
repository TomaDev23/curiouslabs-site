import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// Note: rollup-plugin-visualizer would require approval for installation
// import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    // Uncomment after approval and installation
    // visualizer({
    //   filename: 'dist/report.html',
    //   open: true,
    //   gzipSize: true,
    //   brotliSize: true,
    // })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
