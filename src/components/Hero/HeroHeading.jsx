import React from 'react';

const HeroHeading = () => {
  return (
    <h1 className="text-4xl sm:text-5xl md:text-7xl mb-6 sm:mb-8 tracking-tight leading-[1.05] px-2 sm:px-0">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#e9e4ff] font-extrabold block sm:inline">CodeOps</span>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9D84FF] to-[#6EADF7] inline-block mt-2 sm:mt-0 sm:ml-2">
        <span className="font-extrabold inline-block mr-0.5">&#123;</span>
        <span className="font-semibold ml-1 sm:ml-2">Redefined</span>
        <span className="font-extrabold inline-block ml-0.5">&#125;</span>
      </span>
    </h1>
  );
};

export default HeroHeading; 