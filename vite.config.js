import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'handle-client-side-routing',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Check if the request is for a client-side route
          if (req.url.startsWith('/dev/') && !req.url.includes('.')) {
            // Serve the index.html for client-side routes
            req.url = '/';
          }
          next();
        });
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Provide fallbacks for missing Three.js modules
      'three/webgpu': path.resolve(__dirname, 'src/utils/three-webgpu-fallback.js'),
      'three/tsl': path.resolve(__dirname, 'src/utils/three-tsl-fallback.js')
    }
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    exclude: ['three/webgpu', 'three/tsl'],
    include: ['three', 'three-globe']
  },
  server: {
    open: true,
    port: 5173,
    strictPort: true,
    host: true,
    // Handle client-side routing
    proxy: {
      '/background-sandbox': {
        target: 'http://localhost:5173',
        changeOrigin: false,
        rewrite: (path) => '/'
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Force Three.js and related libraries into separate chunks
          'three-core': ['three'],
          'three-globe': ['three-globe'],
          'react-three-fiber': ['@react-three/fiber'],
          'react-three-drei': ['@react-three/drei'],
          // Group other large dependencies
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['framer-motion']
        }
      }
    }
  }
});
