import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { IMAGES } from '../../utils/assets';
import ScrollToTop from '../../components/ScrollToTop';

export default function Aegis() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A2E] via-[#272750] to-[#1A1A2E] overflow-hidden">
      <Helmet>
        <title>Aegis - Core Process Engine | CuriousLabs</title>
        <meta name="description" content="The central intelligence unit that powers all CuriousLabs products with advanced algorithms and machine learning capabilities." />
        <meta property="og:title" content="Aegis - Core Process Engine | CuriousLabs" />
        <meta property="og:description" content="The central intelligence unit that powers all CuriousLabs products with advanced algorithms and machine learning capabilities." />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://curiouslabs.io/products/aegis" />
      </Helmet>
      
      <NavBar />
      
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        <section className="max-w-7xl mx-auto px-4 py-10 sm:py-16 text-center">
          <div className="inline-block mb-4 sm:mb-6">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-md opacity-50"></div>
              <div className="relative bg-gradient-to-r from-yellow-500 to-orange-500 h-full w-full rounded-full flex items-center justify-center">
                <span className="text-2xl sm:text-3xl">🌞</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">AEGIS</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-10 px-2">
            The core process engine powering all our products
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
            <Link to="/contact" className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-md transition-all duration-300">
              Request Demo
            </Link>
            <Link to="/products" className="bg-transparent border border-yellow-500 text-white hover:bg-yellow-500/10 font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-md transition-all duration-300">
              View All Products
            </Link>
          </div>
        </section>
        
        {/* Main content sections */}
        <section className="max-w-7xl mx-auto px-4 py-6 sm:py-8 mb-12 sm:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">The Heart of Our Ecosystem</h2>
              <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
                Aegis is the central intelligence unit that powers all CuriousLabs products. Built with advanced algorithms 
                and machine learning capabilities, Aegis processes data, makes decisions, and orchestrates workflows across 
                our entire product ecosystem.
              </p>
              <p className="text-sm sm:text-base text-gray-300">
                Whether you're using OpsPipe for DevOps automation, MoonSignal for market intelligence, or any of our other 
                products, you're experiencing the power of Aegis working behind the scenes.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#2A2A45] to-[#1A1A30] p-6 sm:p-8 rounded-lg border border-yellow-500/20">
              <div className="aspect-square relative rounded-lg overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 animate-pulse"></div>
                <div className="relative z-10 text-center p-6 sm:p-8">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-3xl sm:text-4xl">🌞</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Aegis Core</h3>
                  <p className="text-gray-300 text-xs sm:text-sm">Intelligent processing engine</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features */}
        <section className="max-w-7xl mx-auto px-4 py-6 sm:py-8 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 sm:mb-12 text-center">Core Capabilities</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Intelligent Decision Making',
                description: 'Advanced algorithms process data and make optimal decisions in real-time',
              },
              {
                title: 'Seamless Integration',
                description: 'Connect with any system through our extensive API and connector library',
              },
              {
                title: 'Scalable Architecture',
                description: 'Handles enterprise-level workloads with consistent performance',
              },
              {
                title: 'Predictive Analytics',
                description: 'Machine learning models anticipate needs and optimize processes',
              },
              {
                title: 'Secure Operations',
                description: 'Enterprise-grade security with encryption and access controls',
              },
              {
                title: 'Customizable Workflows',
                description: 'Tailor processes to your specific business requirements',
              },
            ].map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-[#2A2A45]/50 to-[#1A1A30]/50 p-5 sm:p-6 rounded-xl border border-yellow-500/10 hover:border-yellow-500/30 transition duration-300">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="max-w-5xl mx-auto px-4 py-10 sm:py-16 text-center">
          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/20 rounded-2xl p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Ready to Power Your Business?</h2>
            <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8">
              Discover how Aegis can transform your operations and drive innovation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link to="/contact" className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-md transition-all duration-300">
                Contact Us
              </Link>
              <Link to="/products" className="bg-transparent border border-yellow-500 text-white hover:bg-yellow-500/10 font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-md transition-all duration-300">
                Explore Products
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
} 