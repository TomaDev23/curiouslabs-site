import React, { useEffect } from 'react';
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
  useEffect(() => {
    console.log("🚀 BackgroundSandbox component mounted");
    console.log("📊 Window dimensions:", window.innerWidth, "x", window.innerHeight);
    
    // Log the current URL to verify routing
    console.log("🔗 Current URL:", window.location.href);
    
    return () => {
      console.log("💤 BackgroundSandbox component unmounted");
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed top-4 left-4 z-50 bg-black/70 p-3 rounded text-xs text-white font-mono">
        Background Sandbox
      </div>
      <CosmicJourneyController />
    </div>
  );
} 