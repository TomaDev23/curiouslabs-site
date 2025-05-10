/**
 * ComponentInspectorHUD.jsx
 * Component for inspecting and modifying scene objects
 * LEGIT compliance: UI5
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DraggableHUD from '../ui/DraggableHUD';

// LEGIT compliance metadata
export const metadata = {
  id: 'cosmic_explorer_component_inspector_hud',
  ui: 'UI5',
  type: 'development',
  doc: 'contract_component_inspector_hud.md'
};

// Mock scene hierarchy for demo purposes
const MOCK_SCENE_HIERARCHY = {
  id: 'scene-root',
  name: 'Scene',
  type: 'Scene',
  expanded: true,
  children: [
    {
      id: 'camera-1',
      name: 'Main Camera',
      type: 'PerspectiveCamera',
      expanded: false,
      properties: {
        position: { x: 0, y: 10, z: 20 },
        rotation: { x: -0.4, y: 0, z: 0 },
        fov: 45,
        near: 0.1,
        far: 1000
      }
    },
    {
      id: 'lights',
      name: 'Lights',
      type: 'Group',
      expanded: true,
      children: [
        {
          id: 'ambient-light',
          name: 'Ambient Light',
          type: 'AmbientLight',
          properties: {
            color: '#333333',
            intensity: 0.5
          }
        },
        {
          id: 'directional-light',
          name: 'Directional Light',
          type: 'DirectionalLight',
          properties: {
            color: '#ffffff',
            intensity: 1.0,
            position: { x: 5, y: 10, z: 7.5 },
            castShadow: true
          }
        }
      ]
    },
    {
      id: 'galaxy',
      name: 'Galaxy',
      type: 'ParticleSystem',
      expanded: false,
      properties: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        particleCount: 50000,
        radius: 10,
        branches: 5,
        spin: 1.0,
        randomness: 0.2,
        randomnessPower: 3
      }
    }
  ]
};

/**
 * TreeNode component for rendering a node in the object hierarchy
 */
