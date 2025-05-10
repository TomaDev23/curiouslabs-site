/**
 * ShaderLabHUD.jsx
 * Component for real-time GLSL shader editing and preview
 * LEGIT compliance: UI5
 */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import DraggableHUD from '../ui/DraggableHUD';

// LEGIT compliance metadata
export const metadata = {
  id: 'cosmic_explorer_shader_lab_hud',
  ui: 'UI5',
  type: 'development',
  doc: 'contract_shader_lab_hud.md'
};

// Default shader templates
const DEFAULT_SHADERS = [
  {
    id: 'vertex_basic',
    name: 'Basic Vertex Shader',
    type: 'vertex',
    code: `attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`
  },
  {
    id: 'fragment_color',
    name: 'Color Gradient',
    type: 'fragment',
    code: `precision highp float;

varying vec2 vUv;
uniform vec3 colorA;
uniform vec3 colorB;
uniform float time;

void main() {
  vec3 color = mix(colorA, colorB, vUv.x + sin(time * 0.5) * 0.2);
  gl_FragColor = vec4(color, 1.0);
}`
  },
  {
    id: 'fragment_nebula',
    name: 'Nebula Effect',
    type: 'fragment',
    code: `precision highp float;

varying vec2 vUv;
uniform float time;
uniform vec3 baseColor;
uniform float noiseScale;
uniform float cloudDensity;

// Simplex noise function
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
  + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 pos = vUv * noiseScale;
  float n = snoise(pos + time * 0.1);
  n += 0.5 * snoise(pos * 2.0 + time * 0.2);
  n += 0.25 * snoise(pos * 4.0 + time * 0.3);
  n = n / 1.75;
  
  float cloudFactor = smoothstep(cloudDensity - 0.2, cloudDensity + 0.2, n);
  vec3 cloudColor = baseColor * cloudFactor;
  vec3 finalColor = cloudColor + vec3(0.0, 0.01, 0.03);
  
  gl_FragColor = vec4(finalColor, cloudFactor * 0.95);
}`
  }
];

// Default uniform controls
const DEFAULT_UNIFORMS = {
  colorA: { type: 'color', value: '#ff3366', label: 'Color A' },
  colorB: { type: 'color', value: '#3322ff', label: 'Color B' },
  baseColor: { type: 'color', value: '#4466ff', label: 'Base Color' },
  time: { type: 'float', value: 0, min: 0, max: 100, step: 0.1, label: 'Time' },
  noiseScale: { type: 'float', value: 4.0, min: 0.1, max: 10.0, step: 0.1, label: 'Noise Scale' },
  cloudDensity: { type: 'float', value: 0.5, min: 0, max: 1.0, step: 0.01, label: 'Cloud Density' }
};

/**
 * ColorUniform component for shader uniform colors
 */
const ColorUniform = ({ value, onChange, label }) => {
  return (
    <div className="shader-uniform color-uniform">
      <label>{label}</label>
      <div className="color-input-container">
        <input 
          type="color" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="color-input"
        />
        <span className="color-value">{value}</span>
      </div>
    </div>
  );
};

/**
 * NumberUniform component for shader uniform numbers
 */
