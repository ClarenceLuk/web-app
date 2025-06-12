export interface EarthquakeFeature {
  id: string;
  properties: {
    magnitude: number;
    place: string;
    time: number;
    depth: number;
  };
} 