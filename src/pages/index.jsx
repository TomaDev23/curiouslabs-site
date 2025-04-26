import React from "react";
import Hero from '../components/Hero';
import LogoStrip from '../components/LogoStrip';
import Services from '../components/Services';
import Metrics from '../components/Metrics';
import CaseStudies from '../components/CaseStudies';
import Testimonials from '../components/Testimonials';

export default function Home() {
  return (
    <main className="min-h-screen bg-curious-dark-900 text-white antialiased">
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
    </main>
  );
}
