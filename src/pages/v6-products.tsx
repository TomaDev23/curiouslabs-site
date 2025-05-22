/**
 * @metadata
 * @component V6ProductsPage
 * @description Development page for V6 Cosmic Blueprint product scroll section.
 * @status dev
 * @legit true
 * @route /v6-products
 */
import React from 'react';

const V6ProductsPage: React.FC = () => (
  <div className="overflow-x-auto snap-x snap-mandatory flex w-full h-screen bg-black scrollbar-hide">
    {/* Card 1: AEGIS Runtime */}
    <section className="snap-center flex items-center justify-center w-screen h-screen bg-gradient-to-br from-black to-green-900 relative">
      {/* 1) Blueprint Layer */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: 'repeating-radial-gradient(circle at center, rgba(0,255,0,0.1) 0, rgba(0,255,0,0.1) 1px, transparent 1px, transparent 100px)' }}
      ></div>

      {/* Combined Orb and Text Block for centered adjacent layout */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* 2) Orb Placeholder */}
        <div className="w-36 h-36 bg-green-500 rounded-full ring-4 ring-green-400 ring-opacity-50 shadow-xl mb-6">
          {/* Orb center content if needed */}
        </div>

        {/* 3) Text Block */}
        <div className="max-w-md p-8 text-white">
          <h2 className="text-4xl font-bold mb-2">AEGIS Runtime</h2>
          <p className="mb-4">Core System Blueprint</p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Scalable Architecture</li>
            <li>Real-time Data Processing</li>
          </ul>
          <button className="px-6 py-2 bg-green-600 rounded hover:bg-green-700">Learn More</button>
        </div>
      </div>
    </section>

    {/* Card 2: OpsPipe */}
    <section className="snap-center flex items-center justify-end w-screen h-screen bg-gradient-to-br from-green-900 to-teal-700 relative">
      {/* 1) Blueprint Layer */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(0,128,128,0.1) 50px, rgba(0,128,128,0.1) 51px)' }}
      ></div>
      
      {/* 2) Orb Placeholder (Left) */}
      <div className="relative z-10 w-36 h-36 bg-teal-500 rounded-full ring-4 ring-teal-400 ring-opacity-50 shadow-xl m-8">
        {/* Orb center content if needed */}
      </div>

      {/* 3) Text Block (Right) */}
      <div className="relative z-10 max-w-md p-8 text-right text-white">
        <h2 className="text-4xl font-bold mb-2">OpsPipe</h2>
        <p className="mb-4">Operational Efficiency Blueprint</p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>Automated Workflows</li>
          <li>Dynamic Resource Allocation</li>
        </ul>
        <button className="px-6 py-2 bg-teal-600 rounded hover:bg-teal-700">Learn More</button>
      </div>
    </section>

    {/* Card 3: MoonSignal */}
    <section className="snap-center flex items-center justify-start w-screen h-screen bg-gradient-to-br from-teal-700 to-purple-800 relative">
      {/* 1) Blueprint Layer */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(128,0,128,0.1) 40px, rgba(128,0,128,0.1) 41px)' }}
      ></div>

      {/* 3) Text Block (Left) */}
      <div className="relative z-10 max-w-md p-8 text-left text-white">
        <h2 className="text-4xl font-bold mb-2">MoonSignal</h2>
        <p className="mb-4">Predictive Analytics Blueprint</p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>Advanced Signal Processing</li>
          <li>AI-Driven Insights</li>
        </ul>
        <button className="px-6 py-2 bg-purple-600 rounded hover:bg-purple-700">Learn More</button>
      </div>
      
      {/* 2) Orb Placeholder (Right) */}
      <div className="relative z-10 w-36 h-36 bg-purple-500 rounded-full ring-4 ring-purple-400 ring-opacity-50 shadow-xl m-8">
        {/* Orb center content if needed */}
      </div>
    </section>

    {/* Card 4: Synergy Systems (Curious/Guardian/Sentinel) */}
    <section className="snap-center flex items-center justify-end w-screen h-screen bg-gradient-to-br from-purple-800 to-black relative">
      {/* 1) Blueprint Layer */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.05) 30px, rgba(255,255,255,0.05) 31px)' }}
      ></div>

      {/* 2) Orb Placeholder (Left) */}
      <div className="relative z-10 w-36 h-36 bg-gray-500 rounded-full ring-4 ring-gray-400 ring-opacity-50 shadow-xl m-8"> {/* Assuming 'white' halo means a more neutral gray for placeholder */}
        {/* Orb center content if needed */}
      </div>

      {/* 3) Text Block (Right) */}
      <div className="relative z-10 max-w-md p-8 text-right text-white">
        <h2 className="text-4xl font-bold mb-2">Synergy Systems</h2>
        <p className="mb-4">Integrated Ecosystem Blueprint</p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>Unified Platform</li>
          <li>Secure Infrastructure</li>
        </ul>
        <button className="px-6 py-2 bg-gray-600 rounded hover:bg-gray-700">Learn More</button>
      </div>
    </section>
  </div>
);

export default V6ProductsPage; 