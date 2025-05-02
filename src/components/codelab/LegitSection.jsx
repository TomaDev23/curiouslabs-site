import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const LegitSection = () => {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants
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

  const textVariants = {
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

  // Animation for floating items
  const floatingVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: custom => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: custom * 0.1,
        ease: [0.25, 1, 0.5, 1]
      }
    }),
    floating: custom => ({
      y: shouldReduceMotion ? 0 : [0, -8, 0],
      rotate: shouldReduceMotion ? 0 : [0, custom % 2 === 0 ? 3 : -3, 0],
      transition: {
        y: {
          duration: 3 + custom * 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        },
        rotate: {
          duration: 4 + custom * 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }
      }
    })
  };

  // LEGIT items data
  const legitItems = [
    {
      title: "Logged",
      icon: "📜",
      description: "All transitions, operations, and executions are comprehensively trace-logged."
    },
    {
      title: "Evaluated",
      icon: "🧪",
      description: "Components are validated against test specs and regression patterns."
    },
    {
      title: "Grounded",
      icon: "🧠",
      description: "Every system output is schema-bound, type-safe, and verifiable."
    },
    {
      title: "Isolated",
      icon: "🛡️",
      description: "Operations run in isolated contexts with no shared state leakage."
    },
    {
      title: "Tested",
      icon: "✅",
      description: "Every component is tested thoroughly for reliability and edge cases."
    }
  ];

  return (
    <motion.section
      className="py-20 relative z-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-purple-600/10 rounded-full filter blur-3xl z-0"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl z-0"></div>

      {/* Particle background */}
      <div className="absolute inset-0 z-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-purple-500/10 rounded-full"
            style={{
              width: Math.random() * 4 + 1 + "px",
              height: Math.random() * 4 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%"
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Section content */}
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div className="text-center mb-16" variants={textVariants}>
          <motion.span className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-3 block" variants={textVariants}>
            Our Commitment
          </motion.span>
          <motion.h2 className="text-3xl md:text-4xl font-bold text-white mb-4" variants={textVariants}>
            Built <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300">LEGIT</span> for Technical Excellence
          </motion.h2>
          <motion.p className="max-w-2xl mx-auto text-gray-300 text-lg" variants={textVariants}>
            Every tool in CodeLab follows the LEGIT standard — our framework for secure, testable, and audit-compliant development.
          </motion.p>
        </motion.div>

        {/* LEGIT items in radial layout */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mb-16 perspective-1000">
          {legitItems.map((item, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-md p-6 rounded-xl border border-purple-500/20 w-full sm:w-[240px] shadow-xl hover:shadow-purple-900/20 transition-shadow duration-300 relative z-10"
              variants={floatingVariants}
              custom={index}
              initial="hidden"
              animate={["visible", "floating"]}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.3)",
                borderColor: "rgba(124, 58, 237, 0.4)" 
              }}
            >
              {/* Icon with glow effect */}
              <div className="mb-5 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border border-purple-500/20 text-3xl relative">
                  {item.icon}
                  <div className="absolute inset-0 bg-purple-500/20 rounded-xl filter blur-xl opacity-50"></div>
                </div>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-purple-300 mb-2 text-center">{item.title}</h3>
              <p className="text-gray-400 text-center">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Technical LEGIT Meaning Section */}
        <motion.div 
          className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900/40 to-black/40 backdrop-blur-md p-8 rounded-2xl border border-purple-500/20 shadow-xl"
          variants={textVariants}
        >
          <motion.h3 
            className="text-2xl font-bold text-white mb-6 text-center"
            variants={textVariants}
          >
            What LEGIT Means in Code
          </motion.h3>
          
          <motion.div className="space-y-6" variants={containerVariants}>
            {[
              {
                title: "L – Lifecycle Simulation Tested",
                description: "Every core phase is validated via state-machine simulations with full control replay."
              },
              {
                title: "E – Enum & State Traceability Verified",
                description: "All transitions use strongly-typed enums. State changes emit traceable artifacts like state.json."
              },
              {
                title: "G – Guardrails Locked",
                description: "Fallbacks, overrides, and failures are schema-validated and tracked in files like recovery.json."
              },
              {
                title: "I – Interface Contracts Enforced",
                description: "Parsers, agents, and sync layers must conform to spec. No schema = no ship."
              },
              {
                title: "T – Trace Artifacts Written",
                description: "All sessions output structured trace logs (trace/, logs/audit/) that drive real-time dashboard panels and diagnostics."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="flex gap-4 items-start"
                variants={textVariants}
                custom={index}
                whileHover={{ x: 5 }}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border border-purple-500/20 flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                  {item.title.charAt(0)}
                </div>
                <div>
                  <h4 className="text-purple-400 font-bold mb-1">{item.title}</h4>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default LegitSection; 