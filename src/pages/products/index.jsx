import React, { useEffect, useRef } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer_legacy';
import ScrollToTop from '../../components/ScrollToTop';
import SolarSystem from '../../components/SolarSystem';

export default function ProductsPortal() {
  // Reference to track mounting
  const mountedRef = useRef(false);
  
  // Ensure page always starts at the top when mounted
  useEffect(() => {
    if (!mountedRef.current) {
      // First render - ensure we're at the top
      window.scrollTo(0, 0);
      mountedRef.current = true;
    }
    
    return () => {
      // Clean up when unmounting
      mountedRef.current = false;
    };
  }, []);

  const products = [
    {
      title: "OpsPipe",
      description: "Streamlined DevOps automation for teams of all sizes.",
      icon: "🛠️",
      link: "/products/opspipe",
      color: "blue"
    },
    {
      title: "MoonSignal",
      description: "Advanced market signals and trading intelligence.",
      icon: "📈",
      link: "/products/moonsignal",
      color: "purple"
    },
    {
      title: "Curious",
      description: "AI companion for learning and discovery.",
      icon: "🤖",
      link: "/products/curious",
      color: "green"
    },
    {
      title: "Guardian",
      description: "Protecting children in the digital world.",
      icon: "🛡️",
      link: "/products/guardian",
      color: "orange"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A2E] via-[#272750] to-[#1A1A2E] overflow-hidden">
      <NavBar />
      
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <section className="max-w-7xl mx-auto py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Creations</span>
          </h1>
          <p className="text-center text-gray-300 mb-12 sm:mb-16 max-w-2xl mx-auto px-4">
            Powered by the Aegis core, our products work in harmony to solve complex challenges.
          </p>
          
          {/* Using the modular SolarSystem component */}
          <SolarSystem products={products} />
        </section>
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
} 