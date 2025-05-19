/**
 * @metadata
 * @component tailwind.config.js addition
 * @description Custom Tailwind CSS configuration for glow effects and animations
 * @legit true
 * @version 1.0.0
 * @author CuriousLabs
 */

// Add this to your tailwind.config.js
module.exports = {
  // ... your existing config
  theme: {
    extend: {
      // Add custom box shadow for glow effects
      boxShadow: {
        'glow-lime': '0 0 15px 2px rgba(132, 204, 22, 0.5)',
        'glow-blue': '0 0 15px 2px rgba(37, 99, 235, 0.5)',
        'glow-purple': '0 0 15px 2px rgba(126, 34, 206, 0.5)',
      },
      // Add custom keyframes for animations
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        ping: {
          '75%, 100%': { transform: 'scale(2)', opacity: 0 },
        },
      },
      // Add custom animation definitions
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  // ... rest of your config
};