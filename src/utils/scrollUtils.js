// scrollUtils.js
// ✅ Tile W1.1 — Navigation Sync
// Provides scroll utility functions for the cosmic harmony navigation system

/**
 * Smooth scrolls to a specified section by ID with offset consideration
 * @param {string} id - The ID of the element to scroll to
 * @param {Object} options - Additional options for scrolling
 * @param {string} options.block - Vertical alignment ('start', 'center', 'end', 'nearest')
 * @param {number} options.additionalOffset - Extra offset to apply (in pixels)
 */
export function scrollToSection(id) {
  const element = document.getElementById(id);
  
  if (element) {
    // Get any additional scroll margin from CSS
    const styles = window.getComputedStyle(element);
    const scrollMarginTop = parseInt(styles.scrollMarginTop || '0');
    
    // Calculate the element's position
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    
    // Add scroll margin (if any)
    const offsetPosition = elementPosition - scrollMarginTop;
    
    // Smooth scroll to the element
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

/**
 * Registers click handlers for all navigation links with hash fragments
 * Useful for attaching to links throughout the app
 */
export function registerSmoothScrolling() {
  document.addEventListener('click', (e) => {
    // Check if the clicked element is a link with a hash
    const link = e.target.closest('a');
    if (link && link.hash && link.pathname === window.location.pathname) {
      e.preventDefault();
      const id = link.hash.substring(1); // Remove the # character
      scrollToSection(id);
    }
  });
}

/**
 * Activates smooth scrolling for a specific navigation component
 * @param {Array} items - Array of navigation items with href properties
 * @param {Function} setActive - Function to set active item
 */
export function setupNavScrolling(items, setActive) {
  items.forEach(item => {
    const id = item.href.substring(1); // Remove the # character
    const element = document.getElementById(id);
    
    if (element) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id);
          }
        },
        { threshold: 0.2 } // 20% of the element must be visible
      );
      
      observer.observe(element);
      return () => observer.disconnect();
    }
  });
} 