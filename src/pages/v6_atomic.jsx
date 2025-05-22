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
import HeroSequenceV6 from '../components/home/v6/HeroSequenceV6';
import HorizontalProductScrollV6 from '../components/home/v6/HorizontalProductScrollV6';
import ServicesOrbital from '../components/home/v6/ServicesOrbital';
// import ProcessCards from '../components/home/v6/ProcessCards'; // Removed
// import MissionStatementV6 from '../components/home/v6/MissionStatementV6'; // Removed

// --- ATOMIC: New atomic components ---
import ProcessAtomic from '../components/atomic/ProcessAtomic';
import MissionAtomic from '../components/atomic/MissionAtomic'; // Added MissionAtomic

import ContactTerminal from '../components/home/v6/ContactTerminal';

const V6AtomicPage = () => {
  return (
    <SceneControllerV6>
      <LayoutWrapper>
        <CosmicBackgroundSystemV6 />
        <NavBarCosmic />

        {/* ATOMIC SCENES START HERE */}
        <HeroSequenceV6 />
        <HorizontalProductScrollV6 />
        <ServicesOrbital />
        <MissionAtomic /> {/* Added MissionAtomic component */}
        <ProcessAtomic />
        <ContactTerminal />
        {/* ATOMIC SCENES END */}

      </LayoutWrapper>
    </SceneControllerV6>
  );
};

export default V6AtomicPage; 