import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTASection = () => {
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

  const itemVariants = {
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

  return (
    <motion.section
      className="py-20 relative z-10 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-600/10 rounded-full filter blur-3xl -z-10"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 -z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-purple-500/20 rounded-full"
            style={{
              width: Math.random() * 6 + 2 + "px",
              height: Math.random() * 6 + 2 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%"
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Decorative animated gradient borders */}
          <motion.div 
            className="absolute inset-0 rounded-3xl"
            style={{ 
              background: "linear-gradient(45deg, rgba(139, 92, 246, 0.3), rgba(79, 70, 229, 0.1), rgba(139, 92, 246, 0), rgba(139, 92, 246, 0.3))",
              backgroundSize: "400% 400%",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <div className="relative z-10">
            <motion.div className="text-center mb-10" variants={itemVariants}>
              <motion.h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight" variants={itemVariants}>
                Ready to Transform Your <span className="relative">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300">
                    Development Process?
                  </span>
                  <motion.span 
                    className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full"
                    animate={{ 
                      width: ["0%", "100%", "100%", "0%"],
                      left: ["0%", "0%", "0%", "100%"]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                      times: [0, 0.3, 0.7, 1]
                    }}
                  />
                </span>
              </motion.h2>
              <motion.p className="max-w-3xl mx-auto text-gray-300 text-lg md:text-xl" variants={itemVariants}>
                Join the growing community of developers saving time, improving code quality, and shipping faster with our intelligent tools and frameworks.
              </motion.p>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
              variants={itemVariants}
            >
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                <Link to="/contact" className="relative flex items-center justify-center px-8 py-4 bg-black rounded-xl leading-none text-white font-medium text-lg">
                  Start Free Trial
                  <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to="/services" className="flex items-center justify-center px-8 py-4 bg-gray-800/50 hover:bg-gray-800 border border-purple-500/20 hover:border-purple-500/40 rounded-xl text-white font-medium text-lg transition-colors duration-200">
                  Schedule Demo
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="mt-10 flex flex-wrap justify-center gap-8"
              variants={itemVariants}
            >
              <div className="flex items-center">
                <div className="w-12 h-12 mr-3 rounded-full bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border border-purple-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Enterprise Security</h4>
                  <p className="text-sm text-gray-400">SOC2 Certified & Compliant</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 mr-3 rounded-full bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border border-purple-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Cloud Integration</h4>
                  <p className="text-sm text-gray-400">Works with all major providers</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 mr-3 rounded-full bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border border-purple-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Rapid Deployment</h4>
                  <p className="text-sm text-gray-400">Run in minutes, not days</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CTASection; 