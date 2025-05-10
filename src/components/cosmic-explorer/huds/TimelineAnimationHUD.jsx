/**
 * TimelineAnimationHUD.jsx
 * Component for controlling and editing animations with a timeline
 * LEGIT compliance: UI5
 */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import DraggableHUD from '../ui/DraggableHUD';

// LEGIT compliance metadata
export const metadata = {
  id: 'cosmic_explorer_timeline_animation_hud',
  ui: 'UI5',
  type: 'controller',
  doc: 'contract_timeline_animation_hud.md'
};

// Demo animation tracks
const DEMO_ANIMATION_TRACKS = [
  {
    id: 'track_001',
    name: 'Camera Movement',
    color: '#4488ff',
    type: 'position',
    target: 'main_camera',
    enabled: true,
    expanded: true,
    keyframes: [
      { id: 'kf_001', time: 0, value: [0, 10, 30], easing: 'linear' },
      { id: 'kf_002', time: 2.5, value: [15, 8, 25], easing: 'easeInOut' },
      { id: 'kf_003', time: 5, value: [30, 12, 20], easing: 'easeOut' },
      { id: 'kf_004', time: 7.5, value: [20, 15, 25], easing: 'easeIn' },
      { id: 'kf_005', time: 10, value: [0, 10, 30], easing: 'linear' }
    ]
  },
  {
    id: 'track_002',
    name: 'Galaxy Rotation',
    color: '#ff6644',
    type: 'rotation',
    target: 'galaxy_system',
    enabled: true,
    expanded: false,
    keyframes: [
      { id: 'kf_006', time: 0, value: [0, 0, 0], easing: 'linear' },
      { id: 'kf_007', time: 10, value: [0, 6.28, 0], easing: 'linear' }
    ]
  },
  {
    id: 'track_003',
    name: 'Star Brightness',
    color: '#ffcc22',
    type: 'property',
    property: 'intensity',
    target: 'star_system',
    enabled: true,
    expanded: false,
    keyframes: [
      { id: 'kf_008', time: 0, value: 1.0, easing: 'linear' },
      { id: 'kf_009', time: 3, value: 2.5, easing: 'easeIn' },
      { id: 'kf_010', time: 5, value: 0.8, easing: 'easeOut' },
      { id: 'kf_011', time: 8, value: 1.5, easing: 'easeInOut' },
      { id: 'kf_012', time: 10, value: 1.0, easing: 'linear' }
    ]
  },
  {
    id: 'track_004',
    name: 'Nebula Color',
    color: '#cc44cc',
    type: 'color',
    target: 'nebula_material',
    enabled: false,
    expanded: false,
    keyframes: [
      { id: 'kf_013', time: 0, value: '#ff3366', easing: 'linear' },
      { id: 'kf_014', time: 5, value: '#3322ff', easing: 'easeInOut' },
      { id: 'kf_015', time: 10, value: '#ff3366', easing: 'linear' }
    ]
  }
];

// Animation playback demo state
const ANIMATION_DURATION = 10; // seconds

/**
 * Keyframe component
 */
const Keyframe = ({ keyframe, trackColor, selected, onClick, onDragStart }) => {
  return (
    <div 
      className={`keyframe ${selected ? 'selected' : ''}`}
      style={{ 
        left: `${(keyframe.time / ANIMATION_DURATION) * 100}%`,
        backgroundColor: trackColor
      }}
      onClick={(e) => onClick(keyframe.id, e)}
      draggable
      onDragStart={(e) => onDragStart(keyframe.id, e)}
    >
      <style jsx>{`
        .keyframe {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          cursor: pointer;
          z-index: 2;
          border: 1px solid rgba(255, 255, 255, 0.8);
        }
        
        .keyframe.selected {
          border: 2px solid white;
          box-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
          z-index: 3;
        }
      `}</style>
    </div>
  );
};

/**
 * Track component
 */
