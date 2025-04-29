import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { IMAGES } from '../utils/assets';

export default function Documentation() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A2E] via-[#272750] to-[#1A1A2E]">
      <NavBar />
      
      <main className="pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Documentation</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-16 text-center">
            Get started with our comprehensive guides and API documentation
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-[#2A2A45]/50 to-[#1A1A30]/50 p-6 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Quick Start</h2>
              <p className="text-gray-400 mb-4">
                Get up and running with our products in minutes with these quick start guides.
              </p>
              <Link to="/docs/quickstart" className="text-purple-400 hover:text-purple-300 inline-flex items-center">
                Read more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-[#2A2A45]/50 to-[#1A1A30]/50 p-6 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">API Reference</h2>
              <p className="text-gray-400 mb-4">
                Comprehensive API documentation for integrating our products into your applications.
              </p>
              <Link to="/docs/api" className="text-purple-400 hover:text-purple-300 inline-flex items-center">
                Read more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-[#2A2A45]/50 to-[#1A1A30]/50 p-6 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">FAQ</h2>
              <p className="text-gray-400 mb-4">
                Find answers to commonly asked questions about our products and services.
              </p>
              <Link to="/docs/faq" className="text-purple-400 hover:text-purple-300 inline-flex items-center">
                Read more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#2A2A45]/50 to-[#1A1A30]/50 p-8 rounded-xl border border-purple-500/10 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Documentation Under Construction</h2>
            <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
              We're currently building our comprehensive documentation portal. 
              Check back soon for detailed guides, tutorials, and API references.
            </p>
            <div className="flex justify-center">
              <div className="animate-pulse bg-purple-500/20 h-10 w-48 rounded-full"></div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}