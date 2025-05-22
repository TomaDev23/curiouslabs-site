/**
 * @metadata
 * @component V6ProductsPage2
 * @description Development page for the V6 AEGIS Universe Experience product scroll.
 * @status dev
 * @legit true
 * @route /v6-products2
 * @version 2.0 - AEGIS Universe Experience Implementation
 */
import React from 'react';
import PerspectiveGrid from '../components/home/v6/PerspectiveGrid';
import EnhancedPlanet from '../components/home/v6/EnhancedPlanet';

// Product specific colors
const AEGIS_COLOR = '#84cc16'; // lime
const OPSPIPE_COLOR = '#2563eb'; // blue
const MOONSIGNAL_COLOR = '#7e22ce'; // purple
const GUARDIAN_COLOR = '#0d9488'; // teal

// Nebula effect styles from claude_v1.0.md
const nebulaBaseStyle: React.CSSProperties = {
  position: 'absolute',
  width: '150%',
  height: '150%',
  filter: 'blur(20px)',
  mixBlendMode: 'screen',
  transform: 'translate(-25%, -25%)',
  pointerEvents: 'none',
  zIndex: 1,
};

const aegisNebulaStyle: React.CSSProperties = {
  ...nebulaBaseStyle,
  background: 'radial-gradient(ellipse at center, rgba(132, 204, 22, 0.1) 0%, rgba(132, 204, 22, 0.05) 25%, rgba(0, 0, 0, 0) 70%)',
};

const opspipeNebulaStyle: React.CSSProperties = {
  ...nebulaBaseStyle,
  background: 'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.15) 0%, rgba(37, 99, 235, 0.07) 30%, rgba(0, 0, 0, 0) 70%)',
};

const moonsignalNebulaStyle: React.CSSProperties = {
  ...nebulaBaseStyle,
  background: 'radial-gradient(ellipse at center, rgba(126, 34, 206, 0.15) 0%, rgba(126, 34, 206, 0.07) 30%, rgba(0, 0, 0, 0) 70%)',
};

const guardianNebulaStyle: React.CSSProperties = {
  ...nebulaBaseStyle,
  background: 'radial-gradient(ellipse at center, rgba(13, 148, 136, 0.15) 0%, rgba(13, 148, 136, 0.07) 30%, rgba(0, 0, 0, 0) 70%)',
};


