import React from 'react';
import { motion } from 'framer-motion';

/**
 * Services Float Layer Component - Phase 1 Placeholder
 * Will be fully implemented in Phase 4
 */
const ServicesFloatLayer = () => {
  // Mock services data - will be expanded in Phase 4
  const services = [
    {
      id: 1,
      title: "Bug Fixing",
      icon: "🐛",
      color: "from-blue-500 to-purple-600",
      description: "Submit your bugs and receive clean, working code with proper test coverage."
    },
    {
      id: 2,
      title: "Code Refactoring",
      icon: "♻️",
      color: "from-purple-500 to-pink-600",
      description: "Transform legacy code into modern, maintainable, and efficient implementations."
    },
    {
      id: 3,
      title: "Test Generation",
      icon: "✅",
      color: "from-green-500 to-teal-600",
      description: "Generate comprehensive test suites with excellent coverage for your codebase."
    },
    {
      id: 4,
      title: "CLI Automation",
      icon: "⚡",
      color: "from-yellow-500 to-orange-600",
      description: "Build powerful command-line interfaces and automation tools for your workflows."
    }
  ];
  
  return (
    <section className="relative py-20 bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-black/90 z-0"></div>
      
      {/* Cosmic neon border effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"></div>
        <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"></div>
        <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-fuchsia-500/30 to-transparent"></div>
        <div className="absolute top-0 left-0 w-[100px] h-[100px] bg-blue-500/10 blur-[50px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[100px] h-[100px] bg-purple-500/10 blur-[50px] rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-br ${service.color}`}>
                <span className="text-2xl">{service.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesFloatLayer; 