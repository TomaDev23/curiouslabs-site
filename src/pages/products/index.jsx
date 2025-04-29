import React from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import AegisCenterCard from '../../components/AegisCenterCard';
import OrbitProductCard from '../../components/OrbitProductCard';

export default function ProductsPortal() {
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
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A2E] via-[#272750] to-[#1A1A2E]">
      <NavBar />
      
      <main className="pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center text-white mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Creations</span>
          </h1>
          <p className="text-center text-gray-300 mb-16 max-w-2xl mx-auto">
            Powered by the Aegis core, our products work in harmony to solve complex challenges.
          </p>
          
          {/* Solar System Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* First row - Top satellites */}
            <div className="lg:col-span-1">
              <OrbitProductCard {...products[0]} />
            </div>
            <div className="lg:col-span-1 hidden lg:block"></div>
            <div className="lg:col-span-1">
              <OrbitProductCard {...products[1]} />
            </div>
            
            {/* Center row with Aegis */}
            <div className="lg:col-span-3 flex justify-center -my-4 lg:my-0">
              <div className="w-full max-w-xl">
                <AegisCenterCard />
              </div>
            </div>
            
            {/* Bottom row - Bottom satellites */}
            <div className="lg:col-span-1">
              <OrbitProductCard {...products[2]} />
            </div>
            <div className="lg:col-span-1 hidden lg:block"></div>
            <div className="lg:col-span-1">
              <OrbitProductCard {...products[3]} />
            </div>
          </div>
          
          {/* Mobile-only vertical layout for small screens */}
          <div className="lg:hidden mt-8 text-center text-sm text-gray-400">
            <p>On larger screens, see our unique solar system layout!</p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
} 