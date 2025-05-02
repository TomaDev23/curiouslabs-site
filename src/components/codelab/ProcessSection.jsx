import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const ProcessSection = () => {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  // Animation variants for section elements
  const elementVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 1, 0.5, 1]
      }
    }
  };

  // Data for process steps
  const processSteps = [
    {
      icon: "📋",
      title: "1. Requirement Gathering",
      description: "Submit your code issues, feature requests, or project requirements through our intuitive interface.",
      color: "from-blue-600/20 to-blue-900/20",
      borderColor: "border-blue-500/30"
    },
    {
      icon: "🤖",
      title: "2. AI Agent Assignment",
      description: "Our system automatically assigns the optimal AI agent team based on your specific needs and technical requirements.",
      color: "from-purple-600/20 to-purple-900/20",
      borderColor: "border-purple-500/30"
    },
    {
      icon: "⚙️",
      title: "3. Development & Testing",
      description: "Agents work collaboratively to develop and test solutions, tracking every code modification through CLI traces.",
      color: "from-indigo-600/20 to-indigo-900/20",
      borderColor: "border-indigo-500/30"
    },
    {
      icon: "🔍",
      title: "4. Quality Assurance",
      description: "Specialized QA agents perform rigorous validation testing to ensure code meets our high-quality standards.",
      color: "from-violet-600/20 to-violet-900/20",
      borderColor: "border-violet-500/30"
    },
    {
      icon: "🚀",
      title: "5. Delivery & Implementation",
      description: "Receive production-ready code with complete documentation and implementation guidance.",
      color: "from-fuchsia-600/20 to-fuchsia-900/20",
      borderColor: "border-fuchsia-500/30"
    }
  ];

  // Animation for flowing pulse effect on connector line
  const connectorVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" },
        opacity: { duration: 0.3 }
      }
    }
  };

  // Pulse animation for dots on the timeline
  const pulseVariants = {
    initial: { scale: 0.8, opacity: 0.3 },
    animate: {
      scale: [0.8, 1.2, 0.8],
      opacity: [0.3, 1, 0.3],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section
      className="py-20 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Background gradient effects */}
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-purple-600/5 rounded-full filter blur-3xl z-0"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full filter blur-3xl z-0"></div>

      {/* Section header */}
      <motion.div
        className="text-center mb-20"
        variants={elementVariants}
      >
        <motion.span className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
          Our Process
        </motion.span>
        <motion.h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          How CodeLab Works
        </motion.h2>
        <motion.p className="max-w-2xl mx-auto text-gray-300 text-lg">
          Our streamlined process delivers high-quality code solutions with minimal friction. Experience the future of software development.
        </motion.p>
      </motion.div>

      {/* Process timeline */}
      <div className="max-w-5xl mx-auto px-4 relative">
        {/* Visual connector SVG - will be shown on md screens and up */}
        <div className="hidden md:block absolute top-0 left-0 right-0 bottom-0 z-0 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M20,20 C30,35 70,15 80,30 C90,45 30,60 20,75 C10,90 80,85 80,95"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="0.5"
              strokeDasharray="5,5"
              initial="initial"
              animate="animate"
              variants={connectorVariants}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#4f46e5" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Process steps */}
        <div className="relative z-10 space-y-12 md:space-y-24">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              className={`flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-8 md:gap-16 items-center`}
              variants={elementVariants}
            >
              {/* Timeline dot indicator (visible on md screens and up) */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                <motion.div
                  className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg shadow-purple-500/30"
                  initial="initial"
                  animate="animate"
                  variants={pulseVariants}
                />
              </div>

              {/* Step icon */}
              <div className="flex-shrink-0 relative">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} backdrop-blur-md flex items-center justify-center ${step.borderColor} border shadow-lg shadow-purple-900/10`}>
                  <span className="text-3xl">{step.icon}</span>
                </div>
                
                {/* Step number badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm font-semibold border border-purple-300/20 shadow-md">
                  {index + 1}
                </div>
              </div>

              {/* Step content */}
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-300 text-lg">{step.description}</p>
                
                {/* Progress indicators for mobile */}
                {index < processSteps.length - 1 && (
                  <div className="mt-6 mb-6 h-12 flex justify-center items-center md:hidden">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <motion.path 
                        d="M12 5L12 19M12 19L19 12M12 19L5 12" 
                        stroke="#8b5cf6" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          repeat: Infinity,
                          repeatType: "reverse",
                          duration: 1.5
                        }}
                      />
                    </svg>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to action */}
      <motion.div
        className="mt-24 text-center"
        variants={elementVariants}
      >
        <motion.h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Ready to experience agent-powered development?
        </motion.h3>
        <motion.div className="flex flex-wrap justify-center gap-4">
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg text-white font-medium shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started
          </motion.button>
          <motion.button
            className="px-8 py-3 bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700 hover:border-purple-500/50 rounded-lg text-white font-medium transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            View Case Studies
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default ProcessSection; 