import React, { useState, useEffect } from 'react';

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Navigation links
  const navLinks = [
    { title: 'Home', href: '#', id: 'home' },
    { title: 'Services', href: '#services', id: 'services' },
    { title: 'Case Studies', href: '#case-studies', id: 'case-studies' },
    { title: 'Metrics', href: '#metrics', id: 'metrics' },
    { title: 'About', href: '#about', id: 'about' }
  ];

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Listen for scroll events and track active section
  useEffect(() => {
    const handleScroll = () => {
      // Set isScrolled to true when page is scrolled beyond 10px
      setIsScrolled(window.scrollY > 10);
      
      // Track active section for nav highlighting
      const currentScrollPos = window.scrollY + 100;
      const sections = navLinks.map(link => {
        const element = document.getElementById(link.id);
        if (element) {
          return { id: link.id, top: element.offsetTop, bottom: element.offsetTop + element.offsetHeight };
        }
        return { id: link.id, top: 0, bottom: 0 };
      });
      
      // Find the section currently in view
      const currentSection = sections.find(section => 
        currentScrollPos >= section.top && currentScrollPos < section.bottom
      );
      
      if (currentSection) {
        setActiveSection(currentSection.id);
      } else if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };

    // Add scroll event listener with performance optimization
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', throttledScroll);
    
    // Check initial scroll position
    handleScroll();

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [navLinks]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#2D2940]/90 backdrop-blur-xl py-3 border-b border-[#5D45B8]/30 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)]' 
          : 'bg-[#2D2940]/60 backdrop-blur-sm py-4 border-b border-[#2c2c2c] shadow-[0_2px_5px_rgba(0,0,0,0.3)]'
      }`}
      style={{ 
        willChange: 'background-color, box-shadow, padding',
        transform: 'translateZ(0)'
      }}
    >
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#5D45B8]/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        {/* Logo with refined styling */}
        <div className="flex items-center">
          <div className="relative">
            <span className="text-xl font-medium text-white tracking-wide">
              CuriousLabs
            </span>
            {/* Subtle underline with gradient */}
            <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-[#5D45B8]/50 to-[#5D9EEB]/50"></div>
          </div>
        </div>

        {/* Desktop Navigation with refined styling */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.href} 
              className={`relative px-2 py-1.5 text-sm font-medium transition-all duration-200 ${
                activeSection === link.id 
                ? 'text-white' 
                : 'text-white/70 hover:text-white'
              }`}
            >
              {link.title}
              {/* Active indicator with refined styling */}
              {activeSection === link.id && (
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#5D45B8]/80 to-[#5D9EEB]/80 rounded-full"></span>
              )}
            </a>
          ))}
          <a 
            href="#contact" 
            className="group relative bg-gradient-to-r from-[#5D45B8] to-[#4A3E80] text-white px-5 py-2.5 rounded-md text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#5D45B8]/20 hover:translate-y-[-1px]"
          >
            {/* Button text */}
            <span className="relative z-10">Contact</span>
          </a>
        </div>

        {/* Mobile Menu Button with refined styling */}
        <div className="md:hidden">
          <button 
            onClick={toggleMobileMenu}
            className="relative text-white/90 hover:text-white transition-colors duration-200 p-2 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu with refined styling */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#2D2940]/95 backdrop-blur-xl border-b border-[#2c2c2c] shadow-lg">
          <div className="px-4 py-5 space-y-4">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={`block transition-all duration-200 relative pl-3 py-2 ${
                  activeSection === link.id 
                  ? 'text-white' 
                  : 'text-white/70 hover:text-white'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {/* Active indicator for mobile */}
                {activeSection === link.id && (
                  <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#5D45B8]/80 rounded-full"></span>
                )}
                {link.title}
              </a>
            ))}
            <a
              href="#contact"
              className="block w-full text-center bg-gradient-to-r from-[#5D45B8] to-[#4A3E80] text-white px-5 py-3 rounded-md mt-6 transition-all duration-300 hover:shadow-lg hover:shadow-[#5D45B8]/20"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
} 