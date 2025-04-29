import React from 'react';
import HeroHeading from './HeroHeading';
import HeroButtons from './HeroButtons';

const HeroContent = () => {
  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6 pt-8 sm:pt-12 md:pt-20 relative z-10 flex flex-col items-center justify-center text-center">
      <HeroHeading />
      
      <p className="text-xl sm:text-2xl md:text-3xl font-light mb-5 sm:mb-6 md:mb-8 max-w-3xl mx-auto text-white/95 leading-relaxed tracking-wide">
        Fast. Documented. Traceable.
      </p>
      
      <p className="text-sm sm:text-base max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 text-white/80 leading-relaxed px-2 sm:px-0">
        Elite AI CodeOps missions, backburners and dev teams — powered by CuriousLabs.
      </p>
      
      <HeroButtons />
      
      {/* Subtle divider below buttons */}
      <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mt-12 sm:mt-14 opacity-70"></div>
    </div>
  );
};

export default HeroContent; 