const NumberUniform = ({ value, min, max, step, onChange, label }) => {
  return (
    <div className="shader-uniform number-uniform">
      <div className="uniform-header">
        <label>{label}</label>
        <span className="value-display">{value.toFixed(2)}</span>
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
 * ShaderLabHUD component
 */
const ShaderLabHUD = ({
  initialPosition,
  onPositionChange,
  onClose,
  visualParams
}) => {
  const [shaders, setShaders] = useState(DEFAULT_SHADERS);
  const [selectedShaderId, setSelectedShaderId] = useState(DEFAULT_SHADERS[1].id);
  const [editedCode, setEditedCode] = useState('');
  const [uniforms, setUniforms] = useState(DEFAULT_UNIFORMS);
  const [compilationStatus, setCompilationStatus] = useState({ success: true, message: 'Shader compiled successfully' });
  const [previewMode, setPreviewMode] = useState('3d');
  const [activeTab, setActiveTab] = useState('editor');
  const canvasRef = useRef(null);
  const editorRef = useRef(null);
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  
  // Get selected shader
  const selectedShader = shaders.find(s => s.id === selectedShaderId) || shaders[0];
  
  // Initialize editor with selected shader code
  useEffect(() => {
    setEditedCode(selectedShader.code);
  }, [selectedShaderId]);
  
  // Update time uniform
  useEffect(() => {
    const updateTime = () => {
      setUniforms(prev => {
        if (!prev.time) return prev;
        
        const elapsedTime = (Date.now() - startTimeRef.current) / 1000;
        return {
          ...prev,
          time: {
            ...prev.time,
            value: elapsedTime % prev.time.max
          }
        };
      });
      
      animationFrameRef.current = requestAnimationFrame(updateTime);
    };
    
    updateTime();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  // Update shader preview (dummy implementation - would connect to WebGL in real app)
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Simple preview mockup
    const { width, height } = canvasRef.current;
    ctx.clearRect(0, 0, width, height);
    
    // In a real implementation, this would compile and run the shader
    // For now, just show a gradient based on the uniforms
    if (selectedShader.id.includes('nebula') && uniforms.baseColor) {
      const baseColor = hexToRgb(uniforms.baseColor.value);
      const gradient = ctx.createRadialGradient(width/2, height/2, 10, width/2, height/2, width/2);
      gradient.addColorStop(0, `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, 0.8)`);
      gradient.addColorStop(1, 'rgba(0, 5, 20, 0.1)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Add some "nebula" noise
      const time = uniforms.time ? uniforms.time.value : 0;
      const scale = uniforms.noiseScale ? uniforms.noiseScale.value : 4.0;
      const density = uniforms.cloudDensity ? uniforms.cloudDensity.value : 0.5;
      
      for (let i = 0; i < 200; i++) {
        const x = Math.sin(i * 0.1 + time) * width * 0.4 + width * 0.5;
        const y = Math.cos(i * 0.11 + time * 0.9) * height * 0.4 + height * 0.5;
        const size = Math.sin(i * 0.05 + time * 0.5) * scale * 0.5 + scale * 0.5;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${density * 0.1})`;
        ctx.fill();
      }
    } else if (uniforms.colorA && uniforms.colorB) {
      const colorA = hexToRgb(uniforms.colorA.value);
      const colorB = hexToRgb(uniforms.colorB.value);
      const time = uniforms.time ? uniforms.time.value : 0;
      
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, `rgb(${colorA.r}, ${colorA.g}, ${colorA.b})`);
      gradient.addColorStop(1, `rgb(${colorB.r}, ${colorB.g}, ${colorB.b})`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Add sine wave based on time
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      for (let x = 0; x < width; x++) {
        const y = Math.sin(x * 0.02 + time) * 20 + height / 2;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, [selectedShader, uniforms, editedCode]);
  
  // Compile shader (mock implementation)
  const compileShader = () => {
    try {
      // In a real app, this would attempt actual GLSL compilation
      // For demo, just check for common errors
      if (editedCode.includes('error') || editedCode.includes('ERROR')) {
        throw new Error('Shader contains the word "error"');
      }
      
      // Check for basic syntax
      if (!editedCode.includes('void main()') && !editedCode.includes('void main ()')) {
        throw new Error('Missing main function');
      }
      
      if (selectedShader.type === 'fragment' && !editedCode.includes('gl_FragColor')) {
        throw new Error('Fragment shader must write to gl_FragColor');
      }
      
      if (selectedShader.type === 'vertex' && !editedCode.includes('gl_Position')) {
        throw new Error('Vertex shader must write to gl_Position');
      }
      
      // Update the shader code if all checks pass
      setShaders(prev => 
        prev.map(shader => 
          shader.id === selectedShaderId 
            ? { ...shader, code: editedCode }
            : shader
        )
      );
      
      setCompilationStatus({
        success: true,
        message: 'Shader compiled successfully'
      });
    } catch (error) {
      setCompilationStatus({
        success: false,
        message: `Compilation Error: ${error.message}`
      });
    }
  };
  
  // Handle uniform value changes
  const updateUniformValue = (name, value) => {
    setUniforms(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        value
      }
    }));
  };
  
  // Helper to convert hex to rgb
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };
  
  // Render the uniforms based on shader needs
  const renderUniforms = () => {
    // Extract uniform declarations from the shader code
    const regex = /uniform\s+(\w+)\s+(\w+)/g;
    let match;
    const foundUniforms = [];
    
    while ((match = regex.exec(editedCode)) !== null) {
      foundUniforms.push(match[2]);
    }
    
    return (
      <div className="shader-uniforms">
        <h3>Uniform Controls</h3>
        {foundUniforms.map(name => {
          const uniform = uniforms[name];
          if (!uniform) return null;
          
          switch (uniform.type) {
            case 'color':
              return (
                <ColorUniform
                  key={name}
                  label={uniform.label || name}
                  value={uniform.value}
                  onChange={(value) => updateUniformValue(name, value)}
                />
              );
            case 'float':
              return (
                <NumberUniform
                  key={name}
                  label={uniform.label || name}
                  value={uniform.value}
                  min={uniform.min || 0}
                  max={uniform.max || 1}
                  step={uniform.step || 0.01}
                  onChange={(value) => updateUniformValue(name, value)}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    );
  };
  
  return (
    <DraggableHUD
      title="Shader Lab"
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      onClose={onClose}
      width={700}
      height={600}
    >
      <div className="shader-lab-hud">
        <div className="shader-lab-toolbar">
          <div className="shader-select">
            <label>Shader Template:</label>
            <select 
              value={selectedShaderId}
              onChange={(e) => setSelectedShaderId(e.target.value)}
              className="shader-select-dropdown"
            >
              {shaders.map(shader => (
                <option key={shader.id} value={shader.id}>
                  {shader.name} ({shader.type})
                </option>
              ))}
            </select>
          </div>
          
          <div className="toolbar-buttons">
            <button 
              className="toolbar-button compile-button"
              onClick={compileShader}
            >
              Compile & Run
            </button>
            
            <button 
              className="toolbar-button preview-toggle"
              onClick={() => setPreviewMode(prev => prev === '3d' ? '2d' : '3d')}
            >
              {previewMode === '3d' ? '3D' : '2D'} View
            </button>
          </div>
        </div>
        
        <div className="shader-lab-tabs">
          <button 
            className={`tab-button ${activeTab === 'editor' ? 'active' : ''}`}
            onClick={() => setActiveTab('editor')}
          >
            Editor
          </button>
          <button 
            className={`tab-button ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            Preview
          </button>
          <button 
            className={`tab-button ${activeTab === 'uniforms' ? 'active' : ''}`}
            onClick={() => setActiveTab('uniforms')}
          >
            Uniforms
          </button>
        </div>
        
        <div className="shader-lab-content">
          {activeTab === 'editor' && (
            <div className="shader-editor">
              <textarea
                ref={editorRef}
                className="code-editor"
                value={editedCode}
                onChange={(e) => setEditedCode(e.target.value)}
                spellCheck={false}
                rows={20}
              />
              <div className={`compilation-status ${compilationStatus.success ? 'success' : 'error'}`}>
                {compilationStatus.message}
              </div>
            </div>
          )}
          
          {activeTab === 'preview' && (
            <div className="shader-preview">
              <canvas 
                ref={canvasRef}
                width={640}
                height={360}
                className="preview-canvas"
              />
              <div className="preview-info">
                {previewMode === '3d' ? '3D Preview (sphere)' : '2D Preview (flat)'}
              </div>
            </div>
          )}
          
          {activeTab === 'uniforms' && (
            <div className="uniforms-panel">
              {renderUniforms()}
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .shader-lab-hud {
          display: flex;
          flex-direction: column;
          height: 100%;
          font-family: 'Roboto Mono', monospace;
          color: #e0e0e0;
        }
        
        .shader-lab-toolbar {
          display: flex;
          justify-content: space-between;
          padding: 8px 12px;
          background: rgba(40, 44, 52, 0.6);
          border-bottom: 1px solid #3a3f4b;
        }
        
        .shader-select {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .shader-select-dropdown {
          background: rgba(30, 34, 42, 0.8);
          border: 1px solid #3a3f4b;
          color: #e0e0e0;
          padding: 4px 8px;
          border-radius: 4px;
        }
        
        .toolbar-buttons {
          display: flex;
          gap: 8px;
        }
        
        .toolbar-button {
          background: rgba(60, 70, 90, 0.6);
          border: 1px solid #4a5366;
          color: #e0e0e0;
          padding: 4px 12px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .toolbar-button:hover {
          background: rgba(70, 80, 110, 0.8);
        }
        
        .compile-button {
          background: rgba(56, 139, 66, 0.6);
          border-color: #4a9955;
        }
        
        .compile-button:hover {
          background: rgba(66, 149, 76, 0.8);
        }
        
        .shader-lab-tabs {
          display: flex;
          background: rgba(35, 39, 47, 0.6);
          border-bottom: 1px solid #3a3f4b;
        }
        
        .tab-button {
          padding: 8px 16px;
          background: transparent;
          border: none;
          color: #b0b0b0;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .tab-button:hover {
          background: rgba(60, 70, 90, 0.4);
          color: #e0e0e0;
        }
        
        .tab-button.active {
          background: rgba(60, 70, 90, 0.6);
          color: #e0e0e0;
          border-bottom: 2px solid #4a80f0;
        }
        
        .shader-lab-content {
          flex: 1;
          overflow: hidden;
          background: rgba(30, 34, 42, 0.6);
        }
        
        .shader-editor {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .code-editor {
          flex: 1;
          background: rgba(25, 28, 34, 0.8);
          color: #e0e0e0;
          font-family: 'Roboto Mono', monospace;
          border: none;
          padding: 12px;
          resize: none;
          font-size: 13px;
          line-height: 1.5;
        }
        
        .compilation-status {
          padding: 8px 12px;
          font-size: 12px;
        }
        
        .compilation-status.success {
          background: rgba(40, 100, 60, 0.4);
          color: #a0e0b0;
        }
        
        .compilation-status.error {
          background: rgba(100, 40, 40, 0.4);
          color: #e0a0a0;
        }
        
        .shader-preview {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 20px;
        }
        
        .preview-canvas {
          background: rgba(20, 22, 26, 0.8);
          border-radius: 4px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }
        
        .preview-info {
          margin-top: 12px;
          font-size: 12px;
          color: #a0a0a0;
        }
        
        .uniforms-panel {
          padding: 16px;
          height: 100%;
          overflow-y: auto;
        }
        
        .shader-uniforms h3 {
          margin-top: 0;
          margin-bottom: 16px;
          color: #b0c0e0;
          border-bottom: 1px solid #3a4050;
          padding-bottom: 8px;
        }
        
        .shader-uniform {
          margin-bottom: 16px;
        }
        
        .shader-uniform label {
          display: block;
          margin-bottom: 4px;
          color: #a0b0d0;
          font-size: 13px;
        }
        
        .color-input-container {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .color-input {
          width: 40px;
          height: 24px;
          border: none;
          background: none;
          padding: 0;
          cursor: pointer;
        }
        
        .color-value {
          font-size: 12px;
          font-family: 'Roboto Mono', monospace;
        }
        
        .uniform-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }
        
        .value-display {
          font-size: 12px;
          font-family: 'Roboto Mono', monospace;
          color: #a0d0ff;
        }
        
        .range-slider {
          width: 100%;
          background: rgba(40, 50, 70, 0.4);
          -webkit-appearance: none;
          height: 4px;
          border-radius: 2px;
          outline: none;
        }
        
        .range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #4a80f0;
          cursor: pointer;
        }
      `}</style>
    </DraggableHUD>
  );
};

ShaderLabHUD.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  onPositionChange: PropTypes.func,
  onClose: PropTypes.func,
  visualParams: PropTypes.object
};

ShaderLabHUD.defaultProps = {
  initialPosition: { x: 50, y: 50 },
  onPositionChange: () => {},
  onClose: () => {},
  visualParams: {}
};

export default ShaderLabHUD; 