import React from 'react';

const Hero = () => {
  return (
    <section className="relative bg-transparent pt-14 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24 overflow-hidden">
      {/* Refined gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5D45B8]/12 via-[#4A3E80]/8 to-transparent opacity-40"></div>
      
      {/* Enhanced central glow for subtle emphasis */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[28vw] max-w-[500px] aspect-square rounded-full bg-gradient-radial from-[#5D45B8]/18 to-transparent blur-[80px] opacity-30"></div>
      
      {/* Main Content with improved spacing and hierarchy */}
      <div className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28 relative z-10 flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 sm:mb-10 text-white tracking-tight leading-[1.1]">
          We Fix <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8D7BE0] to-[#5D9EEB]">Broken Code</span>
        </h1>
        
        <p className="text-xl sm:text-2xl md:text-3xl font-light mb-8 sm:mb-10 max-w-3xl mx-auto text-white/95 leading-relaxed tracking-wide">
          Fast. Documented. Traceable.
        </p>
        
        <p className="text-sm sm:text-base max-w-2xl mx-auto mb-10 sm:mb-12 text-white/80 leading-relaxed">
          Elite AI CodeOps missions, backburners and dev teams — powered by CuriousLabs.
        </p>
        
        {/* Enhanced button styles with better hierarchy */}
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
          <button className="px-8 py-3.5 bg-gradient-to-r from-[#5D45B8] to-[#4A3E80] text-white font-medium rounded-md shadow-sm hover:shadow-lg hover:shadow-[#5D45B8]/20 hover:translate-y-[-1px] transition-all duration-300">
            Send First Mission
          </button>
          
          <button className="px-8 py-3.5 bg-white/5 backdrop-blur-sm border border-white/15 text-white font-medium rounded-md hover:bg-white/10 hover:border-white/25 transition-all duration-300">
            View Case Studies
          </button>
        </div>
        
        {/* Subtle divider below buttons */}
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent mt-16 sm:mt-20 opacity-70"></div>
      </div>
    </section>
  );
};

export default Hero;
