import React from 'react';

const Hero = () => {
  return (
    <section className="relative bg-transparent pt-10 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
      {/* Refined gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5D45B8]/12 via-[#4A3E80]/8 to-transparent opacity-40"></div>
      
      {/* Enhanced central glow for subtle emphasis */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[28vw] max-w-[500px] aspect-square rounded-full bg-gradient-radial from-[#5D45B8]/18 to-transparent blur-[80px] opacity-30"></div>
      
      {/* Main Content with improved spacing and hierarchy */}
      <div className="container mx-auto px-4 sm:px-6 pt-12 sm:pt-16 md:pt-20 relative z-10 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 text-white tracking-tight leading-[1.1]">
          <span className="text-white">CodeOps</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9D84FF] to-[#6EADF7] tracking-tight">
            <span className="font-extrabold">&#123;</span>
            <span>Redefined</span>
            <span className="font-extrabold">&#125;</span>
          </span>
        </h1>
        
        <p className="text-xl sm:text-2xl md:text-3xl font-light mb-6 sm:mb-8 max-w-3xl mx-auto text-white/95 leading-relaxed tracking-wide">
          Fast. Documented. Traceable.
        </p>
        
        <p className="text-sm sm:text-base max-w-2xl mx-auto mb-8 sm:mb-10 text-white/80 leading-relaxed">
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
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent mt-12 sm:mt-16 opacity-70"></div>
      </div>
    </section>
  );
};

export default Hero;
