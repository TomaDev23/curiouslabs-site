import React from 'react';

export default function SunApproachScene({ progress = 0 }) {
  return (
    <section className="h-screen relative overflow-hidden bg-gradient-to-b from-[#f1f5f9] via-[#ffe4c4] to-[#ffa500]">
      {/* Scene content will be added incrementally */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Scene: Sun Approach</h1>
      </div>
    </section>
  );
} 