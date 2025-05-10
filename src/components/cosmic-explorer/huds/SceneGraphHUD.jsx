/**
 * SceneGraphHUD.jsx
 * Scene graph visualizer and hierarchy inspector
 * LEGIT compliance: UI5
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DraggableHUD from '../ui/DraggableHUD';

// LEGIT compliance metadata
export const metadata = {
  id: 'cosmic_explorer_scene_graph_hud',
  ui: 'UI5',
  type: 'hud',
  doc: 'contract_scene_graph_hud.md'
};

/**
 * TreeNode component for rendering scene graph tree
 */
const TreeNode = ({ node, level, selectedNode, onSelectNode }) => {
  const [expanded, setExpanded] = useState(level < 2);
  const hasChildren = node.children && node.children.length > 0;
  
  return (
    <div className="node-container">
      <div 
        className={`node ${selectedNode?.id === node.id ? 'selected' : ''}`} 
        style={{ paddingLeft: `${level * 16}px` }}
        onClick={() => onSelectNode(node)}
      >
        {hasChildren && (
          <span 
            className="expander"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
          >
            {expanded ? '▼' : '►'}
          </span>
        )}
        <span className={`icon ${node.type}`}></span>
        <span className="node-name">{node.name}</span>
        {node.visible === false && <span className="visibility">👁️</span>}
      </div>
      
      {expanded && hasChildren && (
        <div className="children">
          {node.children.map((child) => (
            <TreeNode 
              key={child.id}
              node={child}
              level={level + 1}
              selectedNode={selectedNode}
              onSelectNode={onSelectNode}
            />
          ))}
        </div>
      )}
      
      <style jsx>{`
        .node-container {
          font-family: monospace;
          font-size: 12px;
        }
        
        .node {
          display: flex;
          align-items: center;
          padding: 3px 0;
          cursor: pointer;
          border-radius: 2px;
        }
        
        .node:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        
        .node.selected {
          background: rgba(80, 120, 255, 0.2);
        }
        
        .expander {
          color: #888;
          font-size: 8px;
          width: 12px;
          display: inline-block;
          cursor: pointer;
        }
        
        .icon {
          width: 14px;
          height: 14px;
          display: inline-block;
          margin-right: 6px;
          border-radius: 2px;
        }
        
        .icon.scene {
          background-color: #ff8844;
        }
        
        .icon.group {
          background-color: #44aaff;
        }
        
        .icon.mesh {
          background-color: #88cc44;
        }
        
        .icon.light {
          background-color: #ffff44;
        }
        
        .icon.camera {
          background-color: #ff44ff;
        }
        
        .icon.helper {
          background-color: #44ffff;
        }
        
        .node-name {
          color: white;
        }
        
        .visibility {
          margin-left: 6px;
          color: #888;
          font-size: 10px;
        }
      `}</style>
    </div>
  );
};

TreeNode.propTypes = {
  node: PropTypes.object.isRequired,
  level: PropTypes.number.isRequired,
  selectedNode: PropTypes.object,
  onSelectNode: PropTypes.func.isRequired
};

/**
 * SceneGraphHUD component 
 * Displays the hierarchical structure of the 3D scene
 */
