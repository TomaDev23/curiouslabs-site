import React from 'react';
import NavBar from '../NavBar';
import FooterExperience from '../home/v4/FooterExperience';
import { ScrollDebugOverlay } from '../ui/ScrollDebugOverlay';
import CosmicJourneyController from '../journey/CosmicJourneyController';

const metadata = {
  id: 'atomic_page_frame',
  scs: 'SCS-ATOMIC-FRAME',
  type: 'layout',
  doc: 'contract_atomic_page_frame.md'
};

export function AtomicPageFrame() {
  return (
    <div className="relative w-full text-white">
      {/* Cosmic Journey Controller as fixed background (z-0) */}
      <div className="fixed inset-0 z-0">
        <CosmicJourneyController />
      </div>
      
      <NavBar />
      
      <main className="relative">
        {/* 700vh spacer for layout */}
        <div className="h-[700vh] relative">
          {/* Optional debug markers - visible in development only */}
          {process.env.NODE_ENV === 'development' && (
            <>
              <div className="absolute top-[100vh] left-0 w-full border-t border-dashed border-purple-500/30">
                <span className="bg-black/70 text-purple-400 px-2 py-1 text-xs rounded">100vh</span>
              </div>
              <div className="absolute top-[200vh] left-0 w-full border-t border-dashed border-purple-500/30">
                <span className="bg-black/70 text-purple-400 px-2 py-1 text-xs rounded">200vh</span>
              </div>
              <div className="absolute top-[300vh] left-0 w-full border-t border-dashed border-purple-500/30">
                <span className="bg-black/70 text-purple-400 px-2 py-1 text-xs rounded">300vh</span>
              </div>
              <div className="absolute top-[400vh] left-0 w-full border-t border-dashed border-purple-500/30">
                <span className="bg-black/70 text-purple-400 px-2 py-1 text-xs rounded">400vh</span>
              </div>
              <div className="absolute top-[500vh] left-0 w-full border-t border-dashed border-purple-500/30">
                <span className="bg-black/70 text-purple-400 px-2 py-1 text-xs rounded">500vh</span>
              </div>
              <div className="absolute top-[600vh] left-0 w-full border-t border-dashed border-purple-500/30">
                <span className="bg-black/70 text-purple-400 px-2 py-1 text-xs rounded">600vh</span>
              </div>
            </>
          )}
        </div>
      </main>
      
      <FooterExperience />
      
      {/* Debug overlay */}
      <ScrollDebugOverlay />
    </div>
  );
} 