/**
 * @component ServicesOrbital
 * @description Services section with orbital card stack system
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - ServicesOrbital passes LEGIT protocol
 */

import React, { useState, useEffect } from 'react';

const ServicesOrbital = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Services data
  const services = [
    {
      id: 1,
      title: 'AI Development',
      description: 'Advanced artificial intelligence solutions with cutting-edge algorithms',
      color: 'from-lime-500/20 to-emerald-700/20',
      orbitColor: 'bg-lime-400'
    },
    {
      id: 2,
      title: 'Web3 Integration',
      description: 'Seamless blockchain and decentralized application development',
      color: 'from-yellow-500/20 to-orange-700/20',
      orbitColor: 'bg-yellow-400'
    },
    {
      id: 3,
      title: 'Cloud Architecture',
      description: 'Scalable and resilient cloud infrastructure solutions',
      color: 'from-blue-500/20 to-indigo-700/20',
      orbitColor: 'bg-blue-400'
    },
    {
      id: 4,
      title: 'DevOps Automation',
      description: 'Streamlined development operations and deployment pipelines',
      color: 'from-purple-500/20 to-violet-700/20',
      orbitColor: 'bg-purple-400'
    }
  ];

  // Auto-rotate cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % services.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="services" className="min-h-screen relative flex items-center justify-center py-20">
      {/* Background orbital rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {services.map((_, index) => (
          <div
            key={`orbit-${index}`}
            className={`absolute border border-gray-700/30 rounded-full
              ${index === activeIndex ? 'opacity-100' : 'opacity-30'}
              transition-all duration-500`}
            style={{
              width: `${(index + 1) * 25}%`,
              height: `${(index + 1) * 25}%`,
              transform: `rotate(${index * 45}deg)`
            }}
          />
        ))}
      </div>

      {/* Cards container */}
      <div className="relative w-full max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left side: Service cards */}
          <div className="w-full md:w-1/2 relative h-[400px]">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`absolute top-0 left-0 w-full transition-all duration-500 
                  ${index === activeIndex ? 'opacity-100 translate-y-0 z-10' : 
                    index < activeIndex ? 'opacity-0 -translate-y-full' : 
                    'opacity-0 translate-y-full'}`}
              >
                <div className={`p-8 rounded-2xl backdrop-blur-sm bg-gradient-to-br ${service.color}
                  border border-gray-700/50`}>
                  <div className="flex items-center mb-4">
                    <div className={`w-3 h-3 rounded-full ${service.orbitColor} mr-3`} />
                    <span className="text-sm text-gray-400">0{service.id}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif mb-4">{service.title}</h3>
                  <p className="text-gray-300">{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right side: Navigation pills */}
          <div className="w-full md:w-1/3 mt-8 md:mt-0">
            <div className="space-y-4">
              {services.map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-300
                    ${index === activeIndex ? 'bg-gray-800/50 backdrop-blur-sm' : 'hover:bg-gray-800/30'}`}
                >
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full ${service.orbitColor} mr-3
                      ${index === activeIndex ? 'scale-150' : ''} transition-transform duration-300`} />
                    <span className={`${index === activeIndex ? 'text-white' : 'text-gray-400'}`}>
                      {service.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOrbital; 