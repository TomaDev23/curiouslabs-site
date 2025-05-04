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
        manualChunks: (id) => {
          // Core React libraries
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom') ||
              id.includes('node_modules/react-router-dom')) {
            return 'react-vendor';
          }
          
          // UI and animation libraries
          if (id.includes('node_modules/framer-motion')) {
            return 'ui-vendor';
          }
          
          // Canvas-heavy components
          if (id.includes('SpaceCanvas.jsx') || id.includes('ParticleField.jsx')) {
            return 'canvas-rendering';
          }
          
          // V4 components
          if (id.includes('/v4/') && !id.includes('HeroPortal') && !id.includes('SpaceCanvas')) {
            return 'v4-components';
          }
        },
        // Improve chunk loading strategy
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    
    // Enable source maps for development but not production
    sourcemap: process.env.NODE_ENV === 'development',
    
    // Minification settings
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.debug']
      },
      output: {
        // Remove comments to further reduce file size
        comments: false
      }
    },
    
    // Configure asset caching strategy
    assetsInlineLimit: 4096, // 4kb - files smaller than this will be inlined as base64
    
    // Improve tree-shaking
    target: 'esnext',
    modulePreload: true
  },
  
  // Optimize performance hints
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion']
  }
});
