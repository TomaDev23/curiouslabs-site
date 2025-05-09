import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';

// Import BackgroundManager from sandbox (new implementation)
import BackgroundManager from './components/sandbox/BackgroundManager';

// Main Page (critical, keep eager loaded)
import Home from './pages/index.jsx';
import SafeV4CosmicPage from './pages/safe_v4_cosmic.jsx';
import JourneyV2 from './pages/journey-v2.jsx';

// Restore lazy loading for BackgroundSandbox
// import BackgroundSandbox from './pages/background_sandbox.jsx';

// Lazy-loaded pages for better performance
const ProductsPortal = lazy(() => import('./pages/products/index.jsx'));
const Aegis = lazy(() => import('./pages/products/aegis.jsx'));
const OpsPipe = lazy(() => import('./pages/products/opspipe.jsx'));
const MoonSignal = lazy(() => import('./pages/products/moonsignal.jsx'));
const Curious = lazy(() => import('./pages/products/curious.jsx'));
const Guardian = lazy(() => import('./pages/products/guardian.jsx'));
const Tools = lazy(() => import('./pages/tools.jsx'));
const CodeLab = lazy(() => import('./pages/codelab.jsx'));
const Blog = lazy(() => import('./pages/blog.jsx'));
const About = lazy(() => import('./pages/about.jsx'));
const Contact = lazy(() => import('./pages/contact.jsx'));
const Documentation = lazy(() => import('./pages/docs.jsx'));
const NotFound = lazy(() => import('./pages/404.jsx'));
const UniverseExperience = lazy(() => import('./pages/UniverseExperience.jsx'));
const DevPage = lazy(() => import('./pages/dev.jsx'));
const DevV4CosmicPage = lazy(() => import('./pages/dev_v4_cosmic.jsx'));
const BackgroundSandbox = lazy(() => import('./pages/background_sandbox.jsx'));
const BackgroundFinal = lazy(() => import('./pages/background_final.jsx'));
const HomeV5AtomicPage = lazy(() => import('./pages/HomeV5AtomicPage.jsx'));
import CosmicRevDev from './pages/CosmicRevDev';

// Performance monitoring context
const PerformanceContext = React.createContext({
  metrics: {},
  addMetric: () => {}
});

// Loading fallback component with timeout redirect
const LoadingFallback = () => {
  const [redirectToLegacy, setRedirectToLegacy] = useState(false);
  
  useEffect(() => {
    // If loading takes too long, redirect to legacy site
    const timeoutId = setTimeout(() => {
      console.log('Loading timeout reached, redirecting to legacy site');
      setRedirectToLegacy(true);
    }, 10000); // 10 seconds timeout
    
    return () => clearTimeout(timeoutId);
  }, []);
  
  if (redirectToLegacy) {
    return <Navigate to="/legacy" replace />;
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-curious-dark-900">
      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-8"></div>
      <p className="text-white text-center max-w-md px-4">
        Loading the cosmic experience... <br />
        <span className="text-gray-400 text-sm">If it takes too long, you'll be redirected to the legacy site.</span>
      </p>
    </div>
  );
};

// BackgroundManagerWrapper component that only renders on specific routes
const BackgroundManagerWrapper = () => {
  const location = useLocation();
  const allowedPaths = ['/', '/safe'];
  const shouldRenderBackground = allowedPaths.includes(location.pathname);
  
  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [renderStart, setRenderStart] = useState(null);
  const { addMetric } = React.useContext(PerformanceContext);
  
  // Check for user's motion preference
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;
    
    // Check initial preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Set render start time for performance monitoring
    setRenderStart(performance.now());
    
    // Listen for changes
    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches);
      console.log(`User prefers reduced motion: ${e.matches}`);
    };
    
    // Modern browsers use addEventListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } 
    // Older browsers use deprecated addListener
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);
  
  // Track render completion time
  useEffect(() => {
    return () => {
      if (renderStart && shouldRenderBackground) {
        const renderEnd = performance.now();
        const renderTime = renderEnd - renderStart;
        addMetric('backgroundManager', { 
          renderTime,
          route: location.pathname,
          timestamp: new Date().toISOString()
        });
        console.log(`BackgroundManager render time: ${renderTime.toFixed(2)}ms`);
      }
    };
  }, [renderStart, shouldRenderBackground, location.pathname, addMetric]);
  
  return shouldRenderBackground ? (
    <Suspense fallback={null}>
      <BackgroundManager />
    </Suspense>
  ) : null;
};

