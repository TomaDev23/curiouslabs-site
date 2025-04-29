import React from 'react';
import { Link } from 'react-router-dom';

export default function SolutionsPreview() {
  const solutions = [
    {
      id: 'aegis',
      title: 'Aegis',
      description: 'The core process engine powering all our products.',
      icon: '🌟',
      color: 'yellow',
      link: '/products/aegis'
    },
    {
      id: 'opspipe',
      title: 'OpsPipe',
      description: 'Streamlined DevOps automation for teams of all sizes.',
      icon: '🛠️',
      color: 'blue',
      link: '/products/opspipe'
    },
    {
      id: 'moonsignal',
      title: 'MoonSignal',
      description: 'Advanced market signals and trading intelligence.',
      icon: '📈',
      color: 'purple',
      link: '/products/moonsignal'
    },
    {
      id: 'curious',
      title: 'Curious',
      description: 'AI companion for learning and discovery.',
      icon: '🤖',
      color: 'green',
      link: '/products/curious'
    },
    {
      id: 'guardian',
      title: 'Guardian',
      description: 'Protecting children in the digital world.',
      icon: '🛡️',
      color: 'orange',
      link: '/products/guardian'
    }
  ];

  // Color variants for each product
  const colorVariants = {
    yellow: "from-yellow-600 to-amber-500 hover:from-yellow-500 hover:to-amber-400 border-yellow-500/20",
    blue: "from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 border-blue-500/20",
    purple: "from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 border-purple-500/20",
    green: "from-green-600 to-teal-500 hover:from-green-500 hover:to-teal-400 border-green-500/20",
    orange: "from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 border-orange-500/20",
  };

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-[#1a1a2e] to-[#28293d]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Solutions</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Innovative products powered by the Aegis core - designed to solve complex challenges.
          </p>
        </div>

        {/* Desktop Layout (3 + 2) */}
        <div className="hidden md:block">
          {/* Top Row - 3 items */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {solutions.slice(0, 3).map((solution) => (
              <SolutionCard key={solution.id} solution={solution} colorClass={colorVariants[solution.color]} />
            ))}
          </div>
          
          {/* Bottom Row - 2 items centered */}
          <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
            {solutions.slice(3, 5).map((solution) => (
              <SolutionCard key={solution.id} solution={solution} colorClass={colorVariants[solution.color]} />
            ))}
          </div>
        </div>

        {/* Mobile Layout (Vertical Stack) */}
        <div className="md:hidden space-y-6">
          {solutions.map((solution) => (
            <SolutionCard key={solution.id} solution={solution} colorClass={colorVariants[solution.color]} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Solution Card Component
function SolutionCard({ solution, colorClass }) {
  return (
    <div className="group relative transform transition-all duration-300 hover:scale-105 hover:z-10">
      {/* Card glow effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]} rounded-xl blur opacity-0 group-hover:opacity-60 transition duration-500`}></div>
      
      {/* Card content */}
      <div className="relative bg-gradient-to-br from-[#2A2A45] to-[#1A1A30] p-6 rounded-xl border border-white/10 h-full flex flex-col">
        <div className="mb-4 text-2xl">{solution.icon}</div>
        <h3 className="text-xl font-semibold text-white mb-2">{solution.title}</h3>
        <p className="text-gray-400 text-sm flex-grow mb-4">{solution.description}</p>
        
        <Link to={solution.link} className={`self-start bg-gradient-to-r ${colorClass} text-white text-sm font-medium py-2 px-4 rounded-md transition-all duration-300`}>
          Learn More
        </Link>
      </div>
    </div>
  );
} 