import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Error boundary component that catches runtime errors and displays fallback UI
 * Also provides a link to the legacy site as a failsafe
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
    
    // Log to monitoring service if available
    if (typeof window !== 'undefined' && window.errorLogging) {
      window.errorLogging.captureException(error, { extra: errorInfo });
    }
  }

  render() {
    if (this.state.hasError) {
      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Default fallback UI
      return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="mb-4 text-gray-300">We're experiencing technical difficulties. Please try the legacy site while we fix the issue.</p>
          
          <details className="mb-6 p-4 bg-gray-800 rounded-lg max-w-2xl w-full overflow-auto">
            <summary className="cursor-pointer mb-2 text-purple-400">Error details (for developers)</summary>
            <pre className="text-xs overflow-auto p-2 bg-gray-900 rounded">{this.state.error && this.state.error.toString()}</pre>
            <div className="mt-2">
              <pre className="text-xs overflow-auto p-2 bg-gray-900 rounded">
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </div>
          </details>
          
          <div className="flex gap-4">
            <Link 
              to="/legacy" 
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded transition-colors"
            >
              Go to Legacy Site
            </Link>
            
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 border border-purple-600 text-purple-400 hover:bg-purple-900/20 rounded transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
    
    return this.props.children;
  }
}

export default ErrorBoundary; 