import React from 'react';

const HeroButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 w-full max-w-xs sm:max-w-none mx-auto">
      <button className="px-6 sm:px-8 py-3 bg-gradient-to-r from-[#5D45B8] to-[#4A3E80] text-white font-medium rounded-md shadow-md hover:shadow-lg hover:shadow-[#5D45B8]/30 hover:translate-y-[-2px] transition-all duration-300 whitespace-nowrap">
        Send First Mission
      </button>
      
      <button className="px-6 sm:px-8 py-3 bg-white/5 backdrop-blur-sm border border-white/20 text-white font-medium rounded-md hover:bg-white/10 hover:border-white/30 transition-all duration-300 whitespace-nowrap">
        View Case Studies
      </button>
    </div>
  );
};

export default HeroButtons; 