

## 🌙 **Moon Phase Lighting Configuration**

Based on the code analysis, here's the complete breakdown of lighting settings per phase:

### **Phase Configurations (from `useMoonLighting.js`)**

#### **🌑 New Moon (0.0 - 0.07)**
- **Sun Position**: `[0, 0, -15]` (behind moon)
- **Primary Intensity**: `0.15`
- **Ambient Intensity**: `0.05`
- **Base Light Intensity**: `0.5`
- **Glow Intensity**: `0.15`
- **Atmospheric Color**: `#1a1a2f` (cold blue-purple)

#### **🌒 Waxing Crescent (0.07 - 0.25)**
- **Sun Position**: `[12, 2, -8]` (upper right)
- **Primary Intensity**: `1.2`
- **Ambient Intensity**: `0.08`
- **Base Light Intensity**: `0.4`
- **Glow Intensity**: `0.25`
- **Atmospheric Color**: `#2f2a44` (deep indigo)

#### **🌓 First Quarter (0.25 - 0.32)**
- **Sun Position**: `[15, 0, 0]` (directly right)
- **Primary Intensity**: `1.2`
- **Ambient Intensity**: `0.08`
- **Base Light Intensity**: `0.35`
- **Glow Intensity**: `0.4`
- **Atmospheric Color**: `#4f4f80` (blue-gray)

#### **🌔 Waxing Gibbous (0.32 - 0.48)**
- **Sun Position**: `[8, 3, 8]` (front-right)
- **Primary Intensity**: `1.8`
- **Ambient Intensity**: `0.12`
- **Base Light Intensity**: `0.3`
- **Glow Intensity**: `0.65`
- **Atmospheric Color**: `#8888cc` (cosmic periwinkle)

#### **🌕 Full Moon (0.48 - 0.52)**
- **Sun Position**: `[0, 2, 15]` (directly front)
- **Primary Intensity**: `2.5` (maximum)
- **Ambient Intensity**: `0.15`
- **Base Light Intensity**: `0.25` (less needed due to strong primary)
- **Glow Intensity**: `1.0` (maximum)
- **Atmospheric Color**: `#fffbe6` (warm white-gold)
- **Special Effects**: Additional full moon glow layers

#### **🌖 Waning Gibbous (0.52 - 0.68)**
- **Sun Position**: `[-8, 3, 8]` (front-left)
- **Primary Intensity**: `1.8`
- **Ambient Intensity**: `0.12`
- **Base Light Intensity**: `0.3`
- **Glow Intensity**: `0.65`
- **Atmospheric Color**: `#dddde2` (cool pale gray)

#### **🌗 Last Quarter (0.68 - 0.75)**
- **Sun Position**: `[-15, 0, 0]` (directly left)
- **Primary Intensity**: `1.2`
- **Ambient Intensity**: `0.08`
- **Base Light Intensity**: `0.35`
- **Glow Intensity**: `0.4`
- **Atmospheric Color**: `#a0a0c0` (soft dusk gray)

#### **🌘 Waning Crescent (0.75 - 0.93)**
- **Sun Position**: `[-12, 2, -8]` (upper left)
- **Primary Intensity**: `1.2`
- **Ambient Intensity**: `0.08`
- **Base Light Intensity**: `0.45`
- **Glow Intensity**: `0.25`
- **Atmospheric Color**: `#3a324f` (twilight violet)

### **Universal Lighting System (Applied to All Phases)**

1. **Base Ambient**: `0.18` intensity, `#556699` color
2. **Core Self-Illumination**: `0.4` intensity at center
3. **Enhanced Base Illumination**: Variable by phase
4. **Rear Base Illumination**: 60% of base intensity
5. **Side Illumination**: 70% of base intensity (both sides)
6. **Top/Bottom Lighting**: 50% of base intensity
7. **Additional Ambient**: `0.08` intensity, `#444466` color
8. **Primary Directional Light**: 85% of phase intensity
9. **Atmospheric Color Layer**: 50% of phase intensity
10. **Volumetric Glow System**: 4 layers with varying distances and decay

### **Special Effects**

#### **Full Moon Enhancements**
- Extra glow at `[0, 0, 10]` with `1.0` intensity
- Soft halo at `[0, 0, 15]` with `0.6` intensity
- Wide atmospheric glow at `[0, 0, -10]` with `0.4` intensity
- Mega halo at `[0, 0, 40]` with `0.5` intensity

#### **Anomaly Mode Multipliers**
- **Supermoon**: All intensities multiplied by `2.5x` glow boost
- **Eclipse**: Special shadow mask and rim lighting
- **Sci-Fi**: Grid overlay with pulsing effects

Would you like me to help you adjust any specific phase settings or create a more detailed breakdown of any particular aspect?
