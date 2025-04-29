import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { IMAGES } from '../utils/assets';

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A2E] via-[#272750] to-[#1A1A2E]">
      <NavBar />
      
      <main className="pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Blog</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-16">
            Insights and updates from the CuriousLabs team
          </p>
          
          {/* Coming Soon Placeholder */}
          <div className="bg-gradient-to-br from-[#2A2A45]/50 to-[#1A1A30]/50 p-12 rounded-xl border border-purple-500/10 max-w-3xl mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Coming Soon</h2>
            <p className="text-gray-300 max-w-lg mx-auto">
              We're working on some exciting content for our blog. Check back soon for insightful articles, case studies, and updates about our latest projects.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
} 