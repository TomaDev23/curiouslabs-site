/**
 * @component V6HomePage
 * @description Main home page for CuriousLabs V6
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - V6 Home Page passes LEGIT protocol
 */

import React, { useEffect } from 'react';
import LayoutWrapper from '../components/home/v6/LayoutWrapper';
import NavBarCosmic from '../components/home/v6/NavBarCosmic';
import HeroSequenceV6 from '../components/home/v6/HeroSequenceV6';
import ServicesOrbital from '../components/home/v6/ServicesOrbital';
import ProcessCards from '../components/home/v6/ProcessCards';
import ContactTerminal from '../components/home/v6/ContactTerminal';
import { useMission, MissionTiles } from '../components/home/v6/MissionTracker';
import CosmicBackgroundSystemV6 from '../components/home/v6/CosmicBackgroundSystemV6';
import HorizontalProductScrollV6 from '../components/home/v6/HorizontalProductScrollV6';

const V6HomePage = () => {
  const { markMissionComplete } = useMission();
  
  // Mark completed missions for implemented components
  useEffect(() => {
    markMissionComplete(MissionTiles.TILE_A, true); // Core Foundation
    markMissionComplete(MissionTiles.TILE_B, true); // Background System
    markMissionComplete(MissionTiles.TILE_C, true); // Hero Elements
    markMissionComplete(MissionTiles.TILE_D, true); // Product Showcase
  }, [markMissionComplete]);
  
  return (
    <LayoutWrapper>
      {/* Background System */}
      <CosmicBackgroundSystemV6 />
      
      {/* Navigation */}
      <NavBarCosmic />
      
      {/* Hero Section */}
      <HeroSequenceV6 />
      
      {/* Services Section */}
      <ServicesOrbital />
      
      {/* Product Showcase */}
      <HorizontalProductScrollV6 />
      
      {/* Process Section */}
      <ProcessCards />
      
      {/* Contact Section */}
      <ContactTerminal />
    </LayoutWrapper>
  );
};

export default V6HomePage; 