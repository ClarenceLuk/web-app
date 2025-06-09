interface EarthquakeData {
  type: string;
  features: Array<{
    type: string;
    properties: {
      mag: number;
      place: string;
      time: number;
      updated: number;
      url: string;
      detail: string;
      felt: number | null;
      cdi: number | null;
      mmi: number | null;
      alert: string | null;
      status: string;
      tsunami: number;
      sig: number;
      title: string;
    };
    geometry: {
      type: string;
      coordinates: [number, number, number];
    };
    id: string;
  }>;
  metadata: {
    generated: number;
    url: string;
    title: string;
    status: number;
    api: string;
    count: number;
  };
}

interface EarthquakeQueryParams {
  starttime?: string;
  endtime?: string;
  minmagnitude?: number;
  maxmagnitude?: number;
  latitude?: number;
  longitude?: number;
  maxradiuskm?: number;
  orderby?: 'time' | 'magnitude';
  limit?: number;
}

export interface Epicenter {
  latitude: number;
  longitude: number;
  depth: number;
  place: string;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

const BASE_URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query';

export const fetchEarthquakes = async (params: EarthquakeQueryParams = {}): Promise<EarthquakeData> => {
  const queryParams = new URLSearchParams({
    format: 'geojson',
    ...Object.fromEntries(
      Object.entries(params).map(([key, value]) => [key, String(value)])
    ),
  });

  const response = await fetch(`${BASE_URL}?${queryParams.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch earthquake data: ${response.statusText}`);
  }

  return response.json();
};

export const getEpicenter = (feature: EarthquakeData['features'][0]): Epicenter => {
  const [longitude, latitude, depth] = feature.geometry.coordinates;
  return {
    latitude,
    longitude,
    depth,
    place: feature.properties.place
  };
};

export const getEpicenters = (data: EarthquakeData): Epicenter[] => {
  return data.features.map(getEpicenter);
};

export const getCoordinatesFromZipCode = async (zipCode: string): Promise<Coordinates> => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?postalcode=${zipCode}&format=json&limit=1`,
    {
      headers: {
        'Accept-Language': 'en',
        'User-Agent': 'EarthquakeApp/1.0'
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch coordinates');
  }

  const data = await response.json();
  
  if (!data || data.length === 0) {
    throw new Error('Zip code not found');
  }

  return {
    latitude: parseFloat(data[0].lat),
    longitude: parseFloat(data[0].lon)
  };
};

// Example usage:
// const earthquakes = await fetchEarthquakes({
//   starttime: '2024-01-01',
//   endtime: '2024-03-20',
//   minmagnitude: 4.5,
//   limit: 10,
//   orderby: 'time'
// });
// const epicenters = getEpicenters(earthquakes);
// epicenters.forEach(epicenter => {
//   console.log(`Earthquake at ${epicenter.place}`);
//   console.log(`Latitude: ${epicenter.latitude}, Longitude: ${epicenter.longitude}`);
//   console.log(`Depth: ${epicenter.depth} km`);
// }); 