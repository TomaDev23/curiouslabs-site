import React from 'react';
import { motion } from 'framer-motion';

/**
 * ContactTerminal - "Mission Control Terminal" section
 * Features terminal-inspired contact form with animations
 */
const ContactTerminal = () => {
  return (
    <motion.section 
      className="relative py-24 pb-40"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 to-gray-900/50"></div>
      
      {/* Standardized nebula positioning - one top-right */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-curious-purple-600/20 via-curious-blue-400/10 to-transparent rounded-full filter blur-[80px] opacity-30"></div>
      
      {/* Standardized nebula positioning - one bottom-left */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-curious-blue-600/20 via-curious-purple-400/10 to-transparent rounded-full filter blur-[80px] opacity-30"></div>
      
      {/* Standardized particle effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full bg-white opacity-40"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-y ${2 + Math.random() * 3}s ease-in-out infinite alternate`
            }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div
          className="bg-gray-900/70 backdrop-blur-md rounded-2xl border border-gray-700 overflow-hidden shadow-xl max-w-4xl mx-auto cta-block shadow-curious-purple-600/30"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Terminal Header */}
          <div className="bg-gray-900 p-4 flex items-center">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="font-mono text-sm text-gray-400">
              mission_control@curiouslabs 
            </div>
          </div>
          
          <div className="p-8">
            <motion.h2 
              className="text-2xl md:text-3xl font-semibold text-gray-100 text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Ready to Start Your Mission?
            </motion.h2>
            
            <motion.p 
              className="text-base md:text-lg text-gray-300 leading-relaxed text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Submit your bug or project details, and we'll get back to you with a mission plan.
            </motion.p>
            
            {/* Terminal-inspired form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {/* Form fields with focus effects */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Your Name</label>
                  <motion.div
                    whileFocus={{ scale: 1.01 }}
                    className="relative"
                  >
                    <span className="absolute left-3 top-3 text-gray-500 font-mono">{'>'}</span>
                    <input 
                      type="text" 
                      className="w-full bg-gray-900/70 border border-gray-700 focus:border-curious-purple-500 rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-curious-purple-500/50 transition-all"
                      placeholder="Jane Doe"
                    />
                  </motion.div>
                </div>
                
                {/* Additional form fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                  <motion.div
                    whileFocus={{ scale: 1.01 }}
                    className="relative"
                  >
                    <span className="absolute left-3 top-3 text-gray-500 font-mono">{'>'}</span>
                    <input 
                      type="email" 
                      className="w-full bg-gray-900/70 border border-gray-700 focus:border-curious-purple-500 rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-curious-purple-500/50 transition-all"
                      placeholder="jane@example.com"
                    />
                  </motion.div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Project Type</label>
                  <motion.div
                    whileFocus={{ scale: 1.01 }}
                    className="relative"
                  >
                    <span className="absolute left-3 top-3 text-gray-500 font-mono">{'>'}</span>
                    <select className="w-full bg-gray-900/70 border border-gray-700 focus:border-curious-purple-500 rounded-lg pl-8 pr-10 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-curious-purple-500/50 transition-all">
                      <option>Bug Fix</option>
                      <option>Code Refactor</option>
                      <option>Test Generation</option>
                      <option>CLI Automation</option>
                      <option>Custom Project</option>
                    </select>
                    <span className="absolute right-3 top-3 text-gray-500 pointer-events-none">▼</span>
                  </motion.div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                  <motion.div
                    whileFocus={{ scale: 1.01 }}
                    className="relative"
                  >
                    <span className="absolute left-3 top-3 text-gray-500 font-mono">{'>'}</span>
                    <textarea 
                      className="w-full bg-gray-900/70 border border-gray-700 focus:border-curious-purple-500 rounded-lg pl-8 pr-4 py-3 text-white h-32 focus:outline-none focus:ring-2 focus:ring-curious-purple-500/50 transition-all"
                      placeholder="Tell us about your project or bug..."
                    ></textarea>
                  </motion.div>
                </div>
                
                <motion.button 
                  className="w-full bg-gradient-to-r from-curious-purple-600 to-curious-blue-600 hover:from-curious-purple-700 hover:to-curious-blue-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-curious-purple-500/30"
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Mission Request
                </motion.button>
              </motion.div>
              
              <motion.div 
                className="flex flex-col justify-center space-y-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {/* Contact info cards */}
                <motion.div 
                  className="bg-gray-900/50 backdrop-blur-md rounded-xl p-5 border border-gray-700 hover:border-curious-purple-700/40"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.3)" }}
                >
                  <div className="flex items-start">
                    <div className="text-curious-purple-500 text-2xl mr-4">📍</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-100 mb-1">Our Base</h3>
                      <p className="text-gray-300">San Francisco, CA<br />United States</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-900/50 backdrop-blur-md rounded-xl p-5 border border-gray-700 hover:border-curious-purple-700/40"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.3)" }}
                >
                  <div className="flex items-start">
                    <div className="text-curious-purple-500 text-2xl mr-4">📧</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-100 mb-1">Email</h3>
                      <p className="text-gray-300">missions@curiouslabs.ai</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-900/50 backdrop-blur-md rounded-xl p-5 border border-gray-700 hover:border-curious-purple-700/40"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.3)" }}
                >
                  <div className="flex items-start">
                    <div className="text-curious-purple-500 text-2xl mr-4">🕒</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-100 mb-1">Response Time</h3>
                      <p className="text-gray-300">We typically respond within 24 hours</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
          
          {/* Terminal Footer - Blinking Cursor */}
          <div className="px-8 pb-4">
            <div className="font-mono text-gray-300 text-sm flex items-center">
              <span className="text-curious-green-400 mr-2">✓</span>
              <span>Ready to receive mission data</span>
              <span className="ml-2 w-2 h-4 bg-curious-purple-400 animate-pulse"></span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactTerminal; 