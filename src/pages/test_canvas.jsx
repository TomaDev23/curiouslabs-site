import React from 'react';
import HeroPortal from '../components/home/v4/HeroPortal';
import SpaceCanvas from '../components/home/v4/SpaceCanvas';
import ServicesOrbital from '../components/home/v4/ServicesOrbital';

const TestCanvasPage = () => {
  return (
    <main className="relative overflow-hidden">
      <SpaceCanvas />
      <HeroPortal />
      <ServicesOrbital />
    </main>
  );
};

export default TestCanvasPage; 