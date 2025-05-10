/**
 * MaterialInspectorHUD.jsx
 * Component for inspecting and modifying material properties
 * LEGIT compliance: UI5
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DraggableHUD from '../ui/DraggableHUD';

// LEGIT compliance metadata
export const metadata = {
  id: 'cosmic_explorer_material_inspector_hud',
  ui: 'UI5',
  type: 'visualization',
  doc: 'contract_material_inspector_hud.md'
};

// Default materials for demo
const DEMO_MATERIALS = [
  {
    id: 'mat_001',
    name: 'Standard PBR',
    type: 'PBRMaterial',
    albedo: '#3377cc',
    roughness: 0.45,
    metalness: 0.8,
    normal: 'normal_map_01.jpg',
    emissive: '#001133',
    emissiveIntensity: 0.2,
    alpha: 1.0
  },
  {
    id: 'mat_002',
    name: 'Nebula Gas',
    type: 'CustomShaderMaterial',
    uniforms: {
      color1: '#ff3366',
      color2: '#3322ff',
      noiseScale: 2.3,
      timeScale: 0.4,
      densityFactor: 0.75
    },
    shader: 'nebula_gas_shader.glsl'
  },
  {
    id: 'mat_003',
    name: 'Star Surface',
    type: 'EmissiveMaterial',
    color: '#ffcc22',
    intensity: 3.5,
    pulseFactor: 0.2,
    noiseTexture: 'noise_pattern.jpg',
    temperatureShift: 0.3
  },
  {
    id: 'mat_004',
    name: 'Planet Terrain',
    type: 'TerrainMaterial',
    colorMap: 'terrain_color.jpg',
    heightMap: 'terrain_height.jpg',
    normalMap: 'terrain_normal.jpg',
    waterLevel: 0.35,
    atmosphereColor: '#88aaff',
    atmosphereDensity: 0.2
  }
];

/**
 * ColorPicker component for material properties
 */
const ColorPicker = ({ color, onChange, label }) => {
  return (
    <div className="color-picker">
      <label>{label}</label>
      <div className="color-input-container">
        <input 
          type="color" 
          value={color} 
          onChange={(e) => onChange(e.target.value)}
          className="color-input"
        />
        <span className="color-value">{color}</span>
      </div>
    </div>
  );
};

/**
 * Slider component for numeric material properties
 */
const PropertySlider = ({ value, min, max, step, onChange, label, unit = '' }) => {
  return (
    <div className="property-slider">
      <div className="slider-header">
        <label>{label}</label>
        <span className="value-display">{value}{unit}</span>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step} 
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="range-slider"
      />
    </div>
  );
};

/**
 * TextureSelector component for material textures
 */
const TextureSelector = ({ texture, onChange, label }) => {
  const textures = ['none', 'normal_map_01.jpg', 'noise_pattern.jpg', 'terrain_color.jpg', 'terrain_height.jpg', 'terrain_normal.jpg'];

  return (
    <div className="texture-selector">
      <label>{label}</label>
      <select 
        value={texture} 
        onChange={(e) => onChange(e.target.value)}
        className="texture-select"
      >
        {textures.map(tex => (
          <option key={tex} value={tex}>{tex}</option>
        ))}
      </select>
      {texture !== 'none' && (
        <div className="texture-preview">
          <div className="texture-icon" title={texture}>🖼️</div>
        </div>
      )}
    </div>
  );
};

/**
 * MaterialInspectorHUD component
 */
