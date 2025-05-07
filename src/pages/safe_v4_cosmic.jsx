import React, { Suspense, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useBackgroundZone from '../hooks/useBackgroundZone';

/**
 * Safe version of the DevV4CosmicPage with minimal dependencies
 * Used as a fallback when the full page fails to load
 */
const SafeV4CosmicPage = () => {
  // Background zone hooks for simplified sections
  const { ref: heroZoneRef } = useBackgroundZone('hero');
  const { ref: footerZoneRef } = useBackgroundZone('footer');
  
  useEffect(() => {
    console.log('SafeV4CosmicPage mounted - minimal version');
    console.log('Background zones initialized (simplified version)');
    
    return () => {
      console.log('SafeV4CosmicPage unmounted');
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Minimal header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-white">CuriousLabs</Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-white">Home</Link>
            <Link to="/legacy" className="text-white">Legacy Site</Link>
            <Link to="/about" className="text-white">About</Link>
            <Link to="/contact" className="text-white">Contact</Link>
          </nav>
          
          <div className="md:hidden">
            <Link to="/legacy" className="text-white">Legacy</Link>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="pt-20">
        {/* Hero Section with background zone */}
        <section 
          ref={heroZoneRef}
          className="py-20 text-center flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-b from-purple-900/20 to-gray-900"
        >
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Curious Labs
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10">
              Exploring the frontiers of code with AI-powered development missions
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link 
                to="/legacy" 
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                Visit Legacy Site
              </Link>
              <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-3 border border-purple-600 hover:bg-purple-600/20 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
            
            <div className="mt-16 p-4 bg-gray-800/50 rounded-lg max-w-md mx-auto">
              <h2 className="text-xl font-semibold mb-2">Simplified Experience</h2>
              <p className="text-gray-400">
                This is a reduced version of our site. We're experiencing technical difficulties with the full experience.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer with background zone */}
      <footer 
        ref={footerZoneRef}
        className="bg-gray-900 border-t border-gray-800 py-8 mt-20"
      >
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© {new Date().getFullYear()} CuriousLabs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SafeV4CosmicPage; 