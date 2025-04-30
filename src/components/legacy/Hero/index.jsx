import React from 'react';
import HeroHeading from './HeroHeading';
import HeroButtons from './HeroButtons';
import HeroContent from './HeroContent';

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 text-center relative z-10 pt-24">
      {/* Main content from modular components */}
      <HeroHeading />
      
      <HeroContent />
      
      <HeroButtons />
    </section>
  );
};

export default Hero; 