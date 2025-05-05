import { useState, useEffect, useRef } from 'react';

// Section Entry Animations - Wave System
export const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
      when: "beforeChildren",
      staggerChildren: 0.05
    }
  }
};

// Child element variants for staggered reveals
export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

/**
 * Reveal animation variants for sections
 * Used with the useSectionReveal hook for scroll-triggered animations
 */
export const revealVariants = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

/**
 * Reveal animation variants with staggered children
 * Good for sections with multiple elements that should animate in sequence
 */
export const revealWithChildrenVariants = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.33, 1, 0.68, 1],
      staggerChildren: 0.1
    }
  }
};

/**
 * Child item variants for use inside staggered parent containers
 */
export const childVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

// Parallax Micro-Interactions
export const useParallax = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const getParallaxStyle = (speed) => ({
    transform: `translateY(${scrollY * speed}px)`
  });
  
  return getParallaxStyle;
};

// Scroll-Triggered Reveals
export const useScrollReveal = (threshold = 0.1) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin: '0px'
      }
    );
    
    observer.observe(ref.current);
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);
  
  return { ref, inView };
};

// Helper to check for reduced motion preference
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}; 