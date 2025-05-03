import React from 'react';
import { motion } from 'framer-motion';

/**
 * ServicesSection component with four service cards
 * Self-contained with no external dependencies
 */
export default function ServicesSection() {
  // Services data
  const services = [
    {
      title: "Bug Fixing",
      icon: "🐛",
      color: "from-blue-500 to-purple-600",
      description: "Submit your bugs and receive clean, working code with proper test coverage."
    },
    {
      title: "Code Refactoring",
      icon: "♻️",
      color: "from-purple-500 to-pink-600",
      description: "Transform legacy code into modern, maintainable, and efficient implementations."
    },
    {
      title: "Test Generation",
      icon: "✅",
      color: "from-green-500 to-teal-600",
      description: "Generate comprehensive test suites with excellent coverage for your codebase."
    },
    {
      title: "CLI Automation",
      icon: "⚡",
      color: "from-yellow-500 to-orange-600",
      description: "Build powerful command-line interfaces and automation tools for your workflows."
    }
  ];

  return (
    <section className="relative py-20 bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-black/90 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Agent-Powered Development
          </h2>
          
          <p className="text-lg text-gray-300">
            Our AI agents work together to solve complex coding challenges, delivering solutions that are reliable, maintainable, and properly tested.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: `0 10px 25px -5px rgba(147, 51, 234, 0.2)` }}
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
} 