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
      
      <div className="container mx-auto px-4">
        <motion.div
          className="bg-gray-800/40 backdrop-blur-md rounded-2xl border border-gray-700 overflow-hidden shadow-xl max-w-4xl mx-auto cta-block"
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
              mission_control@curiouslabs ~ $
            </div>
          </div>
          
          <div className="p-8">
            <motion.h2 
              className="text-3xl font-bold text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Ready to Start Your Mission?
            </motion.h2>
            
            <motion.p 
              className="text-center text-gray-300 mb-8"
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
                      className="w-full bg-gray-900/70 border border-gray-700 focus:border-purple-500 rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
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
                      className="w-full bg-gray-900/70 border border-gray-700 focus:border-purple-500 rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
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
                    <select className="w-full bg-gray-900/70 border border-gray-700 focus:border-purple-500 rounded-lg pl-8 pr-10 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all">
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
                      className="w-full bg-gray-900/70 border border-gray-700 focus:border-purple-500 rounded-lg pl-8 pr-4 py-3 text-white h-32 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      placeholder="Tell us about your project or bug..."
                    ></textarea>
                  </motion.div>
                </div>
                
                <motion.button 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-purple-500/20"
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
                  className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700"
                  whileHover={{ y: -5, borderColor: 'rgba(147, 51, 234, 0.3)' }}
                >
                  <div className="flex items-start">
                    <div className="text-purple-500 text-2xl mr-4">📍</div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Our Base</h3>
                      <p className="text-gray-400">San Francisco, CA<br />United States</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700"
                  whileHover={{ y: -5, borderColor: 'rgba(147, 51, 234, 0.3)' }}
                >
                  <div className="flex items-start">
                    <div className="text-purple-500 text-2xl mr-4">📧</div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Email</h3>
                      <p className="text-gray-400">missions@curiouslabs.ai</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700"
                  whileHover={{ y: -5, borderColor: 'rgba(147, 51, 234, 0.3)' }}
                >
                  <div className="flex items-start">
                    <div className="text-purple-500 text-2xl mr-4">🕒</div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Response Time</h3>
                      <p className="text-gray-400">We typically respond within 24 hours</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
          
          {/* Terminal Footer - Blinking Cursor */}
          <div className="px-8 pb-4">
            <div className="font-mono text-gray-400 text-sm flex items-center">
              <span className="text-green-400 mr-2">✓</span>
              <span>Ready to receive mission data</span>
              <span className="ml-2 w-2 h-4 bg-gray-400 animate-pulse"></span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactTerminal; 