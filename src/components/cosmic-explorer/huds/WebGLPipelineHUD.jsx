/**
 * WebGLPipelineHUD.jsx
 * WebGL rendering pipeline visualization and analysis
 * LEGIT compliance: UI5
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DraggableHUD from '../ui/DraggableHUD';

// LEGIT compliance metadata
export const metadata = {
  id: 'cosmic_explorer_webgl_pipeline_hud',
  ui: 'UI5',
  type: 'hud',
  doc: 'contract_webgl_pipeline_hud.md'
};

/**
 * WebGLPipelineHUD component
 * Displays WebGL rendering pipeline information and statistics
 */
const WebGLPipelineHUD = ({
  initialPosition = { x: 20, y: 350 },
  onPositionChange,
  onClose
}) => {
  // Simulated WebGL stats (in a real implementation, these would be gathered from the Three.js renderer)
  const [webglStats, setWebglStats] = useState({
    gl: {
      version: 'WebGL 2.0',
      vendor: 'Google Inc.',
      renderer: 'ANGLE (NVIDIA GeForce RTX)',
      shadingLanguageVersion: 'WebGL GLSL ES 3.00'
    },
    extensions: [
      'ANGLE_instanced_arrays',
      'EXT_blend_minmax',
      'EXT_color_buffer_half_float',
      'EXT_disjoint_timer_query',
      'EXT_float_blend',
      'EXT_frag_depth',
      'EXT_shader_texture_lod',
      'EXT_texture_filter_anisotropic',
      'OES_element_index_uint',
      'OES_standard_derivatives',
      'OES_texture_float',
      'OES_texture_float_linear',
      'OES_texture_half_float',
      'OES_texture_half_float_linear',
      'OES_vertex_array_object',
      'WEBGL_color_buffer_float',
      'WEBGL_compressed_texture_s3tc',
      'WEBGL_debug_renderer_info',
      'WEBGL_debug_shaders',
      'WEBGL_depth_texture',
      'WEBGL_draw_buffers',
      'WEBGL_lose_context',
    ],
    pipeline: {
      shaders: {
        vertex: 4,
        fragment: 6,
        compile_time: 128 // ms
      },
      textures: {
        count: 12,
        memory: 48 // MB
      },
      buffers: {
        count: 18,
        memory: 24 // MB
      },
      draw_calls: 32,
      framebuffer_ops: 3
    },
    frame_stats: {
      current_frame: 512,
      cpu_time: 2.3, // ms
      gpu_time: 1.8, // ms
      idle_time: 0.9 // ms
    }
  });
  
  // Simulate WebGL stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setWebglStats(prev => ({
        ...prev,
        frame_stats: {
          current_frame: prev.frame_stats.current_frame + 1,
          cpu_time: 2 + Math.random(), // ms
          gpu_time: 1.5 + Math.random(), // ms
          idle_time: 0.5 + Math.random() // ms
        },
        pipeline: {
          ...prev.pipeline,
          draw_calls: 30 + Math.floor(Math.random() * 5)
        }
      }));
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <DraggableHUD
      title="WebGL Pipeline"
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      onClose={onClose}
      width={350}
    >
      <div className="webgl-container">
        {/* GL info section */}
        <div className="section">
          <div className="section-title">WebGL Context</div>
          <div className="gl-info">
            <div className="info-row">
              <div className="info-label">Version:</div>
              <div className="info-value">{webglStats.gl.version}</div>
            </div>
            <div className="info-row">
              <div className="info-label">Vendor:</div>
              <div className="info-value">{webglStats.gl.vendor}</div>
            </div>
            <div className="info-row">
              <div className="info-label">Renderer:</div>
              <div className="info-value">{webglStats.gl.renderer}</div>
            </div>
            <div className="info-row">
              <div className="info-label">GLSL:</div>
              <div className="info-value">{webglStats.gl.shadingLanguageVersion}</div>
            </div>
          </div>
        </div>
        
        {/* Pipeline stats */}
        <div className="section">
          <div className="section-title">Render Pipeline</div>
          
          {/* Frame Stats */}
          <div className="frame-stats">
            <div className="info-row">
              <div className="info-label">Frame #:</div>
              <div className="info-value">{webglStats.frame_stats.current_frame}</div>
            </div>
            <div className="timing-bars">
              <div className="timing-row">
                <div className="timing-label">CPU:</div>
                <div className="timing-bar-container">
                  <div 
                    className="timing-bar cpu-bar"
                    style={{ width: `${Math.min(100, webglStats.frame_stats.cpu_time * 10)}%` }}
                  ></div>
                </div>
                <div className="timing-value">{webglStats.frame_stats.cpu_time.toFixed(1)}ms</div>
              </div>
              <div className="timing-row">
                <div className="timing-label">GPU:</div>
                <div className="timing-bar-container">
                  <div 
                    className="timing-bar gpu-bar"
                    style={{ width: `${Math.min(100, webglStats.frame_stats.gpu_time * 10)}%` }}
                  ></div>
                </div>
                <div className="timing-value">{webglStats.frame_stats.gpu_time.toFixed(1)}ms</div>
              </div>
              <div className="timing-row">
                <div className="timing-label">Idle:</div>
                <div className="timing-bar-container">
                  <div 
                    className="timing-bar idle-bar"
                    style={{ width: `${Math.min(100, webglStats.frame_stats.idle_time * 10)}%` }}
                  ></div>
                </div>
                <div className="timing-value">{webglStats.frame_stats.idle_time.toFixed(1)}ms</div>
              </div>
            </div>
          </div>
          
          {/* Pipeline resources */}
          <div className="resources">
            <div className="resource-row">
              <div className="resource-item">
                <div className="resource-label">Shaders</div>
                <div className="resource-value">{webglStats.pipeline.shaders.vertex + webglStats.pipeline.shaders.fragment}</div>
                <div className="resource-detail">V: {webglStats.pipeline.shaders.vertex}, F: {webglStats.pipeline.shaders.fragment}</div>
              </div>
              <div className="resource-item">
                <div className="resource-label">Textures</div>
                <div className="resource-value">{webglStats.pipeline.textures.count}</div>
                <div className="resource-detail">{webglStats.pipeline.textures.memory} MB</div>
              </div>
              <div className="resource-item">
                <div className="resource-label">Buffers</div>
                <div className="resource-value">{webglStats.pipeline.buffers.count}</div>
                <div className="resource-detail">{webglStats.pipeline.buffers.memory} MB</div>
              </div>
            </div>
            <div className="draw-calls">
              <div className="draw-calls-label">Draw Calls:</div>
              <div className="draw-calls-value">{webglStats.pipeline.draw_calls}</div>
            </div>
          </div>
        </div>
        
        {/* Extensions section */}
        <div className="section">
          <div className="section-title">Active Extensions ({webglStats.extensions.length})</div>
          <div className="extensions-list">
            {webglStats.extensions.slice(0, 8).map((ext, index) => (
              <div key={index} className="extension-item">{ext}</div>
            ))}
            {webglStats.extensions.length > 8 && (
              <div className="extension-more">+ {webglStats.extensions.length - 8} more...</div>
            )}
          </div>
        </div>
        
        {/* Render pipeline diagram */}
        <div className="section">
          <div className="section-title">Pipeline Flow</div>
          <div className="pipeline-diagram">
            <div className="pipeline-stage">Vertex Shader</div>
            <div className="pipeline-arrow">↓</div>
            <div className="pipeline-stage">Rasterization</div>
            <div className="pipeline-arrow">↓</div>
            <div className="pipeline-stage">Fragment Shader</div>
            <div className="pipeline-arrow">↓</div>
            <div className="pipeline-stage">Framebuffer</div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .webgl-container {
          font-family: monospace;
          font-size: 12px;
        }
        
        .section {
          margin-bottom: 14px;
        }
        
        .section-title {
          color: #7388ff;
          font-weight: bold;
          margin-bottom: 8px;
          font-size: 13px;
          padding-bottom: 2px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .gl-info {
          padding: 4px 0;
        }
        
        .info-row {
          display: flex;
          margin-bottom: 4px;
        }
        
        .info-label {
          width: 80px;
          color: #aaa;
        }
        
        .info-value {
          color: white;
          flex-grow: 1;
        }
        
        .timing-bars {
          margin-top: 8px;
        }
        
        .timing-row {
          display: flex;
          align-items: center;
          margin-bottom: 5px;
        }
        
        .timing-label {
          width: 40px;
          color: #aaa;
        }
        
        .timing-bar-container {
          flex-grow: 1;
          background: rgba(255, 255, 255, 0.1);
          height: 6px;
          border-radius: 3px;
          overflow: hidden;
          margin: 0 8px;
        }
        
        .timing-bar {
          height: 100%;
          border-radius: 3px;
        }
        
        .cpu-bar {
          background: linear-gradient(90deg, #44aaff, #4488ff);
        }
        
        .gpu-bar {
          background: linear-gradient(90deg, #44ffaa, #44ff44);
        }
        
        .idle-bar {
          background: linear-gradient(90deg, #aaaaaa, #888888);
        }
        
        .timing-value {
          width: 45px;
          color: #ddd;
          font-size: 11px;
          text-align: right;
        }
        
        .resources {
          margin-top: 12px;
        }
        
        .resource-row {
          display: flex;
          justify-content: space-between;
        }
        
        .resource-item {
          text-align: center;
          padding: 0 4px;
        }
        
        .resource-label {
          color: #aaa;
          font-size: 11px;
        }
        
        .resource-value {
          color: white;
          font-weight: bold;
          font-size: 16px;
          margin: 2px 0;
        }
        
        .resource-detail {
          color: #888;
          font-size: 10px;
        }
        
        .draw-calls {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 10px;
          padding: 4px;
          background: rgba(60, 80, 180, 0.2);
          border-radius: 4px;
        }
        
        .draw-calls-label {
          color: #aaa;
          margin-right: 8px;
        }
        
        .draw-calls-value {
          color: #ff88ff;
          font-weight: bold;
        }
        
        .extensions-list {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
        
        .extension-item {
          font-size: 10px;
          color: #bbb;
          background: rgba(60, 60, 80, 0.3);
          padding: 2px 6px;
          border-radius: 2px;
        }
        
        .extension-more {
          font-size: 10px;
          color: #888;
          font-style: italic;
          padding: 2px 6px;
        }
        
        .pipeline-diagram {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 8px;
        }
        
        .pipeline-stage {
          background: rgba(60, 80, 180, 0.3);
          color: white;
          padding: 4px 12px;
          border-radius: 4px;
          width: 70%;
          text-align: center;
          font-size: 11px;
        }
        
        .pipeline-arrow {
          color: #7388ff;
          margin: 2px 0;
          font-size: 14px;
        }
      `}</style>
    </DraggableHUD>
  );
};

WebGLPipelineHUD.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  onPositionChange: PropTypes.func,
  onClose: PropTypes.func
};

export default WebGLPipelineHUD; 