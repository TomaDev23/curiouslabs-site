import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { IMAGES } from '../utils/assets';
import ScrollToTop from '../components/ScrollToTop';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A2E] via-[#272750] to-[#1A1A2E] overflow-hidden">
      <Helmet>
        <title>Page Not Found | CuriousLabs</title>
        <meta name="description" content="The page you are looking for doesn't exist or has been moved." />
      </Helmet>
      
      <NavBar />
      
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        <section className="max-w-7xl mx-auto px-4 py-10 sm:py-16 text-center">
          <div className="inline-block mb-4 sm:mb-6">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-red-400 rounded-full blur-md opacity-50"></div>
              <div className="relative bg-gradient-to-r from-purple-500 to-red-500 h-full w-full rounded-full flex items-center justify-center">
                <span className="text-2xl sm:text-3xl">🔍</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-red-400 text-transparent bg-clip-text">404</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-white font-semibold max-w-3xl mx-auto mb-4 sm:mb-6 px-2">
            Page Not Found
          </p>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-10 px-2">
            The page you are looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
            <Link to="/" className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-md transition-all duration-300">
              Back to Home
            </Link>
            <Link to="/products" className="bg-transparent border border-purple-500 text-white hover:bg-purple-500/10 font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-md transition-all duration-300">
              Explore Products
            </Link>
          </div>
        </section>
        
        {/* Suggestions */}
        <section className="max-w-4xl mx-auto px-4 py-6 sm:py-8 mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">You might be looking for</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-gradient-to-br from-[#2A2A45]/50 to-[#1A1A30]/50 p-5 sm:p-6 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition duration-300">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Products</h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-4">Discover our suite of innovative solutions.</p>
              <Link to="/products" className="text-purple-300 text-sm hover:text-purple-200 transition-colors duration-300">Browse Products →</Link>
            </div>
            
            <div className="bg-gradient-to-br from-[#2A2A45]/50 to-[#1A1A30]/50 p-5 sm:p-6 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition duration-300">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">CodeLab</h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-4">Try our interactive tools and demos.</p>
              <Link to="/codelab" className="text-purple-300 text-sm hover:text-purple-200 transition-colors duration-300">Visit CodeLab →</Link>
            </div>
            
            <div className="bg-gradient-to-br from-[#2A2A45]/50 to-[#1A1A30]/50 p-5 sm:p-6 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition duration-300">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Contact</h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-4">Need help? Get in touch with our team.</p>
              <Link to="/contact" className="text-purple-300 text-sm hover:text-purple-200 transition-colors duration-300">Contact Us →</Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
} 