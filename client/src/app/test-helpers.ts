export function createPosition(): Position {
  return {
    timestamp: 1,
    coords: {
      accuracy: 0,
      altitude: 0,
      altitudeAccuracy: 0,
      heading: 0,
      latitude: 1,
      longitude: 2,
      speed: 3,
    },
  };
}
