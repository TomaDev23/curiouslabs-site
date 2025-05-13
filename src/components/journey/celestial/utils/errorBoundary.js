import React from 'react';

export const metadata = {
  id: 'celestial_error_boundary',
  scs: 'SCS3',
  type: 'utility',
  doc: 'contract_celestial_utils.md'
};

export class CelestialErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
    
    // Log error to console with component info
    console.error(
      `Celestial component error in ${this.props.componentName || 'unknown component'}:`, 
      error, 
      errorInfo
    );
    
    // Optional: Send error to monitoring service
    if (window.errorReportingService) {
      window.errorReportingService.reportError({
        error,
        componentName: this.props.componentName,
        additionalInfo: errorInfo
      });
    }
  }

  render() {
    if (this.state.hasError) {
      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Check if we should render default error UI
      if (this.props.showDefaultError) {
        return (
          <div className="celestial-error absolute inset-0 flex items-center justify-center z-9">
            <div className="bg-red-900/20 backdrop-blur-sm p-4 rounded-lg border border-red-500/30 max-w-md">
              <h3 className="text-red-300 text-lg font-medium mb-2">
                Celestial Rendering Error
              </h3>
              <p className="text-red-200 text-sm mb-3">
                {this.state.error && this.state.error.toString()}
              </p>
              <button 
                className="text-xs bg-red-800 hover:bg-red-700 text-red-200 px-3 py-1 rounded-md"
                onClick={() => this.setState({ hasError: false })}
              >
                Try Again
              </button>
            </div>
          </div>
        );
      }
      
      // Default: don't show anything
      return null;
    }
    
    return this.props.children;
  }
} 