const MaterialInspectorHUD = ({
  initialPosition,
  onPositionChange,
  onClose,
  visualParams
}) => {
  const [materials, setMaterials] = useState(DEMO_MATERIALS);
  const [selectedMaterialId, setSelectedMaterialId] = useState(materials[0]?.id);
  const [expandedSection, setExpandedSection] = useState('general');
  const [showPreview, setShowPreview] = useState(true);
  const [previewRotation, setPreviewRotation] = useState(0);
  
  // Find selected material
  const selectedMaterial = materials.find(m => m.id === selectedMaterialId) || materials[0];
  
  // Preview rotation animation
  useEffect(() => {
    if (!showPreview) return;
    
    const timer = setInterval(() => {
      setPreviewRotation(prev => (prev + 0.5) % 360);
    }, 50);
    
    return () => clearInterval(timer);
  }, [showPreview]);
  
  // Update material property
  const updateMaterialProperty = (property, value) => {
    setMaterials(prevMaterials => 
      prevMaterials.map(mat => 
        mat.id === selectedMaterialId 
          ? { ...mat, [property]: value }
          : mat
      )
    );
  };
  
  // Update nested uniform property (for CustomShaderMaterial)
  const updateUniformProperty = (property, value) => {
    setMaterials(prevMaterials => 
      prevMaterials.map(mat => {
        if (mat.id === selectedMaterialId && mat.uniforms) {
          return { 
            ...mat, 
            uniforms: {
              ...mat.uniforms,
              [property]: value
            }
          };
        }
        return mat;
      })
    );
  };
  
  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  
  // Render specific material editor based on type
  const renderMaterialEditor = () => {
    switch(selectedMaterial.type) {
      case 'PBRMaterial':
        return (
          <>
            <div className={`editor-section ${expandedSection === 'general' ? 'expanded' : ''}`}>
              <div className="section-header" onClick={() => toggleSection('general')}>
                <h3>General Properties</h3>
                <span className="toggle-icon">{expandedSection === 'general' ? '▼' : '►'}</span>
              </div>
              {expandedSection === 'general' && (
                <div className="section-content">
                  <ColorPicker 
                    label="Albedo" 
                    color={selectedMaterial.albedo} 
                    onChange={(value) => updateMaterialProperty('albedo', value)}
                  />
                  <PropertySlider 
                    label="Roughness" 
                    value={selectedMaterial.roughness} 
                    min={0} 
                    max={1} 
                    step={0.01} 
                    onChange={(value) => updateMaterialProperty('roughness', value)}
                  />
                  <PropertySlider 
                    label="Metalness" 
                    value={selectedMaterial.metalness} 
                    min={0} 
                    max={1} 
                    step={0.01} 
                    onChange={(value) => updateMaterialProperty('metalness', value)}
                  />
                  <PropertySlider 
                    label="Alpha" 
                    value={selectedMaterial.alpha} 
                    min={0} 
                    max={1} 
                    step={0.01} 
                    onChange={(value) => updateMaterialProperty('alpha', value)}
                  />
                </div>
              )}
            </div>
            
            <div className={`editor-section ${expandedSection === 'maps' ? 'expanded' : ''}`}>
              <div className="section-header" onClick={() => toggleSection('maps')}>
                <h3>Texture Maps</h3>
                <span className="toggle-icon">{expandedSection === 'maps' ? '▼' : '►'}</span>
              </div>
              {expandedSection === 'maps' && (
                <div className="section-content">
                  <TextureSelector 
                    label="Normal Map" 
                    texture={selectedMaterial.normal} 
                    onChange={(value) => updateMaterialProperty('normal', value)}
                  />
                </div>
              )}
            </div>
            
            <div className={`editor-section ${expandedSection === 'emission' ? 'expanded' : ''}`}>
              <div className="section-header" onClick={() => toggleSection('emission')}>
                <h3>Emission</h3>
                <span className="toggle-icon">{expandedSection === 'emission' ? '▼' : '►'}</span>
              </div>
              {expandedSection === 'emission' && (
                <div className="section-content">
                  <ColorPicker 
                    label="Emissive Color" 
                    color={selectedMaterial.emissive} 
                    onChange={(value) => updateMaterialProperty('emissive', value)}
                  />
                  <PropertySlider 
                    label="Intensity" 
                    value={selectedMaterial.emissiveIntensity} 
                    min={0} 
                    max={5} 
                    step={0.1} 
                    onChange={(value) => updateMaterialProperty('emissiveIntensity', value)}
                  />
                </div>
              )}
            </div>
          </>
        );
        
      case 'CustomShaderMaterial':
        return (
          <>
            <div className={`editor-section ${expandedSection === 'uniforms' ? 'expanded' : ''}`}>
              <div className="section-header" onClick={() => toggleSection('uniforms')}>
                <h3>Shader Uniforms</h3>
                <span className="toggle-icon">{expandedSection === 'uniforms' ? '▼' : '►'}</span>
              </div>
              {expandedSection === 'uniforms' && (
                <div className="section-content">
                  <ColorPicker 
                    label="Color 1" 
                    color={selectedMaterial.uniforms.color1} 
                    onChange={(value) => updateUniformProperty('color1', value)}
                  />
                  <ColorPicker 
                    label="Color 2" 
                    color={selectedMaterial.uniforms.color2} 
                    onChange={(value) => updateUniformProperty('color2', value)}
                  />
                  <PropertySlider 
                    label="Noise Scale" 
                    value={selectedMaterial.uniforms.noiseScale} 
                    min={0.1} 
                    max={10} 
                    step={0.1} 
                    onChange={(value) => updateUniformProperty('noiseScale', value)}
                  />
                  <PropertySlider 
                    label="Time Scale" 
                    value={selectedMaterial.uniforms.timeScale} 
                    min={0} 
                    max={2} 
                    step={0.05} 
                    onChange={(value) => updateUniformProperty('timeScale', value)}
                  />
                  <PropertySlider 
                    label="Density" 
                    value={selectedMaterial.uniforms.densityFactor} 
                    min={0} 
                    max={2} 
                    step={0.05} 
                    onChange={(value) => updateUniformProperty('densityFactor', value)}
                  />
                </div>
              )}
            </div>
            
            <div className={`editor-section ${expandedSection === 'shader' ? 'expanded' : ''}`}>
              <div className="section-header" onClick={() => toggleSection('shader')}>
                <h3>Shader Code</h3>
                <span className="toggle-icon">{expandedSection === 'shader' ? '▼' : '►'}</span>
              </div>
              {expandedSection === 'shader' && (
                <div className="section-content">
                  <div className="shader-file">
                    <span className="file-icon">📄</span>
                    {selectedMaterial.shader}
                    <button className="edit-button">Edit</button>
                  </div>
                </div>
              )}
            </div>
          </>
        );
        
      case 'EmissiveMaterial':
        return (
          <>
            <div className={`editor-section ${expandedSection === 'emission' ? 'expanded' : ''}`}>
              <div className="section-header" onClick={() => toggleSection('emission')}>
                <h3>Emission Properties</h3>
                <span className="toggle-icon">{expandedSection === 'emission' ? '▼' : '►'}</span>
              </div>
              {expandedSection === 'emission' && (
                <div className="section-content">
                  <ColorPicker 
                    label="Color" 
                    color={selectedMaterial.color} 
                    onChange={(value) => updateMaterialProperty('color', value)}
                  />
                  <PropertySlider 
                    label="Intensity" 
                    value={selectedMaterial.intensity} 
                    min={0} 
                    max={10} 
                    step={0.1} 
                    onChange={(value) => updateMaterialProperty('intensity', value)}
                  />
                  <PropertySlider 
                    label="Pulse Factor" 
                    value={selectedMaterial.pulseFactor} 
                    min={0} 
                    max={1} 
                    step={0.01} 
                    onChange={(value) => updateMaterialProperty('pulseFactor', value)}
                  />
                  <PropertySlider 
                    label="Temperature" 
                    value={selectedMaterial.temperatureShift} 
                    min={-1} 
                    max={1} 
                    step={0.05} 
                    onChange={(value) => updateMaterialProperty('temperatureShift', value)}
                  />
                  <TextureSelector 
                    label="Noise Texture" 
                    texture={selectedMaterial.noiseTexture} 
                    onChange={(value) => updateMaterialProperty('noiseTexture', value)}
                  />
                </div>
              )}
            </div>
          </>
        );
        
      case 'TerrainMaterial':
        return (
          <>
            <div className={`editor-section ${expandedSection === 'maps' ? 'expanded' : ''}`}>
              <div className="section-header" onClick={() => toggleSection('maps')}>
                <h3>Terrain Maps</h3>
                <span className="toggle-icon">{expandedSection === 'maps' ? '▼' : '►'}</span>
              </div>
              {expandedSection === 'maps' && (
                <div className="section-content">
                  <TextureSelector 
                    label="Color Map" 
                    texture={selectedMaterial.colorMap} 
                    onChange={(value) => updateMaterialProperty('colorMap', value)}
                  />
                  <TextureSelector 
                    label="Height Map" 
                    texture={selectedMaterial.heightMap} 
                    onChange={(value) => updateMaterialProperty('heightMap', value)}
                  />
                  <TextureSelector 
                    label="Normal Map" 
                    texture={selectedMaterial.normalMap} 
                    onChange={(value) => updateMaterialProperty('normalMap', value)}
                  />
                </div>
              )}
            </div>
            
            <div className={`editor-section ${expandedSection === 'terrain' ? 'expanded' : ''}`}>
              <div className="section-header" onClick={() => toggleSection('terrain')}>
                <h3>Terrain Properties</h3>
                <span className="toggle-icon">{expandedSection === 'terrain' ? '▼' : '►'}</span>
              </div>
              {expandedSection === 'terrain' && (
                <div className="section-content">
                  <PropertySlider 
                    label="Water Level" 
                    value={selectedMaterial.waterLevel} 
                    min={0} 
                    max={1} 
                    step={0.01} 
                    onChange={(value) => updateMaterialProperty('waterLevel', value)}
                  />
                  <ColorPicker 
                    label="Atmosphere" 
                    color={selectedMaterial.atmosphereColor} 
                    onChange={(value) => updateMaterialProperty('atmosphereColor', value)}
                  />
                  <PropertySlider 
                    label="Atm. Density" 
                    value={selectedMaterial.atmosphereDensity} 
                    min={0} 
                    max={1} 
                    step={0.01} 
                    onChange={(value) => updateMaterialProperty('atmosphereDensity', value)}
                  />
                </div>
              )}
            </div>
          </>
        );
        
      default:
        return <div className="unsupported-material">Unsupported material type</div>;
    }
  };
  
  return (
    <DraggableHUD
      title="Material Inspector"
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      onClose={onClose}
      width={360}
      className="material-inspector-hud"
    >
      <div className="hud-content">
        <div className="material-selector">
          <label>Select Material:</label>
          <select 
            value={selectedMaterialId} 
            onChange={(e) => setSelectedMaterialId(e.target.value)}
            className="material-select"
          >
            {materials.map(mat => (
              <option key={mat.id} value={mat.id}>{mat.name} ({mat.type})</option>
            ))}
          </select>
        </div>
        
        {showPreview && (
          <div className="material-preview">
            <div className="preview-sphere" style={{
              background: `linear-gradient(45deg, ${selectedMaterial.color || selectedMaterial.albedo || selectedMaterial.uniforms?.color1 || '#555'}, #222)`,
              boxShadow: selectedMaterial.type === 'EmissiveMaterial' ? 
                `0 0 20px ${selectedMaterial.color}` : 'none',
              transform: `rotateY(${previewRotation}deg)`
            }}></div>
            <button className="preview-toggle" onClick={() => setShowPreview(false)}>
              Hide Preview
            </button>
          </div>
        )}
        
        {!showPreview && (
          <button className="preview-toggle show" onClick={() => setShowPreview(true)}>
            Show Preview
          </button>
        )}
        
        <div className="material-editor">
          {renderMaterialEditor()}
        </div>
        
        <div className="action-buttons">
          <button className="action-button" onClick={() => console.log('Material saved:', selectedMaterial)}>
            Apply
          </button>
          <button className="action-button" onClick={() => console.log('Material duplicated:', selectedMaterial)}>
            Duplicate
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .hud-content {
          padding: 10px;
          color: white;
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-height: 600px;
          overflow-y: auto;
        }
        
        .material-selector {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .material-select {
          flex: 1;
          background: rgba(40, 40, 60, 0.6);
          border: 1px solid rgba(80, 90, 140, 0.5);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
        }
        
        .material-preview {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 15px 0;
          position: relative;
        }
        
        .preview-sphere {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: #444;
          box-shadow: inset 2px 2px 10px rgba(255, 255, 255, 0.2),
                      inset -2px -2px 10px rgba(0, 0, 0, 0.6);
          transition: transform 0.05s linear;
          perspective: 800px;
        }
        
        .preview-toggle {
          margin-top: 10px;
          background: rgba(50, 50, 70, 0.5);
          border: none;
          color: rgba(255, 255, 255, 0.7);
          padding: 3px 8px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 11px;
        }
        
        .preview-toggle.show {
          margin: 0;
          align-self: flex-start;
        }
        
        .preview-toggle:hover {
          background: rgba(60, 60, 80, 0.6);
          color: white;
        }
        
        .material-editor {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .editor-section {
          background: rgba(40, 45, 60, 0.5);
          border-radius: 4px;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }
        
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          cursor: pointer;
          background: rgba(50, 55, 80, 0.7);
        }
        
        .section-header h3 {
          margin: 0;
          font-size: 14px;
          font-weight: 500;
        }
        
        .toggle-icon {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.8);
        }
        
        .section-content {
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .color-picker {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .color-picker label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.9);
        }
        
        .color-input-container {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .color-input {
          width: 30px;
          height: 30px;
          border: none;
          background: transparent;
          padding: 0;
          cursor: pointer;
        }
        
        .color-input::-webkit-color-swatch {
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .color-value {
          background: rgba(20, 20, 30, 0.6);
          padding: 2px 6px;
          border-radius: 3px;
          font-family: monospace;
          font-size: 12px;
        }
        
        .property-slider {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .slider-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .property-slider label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.9);
        }
        
        .value-display {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.8);
          font-family: monospace;
        }
        
        .range-slider {
          width: 100%;
          margin: 0;
          background: rgba(30, 30, 40, 0.5);
          height: 6px;
          border-radius: 3px;
          -webkit-appearance: none;
        }
        
        .range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(100, 120, 240, 0.9);
          cursor: pointer;
        }
        
        .texture-selector {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .texture-selector label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.9);
        }
        
        .texture-select {
          background: rgba(40, 40, 60, 0.6);
          border: 1px solid rgba(80, 90, 140, 0.5);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
        }
        
        .texture-preview {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 4px;
        }
        
        .texture-icon {
          font-size: 16px;
          background: rgba(40, 40, 60, 0.8);
          padding: 2px 6px;
          border-radius: 3px;
          cursor: pointer;
        }
        
        .shader-file {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(30, 30, 40, 0.6);
          padding: 6px 10px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 12px;
        }
        
        .file-icon {
          color: rgba(255, 255, 255, 0.8);
        }
        
        .edit-button {
          margin-left: auto;
          background: rgba(60, 90, 180, 0.5);
          border: none;
          color: white;
          padding: 2px 8px;
          border-radius: 3px;
          cursor: pointer;
          font-size: 11px;
        }
        
        .edit-button:hover {
          background: rgba(70, 100, 200, 0.6);
        }
        
        .action-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 10px;
        }
        
        .action-button {
          background: rgba(60, 90, 180, 0.6);
          border: 1px solid rgba(80, 120, 220, 0.4);
          color: white;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          transition: all 0.2s;
        }
        
        .action-button:hover {
          background: rgba(70, 100, 200, 0.7);
          border-color: rgba(100, 140, 255, 0.5);
        }
      `}</style>
    </DraggableHUD>
  );
};

MaterialInspectorHUD.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  onPositionChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  visualParams: PropTypes.object
};

export default MaterialInspectorHUD; 