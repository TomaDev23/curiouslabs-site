/**
 * @component HeroAtomic
 * @description Self-contained hero section with planet visual and static content - ANIMATION PURGED
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true
 */

import React, { useState, Suspense, lazy, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IMAGES } from '../../utils/assets';
import MissionControlNavbar from '../navigation/MissionControlNavbar';
// import HeroVisualPlanet from './HeroVisualPlanet';

// Lazy load HeroVisualPlanet to prevent Three.js from contaminating main bundle
const HeroVisualPlanet = lazy(() => import('./HeroVisualPlanet'));

import BackgroundLayerAtomic from './BackgroundLayerAtomic';
import HeroStageManager from './hero/HeroStageManager';

// Export metadata for LEGIT compliance
// export const metadata = {
//   id: 'hero_atomic',
//   scs: 'SCS-HERO-AEGIS',
//   type: 'atomic',
//   doc: 'contract_heroAtomic.md'
// };

const HeroAtomic = () => {
  const [sceneStep, setSceneStep] = useState(8);
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Mission Control Navbar - Now using standalone component */}
      <MissionControlNavbar />

      {/* LEGACY: Original embedded navbar code commented out for reference
      const MissionControlNavbar = () => {
        // ... all the original navbar code was here ...
      };
      */}

      {/* HUD and Hero Stage Manager */}
      <HeroStageManager setSceneStep={setSceneStep} />
      
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-14">
        {/* Background layer */}
        <BackgroundLayerAtomic />
        
        {/* Controlled Planet Bloom - Atmospheric glow behind planet - EFFECTS TIER */}
        <div
          className="absolute z-[15] w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
          style={{
            top: '60%',
            left: '75%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.05) 0%, transparent 70%)'
          }}
        />
        
        {/* Planet visual - positioned absolutely in top-right */}
        <Suspense fallback={
          <div className="w-[400px] h-[400px] rounded-full bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-violet-800/30 animate-pulse" />
        }>
          <HeroVisualPlanet 
            sceneStep={sceneStep}
            className="w-[400px] h-[400px]"
            size={400}
          />
        </Suspense>
        
        {/* Enhanced Interactive Text content - positioned in bottom-left - ELEVATED TO FOREGROUND TIER */}
        <div className="absolute bottom-[4%] left-[4%] max-w-[700px] z-[250]">
          <div className="mb-4">
            {/* Interactive header with hover effects */}
            <div 
              className="group cursor-pointer transition-all duration-500 hover:scale-[1.02] mb-6"
              onClick={() => setIsHeaderExpanded(!isHeaderExpanded)}
            >
              <h1 
                className="font-space text-2xl md:text-3xl font-semibold text-white leading-tight tracking-tight whitespace-nowrap transition-all duration-300 group-hover:text-shadow-lg"
                role="heading"
                aria-level={1}
              >
                We bring you a <span className="bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(132,204,22,0.6)] group-hover:drop-shadow-[0_0_12px_rgba(132,204,22,0.8)] transition-all duration-300">universe</span> of solutions
                <span className={`inline-block ml-2 transition-transform duration-300 ${isHeaderExpanded ? 'rotate-180' : 'rotate-0'}`}>
                  <svg className="w-5 h-5 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </h1>
              
              {/* Animated underline */}
              <div className="h-0.5 bg-gradient-to-r from-lime-400/0 via-lime-400/60 to-lime-400/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left mt-2"></div>
            </div>

            {/* Collapsible expanded content */}
            <div className={`overflow-hidden transition-all duration-500 ${isHeaderExpanded ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
              <div className="bg-black/20 backdrop-blur-sm border border-lime-400/20 rounded-lg p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Mission Statement */}
                  <div 
                    className="group cursor-pointer p-3 rounded-lg bg-gradient-to-br from-lime-400/5 to-emerald-500/5 border border-lime-400/10 hover:border-lime-400/30 transition-all duration-300"
                    onMouseEnter={() => setActiveSection('mission')}
                    onMouseLeave={() => setActiveSection(null)}
                  >
                    <h3 className="font-space text-sm font-semibold text-lime-400 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Our Mission
                    </h3>
                    <p className="text-white/70 text-xs leading-relaxed">
                      Pioneering the future of digital experiences through AI-powered innovation and cutting-edge technology solutions.
                    </p>
                  </div>

                  {/* Technology Focus */}
                  <div 
                    className="group cursor-pointer p-3 rounded-lg bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300"
                    onMouseEnter={() => setActiveSection('tech')}
                    onMouseLeave={() => setActiveSection(null)}
                  >
                    <h3 className="font-space text-sm font-semibold text-emerald-400 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Technology
                    </h3>
                    <p className="text-white/70 text-xs leading-relaxed">
                      Advanced AI systems, machine learning algorithms, and next-generation web technologies.
                    </p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="flex justify-between items-center pt-2 border-t border-lime-400/10">
                  <div className="text-center">
                    <div className="text-lime-400 font-bold text-lg">50+</div>
                    <div className="text-white/60 text-xs">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-emerald-400 font-bold text-lg">24/7</div>
                    <div className="text-white/60 text-xs">Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-cyan-400 font-bold text-lg">99.9%</div>
                    <div className="text-white/60 text-xs">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced subheader with interactive elements */}
            <div className="relative">
              <p className="font-space text-base md:text-lg text-white/85 leading-relaxed tracking-wide mb-4 transition-all duration-300 group-hover:text-white/95">
                We're building next-generation digital experiences powered by cutting-edge AI technology. 
                <span className="inline-block ml-1 transition-opacity duration-300">
                  <span className="text-lime-400">Join us in shaping tomorrow's web.</span>
                </span>
              </p>
              
              {/* Enhanced CTA with proper spacing */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-4">
                  <button 
                    className="group/btn relative px-4 py-2 bg-gradient-to-r from-lime-400 to-emerald-500 text-curious-dark-900 font-space font-medium text-sm rounded-full transition-all duration-300 hover:scale-105 active:scale-98 tracking-wide overflow-hidden"
                    onMouseEnter={() => setActiveSection('cta')}
                    onMouseLeave={() => setActiveSection(null)}
                  >
                    <span className="relative z-10">Explore Our Universe</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-lime-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Animated particles on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                      <div className="absolute top-1 left-2 w-1 h-1 bg-white/60 rounded-full animate-ping"></div>
                      <div className="absolute bottom-1 right-3 w-1 h-1 bg-white/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                  </button>

                  {/* Secondary action button */}
                  <button className="p-2 border border-lime-400/30 rounded-full text-lime-400 hover:bg-lime-400/10 hover:border-lime-400/60 transition-all duration-300 hover:scale-110 active:scale-95">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive status indicator */}
            <div className="mt-4 flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                <span className="text-white/60 text-xs font-space">System Online</span>
              </div>
              <div className="text-white/40 text-xs">|</div>
              <div className="text-white/60 text-xs font-space">
                {activeSection === 'mission' && 'Mission: Active'}
                {activeSection === 'tech' && 'Tech: Advanced'}
                {activeSection === 'cta' && 'Ready to Launch'}
                {!activeSection && 'Hover to explore'}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroAtomic; 