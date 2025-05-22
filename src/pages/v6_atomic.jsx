/**
 * @page v6_atomic.jsx
 * @desc Atomic rebuild of CuriousLabs V6 homepage
 * @status Experimental – In development
 * @structure Flat scene-based components, no nested layout controllers
 * @source Forked from: v6_home.jsx
 */

import React from 'react';
import SceneControllerV6 from '../components/home/v6/SceneControllerV6';
import LayoutWrapper from '../components/home/v6/LayoutWrapper';
import CosmicBackgroundSystemV6 from '../components/home/v6/CosmicBackgroundSystemV6';
import NavBarCosmic from '../components/home/v6/NavBarCosmic';

// --- TEMPORARY: Scene imports will be replaced one by one ---
// import HeroSequenceV6 from '../components/home/v6/HeroSequenceV6'; // Removed
// import HorizontalProductScrollV6 from '../components/home/v6/HorizontalProductScrollV6'; // Removed
// import ServicesOrbital from '../components/home/v6/ServicesOrbital'; // Removed
// import ProcessCards from '../components/home/v6/ProcessCards'; // Removed
// import MissionStatementV6 from '../components/home/v6/MissionStatementV6'; // Removed
// import ContactTerminal from '../components/home/v6/ContactTerminal'; // Removed

// --- ATOMIC: New atomic components ---
import HeroAtomic from '../components/atomic/HeroAtomic';
import ProcessLegacyAtomic from '../components/atomic/ProcessLegacyAtomic';
import MissionAtomic from '../components/atomic/MissionAtomic';
// import ProductScrollAtomic from '../components/atomic/ProductScrollAtomic'; // Removed
import OurProducts_newV6 from '../components/atomic/OurProducts_newV6'; // New placeholder
import ServicesOrbitalAtomic from '../components/atomic/ServicesOrbitalAtomic';
import ContactTerminalAtomic from '../components/atomic/ContactTerminalAtomic';

const V6AtomicPage = () => {
  return (
    <SceneControllerV6>
      <LayoutWrapper>
        <CosmicBackgroundSystemV6 />
        <NavBarCosmic />

        {/* ATOMIC SCENES START HERE */}
        <HeroAtomic />
        <MissionAtomic />
        <OurProducts_newV6 />
        <ServicesOrbitalAtomic />
        <ProcessLegacyAtomic />
        <ContactTerminalAtomic />
        {/* ATOMIC SCENES END */}

      </LayoutWrapper>
    </SceneControllerV6>
  );
};

export default V6AtomicPage; 