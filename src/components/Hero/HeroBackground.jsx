import React from 'react';

const HeroBackground = () => {
  return (
    <>
      {/* Refined gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5D45B8]/15 via-[#4A3E80]/10 to-transparent opacity-50"></div>
      
      {/* Enhanced central glow for subtle emphasis */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[28vw] max-w-[500px] aspect-square rounded-full bg-gradient-radial from-[#5D45B8]/20 to-transparent blur-[80px] opacity-40"></div>
    </>
  );
};

export default HeroBackground; 