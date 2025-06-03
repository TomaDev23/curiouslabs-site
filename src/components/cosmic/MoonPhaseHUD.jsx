/**
 * @component MoonPhaseHUD
 * @description Portal-based Moon Phase debug controls that bypass Three.js event interference
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - MoonPhaseHUD passes LEGIT protocol
 */

import React from 'react';
import ReactDOM from 'react-dom';

const MOON_PHASES = [
  { key: 'auto', name: 'Auto', icon: '🔄', value: null, description: 'Real-time lunar sync' },
  { key: 'newMoon', name: 'New Moon', icon: '🌑', value: 0.0, description: 'Dark moon' },
  { key: 'waxingCrescent', name: 'Waxing Crescent', icon: '🌒', value: 0.15, description: 'Growing sliver' },
  { key: 'firstQuarter', name: 'First Quarter', icon: '🌓', value: 0.28, description: 'Half illuminated' },
  { key: 'waxingGibbous', name: 'Waxing Gibbous', icon: '🌔', value: 0.4, description: 'Nearly full' },
  { key: 'fullMoon', name: 'Full Moon', icon: '🌕', value: 0.5, description: 'Complete illumination' },
  { key: 'waningGibbous', name: 'Waning Gibbous', icon: '🌖', value: 0.6, description: 'Diminishing' },
  { key: 'lastQuarter', name: 'Last Quarter', icon: '🌗', value: 0.72, description: 'Half dark' },
  { key: 'waningCrescent', name: 'Waning Crescent', icon: '🌘', value: 0.85, description: 'Final sliver' }
];

const MoonPhaseHUD = ({ currentPhase, onPhaseChange, isVisible = true }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const hudRef = React.useRef(null);
  const toggleRef = React.useRef(null);
  const buttonsRef = React.useRef({});

  // Setup native DOM event listeners
  React.useEffect(() => {
    if (!isVisible) return;

    // Toggle button listener
    if (toggleRef.current) {
      const handleToggle = () => {
        console.log('🌓 HUD toggle clicked');
        setIsExpanded(prev => !prev);
      };
      toggleRef.current.addEventListener('click', handleToggle);
    }

    // Phase button listeners
    MOON_PHASES.forEach(phase => {
      const button = buttonsRef.current[phase.key];
      if (button) {
        const handlePhaseClick = () => {
          console.log(`🌙 Phase selected: ${phase.name} (${phase.value})`);
          try {
            onPhaseChange(phase.value);
            console.log('✅ Phase change successful');
          } catch (error) {
            console.error('❌ Phase change failed:', error);
          }
        };
        button.addEventListener('click', handlePhaseClick);
      }
    });

    // Cleanup
    return () => {
      if (toggleRef.current) {
        toggleRef.current.removeEventListener('click', () => {});
      }
      MOON_PHASES.forEach(phase => {
        const button = buttonsRef.current[phase.key];
        if (button) {
          button.removeEventListener('click', () => {});
        }
      });
    };
  }, [isVisible, onPhaseChange, isExpanded]);

  const getCurrentPhaseData = () => {
    return MOON_PHASES.find(phase => phase.value === currentPhase) || MOON_PHASES[0];
  };

  const hudContent = (
    <div 
      ref={hudRef}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 999999,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        userSelect: 'none'
      }}
    >
      {/* Toggle Button */}
      <div
        ref={toggleRef}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(20,20,40,0.9) 100%)',
          border: '2px solid rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '24px',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          marginLeft: 'auto'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
        }}
      >
        {getCurrentPhaseData().icon}
      </div>

      {/* Expanded HUD Panel */}
      {isExpanded && (
        <div
          style={{
            marginTop: '15px',
            padding: '20px',
            background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,40,0.95) 100%)',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 16px 64px rgba(0,0,0,0.5)',
            minWidth: '280px',
            animation: 'slideIn 0.3s ease-out'
          }}
        >
          {/* Header */}
          <div style={{
            color: 'white',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '15px',
            textAlign: 'center',
            opacity: 0.9
          }}>
            🌙 Moon Phase Control
          </div>

          {/* Current Phase Display */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '15px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{
              color: 'white',
              fontSize: '12px',
              opacity: 0.7,
              marginBottom: '4px'
            }}>
              Current Phase
            </div>
            <div style={{
              color: 'white',
              fontSize: '16px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>{getCurrentPhaseData().icon}</span>
              <span>{getCurrentPhaseData().name}</span>
            </div>
            <div style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '11px',
              marginTop: '2px'
            }}>
              {getCurrentPhaseData().description}
            </div>
          </div>

          {/* Phase Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px'
          }}>
            {MOON_PHASES.map(phase => (
              <button
                key={phase.key}
                ref={el => buttonsRef.current[phase.key] = el}
                style={{
                  background: currentPhase === phase.value 
                    ? 'linear-gradient(135deg, rgba(100,100,200,0.3) 0%, rgba(50,50,150,0.3) 100%)'
                    : 'rgba(255,255,255,0.05)',
                  border: currentPhase === phase.value 
                    ? '1px solid rgba(100,100,200,0.5)' 
                    : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '10px 6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  color: 'white',
                  fontSize: '10px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  minHeight: '60px'
                }}
                onMouseEnter={(e) => {
                  if (currentPhase !== phase.value) {
                    e.target.style.background = 'rgba(255,255,255,0.1)';
                    e.target.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPhase !== phase.value) {
                    e.target.style.background = 'rgba(255,255,255,0.05)';
                    e.target.style.transform = 'scale(1)';
                  }
                }}
              >
                <div style={{ fontSize: '16px' }}>{phase.icon}</div>
                <div style={{ fontSize: '9px', opacity: 0.8, lineHeight: '1.2' }}>
                  {phase.name}
                </div>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div style={{
            marginTop: '15px',
            fontSize: '10px',
            color: 'rgba(255,255,255,0.5)',
            textAlign: 'center'
          }}>
            Real-time lunar phase synchronization
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );

  // Only render if visible and we have a DOM to portal into
  if (!isVisible || typeof document === 'undefined') {
    return null;
  }

  // Create portal to document body to completely bypass Three.js interference
  return ReactDOM.createPortal(hudContent, document.body);
};

export default MoonPhaseHUD;