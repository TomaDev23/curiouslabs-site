import React, { Suspense } from 'react';
import { lazy } from 'react';

// Lazy-load LEGIT components
const GalaxyJourney = lazy(() => import('../components/journey/visual/GalaxyJourney'));

// LEGIT metadata declaration
export const metadata = {
  id: 'cosmic_rev_page',
  scs: 'SCS5',
  type: 'page',
  doc: 'contract_cosmic_rev_page.md'
};

/**
 * CosmicRevDev - Development page for GalaxyJourney component
 * Creates a 550vh scrollable experience with the galaxy journey effect
 */
const CosmicRevDev = () => {
  return (
    <div id="cosmic-rev-container" className="min-h-[550vh] relative bg-black">
      {/* Fixed background */}
      <div className="fixed inset-0 bg-black z-0" />
      
      {/* Galaxy Journey Component */}
      <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center text-white">Loading Galaxy...</div>}>
        <GalaxyJourney isDebug={true} />
      </Suspense>
      
      {/* Content sections with proper IDs for scroll linkage */}
      <section id="dormant-section" className="h-[50vh] relative z-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white pt-24">Dormant Galaxy</h1>
          <p className="text-gray-300 mt-4">Scroll down to begin the cosmic journey</p>
        </div>
      </section>
      
      <section id="awakening-section" className="h-[50vh] relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white pt-24">Galaxy Awakening</h2>
          <p className="text-gray-300 mt-4">The galaxy begins to approach and trails appear</p>
        </div>
      </section>
      
      <section id="cosmic-reveal-section" className="h-[100vh] relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white pt-24">Cosmic Reveal</h2>
          <p className="text-gray-300 mt-4">The galaxy explodes into full formation</p>
          
          <div className="mt-64 text-center">
            <div className="inline-block px-6 py-3 rounded-lg bg-purple-900/50 text-white">
              Explosion Point (115-125vh)
            </div>
          </div>
        </div>
      </section>
      
      <section id="cosmic-flight-section" className="h-[350vh] relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white pt-24">Cosmic Flight</h2>
          <p className="text-gray-300 mt-4">Cruise through the fully formed galaxy</p>
          
          <div className="mt-[150vh] text-center">
            <p className="text-xl text-blue-300">Deep space exploration</p>
          </div>
        </div>
      </section>
      
      {/* Scene markers on the right side */}
      <div className="fixed right-4 inset-y-0 w-1 z-10 opacity-20">
        <div className="absolute w-full bg-blue-500 top-0 h-[10%]" />
        <div className="absolute w-full bg-purple-500 top-[10%] h-[10%]" />
        <div className="absolute w-full bg-red-500 top-[20%] h-[20%]" />
        <div className="absolute w-full bg-green-500 top-[40%] h-[60%]" />
      </div>
    </div>
  );
};

export default CosmicRevDev; 