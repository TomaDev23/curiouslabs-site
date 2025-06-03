// Fallback for three/webgpu module
// This provides empty exports to prevent build errors when three-globe tries to import WebGPU features

export class StorageInstancedBufferAttribute {
  constructor() {
    // Empty fallback implementation
  }
}

export class WebGPURenderer {
  constructor() {
    // Empty fallback implementation
  }
}

// Export empty object as default
export default {}; 