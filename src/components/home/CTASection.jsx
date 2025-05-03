import { motion } from "framer-motion";

/**
 * CTASection component with a contact form and information
 * Self-contained with no external dependencies
 */
export default function CTASection() {
  return (
    <section className="relative py-20 bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-black z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-gray-700/50">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Start Your Mission?
              </h2>
              
              <p className="text-lg text-gray-300">
                Submit your bug or project details, and we'll get back to you with a mission plan.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <form>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Your Name</label>
                      <motion.input 
                        type="text" 
                        className="w-full bg-gray-800/70 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Jane Doe"
                        whileFocus={{ borderColor: "#8B5CF6" }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                      <motion.input 
                        type="email" 
                        className="w-full bg-gray-800/70 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="jane@example.com"
                        whileFocus={{ borderColor: "#8B5CF6" }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Project Type</label>
                      <motion.select 
                        className="w-full bg-gray-800/70 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        whileFocus={{ borderColor: "#8B5CF6" }}
                      >
                        <option>Bug Fix</option>
                        <option>Code Refactor</option>
                        <option>Test Generation</option>
                        <option>CLI Automation</option>
                        <option>Custom Project</option>
                      </motion.select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                      <motion.textarea 
                        className="w-full bg-gray-800/70 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32"
                        placeholder="Tell us about your project or bug..."
                        whileFocus={{ borderColor: "#8B5CF6" }}
                      ></motion.textarea>
                    </div>
                    
                    <motion.button 
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-purple-500/20"
                      whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.5)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Submit Mission Request
                    </motion.button>
                  </div>
                </form>
              </div>
              
              <div className="flex flex-col justify-center">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-purple-500 text-2xl">📍</div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Our Base</h3>
                      <p className="text-gray-400">San Francisco, CA<br />United States</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="text-purple-500 text-2xl">📧</div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Email</h3>
                      <p className="text-gray-400">missions@curiouslabs.ai</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="text-purple-500 text-2xl">🕒</div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Response Time</h3>
                      <p className="text-gray-400">We typically respond within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 