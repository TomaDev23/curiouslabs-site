/**
 * @component ContactTerminal
 * @description Contact form with cosmic terminal styling
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - ContactTerminal passes LEGIT protocol
 */

import React, { useState } from 'react';
import { useBreakpoint } from '../../../hooks/useBreakpoint';

const ContactTerminal = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    project: 'web-development'
  });
  const { isMobile } = useBreakpoint();
  
  // Project type options
  const projectTypes = [
    { id: 'web-development', label: 'Web Development' },
    { id: 'ai-integration', label: 'AI Integration' },
    { id: 'code-optimization', label: 'Code Optimization' },
    { id: 'consultation', label: 'Technical Consultation' }
  ];
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission - placeholder only, no actual submission in static version
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic will be implemented later
    console.log('Form data submitted:', formData);
  };
  
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-8 py-20 opacity-100"
    >
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 max-w-md mb-16 md:mb-0">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          Contact <span className="text-lime-400">Terminal</span>
        </h2>
        
        <p className="text-lg text-gray-300 mb-8">
          Ready to begin your cosmic journey? Reach out through our terminal interface.
        </p>
        
        {/* Terminal-inspired Form */}
        <div className="bg-black bg-opacity-70 border border-gray-800 rounded-lg p-6 backdrop-blur-sm">
          {/* Terminal Header */}
          <div className="flex items-center border-b border-gray-800 pb-4 mb-6">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="ml-4 text-sm text-gray-400 font-mono">curious_labs:~$ contact_init</div>
          </div>
          
          {/* Contact Form */}
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
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>
      </div>
      
      {/* Right Side - Visual */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        {/* Cosmic Sphere Visualization */}
        <div className="relative">
          {/* Visualization Sphere */}
          <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-lime-900 via-emerald-800 to-teal-900 relative overflow-hidden border border-gray-800">
            {/* Surface details */}
            <div className="absolute inset-0 opacity-30 mix-blend-overlay">
              <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent to-lime-300 opacity-20"></div>
              <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-transparent to-lime-200 opacity-20"></div>
            </div>
            
            {/* Terminal Screen Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
            
            {/* Terminal Text Simulation */}
            <div className="absolute inset-0 flex flex-col justify-end p-5 font-mono text-lime-400 text-xs opacity-80">
              <div>$ connecting_to_server...</div>
              <div>$ establishing_link...</div>
              <div>$ ready_for_transmission</div>
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
    </section>
  );
};

export default ContactTerminal; 