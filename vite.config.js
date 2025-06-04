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
    // Increase chunk size warning limit since we're optimizing manually
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      // 🎯 AGGRESSIVE THREE.JS SPLITTING (Battle Plan Phase 2)
      
      // Three.js core library - FORCE AGGRESSIVE SPLITTING
      output: {
        manualChunks: (id) => {
          // 🚨 CRITICAL: Keep React core in main chunk to avoid context issues
          if (id.includes('node_modules/react') && !id.includes('react-three')) {
            return; // Let React stay in main chunk
          }
          
          // 🎯 AGGRESSIVE THREE.JS SPLITTING (Battle Plan Phase 2)
          
          // Three.js core library - FORCE AGGRESSIVE SPLITTING
          if (id.includes('node_modules/three')) {
            // Exclude three-globe from core splitting
            if (id.includes('three-globe')) {
              return 'three-globe';
            }
            
            // Split Three.js into very specific chunks
            if (id.includes('/geometries/') || id.includes('Geometry')) {
              return 'three-geometry';
            }
            if (id.includes('/materials/') || id.includes('Material')) {
              return 'three-materials';  
            }
            if (id.includes('/lights/') || id.includes('/scenes/') || id.includes('Light') || id.includes('Scene')) {
              return 'three-scene';
            }
            if (id.includes('/loaders/') || id.includes('Loader')) {
              return 'three-loaders';
            }
            if (id.includes('/math/') || id.includes('/constants/')) {
              return 'three-math';
            }
            if (id.includes('/renderers/') || id.includes('Renderer')) {
              return 'three-renderers';
            }
            if (id.includes('/cameras/') || id.includes('Camera')) {
              return 'three-cameras';
            }
            if (id.includes('/controls/') || id.includes('Controls')) {
              return 'three-controls';
            }
            // Remaining Three.js core
            return 'three-core';
          }
          
          // React Three Fiber - separate chunk
          if (id.includes('react-three-fiber') || id.includes('@react-three')) {
            return 'react-three-fiber';
          }
          
          // Framer Motion - separate chunk
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion';
          }
          
          // 🎯 COMPONENT-SPECIFIC CHUNKING
          
          // Large HUD system - separate chunk
          if (id.includes('components/hud/') || id.includes('HUDManager')) {
            return 'hud-system';
          }
          
          // Globe components - separate chunk  
          if (id.includes('components/ui/globe') || id.includes('Globe')) {
            return 'globe';
          }
          
          // Celestial components - separate chunk
          if (id.includes('celestial') || id.includes('Sphere') || id.includes('Planet')) {
            return 'celestial-components';
          }
          
          // Legacy museum - separate chunk
          if (id.includes('legacy') || id.includes('museum')) {
            return 'legacy-museum';
          }
          
          // Product pages - separate chunk
          if (id.includes('products') && id.includes('pages')) {
            return 'product-pages';
          }
          
          // Large vendor libraries
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
});
