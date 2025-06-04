/**
 * ShaderInspectorHUD.jsx
 * GLSL shader editor and inspector
 * LEGIT compliance: UI5
 */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import DraggableHUD from '../ui/DraggableHUD';

// LEGIT compliance metadata
export const metadata = {
  id: 'cosmic_explorer_shader_inspector_hud',
  ui: 'UI5',
  type: 'hud',
  doc: 'contract_shader_inspector_hud.md'
};

/**
 * Code editor component with syntax highlighting
 */
const CodeEditor = ({ code, language }) => {
  // Simple syntax highlighter for GLSL
  const highlightSyntax = (code) => {
    return code
      .replace(/\b(uniform|attribute|varying|in|out|void|float|vec[234]|mat[234]|sampler2D|samplerCube|precision|mediump|highp|lowp)\b/g, '<span class="keyword">$1</span>')
      .replace(/\b(gl_Position|gl_FragColor|gl_PointSize|gl_PointCoord)\b/g, '<span class="builtin">$1</span>')
      .replace(/\b(sin|cos|tan|normalize|dot|cross|length|distance|mix|smoothstep|step|clamp|texture2D|textureCube)\b/g, '<span class="builtin">$1</span>')
      .replace(/\/\/.*$/gm, '<span class="comment">$&</span>');
  };
  
  const highlightedCode = code
    .split('\n')
    .map((line, i) => `<div class="line"><span class="line-number">${i + 1}</span>${highlightSyntax(line)}</div>`)
    .join('');
    
  return (
    <div className="code-editor">
      <div className="editor-header">
        <div className="editor-tab active">{language} Shader</div>
      </div>
      <div 
        className="editor-content"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(highlightedCode) }}
      />
      
      <style jsx>{`
        .code-editor {
          display: flex;
          flex-direction: column;
          height: 100%;
          border: 1px solid rgba(100, 100, 140, 0.3);
          border-radius: 3px;
          overflow: hidden;
        }
        
        .editor-header {
          background: rgba(40, 40, 60, 0.7);
          padding: 4px 8px;
          display: flex;
        }
        
        .editor-tab {
          padding: 3px 10px;
          font-size: 11px;
          color: #aaa;
          border-radius: 3px 3px 0 0;
          cursor: pointer;
        }
        
        .editor-tab.active {
          background: rgba(60, 60, 100, 0.5);
          color: white;
        }
        
        .editor-content {
          flex-grow: 1;
          overflow-y: auto;
          padding: 0;
          background: rgba(30, 30, 40, 0.5);
          font-family: monospace;
          font-size: 12px;
          line-height: 1.5;
        }
        
        .line {
          padding: 0 0 0 2px;
          white-space: pre;
          position: relative;
        }
        
        .line:hover {
          background: rgba(60, 60, 100, 0.2);
        }
        
        .line-number {
          display: inline-block;
          width: 28px;
          text-align: right;
          color: #666;
          padding-right: 8px;
          user-select: none;
        }
        
        :global(.keyword) {
          color: #cc99ff;
        }
        
        :global(.precision) {
          color: #ff9966;
        }
        
        :global(.builtin) {
          color: #66ccff;
        }
        
        :global(.comment) {
          color: #777;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

CodeEditor.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired
};

/**
 * ShaderInspectorHUD component
 * Displays and allows editing of GLSL shaders
 */
const ShaderInspectorHUD = ({
  initialPosition = { x: 400, y: 400 },
  onPositionChange,
  onClose
}) => {
  // Sample shader programs (in a real implementation, these would be extracted from Three.js materials)
  const sampleShaders = [
    {
      id: 'skybox',
      name: 'Skybox Shader',
      description: 'Renders the cosmic background skybox',
      vertex: `// Skybox Vertex Shader
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
attribute vec3 position;
varying vec3 vWorldPosition;

void main() {
  vWorldPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,
      fragment: `// Skybox Fragment Shader
uniform samplerCube envMap;
uniform float opacity;
varying vec3 vWorldPosition;

void main() {
  vec3 direction = normalize(vWorldPosition);
  vec4 color = textureCube(envMap, direction);
  gl_FragColor = vec4(color.rgb, opacity);
}`
    },
    {
      id: 'particle',
      name: 'Particle System',
      description: 'Renders the cosmic dust particles',
      vertex: `// Particle Vertex Shader
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float time;
attribute vec3 position;
attribute vec2 uv;
attribute float size;
attribute vec3 color;
varying vec2 vUv;
varying vec3 vColor;

void main() {
  vUv = uv;
  vColor = color;
  
  // Apply simple animation
  vec3 animated = position;
  animated.x += sin(time * 0.05 + position.z * 0.01) * 0.1;
  animated.y += cos(time * 0.07 + position.x * 0.01) * 0.1;
  
  vec4 mvPosition = modelViewMatrix * vec4(animated, 1.0);
  gl_PointSize = size * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}`,
      fragment: `// Particle Fragment Shader
uniform sampler2D pointTexture;
varying vec2 vUv;
varying vec3 vColor;

void main() {
  gl_FragColor = vec4(vColor, 1.0) * texture2D(pointTexture, gl_PointCoord);
}`
    },
    {
      id: 'star',
      name: 'Star System',
      description: 'Renders a glowing star with corona',
      vertex: `// Star Vertex Shader
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewPosition = -mvPosition.xyz;
  gl_Position = projectionMatrix * mvPosition;
}`,
      fragment: `// Star Fragment Shader
uniform vec3 starColor;
uniform float glowStrength;
uniform float time;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  float fresnel = dot(normalize(vViewPosition), vNormal);
  fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
  
  // Add time-based pulsing
  float pulse = 0.5 + 0.5 * sin(time * 0.5);
  
  // Calculate glow
  float glow = pow(fresnel, 5.0) * glowStrength * (0.8 + 0.2 * pulse);
  
  // Final color
  vec3 finalColor = mix(starColor, vec3(1.0), glow);
  gl_FragColor = vec4(finalColor, 1.0);
}`
    }
  ];
  
  const [selectedShader, setSelectedShader] = useState(sampleShaders[0]);
  const [activeTab, setActiveTab] = useState('vertex');
  const [compileStatus, setCompileStatus] = useState({
    success: true,
    message: 'Last compile: successful'
  });
  
  // Handler for shader selection
  const handleShaderChange = (shaderId) => {
    const shader = sampleShaders.find(s => s.id === shaderId);
    if (shader) {
      setSelectedShader(shader);
      setCompileStatus({
        success: true,
        message: 'Shader loaded successfully'
      });
    }
  };
  
  // Simulate shader compilation
  const handleCompile = () => {
    // Randomly succeed or fail for demonstration
    const success = Math.random() > 0.3;
    
    if (success) {
      setCompileStatus({
        success: true,
        message: 'Compilation successful'
      });
    } else {
      setCompileStatus({
        success: false,
        message: `Error: ${[
          'Syntax error in line 12',
          'Undefined variable "vPosition"',
          'Type mismatch in expression',
          'Uninitialized uniform "modelMatrix"'
        ][Math.floor(Math.random() * 4)]}`
      });
    }
  };
  
  return (
    <DraggableHUD
      title="Shader Inspector"
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      onClose={onClose}
      width={480}
    >
      <div className="shader-inspector-container">
        <div className="toolbar">
          <div className="shader-selector">
            <select 
              value={selectedShader.id}
              onChange={(e) => handleShaderChange(e.target.value)}
              className="shader-select"
            >
              {sampleShaders.map(shader => (
                <option key={shader.id} value={shader.id}>{shader.name}</option>
              ))}
            </select>
          </div>
          
          <div className="editor-tabs">
            <button 
              className={`tab-button ${activeTab === 'vertex' ? 'active' : ''}`}
              onClick={() => setActiveTab('vertex')}
            >
              Vertex
            </button>
            <button 
              className={`tab-button ${activeTab === 'fragment' ? 'active' : ''}`}
              onClick={() => setActiveTab('fragment')}
            >
              Fragment
            </button>
          </div>
          
          <button 
            className="compile-button"
            onClick={handleCompile}
          >
            Compile
          </button>
        </div>
        
        <div className="shader-description">
          {selectedShader.description}
        </div>
        
        <div className="editor-container">
          <CodeEditor 
            code={activeTab === 'vertex' ? selectedShader.vertex : selectedShader.fragment}
            language={activeTab === 'vertex' ? 'Vertex' : 'Fragment'}
          />
        </div>
        
        <div className={`status-bar ${compileStatus.success ? 'success' : 'error'}`}>
          {compileStatus.message}
        </div>
        
        <div className="uniforms-panel">
          <div className="panel-title">Uniforms</div>
          <div className="uniform-list">
            {activeTab === 'vertex' ? (
              <>
                <div className="uniform-item">
                  <div className="uniform-name">modelViewMatrix</div>
                  <div className="uniform-type">mat4</div>
                  <div className="uniform-value">[Matrix4]</div>
                </div>
                <div className="uniform-item">
                  <div className="uniform-name">projectionMatrix</div>
                  <div className="uniform-type">mat4</div>
                  <div className="uniform-value">[Matrix4]</div>
                </div>
                <div className="uniform-item">
                  <div className="uniform-name">time</div>
                  <div className="uniform-type">float</div>
                  <div className="uniform-value">
                    <input type="range" min="0" max="100" defaultValue="50" className="slider" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="uniform-item">
                  <div className="uniform-name">starColor</div>
                  <div className="uniform-type">vec3</div>
                  <div className="uniform-value">
                    <input type="color" defaultValue="#ffaa44" className="color-picker" />
                  </div>
                </div>
                <div className="uniform-item">
                  <div className="uniform-name">glowStrength</div>
                  <div className="uniform-type">float</div>
                  <div className="uniform-value">
                    <input type="range" min="0" max="100" defaultValue="70" className="slider" />
                  </div>
                </div>
                <div className="uniform-item">
                  <div className="uniform-name">opacity</div>
                  <div className="uniform-type">float</div>
                  <div className="uniform-value">
                    <input type="range" min="0" max="100" defaultValue="100" className="slider" />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .shader-inspector-container {
          display: flex;
          flex-direction: column;
          height: 480px;
          font-family: monospace;
          font-size: 12px;
        }
        
        .toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .shader-select {
          background: rgba(40, 40, 60, 0.7);
          border: 1px solid rgba(80, 80, 120, 0.5);
          color: white;
          padding: 4px 8px;
          border-radius: 3px;
          font-family: inherit;
          font-size: inherit;
        }
        
        .editor-tabs {
          display: flex;
        }
        
        .tab-button {
          background: rgba(40, 40, 60, 0.5);
          border: 1px solid rgba(80, 80, 120, 0.5);
          color: #aaa;
          padding: 4px 12px;
          border-radius: 3px;
          margin: 0 2px;
          cursor: pointer;
          font-family: inherit;
          font-size: inherit;
        }
        
        .tab-button.active {
          background: rgba(60, 80, 160, 0.5);
          color: white;
          border-color: rgba(100, 120, 200, 0.5);
        }
        
        .compile-button {
          background: rgba(40, 80, 40, 0.7);
          border: 1px solid rgba(80, 120, 80, 0.5);
          color: white;
          padding: 4px 12px;
          border-radius: 3px;
          cursor: pointer;
          font-family: inherit;
          font-size: inherit;
        }
        
        .shader-description {
          color: #888;
          margin-bottom: 8px;
          font-style: italic;
          padding: 0 2px;
        }
        
        .editor-container {
          flex-grow: 1;
          margin-bottom: 8px;
        }
        
        .status-bar {
          padding: 4px 8px;
          margin-bottom: 8px;
          border-radius: 3px;
          font-size: 11px;
        }
        
        .status-bar.success {
          background: rgba(40, 80, 40, 0.5);
          color: #aaffaa;
        }
        
        .status-bar.error {
          background: rgba(80, 40, 40, 0.5);
          color: #ffaaaa;
        }
        
        .uniforms-panel {
          background: rgba(40, 40, 60, 0.5);
          border-radius: 3px;
          padding: 8px;
          margin-bottom: 8px;
        }
        
        .panel-title {
          color: #7388ff;
          font-weight: bold;
          margin-bottom: 6px;
          font-size: 13px;
          padding-bottom: 2px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .uniform-list {
          max-height: 120px;
          overflow-y: auto;
        }
        
        .uniform-item {
          display: flex;
          align-items: center;
          padding: 4px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .uniform-name {
          width: 140px;
          color: #aaddff;
        }
        
        .uniform-type {
          width: 60px;
          color: #aaa;
          font-style: italic;
        }
        
        .uniform-value {
          flex-grow: 1;
        }
        
        .slider {
          width: 100%;
          background: rgba(40, 40, 60, 0.7);
          height: 6px;
          -webkit-appearance: none;
          border-radius: 3px;
          outline: none;
        }
        
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #7388ff;
        }
        
        .color-picker {
          -webkit-appearance: none;
          width: 22px;
          height: 22px;
          border: none;
          background: none;
          cursor: pointer;
        }
      `}</style>
    </DraggableHUD>
  );
};

ShaderInspectorHUD.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  onPositionChange: PropTypes.func,
  onClose: PropTypes.func
};

export default ShaderInspectorHUD; 