import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';

// Main Page (critical, keep eager loaded)
import Home from './pages/index.jsx';
import SafeV4CosmicPage from './pages/safe_v4_cosmic.jsx';

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
const TestCanvasPage = lazy(() => import('./pages/test_canvas.jsx'));

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

export default function App() {
  return (
    <>
      <ScrollToTop />
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
        
        {/* Preserve test_canvas diagnostic route */}
        <Route path="/test_canvas" element={
          <Suspense fallback={<LoadingFallback />}>
            <TestCanvasPage />
          </Suspense>
        } />
        <Route path="*" element={
          <Suspense fallback={<LoadingFallback />}>
            <NotFound />
          </Suspense>
        } />
      </Routes>
    </>
  );
}
