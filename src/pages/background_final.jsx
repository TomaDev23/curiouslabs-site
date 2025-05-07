import React from 'react';

console.log("🔥 BACKGROUND_FINAL PAGE MOUNTED");

// Use a named constant instead of export for metadata to avoid HMR invalidation
const metadata = {
  id: 'background_final',
  scs: 'SCS-FINAL',
  type: 'page',
  doc: 'Docs/planning/new_horizon_v5/final_background_unified.md'
};

export default function BackgroundFinal() {
  return (
    <div className="w-full min-h-screen text-white overflow-hidden">
      {/* HERO ZONE - Deep space */}
      <section className="h-screen w-full bg-gradient-to-b from-[#00010a] via-[#180032] to-[#2c145a] flex items-center justify-center">
        <h1 className="text-4xl font-bold">🌌 Hero Zone</h1>
      </section>

      {/* GALAXY ZONE - Aurora swirl */}
      <section className="h-screen w-full bg-gradient-to-b from-[#1e0050] via-[#4e3ccf] to-[#77b3f7] flex items-center justify-center">
        <h1 className="text-4xl font-bold">🌌 Galaxy Zone</h1>
      </section>

      {/* SUNRISE ZONE - Warm glow */}
      <section className="h-screen w-full bg-gradient-to-b from-[#ff9d3d] via-[#ffc371] to-[#fff3c7] flex items-center justify-center">
        <h1 className="text-4xl font-bold text-black">🌅 Sunrise Zone</h1>
      </section>
    </div>
  );
}

// Attach metadata to the component after definition
BackgroundFinal.metadata = metadata; 