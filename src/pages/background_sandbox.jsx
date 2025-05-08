import React from 'react';
import CosmicJourneyController from '../components/journey/CosmicJourneyController';

console.log("✅ BACKGROUND_SANDBOX.JSX PAGE LOADED");

/**
 * BackgroundSandbox - Isolated testing environment for the new 3-zone cosmic background
 * Used for developing and validating the background system independently
 */

// LEGIT metadata for protocol compliance
const metadata = {
  id: 'background_sandbox',
  scs: 'SCS2',
  type: 'page',
  doc: 'Docs/planning/new_horizon_v5/fix_v8.0_NewPlan.md'
};

export default function BackgroundSandbox() {
  return (
    <div className="min-h-screen bg-black text-white">
      <CosmicJourneyController />
    </div>
  );
} 