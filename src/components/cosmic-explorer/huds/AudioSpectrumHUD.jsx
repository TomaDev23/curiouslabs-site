/**
 * AudioSpectrumHUD.jsx
 * Compact audio spectrum visualizer
 * LEGIT compliance: UI5
 */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import DraggableHUD from '../ui/DraggableHUD';

// LEGIT compliance metadata
export const metadata = {
  id: 'cosmic_explorer_audio_spectrum_hud',
  ui: 'UI5',
  type: 'hud',
  doc: 'contract_audio_spectrum_hud.md'
};

/**
 * AudioSpectrumHUD component
 * Creates a visually appealing audio spectrum visualization
 */
const AudioSpectrumHUD = ({
  initialPosition = { x: 20, y: 120 },
  onPositionChange,
  onClose
}) => {
  const [audioData, setAudioData] = useState([]);
  const [masterVolume, setMasterVolume] = useState(65);
  const [isPeaking, setIsPeaking] = useState(false);
  const [colorMode, setColorMode] = useState('spectrum'); // 'spectrum', 'pulse', 'cool'
  
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const barCount = 32; // Number of frequency bars
  
  // Simulate audio data for visualization
  useEffect(() => {
    const simulateAudioData = () => {
      // Generate base frequencies with some consistency
      const time = Date.now() / 1000;
      const baseFrequencies = [];
      
      for (let i = 0; i < barCount; i++) {
        // Create a pattern that looks musical with frequency bias toward bass
        const bassFactor = Math.max(0, 1 - (i / (barCount * 0.6)));
        const midFactor = Math.max(0, 1 - Math.abs((i - barCount * 0.5) / (barCount * 0.3)));
        const trebleFactor = Math.max(0, (i - barCount * 0.6) / (barCount * 0.4));
        
        // Combine frequency components with time-based modulation
        const bassWave = 0.6 * bassFactor * (0.6 + 0.4 * Math.sin(time * 1.0 + i * 0.1));
        const midWave = 0.5 * midFactor * (0.7 + 0.3 * Math.sin(time * 1.5 + i * 0.2));
        const trebleWave = 0.4 * trebleFactor * (0.7 + 0.3 * Math.sin(time * 2.0 + i * 0.3));
        
        // Add rhythmic pulse
        const rhythmicPulse = 0.2 * (0.5 + 0.5 * Math.sin(time * 4.0));
        
        // Combine all components
        let amplitude = bassWave + midWave + trebleWave + rhythmicPulse;
        
        // Ensure between 0-1 and apply volume adjustment
        amplitude = Math.min(1, Math.max(0, amplitude));
        amplitude *= (masterVolume / 100); // Apply master volume
        
        baseFrequencies.push(amplitude);
      }
      
      // Add some randomization to make it look more natural
      const frequencies = baseFrequencies.map(freq => {
        const randomFactor = 1 + (Math.random() * 0.15 - 0.075); // ±7.5% variation
        return Math.min(1, freq * randomFactor);
      });
      
      // Check if we have a peak moment for visual effect
      const hasHighPeak = frequencies.some(f => f > 0.85);
      setIsPeaking(hasHighPeak);
      
      setAudioData(frequencies);
    };
    
    // Set up animation loop
    const animate = () => {
      simulateAudioData();
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    // Clean up animation on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [masterVolume]);
  
  // Canvas rendering
  useEffect(() => {
    if (!canvasRef.current || audioData.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear the canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw frequency bars
    const barWidth = width / barCount;
    const barMargin = 1;
    const effectiveBarWidth = barWidth - barMargin;
    
    audioData.forEach((amplitude, i) => {
      const barHeight = amplitude * height;
      const x = i * barWidth;
      const y = height - barHeight;
      
      // Determine bar color based on mode
      let barColor;
      if (colorMode === 'spectrum') {
        // Gradient from purple to blue to cyan
        const hue = 270 - (i / barCount) * 90;
        barColor = `hsl(${hue}, 80%, 60%)`;
      } else if (colorMode === 'pulse') {
        // Pulsing red-orange
        const lightness = 50 + amplitude * 20;
        barColor = `hsl(${10 + i}, 90%, ${lightness}%)`;
      } else if (colorMode === 'cool') {
        // Cool blue gradient
        const lightness = 40 + amplitude * 30;
        barColor = `hsl(${200 + i/4}, 70%, ${lightness}%)`;
      }
      
      // Draw bar with glow effect for higher amplitudes
      ctx.fillStyle = barColor;
      
      // Main bar
      ctx.fillRect(x, y, effectiveBarWidth, barHeight);
      
      // Add glow for higher amplitudes
      if (amplitude > 0.6) {
        ctx.shadowColor = barColor;
        ctx.shadowBlur = 8 * (amplitude - 0.6) * 2.5;
        ctx.fillRect(x, y, effectiveBarWidth, barHeight);
        ctx.shadowBlur = 0; // Reset shadow
      }
    });
    
    // Draw a reflection
    ctx.globalAlpha = 0.2;
    ctx.save();
    ctx.scale(1, -0.3); // Scale for reflection
    ctx.translate(0, -height * 3.33); // Position reflection
    
    audioData.forEach((amplitude, i) => {
      const barHeight = amplitude * height;
      const x = i * barWidth;
      const y = height - barHeight;
      
      // Determine bar color based on mode (same as above)
      let barColor;
      if (colorMode === 'spectrum') {
        const hue = 270 - (i / barCount) * 90;
        barColor = `hsl(${hue}, 80%, 60%)`;
      } else if (colorMode === 'pulse') {
        const lightness = 50 + amplitude * 20;
        barColor = `hsl(${10 + i}, 90%, ${lightness}%)`;
      } else if (colorMode === 'cool') {
        const lightness = 40 + amplitude * 30;
        barColor = `hsl(${200 + i/4}, 70%, ${lightness}%)`;
      }
      
      ctx.fillStyle = barColor;
      ctx.fillRect(x, y, effectiveBarWidth, barHeight);
    });
    
    ctx.restore();
    ctx.globalAlpha = 1;
  }, [audioData, colorMode]);
  
  // Handle volume change
  const handleVolumeChange = (e) => {
    setMasterVolume(parseInt(e.target.value, 10));
  };
  
  // Change color mode on click
  const handleColorModeChange = () => {
    const modes = ['spectrum', 'pulse', 'cool'];
    const currentIndex = modes.indexOf(colorMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setColorMode(modes[nextIndex]);
  };
  
  return (
    <DraggableHUD
      title=""
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      onClose={onClose}
      width={160}
      hideTitle
    >
      <div className={`audio-spectrum-container ${isPeaking ? 'peaking' : ''}`}>
        <div className="spectrum-header">
          <div className="spectrum-title">AUDIO</div>
          <div className="volume-display">{masterVolume}%</div>
        </div>
        
        <div className="spectrum-visualizer" onClick={handleColorModeChange}>
          <canvas 
            ref={canvasRef} 
            width={150} 
            height={60}
            className="spectrum-canvas"
          />
        </div>
        
        <div className="volume-control">
          <div className="volume-icon">◁</div>
          <input
            type="range"
            min={0}
            max={100}
            value={masterVolume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
          <div className="volume-icon">▷</div>
        </div>
      </div>
      
      <style jsx>{`
        .audio-spectrum-container {
          padding: 8px;
          border-radius: 6px;
          background: rgba(20, 25, 35, 0.85);
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(80, 100, 200, 0.3);
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .audio-spectrum-container.peaking {
          box-shadow: 0 3px 15px rgba(100, 150, 255, 0.5);
        }
        
        .spectrum-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        
        .spectrum-title {
          font-size: 10px;
          font-weight: 600;
          color: rgba(150, 180, 255, 0.9);
          letter-spacing: 1px;
        }
        
        .volume-display {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.8);
          font-family: monospace;
          background: rgba(40, 50, 80, 0.4);
          padding: 1px 4px;
          border-radius: 3px;
        }
        
        .spectrum-visualizer {
          position: relative;
          height: 65px;
          background: rgba(10, 15, 30, 0.6);
          border-radius: 4px;
          margin-bottom: 6px;
          cursor: pointer;
          overflow: hidden;
        }
        
        .spectrum-canvas {
          position: absolute;
          top: 0;
          left: 0;
        }
        
        .volume-control {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .volume-icon {
          color: rgba(255, 255, 255, 0.6);
          font-size: 10px;
        }
        
        .volume-slider {
          flex: 1;
          -webkit-appearance: none;
          height: 4px;
          border-radius: 2px;
          background: rgba(60, 80, 150, 0.3);
          outline: none;
        }
        
        .volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(100, 150, 255, 0.8);
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .volume-slider::-webkit-slider-thumb:hover {
          background: rgba(120, 180, 255, 1);
          box-shadow: 0 0 5px rgba(100, 150, 255, 0.8);
        }
        
        .volume-slider::-moz-range-thumb {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(100, 150, 255, 0.8);
          cursor: pointer;
          border: none;
          transition: all 0.2s;
        }
        
        .volume-slider::-moz-range-thumb:hover {
          background: rgba(120, 180, 255, 1);
          box-shadow: 0 0 5px rgba(100, 150, 255, 0.8);
        }
      `}</style>
    </DraggableHUD>
  );
};

AudioSpectrumHUD.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  onPositionChange: PropTypes.func,
  onClose: PropTypes.func
};

export default AudioSpectrumHUD; 