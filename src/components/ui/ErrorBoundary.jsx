import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * ErrorBoundary - Catches JavaScript errors in child components
 * Provides graceful degradation with fallback UI
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
    
    // Report to analytics or logging service if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'error', {
        'error_message': error.message,
        'component': this.props.componentName || 'Unknown Component'
      });
    }
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { fallback, children, showDetails = false } = this.props;

    if (hasError) {
      // You can render any custom fallback UI
      if (fallback) {
        return typeof fallback === 'function' 
          ? fallback(error, errorInfo)
          : fallback;
      }

      // Default fallback UI
      return (
        <div className="error-boundary-fallback">
          <h2>Something went wrong.</h2>
          {showDetails && (
            <details style={{ whiteSpace: 'pre-wrap' }}>
              <summary>Show Error Details</summary>
              <p>{error && error.toString()}</p>
              <p>Component Stack:</p>
              <pre>{errorInfo && errorInfo.componentStack}</pre>
            </details>
          )}
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]),
  componentName: PropTypes.string,
  showDetails: PropTypes.bool
};

export default ErrorBoundary; 