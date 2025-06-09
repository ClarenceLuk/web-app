interface EarthquakeProperties {
  magnitude: number;
  magnitudeType: string;
  place: string;
  time: string;
  depth: number;
  latitude: number;
  longitude: number;
  horizontalUncertainty: number;
  depthUncertainty: number;
  magnitudeUncertainty: number;
  source: string;
  status: string;
}

export interface EarthquakeFeature {
  id: string;
  properties: EarthquakeProperties;
}

interface EarthquakeResponse {
  features: EarthquakeFeature[];
  metadata: {
    title: string;
    status: number;
    count: number;
  };
}

const USGS_API_BASE_URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query';

export const fetchEarthquakes = async (
  start: string,
  end: string,
  latitude?: number,
  longitude?: number,
  radius?: number,
  minMagnitude?: number,
  maxMagnitude?: number
): Promise<EarthquakeResponse> => {
  const params = new URLSearchParams({
    format: 'xml',
    starttime: start,
    endtime: end,
  });

  if (typeof minMagnitude === 'number') {
    params.set('minmagnitude', minMagnitude.toString());
  }

  if (typeof maxMagnitude === 'number') {
    params.set('maxmagnitude', maxMagnitude.toString());
  }

  if (
    typeof latitude === 'number' &&
    typeof longitude === 'number' &&
    typeof radius === 'number'
  ) {
    params.set('latitude', latitude.toString());
    params.set('longitude', longitude.toString());
    params.set('maxradiuskm', radius.toString());
  }

  const url = `${USGS_API_BASE_URL}?${params.toString()}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const xmlText = await response.text();
    
    // Parse XML response
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    const events = xmlDoc.getElementsByTagName('event');
    
    const features: EarthquakeFeature[] = Array.from(events).map((event) => {
      const id = event.getAttribute('publicID') || '';
      const magnitude = parseFloat(event.querySelector('magnitude value')?.textContent || '0');
      const magnitudeType = event.querySelector('magnitude type')?.textContent || '';
      const place = event.querySelector('description text')?.textContent || '';
      const time = event.querySelector('origin time value')?.textContent || '';
      const depth = parseFloat(event.querySelector('origin depth value')?.textContent || '0');
      const latitude = parseFloat(event.querySelector('origin latitude value')?.textContent || '0');
      const longitude = parseFloat(event.querySelector('origin longitude value')?.textContent || '0');
      const horizontalUncertainty = parseFloat(event.querySelector('origin latitude uncertainty')?.textContent || '0');
      const depthUncertainty = parseFloat(event.querySelector('origin depth uncertainty')?.textContent || '0');
      const magnitudeUncertainty = parseFloat(event.querySelector('magnitude uncertainty')?.textContent || '0');
      const source = event.querySelector('origin source')?.textContent || '';
      const status = event.querySelector('origin evaluationStatus')?.textContent || '';

      return {
        id,
        properties: {
          magnitude,
          magnitudeType,
          place,
          time,
          depth,
          latitude,
          longitude,
          horizontalUncertainty,
          depthUncertainty,
          magnitudeUncertainty,
          source,
          status,
        },
      };
    });

    return {
      features,
      metadata: {
        title: 'USGS Earthquake Data',
        status: response.status,
        count: features.length,
      },
    };
  } catch (error) {
    console.error('Error fetching earthquake data:', error);
    throw error;
  }
};
