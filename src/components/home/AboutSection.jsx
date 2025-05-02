import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * About Section Component - Phase 2 Implementation
 * Scroll-triggered section with animations
 */
const AboutSection = ({ isReducedMotion = false }) => {
  const { scrollYProgress } = useScroll();
  
  // Reduced motion settings - simpler transforms and faster transitions
  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.1, 0.2], 
    [0, 0.5, 1]
  );
  
  // If reduced motion is preferred, only use opacity for transitions
  const y = isReducedMotion 
    ? 0 
    : useTransform(scrollYProgress, [0, 0.1, 0.2], [100, 50, 0]);
  
  // Features for the three-column grid
  const features = [
    {
      title: "Elite Engineering",
      icon: "🧪",
      description: "Showcase elite-level AI engineering without the fluff or marketing hype."
    },
    {
      title: "Tool Ecosystem",
      icon: "🛠️",
      description: "Sell and showcase our tools—CodeLab, OpsPipe, MoonSignal, Guardian, and Curious."
    },
    {
      title: "System Intelligence",
      icon: "🎭",
      description: "Reflect aesthetic taste and system-level intelligence in everything we build."
    }
  ];
  
  return (
    <motion.section 
      className="relative py-20 bg-gray-900/70"
      style={{ opacity, y }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-gray-900/70 backdrop-blur-sm z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: isReducedMotion ? 0 : 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: isReducedMotion ? 0.3 : 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            CuriousLabs is a Studio
          </h2>
          
          <p className="text-lg text-gray-300 mb-8">
            Building intelligent solutions for tomorrow's challenges—where code meets imagination.
            We are a hybrid of a studio, a product lab, and a tech brand with tools, services, and actual IP.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300"
                whileHover={{ y: isReducedMotion ? 0 : -5 }}
                initial={{ opacity: 0, y: isReducedMotion ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: isReducedMotion ? 0.2 : 0.5, 
                  delay: isReducedMotion ? index * 0.05 : index * 0.1 
                }}
              >
                <div className="text-purple-400 text-4xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutSection; 