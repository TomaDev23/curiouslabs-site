/**
 * @page process_comparison.jsx
 * @description Comparison page for ProcessAtomic and ProcessLegacyAtomic components
 */

import React from 'react';
import ProcessAtomic from '../components/atomic/ProcessAtomic';
import ProcessLegacyAtomic from '../components/atomic/ProcessLegacyAtomic';
import BrokenOrbitalRings from '../components/atomic/BrokenOrbitalRings';
import SimpleOrbitalRings from '../components/atomic/SimpleOrbitalRings';
import CosmicBackgroundMini from '../components/atomic/CosmicBackgroundMini';

const ProcessComparisonPage = () => {
  return (
    <div className="bg-curious-dark-950 text-white min-h-screen">
      {/* Toggle controls */}
      <div className="px-4 py-2 border-b border-gray-800 flex flex-wrap justify-center gap-2 sticky top-0 bg-curious-dark-950/90 backdrop-blur-sm z-10">
        <a 
          href="#modern"
          className="px-3 py-1 text-sm bg-blue-900 hover:bg-blue-800 rounded-md transition-colors"
        >
          Modern Design
        </a>
        <a 
          href="#legacy"
          className="px-3 py-1 text-sm bg-amber-900 hover:bg-amber-800 rounded-md transition-colors"
        >
          Legacy Design
        </a>
        <a 
          href="#both"
          className="px-3 py-1 text-sm bg-purple-900 hover:bg-purple-800 rounded-md transition-colors"
        >
          Both
        </a>
        <a 
          href="#broken-rings"
          className="px-3 py-1 text-sm bg-green-900 hover:bg-green-800 rounded-md transition-colors"
        >
          Broken Rings
        </a>
        <a 
          href="#simple-rings"
          className="px-3 py-1 text-sm bg-teal-900 hover:bg-teal-800 rounded-md transition-colors"
        >
          Simple Rings
        </a>
      </div>
      
      {/* Simple Orbital Rings Section */}
      <section id="simple-rings" className="h-screen border-b border-gray-800">
        <div className="container mx-auto px-4 h-full">
          <div className="relative h-full">
            {/* Small text in corner */}
            <div className="absolute top-4 left-4 z-10">
              <h2 className="text-sm font-medium text-teal-400/70">Simple Orbital Rings</h2>
            </div>
            
            {/* Full size visualization */}
            <div className="w-full h-full overflow-hidden">
              <SimpleOrbitalRings />
            </div>
          </div>
        </div>
      </section>
      
      {/* Broken Orbital Rings Section */}
      <section id="broken-rings" className="py-8 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4 text-center text-green-400">Broken Orbital Rings</h2>
          
          <div className="relative w-full h-[500px] overflow-hidden rounded-lg">
            {/* Background layer */}
            <CosmicBackgroundMini />
            
            {/* Centered orbital rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <BrokenOrbitalRings planetSize={350} />
            </div>
          </div>
        </div>
      </section>
      
      {/* Individual Sections */}
      <section id="modern" className="py-8 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center text-blue-400">Modern Design (Z-Pattern)</h2>
          <ProcessAtomic />
        </div>
      </section>
      
      <section id="legacy" className="py-8 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center text-amber-400">Legacy Design (Orbital)</h2>
          <ProcessLegacyAtomic />
        </div>
      </section>
      
      {/* Side-by-Side Comparison (Desktop Only) */}
      <section id="both" className="py-8 border-b border-gray-800 hidden md:block">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center text-purple-400">Side-by-Side Comparison</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="border border-blue-900 rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-4 text-center text-blue-400">Modern Design</h3>
              <div className="transform scale-75 origin-top">
                <ProcessAtomic />
              </div>
            </div>
            
            <div className="border border-amber-900 rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-4 text-center text-amber-400">Legacy Design</h3>
              <div className="transform scale-75 origin-top">
                <ProcessLegacyAtomic />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProcessComparisonPage; 