// src/components/home/v6/ContactTerminal.jsx

import React, { useState, useRef, useEffect } from 'react';
import { useBreakpoint } from '../../../hooks/useBreakpoint';

/**
 * @component ContactTerminal
 * @description Contact form with cosmic terminal styling
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - ContactTerminal passes LEGIT protocol
 */
const ContactTerminal = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    project: 'web-development'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const { isMobile } = useBreakpoint();
  const sectionRef = useRef(null);
  
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
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        message: '',
        project: 'web-development'
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Setup intersection observer for section animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: '-50px'
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-8 py-20 opacity-0 translate-y-10 transition-all duration-1000 ease-out"
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
          
          {submitStatus === 'success' ? (
            // Success Message
            <div className="space-y-4 font-mono">
              <p className="text-lime-400">$ Message received. Transmission successful.</p>
              <p className="text-gray-300">$ We'll respond to your query shortly...</p>
              <div className="flex items-center space-x-2 text-gray-400">
                <span className="inline-block w-3 h-3 bg-lime-400 rounded-full animate-pulse"></span>
                <span>Connection active</span>
              </div>
              <button
                onClick={() => setSubmitStatus(null)}
                className="mt-4 px-4 py-2 bg-transparent border border-lime-400 text-lime-400 rounded hover:bg-lime-400 hover:bg-opacity-10 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            // Contact Form
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
                disabled={isSubmitting}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md text-base font-medium text-black bg-lime-400 hover:bg-lime-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <span>Submit</span>
                    <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
              
              {submitStatus === 'error' && (
                <p className="text-red-500 text-sm mt-2">
                  Error submitting the form. Please try again.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
      
      {/* Right Side - Visual */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        {/* Placeholder for cosmic visual */}
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
          </div>
          
          {/* Orbital Connection Rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full border border-lime-400 border-opacity-10 rounded-full"></div>
            <div className="absolute w-56 h-56 sm:w-72 sm:h-72 border border-lime-400 border-opacity-5 rounded-full"></div>
          </div>
          
          {/* Connectivity Dots */}
          <div className="absolute top-1/4 right-0 transform translate-x-4 flex items-center">
            <div className="w-8 h-px bg-lime-400 opacity-70"></div>
            <div className="w-2 h-2 rounded-full bg-lime-400"></div>
          </div>
          
          <div className="absolute bottom-1/4 left-0 transform -translate-x-4 flex items-center">
            <div className="w-2 h-2 rounded-full bg-lime-400"></div>
            <div className="w-8 h-px bg-lime-400 opacity-70"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactTerminal;

// Final update to index.jsx to include all sections

import React from 'react';
import LayoutWrapper from '../components/home/v6/LayoutWrapper';
import HeroPortal from '../components/home/v6/HeroPortal';
import ServicesOrbital from '../components/home/v6/ServicesOrbital';
import ProcessCards from '../components/home/v6/ProcessCards';
import ContactTerminal from '../components/home/v6/ContactTerminal';

/**
 * @component HomePage
 * @description Main home page for CuriousLabs V6
 */
const HomePage = () => {
  return (
    <LayoutWrapper>
      <HeroPortal />
      <ServicesOrbital />
      <ProcessCards />
      <ContactTerminal />
    </LayoutWrapper>
  );
};

export default HomePage;