const SceneGraphHUD = ({
  initialPosition = { x: 380, y: 20 },
  onPositionChange,
  onClose
}) => {
  // Sample scene graph data (in a real implementation, this would come from the Three.js scene)
  const [sceneGraph, setSceneGraph] = useState({
    id: 'scene-1',
    name: 'Main Scene',
    type: 'scene',
    visible: true,
    children: [
      {
        id: 'camera-1',
        name: 'Main Camera',
        type: 'camera',
        visible: true,
        properties: {
          position: [0, 5, 10],
          fov: 75,
          near: 0.1,
          far: 1000
        },
        children: []
      },
      {
        id: 'lights-1',
        name: 'Lighting',
        type: 'group',
        visible: true,
        children: [
          {
            id: 'light-1',
            name: 'Ambient Light',
            type: 'light',
            visible: true,
            properties: {
              color: '#ffffff',
              intensity: 0.5
            },
            children: []
          },
          {
            id: 'light-2',
            name: 'Directional Light',
            type: 'light',
            visible: true,
            properties: {
              color: '#ffffff',
              intensity: 0.8,
              position: [5, 10, 7.5]
            },
            children: []
          }
        ]
      },
      {
        id: 'environment-1',
        name: 'Environment',
        type: 'group',
        visible: true,
        children: [
          {
            id: 'skybox-1',
            name: 'Skybox',
            type: 'mesh',
            visible: true,
            properties: {
              geometry: 'BoxGeometry',
              material: 'ShaderMaterial'
            },
            children: []
          },
          {
            id: 'grid-1',
            name: 'Grid Helper',
            type: 'helper',
            visible: true,
            properties: {
              size: 100,
              divisions: 100
            },
            children: []
          }
        ]
      },
      {
        id: 'entities-1',
        name: 'Entities',
        type: 'group',
        visible: true,
        children: [
          {
            id: 'entity-1',
            name: 'Star Cluster Alpha',
            type: 'group',
            visible: true,
            children: [
              {
                id: 'star-1',
                name: 'Star System 1',
                type: 'mesh',
                visible: true,
                properties: {
                  geometry: 'SphereGeometry',
                  material: 'MeshStandardMaterial',
                  position: [2, 0, 3]
                },
                children: []
              },
              {
                id: 'star-2',
                name: 'Star System 2',
                type: 'mesh',
                visible: true,
                properties: {
                  geometry: 'SphereGeometry',
                  material: 'MeshStandardMaterial',
                  position: [-4, 0, 2]
                },
                children: []
              },
              {
                id: 'star-3',
                name: 'Star System 3',
                type: 'mesh',
                visible: false,
                properties: {
                  geometry: 'SphereGeometry',
                  material: 'MeshStandardMaterial',
                  position: [0, 0, -5]
                },
                children: []
              }
            ]
          },
          {
            id: 'entity-2',
            name: 'Dust Cloud Beta',
            type: 'mesh',
            visible: true,
            properties: {
              geometry: 'BufferGeometry',
              material: 'PointsMaterial',
              particles: 5000
            },
            children: []
          }
        ]
      }
    ]
  });
  
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statistics, setStatistics] = useState({
    totalNodes: 0,
    visibleNodes: 0,
    meshes: 0,
    lights: 0,
    cameras: 0,
    helpers: 0
  });
  
  // Compute statistics
  useEffect(() => {
    const stats = {
      totalNodes: 0,
      visibleNodes: 0,
      meshes: 0,
      lights: 0,
      cameras: 0,
      helpers: 0
    };
    
    const countNodes = (node) => {
      stats.totalNodes++;
      if (node.visible !== false) stats.visibleNodes++;
      
      if (node.type === 'mesh') stats.meshes++;
      if (node.type === 'light') stats.lights++;
      if (node.type === 'camera') stats.cameras++;
      if (node.type === 'helper') stats.helpers++;
      
      if (node.children) {
        node.children.forEach(countNodes);
      }
    };
    
    countNodes(sceneGraph);
    setStatistics(stats);
  }, [sceneGraph]);
  
  // Handler for node selection
  const handleSelectNode = (node) => {
    setSelectedNode(node);
  };
  
  return (
    <DraggableHUD
      title="Scene Graph"
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      onClose={onClose}
      width={320}
    >
      <div className="scene-graph-container">
        <div className="toolbar">
          <input
            type="text"
            className="search-box"
            placeholder="Search nodes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="stats-bar">
          <div className="stats-item">
            <span className="stats-value">{statistics.totalNodes}</span>
            <span className="stats-label">Nodes</span>
          </div>
          <div className="stats-item">
            <span className="stats-value">{statistics.meshes}</span>
            <span className="stats-label">Meshes</span>
          </div>
          <div className="stats-item">
            <span className="stats-value">{statistics.lights}</span>
            <span className="stats-label">Lights</span>
          </div>
          <div className="stats-item">
            <span className="stats-value">{statistics.cameras}</span>
            <span className="stats-label">Cameras</span>
          </div>
        </div>
        
        <div className="scene-tree">
          <TreeNode 
            node={sceneGraph}
            level={0}
            selectedNode={selectedNode}
            onSelectNode={handleSelectNode}
          />
        </div>
        
        {selectedNode && (
          <div className="node-details">
            <div className="details-title">Node Details</div>
            <div className="details-header">
              <div className={`icon-large ${selectedNode.type}`}></div>
              <div className="details-name">{selectedNode.name}</div>
            </div>
            
            <div className="details-row">
              <div className="details-label">Type:</div>
              <div className="details-value">{selectedNode.type}</div>
            </div>
            <div className="details-row">
              <div className="details-label">ID:</div>
              <div className="details-value">{selectedNode.id}</div>
            </div>
            <div className="details-row">
              <div className="details-label">Visible:</div>
              <div className="details-value">{selectedNode.visible !== false ? 'Yes' : 'No'}</div>
            </div>
            
            {selectedNode.properties && (
              <div className="properties-section">
                <div className="details-subtitle">Properties</div>
                {Object.entries(selectedNode.properties).map(([key, value]) => (
                  <div key={key} className="details-row">
                    <div className="details-label">{key}:</div>
                    <div className="details-value">
                      {Array.isArray(value) ? value.join(', ') : value.toString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
        
      <style jsx>{`
        .scene-graph-container {
          display: flex;
          flex-direction: column;
          height: 400px;
          font-family: monospace;
          font-size: 12px;
        }
        
        .toolbar {
          margin-bottom: 8px;
        }
        
        .search-box {
          width: 100%;
          background: rgba(30, 30, 40, 0.5);
          border: 1px solid rgba(80, 80, 100, 0.5);
          border-radius: 3px;
          color: white;
          padding: 4px 8px;
          font-family: inherit;
          font-size: inherit;
        }
        
        .stats-bar {
          display: flex;
          justify-content: space-between;
          background: rgba(40, 40, 60, 0.5);
          border-radius: 3px;
          padding: 4px 8px;
          margin-bottom: 8px;
        }
        
        .stats-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .stats-value {
          font-weight: bold;
          color: #aaddff;
        }
        
        .stats-label {
          font-size: 10px;
          color: #aaa;
        }
        
        .scene-tree {
          flex-grow: 1;
          overflow-y: auto;
          background: rgba(20, 20, 30, 0.5);
          border-radius: 3px;
          padding: 4px;
          margin-bottom: 8px;
        }
        
        .node-details {
          background: rgba(40, 40, 60, 0.5);
          border-radius: 3px;
          padding: 8px;
        }
        
        .details-title {
          color: #7388ff;
          font-weight: bold;
          margin-bottom: 6px;
          font-size: 13px;
          padding-bottom: 2px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .details-subtitle {
          color: #7388ff;
          font-weight: bold;
          margin-top: 8px;
          margin-bottom: 4px;
          font-size: 12px;
        }
        
        .details-header {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .details-name {
          font-weight: bold;
          color: white;
          margin-left: 8px;
        }
        
        .icon-large {
          width: 16px;
          height: 16px;
          border-radius: 3px;
        }
        
        .icon-large.scene {
          background-color: #ff8844;
        }
        
        .icon-large.group {
          background-color: #44aaff;
        }
        
        .icon-large.mesh {
          background-color: #88cc44;
        }
        
        .icon-large.light {
          background-color: #ffff44;
        }
        
        .icon-large.camera {
          background-color: #ff44ff;
        }
        
        .icon-large.helper {
          background-color: #44ffff;
        }
        
        .details-row {
          display: flex;
          margin-bottom: 4px;
        }
        
        .details-label {
          width: 80px;
          color: #aaa;
        }
        
        .details-value {
          color: white;
          flex-grow: 1;
          word-break: break-all;
        }
        
        .properties-section {
          margin-top: 6px;
        }
      `}</style>
    </DraggableHUD>
  );
};

SceneGraphHUD.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  onPositionChange: PropTypes.func,
  onClose: PropTypes.func
};

export default SceneGraphHUD; 