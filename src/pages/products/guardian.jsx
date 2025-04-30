import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer_legacy';
import { IMAGES } from '../../utils/assets';
import ScrollToTop from '../../components/ScrollToTop';

export default function Guardian() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A2E] via-[#1A2D2A] to-[#1A1A2E] overflow-hidden">
      <NavBar />
      
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        <section className="max-w-7xl mx-auto px-4 py-10 sm:py-16 text-center">
          <div className="inline-block mb-4 sm:mb-6">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-500 rounded-full blur-md opacity-50"></div>
              <div className="relative bg-gradient-to-r from-green-500 to-teal-500 h-full w-full rounded-full flex items-center justify-center">
                <span className="text-2xl sm:text-3xl">🛡️</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-green-400 to-teal-500 text-transparent bg-clip-text">GUARDIAN</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-10 px-2">
            Protecting Children in the Digital World
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
            <Link to="/codelab" className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-md transition-all duration-300">
              Learn More
            </Link>
            <Link to="/products" className="bg-transparent border border-green-500 text-white hover:bg-green-500/10 font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-md transition-all duration-300">
              View All Products
            </Link>
          </div>
        </section>
        
        {/* Main content sections */}
        <section className="max-w-7xl mx-auto px-4 py-6 sm:py-8 mb-12 sm:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Digital Safety for the Next Generation</h2>
              <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
                Guardian is an AI-powered protector designed to guide children toward healthy digital habits. It filters harmful content, promotes learning, and encourages creativity — all while respecting parental boundaries and safety.
              </p>
              <p className="text-sm sm:text-base text-gray-300">
                Our unique approach doesn't just block content; it redirects curiosity into positive learning experiences. Guardian adapts to each child's developmental stage, providing age-appropriate protection that grows with them.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#2A2A45] to-[#1A1A30] p-6 sm:p-8 rounded-lg border border-green-500/20">
              <div className="aspect-square relative rounded-lg overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-teal-500/20 animate-pulse"></div>
                <div className="relative z-10 text-center p-6 sm:p-8">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-3xl sm:text-4xl">🛡️</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Guardian Shield</h3>
                  <p className="text-gray-300 text-xs sm:text-sm">Always-on protection</p>
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
                title: 'Content Redirection AI',
                description: 'Intelligently redirects from harmful content to educational alternatives tailored to interests',
              },
              {
                title: 'Emotionally Smart Responses',
                description: 'Recognizes frustration and provides age-appropriate explanations rather than simple blocks',
              },
              {
                title: 'Always-On Companion',
                description: 'Provides continuous protection across devices and platforms without gaps',
              },
              {
                title: 'Parental Controls',
                description: 'Customizable protection levels with detailed activity insights for parents',
              },
              {
                title: 'Learning Promotion',
                description: 'Actively suggests educational content aligned with current interests and curriculum',
              },
              {
                title: 'Digital Wellbeing',
                description: 'Encourages healthy screen time habits and balanced digital/physical activities',
              },
            ].map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-[#2A2A45]/50 to-[#1A1A30]/50 p-5 sm:p-6 rounded-xl border border-green-500/10 hover:border-green-500/30 transition duration-300">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="max-w-5xl mx-auto px-4 py-10 sm:py-16 text-center">
          <div className="bg-gradient-to-r from-green-900/30 to-teal-900/20 rounded-2xl p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Secure Your Child's Digital Journey</h2>
            <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8">
              Join parents who trust Guardian to provide a safe, educational online experience for their children.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link to="/contact" className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-md transition-all duration-300">
                Request Early Access
              </Link>
              <Link to="/products" className="bg-transparent border border-green-500 text-white hover:bg-green-500/10 font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-md transition-all duration-300">
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