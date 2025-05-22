import React from 'react';
import { darkenColor, hexToRgb } from '../../../utils/colorUtils';

interface EnhancedPlanetProps {
  color: string;
  size: number;
  reflectivity?: number;
  label?: string;
}

const EnhancedPlanet: React.FC<EnhancedPlanetProps> = ({
  color,
  size,
  reflectivity = 0.6, 
  label,
}) => {
  const darkenedOrbitColor = darkenColor(color, 0.4);
  const rgbColor = hexToRgb(color);
  const shadowColor = rgbColor ? `rgba(${rgbColor.r},${rgbColor.g},${rgbColor.b}, 0.3)` : 'rgba(0,0,0,0.3)';

  return (
    <div 
      className="relative flex flex-col items-center justify-center"
      style={{ width: size, height: size }}
    >
      <div 
        className="absolute rounded-full"
        style={{
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, ${color} 0%, ${darkenColor(color, 0.3)} 100%)`,
          boxShadow: `0 0 30px 5px ${shadowColor}, inset 0 0 20px rgba(0,0,0,0.2)`,
        }}
      >
        <div 
          className="absolute top-0 left-0 w-full h-full rounded-full"
          style={{
            background: `radial-gradient(
              circle at 30% 30%,
              rgba(255, 255, 255, ${Math.min(1, Math.max(0, reflectivity))}) 0%,
              rgba(255, 255, 255, 0) 60%
            )`,
            mixBlendMode: 'overlay',
          }}
        ></div>
        <div 
            className="absolute inset-[15%] rounded-full border-[1px]"
            style={{ borderColor: darkenedOrbitColor, opacity: 0.5}}        
        ></div>
         <div 
            className="absolute inset-[30%] rounded-full border-[1px]"
            style={{ borderColor: darkenedOrbitColor, opacity: 0.3}}        
        ></div>
      </div>
      {label && (
        <div className="absolute bottom-[-30px] flex items-center text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
          <span 
            className="w-2 h-2 rounded-full mr-2"
            style={{ backgroundColor: color, boxShadow: `0 0 5px ${color}` }}
          ></span>
          <span>{label}</span>
        </div>
      )}
    </div>
  );
};

export default EnhancedPlanet; 