const AnimationTrack = ({ 
  track, 
  currentTime, 
  selectedKeyframes, 
  onToggleExpand, 
  onToggleEnabled,
  onSelectKeyframe,
  onKeyframeDragStart
}) => {
  return (
    <div className={`track ${track.expanded ? 'expanded' : ''}`}>
      <div className="track-header">
        <div 
          className="track-expand-toggle"
          onClick={() => onToggleExpand(track.id)}
        >
          {track.expanded ? '▼' : '►'}
        </div>
        
        <div 
          className={`track-enabled-toggle ${track.enabled ? 'enabled' : 'disabled'}`}
          onClick={() => onToggleEnabled(track.id)}
        >
          {track.enabled ? '●' : '○'}
        </div>
        
        <div className="track-name" style={{ color: track.color }}>
          {track.name}
        </div>
        
        <div className="track-type">
          {track.type === 'property' ? `${track.type}: ${track.property}` : track.type}
        </div>
      </div>
      
      <div className="track-timeline">
        <div className="track-line"></div>
        
        {/* Current time indicator for this track */}
        <div className="current-time-indicator" style={{ left: `${(currentTime / ANIMATION_DURATION) * 100}%` }}></div>
        
        {/* Keyframes */}
        {track.keyframes.map(keyframe => (
          <Keyframe
            key={keyframe.id}
            keyframe={keyframe}
            trackColor={track.color}
            selected={selectedKeyframes.includes(keyframe.id)}
            onClick={onSelectKeyframe}
            onDragStart={onKeyframeDragStart}
          />
        ))}
      </div>
      
      {track.expanded && (
        <div className="track-details">
          <div className="keyframe-list">
            <div className="keyframe-list-header">
              <div className="keyframe-time">Time</div>
              <div className="keyframe-value">Value</div>
              <div className="keyframe-easing">Easing</div>
            </div>
            
            {track.keyframes.map(keyframe => (
              <div 
                key={keyframe.id} 
                className={`keyframe-item ${selectedKeyframes.includes(keyframe.id) ? 'selected' : ''}`}
                onClick={(e) => onSelectKeyframe(keyframe.id, e)}
              >
                <div className="keyframe-time">{keyframe.time.toFixed(2)}s</div>
                <div className="keyframe-value">
                  {Array.isArray(keyframe.value) 
                    ? keyframe.value.map(v => v.toFixed(1)).join(', ') 
                    : typeof keyframe.value === 'string'
                      ? keyframe.value
                      : keyframe.value.toFixed(2)
                  }
                </div>
                <div className="keyframe-easing">{keyframe.easing}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <style jsx>{`
        .track {
          background: rgba(30, 35, 50, 0.7);
          border-radius: 4px;
          margin-bottom: 4px;
          overflow: hidden;
        }
        
        .track-header {
          display: flex;
          align-items: center;
          padding: 4px 8px;
          background: rgba(40, 45, 60, 0.8);
          gap: 8px;
        }
        
        .track-expand-toggle {
          cursor: pointer;
          font-size: 10px;
          width: 14px;
          color: rgba(255, 255, 255, 0.7);
        }
        
        .track-enabled-toggle {
          cursor: pointer;
          font-size: 14px;
          width: 14px;
        }
        
        .track-enabled-toggle.enabled {
          color: #44ff44;
        }
        
        .track-enabled-toggle.disabled {
          color: #888;
        }
        
        .track-name {
          font-weight: 500;
          font-size: 12px;
          flex: 1;
        }
        
        .track-type {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.6);
          padding: 2px 6px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 3px;
        }
        
        .track-timeline {
          height: 30px;
          position: relative;
          background: rgba(20, 25, 35, 0.5);
          margin: 0 8px 4px 8px;
        }
        
        .track-line {
          position: absolute;
          height: 2px;
          width: 100%;
          background: rgba(255, 255, 255, 0.2);
          top: 50%;
          transform: translateY(-50%);
        }
        
        .current-time-indicator {
          position: absolute;
          height: 100%;
          width: 2px;
          background: rgba(255, 255, 255, 0.8);
          top: 0;
          transform: translateX(-50%);
          z-index: 4;
        }
        
        .track-details {
          padding: 8px;
          background: rgba(25, 30, 40, 0.5);
        }
        
        .keyframe-list {
          font-size: 11px;
        }
        
        .keyframe-list-header {
          display: grid;
          grid-template-columns: 60px 1fr 80px;
          gap: 8px;
          padding: 4px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
        }
        
        .keyframe-item {
          display: grid;
          grid-template-columns: 60px 1fr 80px;
          gap: 8px;
          padding: 4px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          cursor: pointer;
        }
        
        .keyframe-item:hover {
          background: rgba(60, 70, 100, 0.3);
        }
        
        .keyframe-item.selected {
          background: rgba(70, 90, 150, 0.4);
        }
        
        .keyframe-time {
          font-family: monospace;
        }
        
        .keyframe-value {
          color: rgba(255, 255, 255, 0.9);
          font-family: monospace;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .keyframe-easing {
          color: rgba(255, 255, 255, 0.7);
        }
      `}</style>
    </div>
  );
};

/**
 * TimelineAnimationHUD component
 */
const TimelineAnimationHUD = ({
  initialPosition,
  onPositionChange,
  onClose,
  visualParams
}) => {
  const [tracks, setTracks] = useState(DEMO_ANIMATION_TRACKS);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedKeyframes, setSelectedKeyframes] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  
  const timelineRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastFrameTimeRef = useRef(null);
  
  // Playback control
  useEffect(() => {
    if (isPlaying) {
      lastFrameTimeRef.current = performance.now();
      
      const animate = (now) => {
        const delta = (now - lastFrameTimeRef.current) / 1000;
        lastFrameTimeRef.current = now;
        
        setCurrentTime(time => {
          const newTime = time + (delta * playbackSpeed);
          
          // Loop if we reach the end
          if (newTime >= ANIMATION_DURATION) {
            return 0;
          }
          
          return newTime;
        });
        
        animationFrameRef.current = requestAnimationFrame(animate);
      };
      
      animationFrameRef.current = requestAnimationFrame(animate);
      
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [isPlaying, playbackSpeed]);
  
  // Toggle track expanded
  const handleToggleExpand = (trackId) => {
    setTracks(prevTracks => 
      prevTracks.map(track => 
        track.id === trackId 
          ? { ...track, expanded: !track.expanded }
          : track
      )
    );
  };
  
  // Toggle track enabled
  const handleToggleEnabled = (trackId) => {
    setTracks(prevTracks => 
      prevTracks.map(track => 
        track.id === trackId 
          ? { ...track, enabled: !track.enabled }
          : track
      )
    );
  };
  
  // Handle timeline click to set current time
  const handleTimelineClick = (e) => {
    if (!timelineRef.current) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * ANIMATION_DURATION;
    
    setCurrentTime(Math.max(0, Math.min(newTime, ANIMATION_DURATION)));
  };
  
  // Select keyframe
  const handleSelectKeyframe = (keyframeId, e) => {
    if (e.shiftKey) {
      // Multi-select with shift
      setSelectedKeyframes(prevSelected => 
        prevSelected.includes(keyframeId)
          ? prevSelected.filter(id => id !== keyframeId)
          : [...prevSelected, keyframeId]
      );
    } else {
      // Single select without shift
      setSelectedKeyframes([keyframeId]);
    }
  };
  
  // Keyframe drag start
  const handleKeyframeDragStart = (keyframeId, e) => {
    // If dragging a keyframe that's not selected, select it
    if (!selectedKeyframes.includes(keyframeId)) {
      setSelectedKeyframes([keyframeId]);
    }
    
    // Set drag data
    e.dataTransfer.setData('text/plain', keyframeId);
    e.dataTransfer.effectAllowed = 'move';
  };
  
  // Create new keyframe at current time
  const handleCreateKeyframe = () => {
    if (tracks.length === 0) return;
    
    // Find first enabled track to add keyframe to
    const targetTrack = tracks.find(track => track.enabled);
    if (!targetTrack) return;
    
    // Generate unique ID
    const newId = `kf_${Date.now()}`;
    
    // Determine value based on track type
    let newValue;
    switch(targetTrack.type) {
      case 'position':
      case 'rotation':
        newValue = [0, 0, 0];
        break;
      case 'color':
        newValue = '#ffffff';
        break;
      default:
        newValue = 1.0;
    }
    
    // Create new keyframe
    const newKeyframe = {
      id: newId,
      time: currentTime,
      value: newValue,
      easing: 'linear'
    };
    
    // Add keyframe to track
    setTracks(prevTracks => 
      prevTracks.map(track => 
        track.id === targetTrack.id
          ? {
              ...track,
              keyframes: [...track.keyframes, newKeyframe].sort((a, b) => a.time - b.time)
            }
          : track
      )
    );
    
    // Select the new keyframe
    setSelectedKeyframes([newId]);
  };
  
  // Delete selected keyframes
  const handleDeleteKeyframes = () => {
    if (selectedKeyframes.length === 0) return;
    
    setTracks(prevTracks => 
      prevTracks.map(track => ({
        ...track,
        keyframes: track.keyframes.filter(kf => !selectedKeyframes.includes(kf.id))
      }))
    );
    
    setSelectedKeyframes([]);
  };
  
  return (
    <DraggableHUD
      title="Timeline Animation"
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      onClose={onClose}
      width={500}
      className="timeline-animation-hud"
    >
      <div className="hud-content">
        {/* Playback controls */}
        <div className="playback-controls">
          <button 
            className={`play-button ${isPlaying ? 'pause' : 'play'}`}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          
          <button 
            className="stop-button"
            onClick={() => {
              setIsPlaying(false);
              setCurrentTime(0);
            }}
          >
            ⏹
          </button>
          
          <div className="time-display">
            <span className="current-time">{currentTime.toFixed(2)}s</span>
            <span className="time-separator">/</span>
            <span className="total-time">{ANIMATION_DURATION.toFixed(1)}s</span>
          </div>
          
          <div className="speed-controls">
            <button 
              className={`speed-button ${playbackSpeed === 0.5 ? 'active' : ''}`}
              onClick={() => setPlaybackSpeed(0.5)}
            >
              0.5x
            </button>
            <button 
              className={`speed-button ${playbackSpeed === 1.0 ? 'active' : ''}`}
              onClick={() => setPlaybackSpeed(1.0)}
            >
              1x
            </button>
            <button 
              className={`speed-button ${playbackSpeed === 2.0 ? 'active' : ''}`}
              onClick={() => setPlaybackSpeed(2.0)}
            >
              2x
            </button>
          </div>
        </div>
        
        {/* Timeline ruler */}
        <div 
          className="timeline-ruler"
          ref={timelineRef}
          onClick={handleTimelineClick}
        >
          <div className="ruler-markers">
            {Array.from({ length: 11 }).map((_, i) => (
              <div key={i} className="ruler-marker">
                <div className="marker-line"></div>
                <div className="marker-label">{i}s</div>
              </div>
            ))}
          </div>
          
          <div className="current-time-marker" style={{ left: `${(currentTime / ANIMATION_DURATION) * 100}%` }}></div>
        </div>
        
        {/* Tracks */}
        <div className="tracks-container">
          {tracks.map(track => (
            <AnimationTrack
              key={track.id}
              track={track}
              currentTime={currentTime}
              selectedKeyframes={selectedKeyframes}
              onToggleExpand={handleToggleExpand}
              onToggleEnabled={handleToggleEnabled}
              onSelectKeyframe={handleSelectKeyframe}
              onKeyframeDragStart={handleKeyframeDragStart}
            />
          ))}
          
          {tracks.length === 0 && (
            <div className="no-tracks-message">
              No animation tracks available
            </div>
          )}
        </div>
        
        {/* Keyframe controls */}
        <div className="keyframe-controls">
          <button 
            className="add-keyframe-button"
            onClick={handleCreateKeyframe}
            disabled={tracks.length === 0 || !tracks.some(track => track.enabled)}
          >
            Add Keyframe
          </button>
          
          <button 
            className="delete-keyframe-button"
            onClick={handleDeleteKeyframes}
            disabled={selectedKeyframes.length === 0}
          >
            Delete Selected
          </button>
          
          <div className="selection-info">
            {selectedKeyframes.length > 0 ? `${selectedKeyframes.length} keyframe(s) selected` : 'No selection'}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .hud-content {
          padding: 10px;
          color: white;
          display: flex;
          flex-direction: column;
          gap: 10px;
          overflow: hidden;
        }
        
        .playback-controls {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 5px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .play-button, .stop-button {
          background: rgba(60, 70, 100, 0.5);
          border: none;
          color: white;
          width: 30px;
          height: 30px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .play-button:hover, .stop-button:hover {
          background: rgba(70, 80, 120, 0.7);
        }
        
        .play-button.play {
          background: rgba(40, 120, 60, 0.6);
        }
        
        .play-button.pause {
          background: rgba(120, 100, 40, 0.6);
        }
        
        .time-display {
          flex: 1;
          font-family: monospace;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .current-time {
          color: rgba(255, 255, 255, 0.9);
        }
        
        .time-separator {
          color: rgba(255, 255, 255, 0.5);
        }
        
        .total-time {
          color: rgba(255, 255, 255, 0.7);
        }
        
        .speed-controls {
          display: flex;
          gap: 2px;
        }
        
        .speed-button {
          background: rgba(50, 60, 80, 0.4);
          border: none;
          color: rgba(255, 255, 255, 0.7);
          padding: 3px 6px;
          border-radius: 3px;
          font-size: 11px;
          cursor: pointer;
        }
        
        .speed-button.active {
          background: rgba(60, 100, 180, 0.6);
          color: white;
        }
        
        .timeline-ruler {
          height: 24px;
          background: rgba(20, 25, 35, 0.5);
          position: relative;
          cursor: pointer;
        }
        
        .ruler-markers {
          display: flex;
          justify-content: space-between;
          height: 100%;
          padding: 0 1%;
        }
        
        .ruler-marker {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 1px;
        }
        
        .marker-line {
          width: 1px;
          height: 6px;
          background: rgba(255, 255, 255, 0.5);
        }
        
        .marker-label {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.7);
        }
        
        .current-time-marker {
          position: absolute;
          top: 0;
          width: 2px;
          height: 100%;
          background: rgba(255, 255, 255, 0.9);
          transform: translateX(-50%);
          z-index: 2;
        }
        
        .tracks-container {
          flex: 1;
          overflow-y: auto;
          min-height: 200px;
          max-height: 400px;
        }
        
        .no-tracks-message {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.5);
          font-style: italic;
        }
        
        .keyframe-controls {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-top: 5px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .add-keyframe-button, .delete-keyframe-button {
          background: rgba(60, 80, 120, 0.5);
          border: 1px solid rgba(100, 120, 180, 0.3);
          color: white;
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 12px;
          cursor: pointer;
        }
        
        .add-keyframe-button:hover {
          background: rgba(60, 100, 140, 0.6);
        }
        
        .delete-keyframe-button {
          background: rgba(120, 60, 60, 0.5);
          border-color: rgba(180, 100, 100, 0.3);
        }
        
        .delete-keyframe-button:hover {
          background: rgba(140, 60, 60, 0.6);
        }
        
        .add-keyframe-button:disabled, .delete-keyframe-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .selection-info {
          flex: 1;
          text-align: right;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </DraggableHUD>
  );
};

TimelineAnimationHUD.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  onPositionChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  visualParams: PropTypes.object
};

export default TimelineAnimationHUD; 