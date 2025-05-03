import React, { memo, useEffect } from 'react';
import { startComponentRender, endComponentRender } from '../../utils/performanceMonitor';

/**
 * OptimizedComponent - Higher-order component for performance optimization
 * 
 * This component provides:
 * 1. Performance monitoring via startComponentRender/endComponentRender
 * 2. Memoization with React.memo to prevent unnecessary renders
 * 3. Console performance logging in development mode
 * 4. Error handling with a provided fallback
 * 
 * @param {Object} props
 * @param {React.Component} props.component - The component to optimize
 * @param {Object} props.componentProps - Props to pass to the component
 * @param {string} props.name - Name of the component for performance tracking
 * @param {boolean} props.logPerformance - Whether to log performance metrics
 * @param {React.ReactNode} props.fallback - Fallback UI in case of error
 */
const OptimizedComponent = ({ 
  component: Component, 
  componentProps = {}, 
  name = 'UnnamedComponent', 
  logPerformance = true,
  fallback = null
}) => {
  const renderStartTime = startComponentRender(name);
  
  useEffect(() => {
    // Log performance metrics when component mounts
    endComponentRender(name, renderStartTime);
    
    // Additional development-only logging
    if (process.env.NODE_ENV === 'development' && logPerformance) {
      console.log(`[Performance] ${name} rendered`);
    }
    
    return () => {
      if (process.env.NODE_ENV === 'development' && logPerformance) {
        console.log(`[Performance] ${name} unmounted`);
      }
    };
  }, [name, renderStartTime, logPerformance]);
  
  // Error handling
  try {
    return <Component {...componentProps} />;
  } catch (error) {
    console.error(`Error rendering ${name}:`, error);
    return fallback || <div className="text-red-500 p-4">Error rendering {name}</div>;
  }
};

// Export a memoized version to prevent unnecessary re-renders of the wrapper itself
export default memo(OptimizedComponent);

// Helper function to quickly optimize any component
export const optimize = (Component, options = {}) => {
  return memo((props) => (
    <OptimizedComponent
      component={Component}
      componentProps={props}
      name={options.name || Component.displayName || Component.name}
      logPerformance={options.logPerformance !== false}
      fallback={options.fallback}
    />
  ));
};

/**
 * Custom comparison function for deep equality check
 * More thorough than React's default shallow comparison
 */
export const deepPropsAreEqual = (prevProps, nextProps) => {
  const prevKeys = Object.keys(prevProps);
  const nextKeys = Object.keys(nextProps);
  
  // If number of keys is different, props have changed
  if (prevKeys.length !== nextKeys.length) return false;
  
  // Check each key for equality
  for (const key of prevKeys) {
    const prevValue = prevProps[key];
    const nextValue = nextProps[key];
    
    // Handle arrays specifically
    if (Array.isArray(prevValue) && Array.isArray(nextValue)) {
      if (prevValue.length !== nextValue.length) return false;
      
      for (let i = 0; i < prevValue.length; i++) {
        if (prevValue[i] !== nextValue[i]) return false;
      }
      continue;
    }
    
    // Handle objects specifically
    if (
      typeof prevValue === 'object' && 
      prevValue !== null && 
      typeof nextValue === 'object' && 
      nextValue !== null
    ) {
      if (!deepPropsAreEqual(prevValue, nextValue)) return false;
      continue;
    }
    
    // For primitive types, use strict equality
    if (prevValue !== nextValue) return false;
  }
  
  return true;
};

/**
 * Creates an optimized version of any component
 * @param {React.ComponentType} Component - Component to optimize
 * @param {Function} propsAreEqual - Optional custom comparison function
 */
export const createOptimizedComponent = (Component, propsAreEqual = null) => {
  return memo(Component, propsAreEqual);
}; 