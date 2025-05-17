/**
 * Canvas optimization utilities
 */

/**
 * Optimizes a canvas and its context for performance
 * @param {HTMLCanvasElement} canvas - The canvas element to optimize
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
 */
export function optimizeCanvas(canvas, ctx) {
  if (!canvas || !ctx) return;

  // Set up high DPI canvas
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  // Optimize context
  ctx.imageSmoothingEnabled = false;
  ctx.imageSmoothingQuality = 'low';

  // Set up resize observer
  const resizeObserver = new ResizeObserver(entries => {
    const entry = entries[0];
    if (!entry) return;

    canvas.width = entry.contentRect.width * dpr;
    canvas.height = entry.contentRect.height * dpr;
    ctx.scale(dpr, dpr);
  });

  resizeObserver.observe(canvas);

  // Return cleanup function
  return () => resizeObserver.disconnect();
}

/**
 * Clears a canvas efficiently
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
 */
export function clearCanvas(ctx) {
  if (!ctx || !ctx.canvas) return;
  
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

/**
 * Sets up a canvas for optimal performance
 * @param {HTMLCanvasElement} canvas - The canvas element
 * @returns {CanvasRenderingContext2D} The optimized context
 */
export function setupCanvas(canvas) {
  if (!canvas) return null;

  const ctx = canvas.getContext('2d', {
    alpha: true,
    desynchronized: true,
    willReadFrequently: false
  });

  if (!ctx) return null;

  optimizeCanvas(canvas, ctx);
  return ctx;
} 