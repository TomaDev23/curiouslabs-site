import React from 'react';

export const metadata = {
  id: 'planet_selector_hud',
  scs: 'SCS-HUD-CONTROL',
  type: 'hud',
  doc: 'LEGIT_contract_planetSelectorHUD.md'
};

export default function PlanetSelectorHUD({
  selectedPlanet,
  setSelectedPlanet,
  ambientIntensity,
  setAmbientIntensity,
  sunIntensity,
  setSunIntensity,
  sunColor,
  setSunColor
}) {
  // Planet options with display names
  const planetOptions = [
    { value: 'earth', label: 'Earth' },
    { value: 'moon', label: 'Moon' },
    { value: 'mars', label: 'Mars' },
    { value: 'venus', label: 'Venus' },
    { value: 'jupiter', label: 'Jupiter' },
    { value: 'saturn', label: 'Saturn' },
    { value: 'uranus', label: 'Uranus' },
    { value: 'pluto', label: 'Pluto' }
  ];
  
  // Lighting presets
  const applyPreset = (preset) => {
    switch(preset) {
      case 'default':
        setAmbientIntensity(0.3);
        setSunIntensity(1.0);
        setSunColor('#ffffff');
        break;
      case 'dramatic':
        setAmbientIntensity(0.1);
        setSunIntensity(1.5);
        setSunColor('#ffdd99');
        break;
      case 'night':
        setAmbientIntensity(0.05);
        setSunIntensity(0.2);
        setSunColor('#aabbff');
        break;
      case 'sci-fi':
        setAmbientIntensity(0.2);
        setSunIntensity(0.8);
        setSunColor('#66ffff');
        break;
    }
  };

  return (
    <div className="fixed top-5 right-5 z-50 p-4 bg-black/60 text-white rounded-xl shadow-xl backdrop-blur-md w-[300px] space-y-4">
      <h2 className="text-lg font-bold">🪐 Planet Selector</h2>
      
      <div>
        <label className="block text-sm mb-1">Select Planet</label>
        <select 
          value={selectedPlanet}
          onChange={(e) => setSelectedPlanet(e.target.value)}
          className="w-full bg-gray-800 text-white p-2 rounded"
        >
          {planetOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="pt-2 border-t border-gray-700">
        <h3 className="text-sm font-bold mb-2">Lighting Controls</h3>
        
        <div>
          <label className="block text-sm mb-1">Ambient Intensity</label>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={ambientIntensity} 
            onChange={e => setAmbientIntensity(parseFloat(e.target.value))} 
            className="w-full"
          />
          <div className="text-right text-xs">{ambientIntensity.toFixed(2)}</div>
        </div>

        <div>
          <label className="block text-sm mb-1">Sun Intensity</label>
          <input 
            type="range" 
            min="0" 
            max="2" 
            step="0.1" 
            value={sunIntensity} 
            onChange={e => setSunIntensity(parseFloat(e.target.value))} 
            className="w-full"
          />
          <div className="text-right text-xs">{sunIntensity.toFixed(1)}</div>
        </div>

        <div>
          <label className="block text-sm mb-1">Sun Color</label>
          <div className="flex items-center">
            <input 
              type="color" 
              value={sunColor} 
              onChange={e => setSunColor(e.target.value)} 
              className="w-10 h-10 mr-2"
            />
            <span className="text-xs font-mono">{sunColor}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button 
          onClick={() => applyPreset('default')}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
        >
          Default
        </button>
        <button 
          onClick={() => applyPreset('dramatic')}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
        >
          Dramatic
        </button>
        <button 
          onClick={() => applyPreset('night')}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
        >
          Night
        </button>
        <button 
          onClick={() => applyPreset('sci-fi')}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
        >
          Sci-Fi
        </button>
      </div>
    </div>
  );
} 