# ✅ AdminPanel LEGIT Contract — v1.1

📍 Location: src/components/layouts/AdminPanel.jsx  
🧱 Purpose: Provide administrative controls for section positioning and visibility in the UI Control Layer
🔒 Status: **LEGIT CERTIFIED**
📆 Last Updated: [Current Date]

---

## 🔐 Component Definition

The AdminPanel is a developer tool that enables:

- Visual editing of section positions
- Toggling section visibility
- Saving and resetting section configurations
- Real-time adjustment of page layout
- Management of section registry
- Direct control over content layer

## 📦 Props API

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| sections | Array | Yes | Array of section configurations |
| onSectionMove | Function | Yes | Callback for position updates |
| onToggleEditMode | Function | Yes | Toggle edit mode callback |
| isEditMode | Boolean | Yes | Whether edit mode is active |
| onSave | Function | Yes | Save configuration callback |
| onReset | Function | Yes | Reset configuration callback |
| hiddenSections | Array | No | IDs of hidden sections |
| onToggleSectionVisibility | Function | No | Toggle section visibility callback |
| onShowAllSections | Function | No | Show all sections callback |
| onHideAllSections | Function | No | Hide all sections callback |

## 🔢 Layer System Integration

AdminPanel operates within the UI Control Layer of the application's layer system:

| Layer | z-index Range | AdminPanel's Role |
|-------|---------------|---------------------|
| Content Layer | 10-50 | Controls elements in this layer |
| UI Control Layer | 60-90 | AdminPanel resides at z-80 |
| HUD Layer | 100-109 | Remains below HUDs |

As part of the UI Control Layer, AdminPanel:
- Is positioned with z-index 80
- Appears above content but below HUDs
- Includes draggable functionality to reposition
- Never interferes with critical navigation elements

## 🔄 Interaction with Other Components

### ContentLayer
- Controls ContentLayer's section positions
- Manages section visibility through `hiddenSections`
- Communicates section changes through callbacks

### SectionRegistry
- Reads section metadata from registry
- Allows editing of section positions
- Provides UI for section management

### LocalStorage
- Persists section positions
- Maintains visibility settings
- Saves user configuration

## 🔍 Visibility Management

AdminPanel now provides advanced visibility controls:

- Individual section visibility toggles
- Show all / hide all functionality
- Visual indicators for hidden sections
- Runtime section rendering optimization

## 🔒 LEGIT Compliance Status: 🟢 LEGIT

- ✅ Fully documented with prop types
- ✅ Uses proper naming conventions
- ✅ Follows UI Control Layer requirements
- ✅ Handles layout with consistent approach
- ✅ Provides complete section management
- ✅ Properly integrated with z-index system
- ✅ Follows visibility management standards

## 🧭 Usage Example

```jsx
<AdminPanel 
  sections={sections}
  onSectionMove={handleSectionPositionChange}
  onToggleEditMode={handleToggleEditMode}
  isEditMode={isEditMode}
  onSave={handleSavePositions}
  onReset={handleResetPositions}
  hiddenSections={hiddenSections}
  onToggleSectionVisibility={handleToggleSectionVisibility}
  onShowAllSections={handleShowAllSections}
  onHideAllSections={handleHideAllSections}
/>
```

## 🔑 Feature Capabilities

### Section Position Editing
- Visual position indicators
- Drag to reposition sections
- Numeric position inputs

### Configuration Management
- Save positions to localStorage
- Reset to default positions
- Export configuration

### Visibility Controls
- Toggle visibility of individual sections
- Show all sections at once
- Hide all sections at once
- Visual indicators for hidden state

### Edit Mode
- Toggle edit mode
- Visual indicators in edit mode
- Prevent accidental edits

## 🔐 Security Considerations

- Only available in development environment
- Protected by environment checks
- Cannot affect production pages
- Keyboard shortcut (Ctrl+Alt+P) for access

---

🔐 Logged under Site Rule: `LEGIT.PROTOCOL.v1` 