const TreeNode = ({ node, level, onSelect, selectedId, onToggle }) => {
  const isSelected = node.id === selectedId;
  const indent = `${level * 16}px`;
  
  const handleToggle = (e) => {
    e.stopPropagation();
    onToggle(node.id);
  };
  
  return (
    <div>
      <div 
        className={`tree-node ${isSelected ? 'selected' : ''}`} 
        style={{ paddingLeft: indent }}
        onClick={() => onSelect(node)}
      >
        {node.children && node.children.length > 0 && (
          <span className="toggle-icon" onClick={handleToggle}>
            {node.expanded ? '▼' : '►'}
          </span>
        )}
        
        <span className="node-icon">{getNodeIcon(node.type)}</span>
        <span className="node-name">{node.name}</span>
        <span className="node-type">{node.type}</span>
      </div>
      
      {node.expanded && node.children && (
        <div className="node-children">
          {node.children.map(child => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              onSelect={onSelect}
              selectedId={selectedId}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
      
      <style jsx>{`
        .tree-node {
          display: flex;
          align-items: center;
          padding: 6px 8px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.1s;
          border-radius: 4px;
          margin: 1px 0;
        }
        
        .tree-node:hover {
          background: rgba(60, 70, 90, 0.3);
        }
        
        .tree-node.selected {
          background: rgba(60, 100, 150, 0.3);
        }
        
        .toggle-icon {
          margin-right: 4px;
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
        }
        
        .node-icon {
          margin-right: 6px;
        }
        
        .node-name {
          flex: 1;
          color: #e0e0e0;
        }
        
        .node-type {
          margin-left: 8px;
          color: #888;
          font-size: 11px;
        }
      `}</style>
    </div>
  );
};

/**
 * PropertyEditor component for editing object properties
 */
const PropertyEditor = ({ selectedNode }) => {
  if (!selectedNode || !selectedNode.properties) {
    return (
      <div className="empty-editor">
        <p>Select an object to edit its properties</p>
        
        <style jsx>{`
          .empty-editor {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: #888;
            font-style: italic;
          }
        `}</style>
      </div>
    );
  }
  
  const properties = selectedNode.properties;
  const propertyEntries = Object.entries(properties);
  
  return (
    <div className="property-editor">
      <div className="editor-header">
        <span className="selected-name">{selectedNode.name}</span>
        <span className="selected-type">{selectedNode.type}</span>
      </div>
      
      <div className="properties-list">
        {propertyEntries.map(([key, value]) => (
          <PropertyItem key={key} name={key} value={value} />
        ))}
      </div>
      
      <style jsx>{`
        .property-editor {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .editor-header {
          padding: 8px 12px;
          background: rgba(40, 50, 70, 0.4);
          border-bottom: 1px solid #3a3f4b;
          margin-bottom: 8px;
        }
        
        .selected-name {
          font-weight: bold;
          color: #a0c0e0;
          margin-right: 8px;
        }
        
        .selected-type {
          color: #888;
          font-size: 12px;
        }
        
        .properties-list {
          padding: 0 12px;
          overflow-y: auto;
          flex: 1;
        }
      `}</style>
    </div>
  );
};

/**
 * PropertyItem component for editing a single property
 */
const PropertyItem = ({ name, value }) => {
  // Handle different property types
  const renderValueEditor = () => {
    if (typeof value === 'object' && value !== null) {
      // Vector3 like object
      if ('x' in value && 'y' in value && 'z' in value) {
        return (
          <div className="vector-editor">
            <div className="vector-component">
              <span className="component-label">X</span>
              <input type="number" value={value.x} className="vector-input" />
            </div>
            <div className="vector-component">
              <span className="component-label">Y</span>
              <input type="number" value={value.y} className="vector-input" />
            </div>
            <div className="vector-component">
              <span className="component-label">Z</span>
              <input type="number" value={value.z} className="vector-input" />
            </div>
          </div>
        );
      }
      
      // Object with other properties
      return (
        <div className="object-preview">
          {JSON.stringify(value)}
        </div>
      );
    }
    
    // Boolean value
    if (typeof value === 'boolean') {
      return (
        <input type="checkbox" checked={value} className="boolean-input" />
      );
    }
    
    // Color value
    if (typeof value === 'string' && value.startsWith('#')) {
      return (
        <div className="color-editor">
          <input type="color" value={value} className="color-input" />
          <span className="color-value">{value}</span>
        </div>
      );
    }
    
    // Number value
    if (typeof value === 'number') {
      return (
        <input type="number" value={value} className="number-input" />
      );
    }
    
    // Default: text input
    return (
      <input type="text" value={value} className="text-input" />
    );
  };
  
  return (
    <div className="property-item">
      <div className="property-name">{name}</div>
      <div className="property-value">
        {renderValueEditor()}
      </div>
      
      <style jsx>{`
        .property-item {
          display: flex;
          margin-bottom: 8px;
          padding: 6px 0;
          border-bottom: 1px solid rgba(60, 70, 90, 0.2);
        }
        
        .property-name {
          width: 35%;
          padding-right: 12px;
          font-size: 13px;
          color: #c0c0c0;
        }
        
        .property-value {
          flex: 1;
        }
        
        .text-input,
        .number-input {
          width: 100%;
          padding: 4px 8px;
          background: rgba(30, 34, 42, 0.8);
          border: 1px solid #3a3f4b;
          border-radius: 4px;
          color: #e0e0e0;
          font-size: 13px;
        }
        
        .boolean-input {
          width: 16px;
          height: 16px;
        }
        
        .color-editor {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .color-input {
          width: 30px;
          height: 24px;
          border: none;
          background: none;
          padding: 0;
          cursor: pointer;
        }
        
        .color-value {
          font-size: 13px;
          font-family: 'Roboto Mono', monospace;
        }
        
        .vector-editor {
          display: flex;
          gap: 8px;
        }
        
        .vector-component {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        
        .component-label {
          font-size: 10px;
          color: #888;
          margin-bottom: 2px;
        }
        
        .vector-input {
          width: 100%;
          padding: 4px;
          background: rgba(30, 34, 42, 0.8);
          border: 1px solid #3a3f4b;
          border-radius: 4px;
          color: #e0e0e0;
          font-size: 12px;
        }
        
        .object-preview {
          font-family: 'Roboto Mono', monospace;
          font-size: 12px;
          color: #a0a0a0;
          padding: 4px;
          background: rgba(30, 34, 42, 0.6);
          border-radius: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
};

/**
 * Helper function to get icon for node type
 */
const getNodeIcon = (type) => {
  const iconMap = {
    'Scene': '🌐',
    'Group': '📂',
    'PerspectiveCamera': '📷',
    'OrthographicCamera': '📹',
    'AmbientLight': '💡',
    'DirectionalLight': '☀️',
    'PointLight': '⚡',
    'SpotLight': '🔦',
    'Mesh': '📦',
    'ParticleSystem': '✨',
    'default': '⚪'
  };
  
  return iconMap[type] || iconMap.default;
};

/**
 * ComponentInspectorHUD component
 */
const ComponentInspectorHUD = ({
  initialPosition,
  onPositionChange,
  onClose,
  visualParams
}) => {
  const [sceneData, setSceneData] = useState(MOCK_SCENE_HIERARCHY);
  const [selectedNode, setSelectedNode] = useState(null);
  
  // Toggle node expanded state
  const handleToggleNode = (nodeId) => {
    const toggleNode = (node) => {
      if (node.id === nodeId) {
        return { ...node, expanded: !node.expanded };
      }
      
      if (node.children) {
        return {
          ...node,
          children: node.children.map(toggleNode)
        };
      }
      
      return node;
    };
    
    setSceneData(toggleNode(sceneData));
  };
  
  return (
    <DraggableHUD
      title="Component Inspector"
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      onClose={onClose}
      width={700}
      height={600}
    >
      <div className="component-inspector-hud">
        <div className="inspector-layout">
          <div className="hierarchy-panel">
            <div className="panel-header">
              <h3>Scene Hierarchy</h3>
            </div>
            <div className="hierarchy-tree">
              <TreeNode
                node={sceneData}
                level={0}
                onSelect={setSelectedNode}
                selectedId={selectedNode?.id}
                onToggle={handleToggleNode}
              />
            </div>
          </div>
          
          <div className="properties-panel">
            <div className="panel-header">
              <h3>Properties</h3>
            </div>
            <div className="properties-container">
              <PropertyEditor selectedNode={selectedNode} />
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .component-inspector-hud {
          display: flex;
          flex-direction: column;
          height: 100%;
          color: #e0e0e0;
          background: rgba(30, 34, 42, 0.8);
        }
        
        .inspector-layout {
          display: flex;
          height: 100%;
        }
        
        .hierarchy-panel {
          width: 40%;
          border-right: 1px solid #3a3f4b;
          display: flex;
          flex-direction: column;
        }
        
        .properties-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .panel-header {
          padding: 8px 12px;
          background: rgba(35, 39, 47, 0.6);
          border-bottom: 1px solid #3a3f4b;
        }
        
        .panel-header h3 {
          margin: 0;
          font-size: 14px;
          font-weight: normal;
          color: #a0c0e0;
        }
        
        .hierarchy-tree {
          padding: 8px;
          overflow-y: auto;
          flex: 1;
        }
        
        .properties-container {
          flex: 1;
          overflow: hidden;
        }
      `}</style>
    </DraggableHUD>
  );
};

ComponentInspectorHUD.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  onPositionChange: PropTypes.func,
  onClose: PropTypes.func,
  visualParams: PropTypes.object
};

ComponentInspectorHUD.defaultProps = {
  initialPosition: { x: 50, y: 50 },
  onPositionChange: () => {},
  onClose: () => {},
  visualParams: {}
};

export default ComponentInspectorHUD; 