const V6ProductsPage2: React.FC = () => {
  return (
    <div className="overflow-x-auto snap-x snap-mandatory flex w-full h-screen bg-black scrollbar-hide">
      {/* Card 1: AEGIS Core */}
      <section 
        className="snap-center flex items-center justify-center w-screen h-screen relative"
        style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #10101c 100%)' }}
      >
        <div style={aegisNebulaStyle}></div>
        <PerspectiveGrid color={AEGIS_COLOR} strokeOpacity={0.1} />
        <div className="relative z-10 flex flex-col items-center text-center p-8 max-w-2xl">
          <div className="mb-8">
            <EnhancedPlanet color={AEGIS_COLOR} size={200} label="AEGIS Core" reflectivity={0.5} />
          </div>
          <div className="mb-4">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4" style={{ color: AEGIS_COLOR }}>AEGIS Runtime</h2>
            <p className="text-lg text-gray-300">The powerful core that powers our entire ecosystem. Endless scenarios, Endless vectors.</p>
          </div>
          <div className="mb-6 text-left self-center w-auto">
            <ul className="text-gray-300 space-y-2 inline-block">
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 shrink-0" style={{backgroundColor: AEGIS_COLOR}}></span>Multi-agent architecture</li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 shrink-0" style={{backgroundColor: AEGIS_COLOR}}></span>State of the art FSM</li>
            </ul>
          </div>
          <div>
            <button className="px-8 py-3 rounded-full font-medium text-white transition-all duration-300 hover:opacity-80" style={{ background: AEGIS_COLOR }}>Learn More</button>
          </div>
        </div>
      </section>

      {/* Card 2: OpsPipe */}
      <section 
        className="snap-center flex items-center justify-between w-screen h-screen relative p-12 md:p-24"
        style={{ background: 'linear-gradient(135deg, #10101c 0%, #0d1527 75%, #13182e 100%)' }}
      >
        <div style={opspipeNebulaStyle}></div>
        <PerspectiveGrid color={OPSPIPE_COLOR} strokeOpacity={0.1} />
        <div className="relative z-10 w-1/3 flex justify-start items-center"> 
          <EnhancedPlanet color={OPSPIPE_COLOR} size={220} label="OpsPipe System" reflectivity={0.5} />
        </div>
        <div className="relative z-10 w-2/3 flex flex-col items-end text-right max-w-lg pl-8">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4" style={{ color: OPSPIPE_COLOR }}>OpsPipe</h2>
          <p className="text-lg text-gray-300 mb-6">AI-powered operations system with dynamic agent selection and capability-based scoring.</p>
          <ul className="text-gray-300 space-y-2 mb-6 self-end">
            <li className="flex items-center justify-end"><span className="order-2 w-2 h-2 rounded-full ml-3 shrink-0" style={{backgroundColor: OPSPIPE_COLOR}}></span>Office in your pocket</li>
            <li className="flex items-center justify-end"><span className="order-2 w-2 h-2 rounded-full ml-3 shrink-0" style={{backgroundColor: OPSPIPE_COLOR}}></span>Parse documents in a click</li>
          </ul>
          <button className="px-8 py-3 rounded-full font-medium text-white transition-all duration-300 hover:opacity-80" style={{ background: OPSPIPE_COLOR }}>Learn More</button>
        </div>
      </section>

      {/* Card 3: MoonSignal */}
      <section 
        className="snap-center flex items-center justify-between w-screen h-screen relative p-12 md:p-24"
        style={{ background: 'linear-gradient(135deg, #13182e 0%, #2a1b44 80%, #331b55 100%)' }}
      >
        <div style={moonsignalNebulaStyle}></div>
        <PerspectiveGrid color={MOONSIGNAL_COLOR} strokeOpacity={0.1} />
        <div className="relative z-10 w-2/3 flex flex-col items-start text-left max-w-lg pr-8">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4" style={{ color: MOONSIGNAL_COLOR }}>MoonSignal</h2>
          <p className="text-lg text-gray-300 mb-6">Algotrading and signal machine with AI playbooks and advanced analysis capabilities.</p>
          <ul className="text-gray-300 space-y-2 mb-6">
            <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 shrink-0" style={{backgroundColor: MOONSIGNAL_COLOR}}></span>ML-powered trading signals</li>
            <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 shrink-0" style={{backgroundColor: MOONSIGNAL_COLOR}}></span>AI trading psychology coach</li>
          </ul>
          <button className="px-8 py-3 rounded-full font-medium text-white transition-all duration-300 hover:opacity-80" style={{ background: MOONSIGNAL_COLOR }}>Learn More</button>
        </div>
        <div className="relative z-10 w-1/3 flex justify-end items-center">
          <EnhancedPlanet color={MOONSIGNAL_COLOR} size={180} label="MoonSignal Network" reflectivity={0.7} />
        </div>
      </section>

      {/* Card 4: Guardian */}
      <section 
        className="snap-center flex items-center justify-between w-screen h-screen relative p-12 md:p-24"
        style={{ background: 'linear-gradient(135deg, #331b55 0%, #0e3b3b 75%, #124242 100%)' }}
      >
        <div style={guardianNebulaStyle}></div>
        <PerspectiveGrid color={GUARDIAN_COLOR} strokeOpacity={0.1} />
        <div className="relative z-10 w-1/3 flex justify-start items-center">
          <EnhancedPlanet color={GUARDIAN_COLOR} size={200} label="Guardian AI" reflectivity={0.4} />
        </div>
        <div className="relative z-10 w-2/3 flex flex-col items-end text-right max-w-lg pl-8">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4" style={{ color: GUARDIAN_COLOR }}>Guardian</h2>
          <p className="text-lg text-gray-300 mb-6">AI companion for businesses, powering staff solutions with intelligent responses and automation.</p>
          <ul className="text-gray-300 space-y-2 mb-6 self-end">
            <li className="flex items-center justify-end"><span className="order-2 w-2 h-2 rounded-full ml-3 shrink-0" style={{backgroundColor: GUARDIAN_COLOR}}></span>Enterprise-grade companion</li>
            <li className="flex items-center justify-end"><span className="order-2 w-2 h-2 rounded-full ml-3 shrink-0" style={{backgroundColor: GUARDIAN_COLOR}}></span>Custom knowledge integration</li>
          </ul>
          <button className="px-8 py-3 rounded-full font-medium text-white transition-all duration-300 hover:opacity-80" style={{ background: GUARDIAN_COLOR }}>Learn More</button>
        </div>
      </section>

    </div>
  );
};

export default V6ProductsPage2; 