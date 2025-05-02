import React, { useEffect } from "react";

export default function ServiceModal({
  isOpen, onClose, title, subtitle, bullets,
  outcome, cta, onCtaClick, trustTag, categoryTag
}) {
  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Lock body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  // Close when clicking backdrop, but not when clicking modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-sm transition-opacity duration-300"
      onClick={handleBackdropClick}
    >
      <div className="bg-gradient-to-b from-gray-900 to-[#161627] text-white max-w-lg w-full rounded-xl shadow-2xl p-6 md:p-7 relative border border-purple-900/40 my-10 animate-fadeIn">
        {/* Subtle glow effect */}
        <div className="absolute -inset-px bg-purple-600/5 rounded-xl blur-sm"></div>
        
        {/* Header with trust/category tags */}
        <div className="flex justify-between items-start mb-4 relative">
          <div className="flex gap-2 flex-wrap">
            {categoryTag && (
              <span className="text-xs font-medium text-indigo-300 bg-indigo-900/40 px-2 py-0.5 rounded-md uppercase tracking-wide border border-indigo-800/40">
                {categoryTag}
              </span>
            )}
            {trustTag && (
              <span className="text-xs font-medium text-green-300 bg-green-900/40 px-2 py-0.5 rounded-md uppercase tracking-wide border border-green-800/40">
                {trustTag}
              </span>
            )}
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white hover:bg-gray-800/50 text-xl -mt-1 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        
        {/* Content */}
        <h2 className="text-xl md:text-2xl font-bold mb-3 text-white">{title}</h2>
        <p className="text-sm text-gray-300 mb-5 leading-relaxed">{subtitle}</p>
        
        {/* Bullets */}
        <ul className="list-disc list-outside ml-5 space-y-3 text-sm text-gray-300">
          {bullets?.map((point, idx) => (
            <li key={idx} className="leading-relaxed pl-1">{point}</li>
          ))}
        </ul>
        
        {/* Outcome */}
        {outcome && (
          <div className="mt-6 p-4 bg-green-900/20 border border-green-800/40 rounded-lg relative overflow-hidden">
            {/* Subtle highlight */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>
            
            <p className="text-sm text-green-200 font-medium flex items-start">
              <span className="mr-2 text-base">💡</span> 
              <span><span className="text-green-300 font-semibold">Outcome:</span> {outcome}</span>
            </p>
          </div>
        )}
        
        {/* CTA Button */}
        {cta && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={onCtaClick}
              className="group bg-gradient-to-br from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-all duration-200 shadow-lg shadow-purple-900/30 relative overflow-hidden"
            >
              {/* Button shine effect on hover */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              
              {/* Text with slight push on hover */}
              <span className="relative group-hover:translate-y-px transition-transform duration-200">{cta}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 