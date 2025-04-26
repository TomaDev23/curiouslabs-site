import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

/**
 * ScrollReveal component that animates its children when they enter the viewport
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements to be revealed
 * @param {string} props.animation - Animation class to apply ('fadeInUp', 'fadeInLeft', 'fadeInRight')
 * @param {number} props.threshold - Visibility threshold (0-1)
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.delay - CSS delay value (e.g., '0.2s')
 * @returns {React.ReactElement} The ScrollReveal component
 */
export default function ScrollReveal({
  children,
  animation = 'fadeInUp',
  threshold = 0.1,
  className = '',
  delay = '0s',
  ...props
}) {
  const [ref, isVisible] = useScrollReveal({ threshold });

  // Map animation names to actual CSS classes
  const animationClasses = {
    fadeInUp: 'animate-fadeInUp',
    fadeInLeft: 'animate-fadeInLeft',
    fadeInRight: 'animate-fadeInRight',
  };

  const animationClass = animationClasses[animation] || animationClasses.fadeInUp;
  
  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? animationClass : 'opacity-0'}`}
      style={{ transitionDelay: delay }}
      {...props}
    >
      {children}
    </div>
  );
} 