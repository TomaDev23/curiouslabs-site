import React, { useEffect, useRef } from 'react';

export default function Hero() {
  const orbRef = useRef(null);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!orbRef.current) return;
      
      const { clientX, clientY } = e;
      const rect = orbRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from mouse to orb center (max 100px movement)
      const maxDistance = 30;
      const deltaX = (clientX - centerX) / window.innerWidth * maxDistance;
      const deltaY = (clientY - centerY) / window.innerHeight * maxDistance;
      
      // Apply subtle movement to the orb
      orbRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <section className="relative w-full overflow-hidden pt-24 pb-16 md:pb-20 md:pt-36">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-circuit-pattern bg-repeat opacity-10"></div>
      </div>
      
      {/* Technical light beam */}
      <div className="absolute left-0 right-0 top-1/3 h-px w-full bg-gradient-to-r from-transparent via-curious-blue-400/30 to-transparent"></div>
      
      {/* Orb centerpiece container */}
      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-center px-4 text-center">
        {/* Main glowing orb */}
        <div ref={orbRef} className="relative mb-10 flex h-64 w-64 items-center justify-center will-change-transform">
          {/* Base orb layer */}
          <div className="absolute h-48 w-48 rounded-full bg-gradient-to-br from-curious-blue-900/30 to-curious-purple-800/30 blur-xl"></div>
          
          {/* Primary orb glow */}
          <div className="absolute h-44 w-44 animate-pulse-subtle rounded-full bg-gradient-to-r from-curious-blue-500/40 to-curious-purple-500/40 blur-md"></div>
          
          {/* Secondary orb */}
          <div className="absolute h-40 w-40 animate-rotate-slow rounded-full bg-gradient-to-tr from-curious-blue-400/30 via-curious-purple-500/20 to-curious-blue-600/30 blur-sm"></div>
          
          {/* Core orb */}
          <div className="absolute h-32 w-32 rounded-full bg-gradient-to-b from-curious-blue-400/90 via-curious-purple-500/60 to-curious-blue-800/80 shadow-xl shadow-curious-blue-500/20"></div>
          
          {/* Inner glow */}
          <div className="absolute h-20 w-20 animate-pulse-subtle rounded-full bg-white/10 blur-sm"></div>
          
          {/* Center point */}
          <div className="absolute h-4 w-4 rounded-full bg-white/80 shadow-lg shadow-white/50"></div>
          
          {/* Orbiting elements */}
          <div className="absolute h-60 w-60 animate-rotate-slow rounded-full border border-curious-blue-400/20"></div>
          <div className="absolute h-5 w-5 -translate-y-28 rounded-full bg-curious-blue-300/60 blur-sm"></div>
          <div className="absolute h-3 w-3 translate-x-[9rem] translate-y-[5rem] rounded-full bg-curious-purple-400/60 blur-sm"></div>
          <div className="absolute h-4 w-4 -translate-x-[8rem] translate-y-[6rem] rounded-full bg-curious-blue-300/60 blur-sm"></div>
        </div>
        
        {/* Text content with improved typography */}
        <h1 className="relative mb-6 bg-gradient-to-r from-white via-white to-curious-blue-100 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
          We Fix <span className="bg-gradient-to-r from-curious-blue-400 to-curious-purple-500 bg-clip-text text-transparent">Broken Code</span>
        </h1>
        
        <p className="relative mb-10 max-w-2xl text-lg text-slate-300/90 sm:text-xl">
          Our team of expert engineers will rescue your failing projects,
          fix critical bugs, and optimize your codebase for performance and stability.
        </p>
        
        {/* CTA buttons with improved styling */}
        <div className="relative z-10 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <a href="#contact" className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-curious-blue-500 to-curious-purple-600 px-8 py-3 text-lg font-medium text-white shadow-lg transition-all duration-300 ease-out hover:shadow-curious-blue-500/25">
            <span className="absolute inset-0 bg-gradient-to-br from-curious-blue-600 to-curious-purple-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
            <span className="relative">Send Us a Mission</span>
          </a>
          <a href="#case-studies" className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg border border-curious-blue-400/30 bg-transparent px-8 py-3 text-lg font-medium text-white transition-all duration-300 ease-out hover:bg-curious-blue-950/20">
            <span className="relative">View Case Studies</span>
          </a>
        </div>
        
        {/* Code pattern transitions */}
        <div className="absolute bottom-0 left-0 h-32 w-full opacity-5">
          <div className="h-full w-full bg-chaotic-code-pattern bg-repeat-x"></div>
        </div>
      </div>
    </section>
  );
}
