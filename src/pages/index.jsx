import React from "react";
import Hero from '../components/Hero';
import LogoStrip from '../components/LogoStrip';
import Services from '../components/Services';
import Metrics from '../components/Metrics';
import CaseStudies from '../components/CaseStudies';
import Testimonials from '../components/Testimonials';

export default function Home() {
  return (
    <main className="min-h-screen bg-curious-dark-900 text-white antialiased relative overflow-hidden">
      {/* Dynamic Background Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        {/* Blob 1 - Top Left */}
        <div 
          className="absolute top-[5%] left-[10%] w-[500px] h-[500px] bg-gradient-to-br from-curious-purple-600/30 to-curious-purple-900/10 rounded-full blur-3xl opacity-30 animate-float animate-pulse-subtle"
          style={{ animationDelay: '0.5s' }}
        ></div>
        
        {/* Blob 2 - Top Right */}
        <div 
          className="absolute top-[20%] right-[5%] w-[400px] h-[400px] bg-gradient-to-bl from-curious-blue-600/30 to-curious-blue-900/10 rounded-full blur-3xl opacity-30 animate-float-slow animate-rotate-slow"
          style={{ animationDelay: '1.7s' }}
        ></div>
        
        {/* Blob 3 - Middle Left */}
        <div 
          className="absolute top-[45%] left-[5%] w-[350px] h-[350px] bg-gradient-to-tr from-curious-purple-500/30 to-curious-blue-600/10 rounded-full blur-3xl opacity-30 animate-float-fast animate-pulse-subtle"
          style={{ animationDelay: '0.9s' }}
        ></div>
        
        {/* Blob 4 - Bottom Right */}
        <div 
          className="absolute bottom-[15%] right-[10%] w-[450px] h-[450px] bg-gradient-to-tl from-curious-blue-500/30 to-curious-purple-700/10 rounded-full blur-3xl opacity-30 animate-float-slow animate-rotate-slow"
          style={{ animationDelay: '0.2s', animationDirection: 'reverse' }}
        ></div>
        
        {/* Blob 5 - Bottom Center */}
        <div 
          className="absolute bottom-[5%] left-[30%] w-[550px] h-[550px] bg-gradient-to-r from-curious-purple-700/20 to-curious-blue-700/10 rounded-full blur-3xl opacity-20 animate-float animate-pulse-subtle"
          style={{ animationDelay: '1.2s' }}
        ></div>
      </div>
      
      {/* Foreground Content */}
      <div className="relative z-10">
        <Hero />
        <LogoStrip />
        <Services />
        <Metrics />
        <CaseStudies />
        <Testimonials />
        
        <footer className="py-12 bg-curious-dark-900 border-t border-curious-dark-700">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} CuriousLabs. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
