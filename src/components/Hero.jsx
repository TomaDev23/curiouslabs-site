import React from 'react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-[#1A1C2E] to-[#0D0D0D] pt-8 sm:pt-12 md:pt-16 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
      {/* Technical background patterns */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-[0.07] mix-blend-luminosity"></div>
      <div className="absolute left-0 top-0 w-1/2 h-full bg-chaotic-code-pattern opacity-[0.05] mix-blend-luminosity"></div>
      <div className="absolute right-0 top-0 w-1/2 h-full bg-legit-code opacity-[0.04] mix-blend-luminosity"></div>
      <div className="absolute left-1/4 right-1/4 top-0 bottom-0 bg-transition-pattern opacity-[0.06] mix-blend-luminosity"></div>
      
      {/* Enhanced glowing centerpiece orb */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] max-w-[650px] aspect-square rounded-full bg-gradient-radial from-curious-purple-500/40 to-transparent blur-[80px] opacity-60 animate-pulse-subtle sm:scale-90"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] max-w-[550px] aspect-square rounded-full bg-gradient-radial from-curious-purple-600/30 to-transparent blur-[60px] opacity-50 animate-float"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[25vw] max-w-[450px] aspect-square rounded-full bg-gradient-radial from-white/5 to-transparent blur-[40px] opacity-40 animate-rotate-slow"></div>
      
      {/* Central orb core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[20vw] max-w-[350px] aspect-square rounded-full bg-gradient-radial from-curious-purple-400/50 to-transparent blur-[2px] opacity-80"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[18vw] max-w-[320px] aspect-square rounded-full border border-white/10 bg-gradient-radial from-curious-purple-800/30 to-transparent backdrop-blur-sm"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[15vw] max-w-[280px] aspect-square rounded-full border border-white/5 bg-gradient-radial from-curious-purple-900/20 to-transparent"></div>
      
      {/* Horizontal light beam */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-[8px] bg-gradient-to-r from-transparent via-curious-purple-400/75 to-transparent rounded-full blur-[2px] opacity-80"></div>
      
      {/* Subtle glowing particles */}
      <div className="absolute left-[30%] top-[35%] w-[5px] h-[5px] bg-white rounded-full blur-[1px] opacity-70 animate-pulse-subtle"></div>
      <div className="absolute left-[60%] top-[45%] w-[3px] h-[3px] bg-white rounded-full blur-[1px] opacity-60 animate-pulse-subtle"></div>
      <div className="absolute left-[45%] top-[60%] w-[4px] h-[4px] bg-white rounded-full blur-[1px] opacity-70 animate-pulse-subtle"></div>
      <div className="absolute left-[70%] top-[25%] w-[4px] h-[4px] bg-white rounded-full blur-[1px] opacity-60 animate-pulse-subtle"></div>
      
      {/* Extra purple glow that extends downward */}
      <div className="absolute left-1/2 top-[60%] -translate-x-1/2 w-[35vw] max-w-[600px] h-[300px] bg-gradient-to-b from-curious-purple-600/15 to-transparent rounded-full blur-[70px] opacity-60"></div>
      
      <div className="relative max-w-[90%] sm:max-w-[85%] md:max-w-3xl lg:max-w-4xl mx-auto px-4 text-center z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 sm:mb-8 px-4">
          <span className="inline-block pb-4 bg-clip-text text-transparent bg-gradient-to-r from-curious-purple-200 via-white to-curious-blue-200">
            We Fix Broken Code
          </span>
          <span className="block mt-6 text-white/95 tracking-tight">Fast. Documented. Traceable.</span>
        </h1>
        <p className="text-base md:text-lg text-gray-300/90 mb-8 sm:mb-10 max-w-3xl mx-auto leading-snug">
          Elite AI CodeOps missions for founders and dev teams — powered by CuriousLabs.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 sm:mt-8">
          <a href="#contact">
            <button className="relative group bg-gradient-to-r from-curious-purple-600 to-curious-purple-500 text-white px-6 py-3 min-h-[48px] min-w-[150px] rounded-lg font-medium transition-all duration-300 overflow-hidden focus:ring-2 focus:ring-curious-purple-400 focus:outline-none">
              {/* Button glow overlay */}
              <div className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              
              {/* Button hover effect */}
              <div className="relative z-10 group-hover:-translate-y-1 transform transition-transform duration-300">
                Send First Mission
              </div>
              
              {/* Button bottom glow */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </a>
          <a href="#case-studies">
            <button className="relative group border-2 border-curious-purple-500 text-white px-6 py-3 min-h-[48px] min-w-[150px] rounded-lg font-medium transition-all duration-300 overflow-hidden focus:ring-2 focus:ring-curious-purple-400 focus:outline-none">
              {/* Button hover backdrop */}
              <div className="absolute inset-0 w-full h-full bg-curious-purple-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Button hover effect */}
              <div className="relative z-10 group-hover:-translate-y-1 transform transition-transform duration-300">
                View Case Studies
              </div>
              
              {/* Button bottom glow */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-curious-purple-400/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </a>
        </div>
      </div>
      
      {/* Transition gradient to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0D0D0D] to-transparent"></div>
    </section>
  );
};

export default Hero;
