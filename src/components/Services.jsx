import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center text-white mb-12">Our Solutions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Simplified product cards */}
        <div className="bg-[#1F1F35] p-6 rounded-lg border border-white/10">
          <div className="mb-4 text-2xl">🌞</div>
          <h3 className="text-xl font-medium text-white mb-2">Aegis</h3>
          <p className="text-gray-400 text-sm mb-6">The core process engine powering all our products.</p>
          <Link to="/products/aegis" className="text-purple-400 hover:text-purple-300 text-sm font-medium transition">Learn More →</Link>
        </div>
        
        <div className="bg-[#1F1F35] p-6 rounded-lg border border-white/10">
          <div className="mb-4 text-2xl">🛠️</div>
          <h3 className="text-xl font-medium text-white mb-2">OpsPipe</h3>
          <p className="text-gray-400 text-sm mb-6">Streamlined DevOps automation for teams of all sizes.</p>
          <Link to="/products/opspipe" className="text-blue-400 hover:text-blue-300 text-sm font-medium transition">Learn More →</Link>
        </div>
        
        <div className="bg-[#1F1F35] p-6 rounded-lg border border-white/10">
          <div className="mb-4 text-2xl">📈</div>
          <h3 className="text-xl font-medium text-white mb-2">MoonSignal</h3>
          <p className="text-gray-400 text-sm mb-6">Advanced market signals and trading intelligence.</p>
          <Link to="/products/moonsignal" className="text-blue-400 hover:text-blue-300 text-sm font-medium transition">Learn More →</Link>
        </div>
      </div>
      <div className="text-center mt-12">
        <Link to="/products" className="inline-flex items-center text-purple-400 hover:text-purple-300 transition">
          View All Products
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default Services;
