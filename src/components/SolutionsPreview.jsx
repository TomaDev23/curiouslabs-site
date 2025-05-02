import React from 'react';
import { Link } from 'react-router-dom';

export default function SolutionsPreview() {
  const solutions = [
    {
      id: 'aegis',
      title: 'Aegis',
      description: 'Core runtime engine with LEGIT Protocol support. Secure, testable, and audit-compliant AI infrastructure.',
      icon: '🛡️',
      color: 'yellow',
      link: '/products/aegis'
    },
    {
      id: 'opspipe',
      title: 'OpsPipe',
      description: 'Enterprise-grade solution for automating, monitoring, and optimizing operational processes.',
      icon: '📊',
      color: 'blue',
      link: '/products/opspipe'
    },
    {
      id: 'moonsignal',
      title: 'MoonSignal',
      description: 'Advanced market signals and trading intelligence platform. Gain real-time insights and make data-driven decisions.',
      icon: '🚀',
      color: 'orange',
      link: '/products/moonsignal'
    },
    {
      id: 'curious',
      title: 'Curious',
      description: 'AI companion for thought and discovery. Explore knowledge and generate insights with context-aware intelligence.',
      icon: '🧠',
      color: 'purple',
      link: '/products/curious'
    },
    {
      id: 'guardian',
      title: 'Guardian',
      description: 'Comprehensive monitoring and security system. Protect your infrastructure with real-time surveillance.',
      icon: '🔍',
      color: 'green',
      link: '/products/guardian'
    }
  ];

  return (
    <section className="bg-gradient-to-b from-[#16213E] via-[#16213E] to-[#0F172A] pb-16 sm:pb-24 mt-96 relative">
      {/* Remove the gradient fade at the top that was causing overlap */}
      
      <div className="container mx-auto px-4 text-center mb-12 sm:mb-16 pt-24 relative z-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Our Creations
        </h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Explore our suite of AI-powered products built with LEGIT-compliant architecture.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
        {solutions.map((solution) => (
          <SolutionCard key={solution.id} solution={solution} />
        ))}
      </div>
    </section>
  );
}

// Solution Card Component
function SolutionCard({ solution }) {
  // Define styling based on product color
  const getStyles = (color) => {
    switch(color) {
      case 'yellow':
        return {
          bg: "from-[#252542]/60 to-[#1A1A30]/60",
          border: "border-yellow-500/20 hover:border-yellow-500/40",
          shadow: "shadow-yellow-900/10 hover:shadow-yellow-900/20",
          title: "text-yellow-400",
          button: "bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500"
        };
      case 'blue':
        return {
          bg: "from-[#1E293B]/60 to-[#0F172A]/60",
          border: "border-blue-500/20 hover:border-blue-500/40",
          shadow: "shadow-blue-900/10 hover:shadow-blue-900/20",
          title: "text-blue-400",
          button: "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400"
        };
      case 'orange':
        return {
          bg: "from-[#2D1D12]/60 to-[#1D1207]/60",
          border: "border-orange-500/20 hover:border-orange-500/40",
          shadow: "shadow-orange-900/10 hover:shadow-orange-900/20", 
          title: "text-orange-400",
          button: "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500"
        };
      case 'purple':
        return {
          bg: "from-[#1C1C2C]/60 to-[#12121C]/60",
          border: "border-purple-500/20 hover:border-purple-500/40",
          shadow: "shadow-purple-900/10 hover:shadow-purple-900/20",
          title: "text-purple-400",
          button: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
        };
      case 'green':
        return {
          bg: "from-[#1A2A35]/60 to-[#0F2027]/60",
          border: "border-green-500/20 hover:border-green-500/40",
          shadow: "shadow-green-900/10 hover:shadow-green-900/20",
          title: "text-green-400",
          button: "bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500"
        };
      default:
        return {
          bg: "from-[#1E293B]/60 to-[#0F172A]/60",
          border: "border-blue-500/20 hover:border-blue-500/40",
          shadow: "shadow-blue-900/10 hover:shadow-blue-900/20",
          title: "text-blue-400",
          button: "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400"
        };
    }
  };
  
  const styles = getStyles(solution.color);
  
  return (
    <div className={`bg-gradient-to-br ${styles.bg} border ${styles.border} rounded-xl p-6 shadow-md ${styles.shadow} transition-all duration-300 flex flex-col min-h-[280px]`}>
      <div className="text-3xl mb-4 mx-auto">{solution.icon}</div>
      <h3 className={`text-xl ${styles.title} font-semibold mb-3 text-center`}>{solution.title}</h3>
      <p className="text-gray-300 text-sm mb-6 flex-grow">{solution.description}</p>
      <Link 
        to={solution.link} 
        className={`mt-auto ${styles.button} text-white font-medium py-2 px-4 rounded-md transition-all duration-300 text-center`}
      >
        Explore {solution.title}
      </Link>
    </div>
  );
} 