export default function App() {
  // Performance metrics state
  const [metrics, setMetrics] = useState({});
  
  // Add performance metric
  const addMetric = (key, value) => {
    setMetrics(prev => {
      const newMetrics = { ...prev };
      if (!newMetrics[key]) {
        newMetrics[key] = [];
      }
      newMetrics[key].push(value);
      
      // Limit array size to prevent memory issues
      if (newMetrics[key].length > 50) {
        newMetrics[key] = newMetrics[key].slice(-50);
      }
      
      return newMetrics;
    });
  };
  
  // Log performance metrics periodically in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const intervalId = setInterval(() => {
        if (Object.keys(metrics).length > 0) {
          console.log('Performance metrics:', metrics);
        }
      }, 60000); // Log every minute
      
      return () => clearInterval(intervalId);
    }
  }, [metrics]);

  return (
    <PerformanceContext.Provider value={{ metrics, addMetric }}>
      <ScrollToTop />
      
      {/* BackgroundManager only renders on permitted routes */}
      <BackgroundManagerWrapper />
      
      <Routes>
        {/* Promote V4 Cosmic experience as the main homepage */}
        <Route path="/" element={
          <Suspense fallback={<LoadingFallback />}>
            <React.StrictMode>
              <ErrorBoundary fallback={<SafeV4CosmicPage />}>
                <DevV4CosmicPage />
              </ErrorBoundary>
            </React.StrictMode>
          </Suspense>
        } />
        
        {/* Safe fallback version that can be accessed directly */}
        <Route path="/safe" element={<SafeV4CosmicPage />} />
        
        {/* Legacy Solar System route - accessible via /legacy as an Easter egg */}
        <Route path="/legacy" element={
          <Suspense fallback={<LoadingFallback />}>
            <Home />
          </Suspense>
        } />
        
        <Route path="/products" element={
          <Suspense fallback={<LoadingFallback />}>
            <ProductsPortal />
          </Suspense>
        } />
        <Route path="/products/aegis" element={
          <Suspense fallback={<LoadingFallback />}>
            <Aegis />
          </Suspense>
        } />
        <Route path="/products/opspipe" element={
          <Suspense fallback={<LoadingFallback />}>
            <OpsPipe />
          </Suspense>
        } />
        <Route path="/products/moonsignal" element={
          <Suspense fallback={<LoadingFallback />}>
            <MoonSignal />
          </Suspense>
        } />
        <Route path="/products/curious" element={
          <Suspense fallback={<LoadingFallback />}>
            <Curious />
          </Suspense>
        } />
        <Route path="/products/guardian" element={
          <Suspense fallback={<LoadingFallback />}>
            <Guardian />
          </Suspense>
        } />
        <Route path="/tools" element={
          <Suspense fallback={<LoadingFallback />}>
            <Tools />
          </Suspense>
        } />
        <Route path="/codelab" element={
          <Suspense fallback={<LoadingFallback />}>
            <CodeLab />
          </Suspense>
        } />
        <Route path="/blog" element={
          <Suspense fallback={<LoadingFallback />}>
            <Blog />
          </Suspense>
        } />
        <Route path="/about" element={
          <Suspense fallback={<LoadingFallback />}>
            <About />
          </Suspense>
        } />
        <Route path="/contact" element={
          <Suspense fallback={<LoadingFallback />}>
            <Contact />
          </Suspense>
        } />
        <Route path="/docs" element={
          <Suspense fallback={<LoadingFallback />}>
            <Documentation />
          </Suspense>
        } />
        <Route path="/docs/*" element={
          <Suspense fallback={<LoadingFallback />}>
            <Documentation />
          </Suspense>
        } />
        <Route path="/universe" element={
          <Suspense fallback={<LoadingFallback />}>
            <UniverseExperience />
          </Suspense>
        } />
        <Route path="/dev" element={
          <Suspense fallback={<LoadingFallback />}>
            <DevPage />
          </Suspense>
        } />
        
        {/* Background System Sandbox - Restored lazy loading */}
        <Route path="/background-sandbox" element={
          <Suspense fallback={<LoadingFallback />}>
            <BackgroundSandbox />
          </Suspense>
        } />
        
        {/* New Final Background Route */}
        <Route path="/background-final" element={
          <Suspense fallback={<LoadingFallback />}>
            <BackgroundFinal />
          </Suspense>
        } />
        
        {/* Temporarily disabled journey-v2 route to avoid conflicts with background-sandbox
        <Route path="/journey-v2" element={
          <Suspense fallback={<LoadingFallback />}>
            <JourneyV2 />
          </Suspense>
        } />
        */}
        
        <Route path="/home-v5" element={
          <Suspense fallback={<LoadingFallback />}>
            <HomeV5AtomicPage />
          </Suspense>
        } />
        
        <Route path="/cosmic-rev" element={<CosmicRevDev />} />
        
        <Route path="*" element={
          <Suspense fallback={<LoadingFallback />}>
            <NotFound />
          </Suspense>
        } />
      </Routes>
    </PerformanceContext.Provider>
  );
}
