/**
 * @utility luneBridge
 * @description Simplified lunar calculations for UI display purposes
 * @version 1.0.0
 * @author CuriousLabs
 */

import lune from 'lune';

// Get the current lunar phase and data
export const getCurrentLunarData = () => {
  const moonData = lune.phase(new Date());
  
  return {
    phase: moonData.phase,
    illumination: Math.round(moonData.illuminated * 100),
    age: Math.floor(moonData.age),
    phaseName: getPhaseName(moonData.phase)
  };
};

// Get distance to Earth (in km) - this is an approximation
export const getDistanceToEarth = () => {
  // The Moon's distance varies between 356,500 km (perigee) and 406,700 km (apogee)
  // We'll use a simple sinusoidal approximation based on the current date
  const now = new Date();
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  
  // Simplified calculation - not astronomically accurate
  const baseDistance = 384400; // Average distance in km
  const variation = 21000; // Approximate variation range
  const distanceKm = Math.round(baseDistance + variation * Math.sin(dayOfYear / 27.3 * Math.PI * 2));
  
  return distanceKm;
};

// Get tide influence level based on moon phase
export const getTideInfluence = () => {
  const { phase } = getCurrentLunarData();
  
  // Full and new moons create stronger tides
  if (phase < 0.05 || (phase > 0.45 && phase < 0.55) || phase > 0.95) {
    return "High";
  }
  // First and last quarters create weaker tides
  else if ((phase > 0.20 && phase < 0.30) || (phase > 0.70 && phase < 0.80)) {
    return "Low";
  }
  // Other phases create moderate tides
  else {
    return "Neutral";
  }
};

// Get next special lunar event (simplified for UI purposes)
export const getNextLunarEvents = () => {
  const today = new Date();
  
  // These are simulated dates for UI presentation
  return {
    supermoon: {
      date: new Date(today.getFullYear(), today.getMonth() + 2, 21),
      daysFromNow: 0, // Will be calculated
      location: "Worldwide"
    },
    eclipse: {
      date: new Date(today.getFullYear(), today.getMonth() + 3, 7),
      daysFromNow: 0, // Will be calculated
      location: "Asia"
    }
  };
};

// Update the days from now for events
export const updateEventDays = (events) => {
  const today = new Date();
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  
  const updatedEvents = {...events};
  
  if (updatedEvents.supermoon) {
    updatedEvents.supermoon.daysFromNow = Math.round(
      Math.abs((updatedEvents.supermoon.date - today) / oneDay)
    );
  }
  
  if (updatedEvents.eclipse) {
    updatedEvents.eclipse.daysFromNow = Math.round(
      Math.abs((updatedEvents.eclipse.date - today) / oneDay)
    );
  }
  
  return updatedEvents;
};

// Get current phase name based on phase value
const getPhaseName = (phase) => {
  if (phase < 0.025 || phase >= 0.975) return "New Moon";
  if (phase < 0.25) return "Waxing Crescent";
  if (phase < 0.275) return "First Quarter";
  if (phase < 0.475) return "Waxing Gibbous";
  if (phase < 0.525) return "Full Moon";
  if (phase < 0.725) return "Waning Gibbous";
  if (phase < 0.775) return "Last Quarter";
  if (phase < 0.975) return "Waning Crescent";
  return "New Moon";
}; 