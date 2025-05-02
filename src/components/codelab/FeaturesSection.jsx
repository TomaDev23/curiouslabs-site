import React from "react";
import { motion } from "framer-motion";

const FeaturesSection = () => {
  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Animation variants for individual features
  const featureVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1]
      }
    }
  };

  // Features data array
  const features = [
    {
      icon: "⚙️",
      title: "CLI Traced",
      description: "Every code modification tracked through Git with detailed agent-to-agent handoffs."
    },
    {
      icon: "📊",
      title: "Test-Powered",
      description: "Automated regression tests track performance and ensure functional stability."
    },
    {
      icon: "🔍",
      title: "Edge Detection",
      description: "Proactive error monitoring catches bugs before they impact production."
    },
    {
      icon: "🔄",
      title: "Rapid Iteration",
      description: "Fast, iterative code refinement with contextual memory between sessions."
    },
    {
      icon: "📝",
      title: "Documentation",
      description: "Automatic generation of clean, complete documentation for all code changes."
    },
    {
      icon: "📱",
      title: "UI/UX Focus",
      description: "Emphasis on clean interfaces and intuitive user experiences."
    }
  ];

  return (
    <motion.section
      className="py-16 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Section header */}
      <motion.div 
        className="text-center mb-16"
        variants={featureVariants}
      >
        <motion.span className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
          What We Do
        </motion.span>
        <motion.h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Agent-Powered Development
        </motion.h2>
        <motion.p className="max-w-2xl mx-auto text-gray-300 text-lg">
          Our AI agents work together to solve complex coding challenges, delivering solutions that are reliable, maintainable, and properly tested.
        </motion.p>
      </motion.div>

      {/* Tiered features grid */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 shadow-lg"
              variants={featureVariants}
              whileHover={{ 
                y: -5,
                boxShadow: "0 15px 30px -10px rgba(124, 58, 237, 0.15)",
                borderColor: "rgba(124, 58, 237, 0.3)"
              }}
            >
              {/* Feature icon */}
              <div className="mb-4 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 w-14 h-14 rounded-lg flex items-center justify-center border border-purple-500/20">
                <span className="text-2xl">{feature.icon}</span>
              </div>
              
              {/* Feature content */}
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
              
              {/* Bottom accent line with gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Highlight callout */}
      <motion.div
        className="mt-20 max-w-4xl mx-auto p-6 md:p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-500/20 backdrop-blur-md"
        variants={featureVariants}
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-full flex items-center justify-center border border-purple-500/30">
            <span className="text-3xl md:text-4xl">🧠</span>
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">Elite Agent Infrastructure</h3>
            <p className="text-gray-300">
              Our custom agent network combines LLMs with specialized validation systems to ensure code quality meets rigorous standards. Every line is traced, tested, and validated before delivery.
            </p>
          </div>
          
          <motion.button
            className="mt-4 md:mt-0 flex-shrink-0 px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium shadow-md shadow-purple-900/20 hover:shadow-lg hover:shadow-purple-900/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Learn More
          </motion.button>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default FeaturesSection; 