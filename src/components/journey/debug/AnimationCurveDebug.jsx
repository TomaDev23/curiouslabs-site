import React from 'react';

/**
 * @module AnimationCurveDebug
 * @version 1.0.0
 * @component Debug Component
 * @implements LEGIT/Debug.Overlay
 * @contract contract_debug_tools.md
 */

// LEGIT-compliant metadata
const metadata = {
  id: 'animation_curve_debug',
  scs: 'SCS-DEBUG',
  type: 'debug',
  doc: 'contract_debug_tools.md'
};

/**
 * Debug overlay to visualize animation curve interpolation
 */
export default function AnimationCurveDebug({ 
  scrollProgress = 0, 
  interpolatedValue = 0,
  rawValue = 0,
  label = 'Density',
  type = 'default'
}) {
  // Determine color based on type
  const getTypeColor = () => {
    switch(type) {
      case 'density': return 'bg-blue-600';
      case 'fps': return 'bg-green-600';
      case 'glow': return 'bg-purple-600';
      default: return 'bg-gray-700';
    }
  };

  return (
    <div className={`fixed bottom-24 right-4 z-[9999] ${getTypeColor()} p-3 rounded-lg text-white text-sm font-mono pointer-events-none`}>
      <div className="text-lg font-bold mb-1">{label} Curve</div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        <div className="text-gray-300">Progress:</div>
        <div className="text-right">{(scrollProgress * 100).toFixed(1)}%</div>
        
        <div className="text-gray-300">Raw {label}:</div>
        <div className="text-right">{typeof rawValue === 'number' ? rawValue.toFixed(1) : rawValue}</div>
        
        <div className="text-gray-300">Interpolated:</div>
        <div className="text-right font-bold">{typeof interpolatedValue === 'number' ? interpolatedValue.toFixed(1) : interpolatedValue}</div>
      </div>
    </div>
  );
} 