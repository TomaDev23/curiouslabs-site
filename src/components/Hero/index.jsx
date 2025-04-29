import React from 'react';
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';

const Hero = () => {
  return (
    <section className="relative bg-transparent pt-10 sm:pt-16 md:pt-20 pb-4 sm:pb-8 md:pb-12 overflow-hidden">
      <HeroBackground />
      <HeroContent />
    </section>
  );
};

export default Hero; 