import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal, sectionVariants, itemVariants } from '../../../utils/animation';
import ServiceCardShell from './ServiceCardShell';

/**
 * WhyAIDevCards - Section displaying benefits of AI-assisted development
 * Features animated cards with hover effects and visual polish
 */
const WhyAIDevCards = () => {
  // Get scroll reveal functionality
  const { ref, inView } = useScrollReveal(0.2);

  // Cards data for AI development benefits
  const aiDevBenefits = [
    {
      title: "Accelerated Development",
      description: "Reduce development time by up to 40% with AI pair programming and code generation tools.",
      icon: "🚀",
      color: "from-curious-blue-500 to-curious-green-500"
    },
    {
      title: "Higher Code Quality",
      description: "Leverage AI code reviews and testing to catch bugs early and ensure adherence to best practices.",
      icon: "✅",
      color: "from-curious-purple-500 to-curious-blue-500"
    },
    {
      title: "Knowledge Amplification",
      description: "Instantly access documentation, libraries, and patterns without breaking your flow state.",
      icon: "🧠",
      color: "from-curious-purple-500 to-curious-pink-500"
    },
    {
      title: "Cost Efficiency",
      description: "Reduce development costs and technical debt with AI-assisted planning and architecture.",
      icon: "💰",
      color: "from-curious-green-500 to-curious-blue-500"
    }
  ];

  return (
    <motion.section
      ref={ref}
      className="relative py-32 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      viewport={{ once: true }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-900/70"></div>
      
      {/* Standardized nebula positioning - one top-right */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-curious-purple-600/20 via-curious-blue-400/10 to-transparent rounded-full filter blur-[80px] opacity-30"></div>
      
      {/* Standardized nebula positioning - one bottom-left */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-curious-blue-600/20 via-curious-purple-400/10 to-transparent rounded-full filter blur-[80px] opacity-30"></div>
      
      {/* Section Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-curious-purple-400 to-curious-blue-400 bg-clip-text text-transparent mb-6">
            Why AI-Assisted Development?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how AI tools and techniques can supercharge your development workflow, 
            reduce tedious tasks, and help you focus on what truly matters.
          </p>
        </motion.div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {aiDevBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              variants={itemVariants}
              custom={index}
            >
              <ServiceCardShell
                title={benefit.title}
                description={benefit.description}
                icon={
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center text-xl`}>
                    {benefit.icon}
                  </div>
                }
              />
            </motion.div>
          ))}
        </div>
        
        {/* Call to action */}
        <motion.div 
          variants={itemVariants} 
          custom={4}
          className="mt-16 text-center"
        >
          <motion.a
            href="#contact"
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-curious-purple-600 to-curious-blue-600 text-white font-medium shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 transition-shadow"
            whileHover={{ y: -5, transition: { duration: 0.3, ease: "easeOut" } }}
          >
            Start Your AI Development Journey
            <svg className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WhyAIDevCards; 