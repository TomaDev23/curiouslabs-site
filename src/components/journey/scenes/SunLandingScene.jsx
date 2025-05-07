import React from 'react';

export default function SunLandingScene({ progress = 0 }) {
  return (
    <section className="h-screen relative overflow-hidden bg-gradient-to-b from-[#ffa500] via-[#ff8c00] to-[#ff4500]">
      {/* Scene content will be added incrementally */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Scene: Sun Landing</h1>
      </div>
    </section>
  );
} 