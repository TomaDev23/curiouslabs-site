/**
 * @component ContactTerminalAtomic
 * @description Contact information with terminal styling
 * @version 1.0.0
 * @type atomic
 */

import React, { useState, useEffect } from 'react';

// Component metadata for LEGIT compliance
export const metadata = {
  id: 'contact_terminal_atomic',
  scs: 'SCS-TERMINAL-UI',
  type: 'atomic',
  doc: 'contract_contact_terminal_atomic.md'
};

const ContactTerminalAtomic = () => {
  // Self-contained responsive state
  const [isMobile, setIsMobile] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeTab, setActiveTab] = useState('info'); // 'info' or 'form'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: 'web-development',
    message: ''
  });
  
  // Project type options
  const projectTypes = [
    { id: 'web-development', label: 'Web Development' },
    { id: 'ai-integration', label: 'AI Integration' },
    { id: 'code-optimization', label: 'Code Optimization' },
    { id: 'consultation', label: 'Technical Consultation' }
  ];
  
  // Terminal prompt text
  const terminalPrompt = 'need help connecting?';
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission - placeholder only, no actual submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Form submission logic would go here
  };
  
  // Handle responsive behavior and reduced motion preference
  useEffect(() => {
    const checkResponsive = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const checkMotionPreference = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      // Listen for changes
      const handleChange = (e) => setPrefersReducedMotion(e.matches);
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      }
    };
    
    // Initial checks
    checkResponsive();
    checkMotionPreference();
    
    // Add resize listener
    window.addEventListener('resize', checkResponsive);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkResponsive);
  }, []);
  
  // Typing animation effect
  useEffect(() => {
    if (prefersReducedMotion) {
      // Skip animation for users who prefer reduced motion
      setTypedText(terminalPrompt);
      setTypingComplete(true);
      return;
    }
    
    let currentIndex = 0;
    const textLength = terminalPrompt.length;
    
    const typingInterval = setInterval(() => {
      if (currentIndex < textLength) {
        setTypedText(terminalPrompt.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTypingComplete(true);
      }
    }, 70); // Typing speed
    
    return () => clearInterval(typingInterval);
  }, [prefersReducedMotion, terminalPrompt]);
  
  return (
    <section 
      id="contact" 
      className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-8 py-20 bg-curious-dark-900"
      aria-labelledby="contact-heading"
    >
      {/* Left Side - Contact Info Terminal */}
      <div className="w-full md:w-1/2 max-w-md mb-16 md:mb-0">
        <h2 id="contact-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          Contact <span className="text-lime-400">Terminal</span>
        </h2>
        
        <p className="text-lg text-gray-300 mb-8">
          Ready to {activeTab === 'info' ? 'connect' : 'begin your cosmic journey'}? 
          Reach out through our terminal interface.
        </p>
        
        {/* Terminal Tabs */}
        <div className="flex mb-4 text-sm font-mono">
          <button
            className={`px-4 py-2 rounded-t-md ${
              activeTab === 'info' 
                ? 'bg-black bg-opacity-70 text-lime-400 border-t border-l border-r border-gray-800' 
                : 'bg-gray-900 bg-opacity-50 text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('info')}
            aria-selected={activeTab === 'info'}
            role="tab"
          >
            contact_info
          </button>
          <button
            className={`px-4 py-2 rounded-t-md ml-2 ${
              activeTab === 'form' 
                ? 'bg-black bg-opacity-70 text-lime-400 border-t border-l border-r border-gray-800' 
                : 'bg-gray-900 bg-opacity-50 text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('form')}
            aria-selected={activeTab === 'form'}
            role="tab"
          >
            contact_init
          </button>
        </div>
        
        {/* Terminal-inspired Contact Info */}
        <div className="bg-black bg-opacity-70 border border-gray-800 rounded-lg p-6 backdrop-blur-sm shadow-lg ring-1 ring-lime-900/30">
          {/* Terminal Header */}
          <div className="flex items-center border-b border-gray-800 pb-4 mb-6">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" aria-hidden="true"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500" aria-hidden="true"></div>
              <div className="w-3 h-3 rounded-full bg-green-500" aria-hidden="true"></div>
            </div>
            <div className="ml-4 text-sm text-gray-400 font-mono">
              curious_labs:~$ {activeTab === 'info' ? 'contact_info' : 'contact_init'}
            </div>
          </div>
          
          {/* Content based on active tab */}
          {activeTab === 'info' ? (
            // Contact Information Tab
            <div className="space-y-4 font-mono">
              <div className="text-lime-400 text-sm flex items-start">
                <span className="mr-2">&gt;</span>
                <span>{typedText}</span>
                {!typingComplete && <span className="ml-1 h-4 w-2 bg-lime-400 animate-pulse"></span>}
              </div>
              
              {typingComplete && (
                <div 
                  className="mt-2 space-y-3 pl-4 border-l border-gray-800 opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]"
                  style={{ animationDelay: '0.3s' }}
                >
                  <div className="text-white flex items-center">
                    <span className="text-lime-400 mr-2">$</span>
                    <span className="text-gray-400 mr-2">EMAIL:</span>
                    <a 
                      href="mailto:hello@curiouslabs.ai" 
                      className="hover:text-lime-400 transition-colors"
                      aria-label="Email us at hello@curiouslabs.ai"
                    >
                      hello@curiouslabs.ai
                    </a>
                  </div>
                  <div className="text-white flex items-center">
                    <span className="text-lime-400 mr-2">$</span>
                    <span className="text-gray-400 mr-2">DISCORD:</span>
                    <span>@CuriousLabs</span>
                  </div>
                  <div className="text-white flex items-center">
                    <span className="text-lime-400 mr-2">$</span>
                    <span className="text-gray-400 mr-2">GITHUB:</span>
                    <a 
                      href="https://github.com/TomaDev23" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-lime-400 transition-colors"
                      aria-label="Visit our GitHub profile"
                    >
                      github.com/TomaDev23
                    </a>
                  </div>
                </div>
              )}
              
              {/* Terminal Input Simulation */}
              <div 
                className={`mt-6 flex items-center opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]`}
                style={{ animationDelay: typingComplete ? '0.8s' : '0s' }}
              >
                <span className="text-lime-400 mr-2">[terminal] &gt;_</span>
                <span className="text-gray-300">how can we assist?</span>
                <span className="ml-1 h-4 w-2 bg-lime-400 animate-pulse"></span>
              </div>
              
              {/* Switch to form tab suggestion */}
              <div 
                className={`mt-6 text-center opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]`}
                style={{ animationDelay: typingComplete ? '1.2s' : '0s' }}
              >
                <button 
                  onClick={() => setActiveTab('form')} 
                  className="text-xs text-lime-400 hover:underline"
                >
                  need to send a message? switch to contact_init
                </button>
              </div>
            </div>
          ) : (
            // Contact Form Tab
            <form onSubmit={handleSubmit} className="space-y-6 font-mono">
              <div>
                <label htmlFor="name" className="block text-sm text-gray-400 mb-1">$ name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-black bg-opacity-50 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-lime-400 focus:border-lime-400"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm text-gray-400 mb-1">$ email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-black bg-opacity-50 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-lime-400 focus:border-lime-400"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="project" className="block text-sm text-gray-400 mb-1">$ project_type:</label>
                <select
                  id="project"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  className="w-full bg-black bg-opacity-50 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-lime-400 focus:border-lime-400"
                >
                  {projectTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm text-gray-400 mb-1">$ message:</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full bg-black bg-opacity-50 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-lime-400 focus:border-lime-400"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md text-base font-medium text-black bg-lime-400 hover:bg-lime-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 transition-colors"
              >
                <span>Submit</span>
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              
              {/* Switch to info tab suggestion */}
              <div className="text-center text-xs text-gray-400 mt-4">
                <button 
                  onClick={() => setActiveTab('info')} 
                  className="text-lime-400 hover:underline"
                  type="button"
                >
                  just need our contact info? switch to contact_info
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      
      {/* Right Side - Visual */}
      {!isMobile && (
        <div className="w-full md:w-1/2 flex justify-center items-center">
          {/* Cosmic Terminal Visualization */}
          <div className="relative">
            {/* Terminal Globe */}
            <div 
              className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-lime-900 via-emerald-800 to-teal-900 relative overflow-hidden border border-gray-800"
              aria-hidden="true"
            >
              {/* Surface details */}
              <div className="absolute inset-0 opacity-30 mix-blend-overlay">
                <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent to-lime-300 opacity-20"></div>
                <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-transparent to-lime-200 opacity-20"></div>
              </div>
              
              {/* Terminal Screen Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
              
              {/* Terminal Text Simulation */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 font-mono text-lime-400 text-xs opacity-80">
                <div>$ {activeTab === 'info' ? 'initializing_connection' : 'input_received'}...</div>
                <div>$ establishing_link...</div>
                <div>$ connection_secure</div>
                <div className="flex items-center">
                  <span>$</span>
                  <span className="ml-1 h-4 w-2 bg-lime-400 animate-pulse"></span>
                </div>
              </div>
              
              {/* Glowing Effect */}
              <div className="absolute -inset-0.5 bg-lime-500 opacity-20 blur-md rounded-full"></div>
            </div>
            
            {/* Orbital Rings */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-dashed border-lime-900 rounded-full opacity-40"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border border-dashed border-lime-900 rounded-full opacity-20"></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactTerminalAtomic; 