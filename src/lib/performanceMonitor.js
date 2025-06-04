// 🚀 PHASE 6: Performance Monitoring System
// CuriousLabs Bundle Size & Performance Optimization

class PerformanceMonitor {
  constructor() {
    this.metrics = {
      bundleLoading: [],
      memoryUsage: [],
      renderTimes: [],
      threeJsUsage: [],
      chunkLoading: []
    };
    this.observers = new Set();
    this.isEnabled = process.env.NODE_ENV === 'development';
    
    // Initialize performance monitoring
    this.init();
  }
  
  init() {
    if (!this.isEnabled || typeof window === 'undefined') return;
    
    console.log('🎯 Performance Monitor initialized for Phase 6 optimization');
    
    // Monitor bundle loading
    this.setupBundleMonitoring();
    
    // Monitor Three.js usage
    this.setupThreeJsMonitoring();
    
    // Monitor memory usage
    this.setupMemoryMonitoring();
    
    // Monitor chunk loading
    this.setupChunkMonitoring();
  }
  
  setupBundleMonitoring() {
    // Monitor script loading performance
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation' || entry.entryType === 'resource') {
          if (entry.name.includes('chunk') || entry.name.includes('.js')) {
            this.addMetric('bundleLoading', {
              name: entry.name,
              size: entry.transferSize || 0,
              loadTime: entry.duration,
              timestamp: Date.now()
            });
          }
        }
      });
    });
    
    try {
      observer.observe({ entryTypes: ['navigation', 'resource'] });
    } catch (e) {
      console.warn('Performance Observer not supported', e);
    }
  }
  
  setupThreeJsMonitoring() {
    // Monitor Three.js specific usage
    if (typeof window !== 'undefined' && window.THREE) {
      this.monitorThreeJsMemory();
    }
    
    // Listen for Three.js initialization
    window.addEventListener('threeJsInitialized', (event) => {
      this.addMetric('threeJsUsage', {
        component: event.detail.component,
        geometry: event.detail.geometryCount || 0,
        materials: event.detail.materialCount || 0,
        textures: event.detail.textureCount || 0,
        timestamp: Date.now()
      });
    });
  }
  
  setupMemoryMonitoring() {
    if (typeof window === 'undefined' || !performance.memory) return;
    
    // Monitor memory every 10 seconds
    setInterval(() => {
      const memory = performance.memory;
      this.addMetric('memoryUsage', {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
        timestamp: Date.now()
      });
    }, 10000);
  }
  
  setupChunkMonitoring() {
    // Monitor dynamic imports
    const originalImport = window.__import || window.import;
    
    window.__dynamicImportMonitor = (path) => {
      const startTime = performance.now();
      
      return originalImport(path).then((module) => {
        const endTime = performance.now();
        this.addMetric('chunkLoading', {
          path,
          loadTime: endTime - startTime,
          success: true,
          timestamp: Date.now()
        });
        return module;
      }).catch((error) => {
        const endTime = performance.now();
        this.addMetric('chunkLoading', {
          path,
          loadTime: endTime - startTime,
          success: false,
          error: error.message,
          timestamp: Date.now()
        });
        throw error;
      });
    };
  }
  
  monitorThreeJsMemory() {
    // Custom Three.js memory tracking
    if (typeof window !== 'undefined' && window.THREE) {
      const THREE = window.THREE;
      
      // Track geometry creation
      const originalBufferGeometry = THREE.BufferGeometry.prototype.dispose;
      THREE.BufferGeometry.prototype.dispose = function() {
        this._monitored_disposed = true;
        return originalBufferGeometry.call(this);
      };
      
      // Track material creation
      const originalMaterial = THREE.Material.prototype.dispose;
      THREE.Material.prototype.dispose = function() {
        this._monitored_disposed = true;
        return originalMaterial.call(this);
      };
      
      // Track texture creation
      const originalTexture = THREE.Texture.prototype.dispose;
      THREE.Texture.prototype.dispose = function() {
        this._monitored_disposed = true;
        return originalTexture.call(this);
      };
    }
  }
  
  addMetric(category, data) {
    if (!this.metrics[category]) {
      this.metrics[category] = [];
    }
    
    this.metrics[category].push(data);
    
    // Limit array size to prevent memory issues
    if (this.metrics[category].length > 100) {
      this.metrics[category] = this.metrics[category].slice(-100);
    }
    
    // Notify observers
    this.notifyObservers(category, data);
  }
  
  getMetrics(category = null) {
    if (category) {
      return this.metrics[category] || [];
    }
    return this.metrics;
  }
  
  getBundleAnalysis() {
    const bundleMetrics = this.getMetrics('bundleLoading');
    const chunkMetrics = this.getMetrics('chunkLoading');
    
    return {
      totalBundles: bundleMetrics.length,
      averageLoadTime: this.calculateAverage(bundleMetrics, 'loadTime'),
      totalSize: bundleMetrics.reduce((sum, metric) => sum + (metric.size || 0), 0),
      chunks: {
        total: chunkMetrics.length,
        successful: chunkMetrics.filter(m => m.success).length,
        averageLoadTime: this.calculateAverage(chunkMetrics, 'loadTime')
      }
    };
  }
  
  getThreeJsAnalysis() {
    const threeMetrics = this.getMetrics('threeJsUsage');
    
    if (!threeMetrics.length) return null;
    
    return {
      components: threeMetrics.length,
      totalGeometry: threeMetrics.reduce((sum, m) => sum + (m.geometry || 0), 0),
      totalMaterials: threeMetrics.reduce((sum, m) => sum + (m.materials || 0), 0),
      totalTextures: threeMetrics.reduce((sum, m) => sum + (m.textures || 0), 0)
    };
  }
  
  getMemoryAnalysis() {
    const memoryMetrics = this.getMetrics('memoryUsage');
    
    if (!memoryMetrics.length) return null;
    
    const latest = memoryMetrics[memoryMetrics.length - 1];
    const initial = memoryMetrics[0];
    
    return {
      current: latest,
      growth: latest.used - initial.used,
      averageUsage: this.calculateAverage(memoryMetrics, 'used'),
      peakUsage: Math.max(...memoryMetrics.map(m => m.used))
    };
  }
  
  calculateAverage(metrics, field) {
    if (!metrics.length) return 0;
    return metrics.reduce((sum, metric) => sum + (metric[field] || 0), 0) / metrics.length;
  }
  
  subscribe(callback) {
    this.observers.add(callback);
    return () => this.observers.delete(callback);
  }
  
  notifyObservers(category, data) {
    this.observers.forEach(callback => {
      try {
        callback(category, data);
      } catch (error) {
        console.error('Performance monitor observer error:', error);
      }
    });
  }
  
  generateReport() {
    if (!this.isEnabled) return null;
    
    const report = {
      timestamp: new Date().toISOString(),
      bundle: this.getBundleAnalysis(),
      threeJs: this.getThreeJsAnalysis(),
      memory: this.getMemoryAnalysis(),
      summary: {
        totalMetrics: Object.values(this.metrics).reduce((sum, arr) => sum + arr.length, 0),
        monitoringDuration: Date.now() - (this.initTimestamp || Date.now())
      }
    };
    
    console.group('🎯 Phase 6 Performance Report');
    console.log('Bundle Analysis:', report.bundle);
    console.log('Three.js Analysis:', report.threeJs);
    console.log('Memory Analysis:', report.memory);
    console.groupEnd();
    
    return report;
  }
  
  reset() {
    Object.keys(this.metrics).forEach(key => {
      this.metrics[key] = [];
    });
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();

// Export utilities
export const trackThreeJsComponent = (componentName, stats = {}) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('threeJsInitialized', {
      detail: {
        component: componentName,
        ...stats
      }
    }));
  }
};

export const trackRenderTime = (componentName, renderTime) => {
  performanceMonitor.addMetric('renderTimes', {
    component: componentName,
    renderTime,
    timestamp: Date.now()
  });
};

export const generatePerformanceReport = () => {
  return performanceMonitor.generateReport();
};

export default performanceMonitor; 