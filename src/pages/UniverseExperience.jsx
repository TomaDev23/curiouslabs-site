import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import UniverseScrollReveal from '../components/UniverseScrollReveal';

export default function UniverseExperience() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    // Check for user's motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Listen for changes to the media query
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <NavBar transparent={true} />
      </header>
      
      <main className="relative">
        {/* The UniverseScrollReveal component handles all the animations */}
        <UniverseScrollReveal prefersReducedMotion={prefersReducedMotion} />
        
        {/* Additional content sections after the main scroll experience */}
        <section className="relative bg-gray-900 py-24 px-6 md:px-12 z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Explore Our Technology</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-3">Real-time Data</h3>
                <p className="text-gray-300">
                  Access up-to-date information from space agencies and astronomical databases.
                </p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-3">3D Visualizations</h3>
                <p className="text-gray-300">
                  Experience celestial bodies and phenomena through interactive 3D models.
                </p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-3">AI Analysis</h3>
                <p className="text-gray-300">
                  Leverage our AI systems to identify patterns and make discoveries in astronomical data.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-md font-semibold shadow-lg transition-all">
                Start Your Journey
              </button>
              <button className="px-8 py-3 bg-transparent hover:bg-white/10 text-white border border-white/30 rounded-md font-semibold transition-all">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 