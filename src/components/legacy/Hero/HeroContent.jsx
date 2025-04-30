import React from 'react';

const HeroContent = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 pt-12 sm:pt-16 md:pt-20 relative z-10 flex flex-col items-center justify-center text-center">
      <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
        Building intelligent solutions for tomorrow's challenges.
      </p>
      
      <p className="text-sm sm:text-base max-w-2xl mx-auto mb-10 sm:mb-12 text-white/80 leading-relaxed">
        Elite AI CodeOps missions, backburners and dev teams — powered by CuriousLabs.
      </p>
      
      {/* Subtle divider below buttons */}
      <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mt-14 sm:mt-18 opacity-70"></div>
    </div>
  );
};

export default HeroContent; 