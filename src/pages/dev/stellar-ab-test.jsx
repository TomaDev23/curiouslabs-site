import React, { useState, useEffect } from 'react';
import StellarMessageComponent from '../../components/StellarMessage.jsx';
import StellarMessageGrokComponent from '../../components/StellarMessageGrok.jsx';

const StellarABTest = () => {
  const [activeTest, setActiveTest] = useState('both');
  const [isScrollLocked, setIsScrollLocked] = useState(false);

  useEffect(() => {
    const handleStellarComplete = () => {
      console.log('🌌 AB Test: Stellar sequence completed, releasing scroll');
      setIsScrollLocked(false);
    };

    window.addEventListener('stellarSequenceComplete', handleStellarComplete);
    return () => window.removeEventListener('stellarSequenceComplete', handleStellarComplete);
  }, []);

  const TestSection = ({ title, component, version }) => (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Header */}
      <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-sm rounded-lg p-4">
        <h2 className="text-white text-xl font-bold mb-2">{title}</h2>
        <div className="text-sm text-gray-300 space-y-1">
          <div>Version: {version}</div>
          <div>Status: {isScrollLocked ? 'Scroll Locked' : 'Scroll Released'}</div>
          <div className="text-xs text-yellow-400">
            Watch console for debug info
          </div>
        </div>
      </div>

      {/* Cosmic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/30 to-pink-900/20" />
      
      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Nebula Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-500/10 via-transparent to-transparent" />

      {/* StellarMessage Component */}
      {component}

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 right-4 z-20 bg-black/50 backdrop-blur-sm rounded-lg p-4">
        <h3 className="text-white font-semibold mb-2">Test Instructions:</h3>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• Watch the particle animation sequence</li>
          <li>• Check console for debug information</li>
          <li>• Observe constellation line connections</li>
          <li>• Note scroll release after dissolution phase</li>
          <li>• Compare animation smoothness and visual effects</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-white text-2xl font-bold">StellarMessage A/B Test</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTest('original')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTest === 'original' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Original Only
              </button>
              <button
                onClick={() => setActiveTest('grok')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTest === 'grok' 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Grok Only
              </button>
              <button
                onClick={() => setActiveTest('both')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTest === 'both' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Side by Side
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-16">
        {activeTest === 'both' && (
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <TestSection 
              title="Original Implementation" 
              component={<StellarMessageComponent />}
              version="v1.0 - Current"
            />
            <TestSection 
              title="Grok Enhanced Implementation" 
              component={<StellarMessageGrokComponent />}
              version="v2.0 - Grok Enhanced"
            />
          </div>
        )}

        {activeTest === 'original' && (
          <TestSection 
            title="Original Implementation - Full Screen" 
            component={<StellarMessageComponent />}
            version="v1.0 - Current"
          />
        )}

        {activeTest === 'grok' && (
          <TestSection 
            title="Grok Enhanced Implementation - Full Screen" 
            component={<StellarMessageGrokComponent />}
            version="v2.0 - Grok Enhanced"
          />
        )}
      </div>

      {/* Comparison Notes */}
      <div className="bg-slate-800 border-t border-gray-700 p-6">
        <div className="container mx-auto">
          <h2 className="text-white text-xl font-bold mb-4">Comparison Notes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-700 rounded-lg p-4">
              <h3 className="text-blue-400 font-semibold mb-2">Original Implementation</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Standard phase durations</li>
                <li>• Basic particle movement</li>
                <li>• Simple constellation connections</li>
                <li>• Standard dissolution effect</li>
                <li>• Event-driven activation</li>
              </ul>
            </div>
            <div className="bg-slate-700 rounded-lg p-4">
              <h3 className="text-orange-400 font-semibold mb-2">Grok Enhanced Implementation</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Extended breathing phase (4s vs 2s)</li>
                <li>• Enhanced particle movement with pulsing</li>
                <li>• Improved constellation line effects</li>
                <li>• Smoother spiral dissolution</li>
                <li>• Auto-activation with looping</li>
                <li>• Better visual clarity and effects</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StellarABTest; 