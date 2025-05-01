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
    <section className="bg-gradient-to-b from-[#1A1A2E] via-[#16213E] to-[#0F172A] py-16 sm:py-24">
      <div className="container mx-auto px-4 text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Our Creations
        </h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Explore our suite of AI-powered products built with LEGIT-compliant architecture.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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