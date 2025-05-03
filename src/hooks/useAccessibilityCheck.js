import { useEffect, useRef } from 'react';

/**
 * Custom hook to perform accessibility checks on components
 * Helps identify and log potential accessibility issues
 * 
 * @param {string} componentName - Name of the component being checked
 * @param {Object} options - Configuration options
 * @param {boolean} options.checkContrast - Whether to check color contrast
 * @param {boolean} options.checkFocus - Whether to check keyboard focus
 * @param {boolean} options.checkAria - Whether to check ARIA attributes
 * @returns {Object} - Ref to attach to the component and validation results
 */
const useAccessibilityCheck = (
  componentName, 
  { 
    checkContrast = true, 
    checkFocus = true,
    checkAria = true 
  } = {}
) => {
  const componentRef = useRef(null);
  const issuesRef = useRef([]);
  
  useEffect(() => {
    if (!componentRef.current || typeof window === 'undefined') return;
    
    const element = componentRef.current;
    const issues = [];
    
    // Only run in development mode
    if (process.env.NODE_ENV !== 'development') return;
    
    // Check for proper focus management
    if (checkFocus) {
      const focusableElements = element.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length > 0) {
        let hasVisibleFocusStyles = false;
        
        // Check if any focusable element has appropriate focus styles
        focusableElements.forEach(el => {
          const computedStyle = window.getComputedStyle(el);
          const hasFocusStyles = (
            computedStyle.outlineStyle !== 'none' || 
            el.classList.contains('focus-visible') ||
            el.hasAttribute('data-focus-visible-added')
          );
          
          if (hasFocusStyles) {
            hasVisibleFocusStyles = true;
          }
        });
        
        if (!hasVisibleFocusStyles) {
          issues.push('Component contains focusable elements but may not have visible focus styles.');
        }
      }
    }
    
    // Check for ARIA attributes on interactive elements
    if (checkAria) {
      const buttons = element.querySelectorAll('button');
      const customControls = element.querySelectorAll('[role="button"], [role="checkbox"], [role="menuitem"]');
      
      buttons.forEach(button => {
        if (!button.textContent.trim() && !button.getAttribute('aria-label') && !button.getAttribute('aria-labelledby')) {
          issues.push('Button without text content should have aria-label or aria-labelledby.');
        }
      });
      
      customControls.forEach(control => {
        if (!control.getAttribute('aria-label') && !control.getAttribute('aria-labelledby')) {
          issues.push(`Custom control with role="${control.getAttribute('role')}" should have aria-label or aria-labelledby.`);
        }
      });
      
      // Enhanced: Check for proper heading structure
      const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let previousLevel = 0;
      
      headings.forEach((heading) => {
        const level = parseInt(heading.tagName.charAt(1), 10);
        
        // Check if heading level jumps by more than one
        if (previousLevel > 0 && level > previousLevel + 1) {
          issues.push(`Heading level jumps from h${previousLevel} to h${level}. This may confuse screen reader users.`);
        }
        
        previousLevel = level;
      });
      
      // Enhanced: Check for images with missing alt text
      const images = element.querySelectorAll('img');
      images.forEach((img) => {
        if (!img.hasAttribute('alt')) {
          issues.push('Image is missing alt text. This makes it inaccessible to screen reader users.');
        }
      });
    }
    
    // Check for color contrast (limited check)
    if (checkContrast && window.getComputedStyle) {
      const textElements = element.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, button, label');
      const smallTextElements = [];
      
      textElements.forEach(el => {
        const computedStyle = window.getComputedStyle(el);
        const fontSize = parseFloat(computedStyle.fontSize);
        if (fontSize < 18) {
          smallTextElements.push(el);
        }
      });
      
      if (smallTextElements.length > 0) {
        issues.push('Component contains small text elements that should be checked for color contrast (4.5:1 ratio required).');
      }
    }
    
    // Log issues if any found
    if (issues.length > 0) {
      console.group(`⚠️ Accessibility issues in ${componentName}:`);
      issues.forEach(issue => console.warn(`- ${issue}`));
      console.groupEnd();
      issuesRef.current = issues;
    }
  }, [componentName, checkContrast, checkFocus, checkAria]);
  
  return {
    ref: componentRef,
    issues: issuesRef.current
  };
};

export default useAccessibilityCheck; 