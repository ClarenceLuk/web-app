import React, { useEffect, useState } from 'react';
import { fetchEarthquakes, getEpicenters, type Epicenter, getCoordinatesFromZipCode } from './service';

type DistanceUnit = 'km' | 'mi';

const KM_TO_MI = 0.621371;
const MI_TO_KM = 1.60934;

const EarthquakeQuery: React.FC = () => {
  const [epicenters, setEpicenters] = useState<Epicenter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zipCode, setZipCode] = useState<string>('');
  const [radius, setRadius] = useState<string>('100');
  const [unit, setUnit] = useState<DistanceUnit>('km');
  const [searchParams, setSearchParams] = useState({
    latitude: 0,
    longitude: 0,
    radius: 100
  });

  const convertDistance = (value: number, fromUnit: DistanceUnit, toUnit: DistanceUnit): number => {
    if (fromUnit === toUnit) return value;
    return fromUnit === 'km' ? value * KM_TO_MI : value * MI_TO_KM;
  };

  const handleUnitChange = (newUnit: DistanceUnit) => {
    if (newUnit === unit) return;
    
    // Convert the current radius value to the new unit
    const currentValue = parseFloat(radius);
    if (!isNaN(currentValue)) {
      const convertedValue = convertDistance(currentValue, unit, newUnit);
      setRadius(convertedValue.toFixed(1));
    }
    setUnit(newUnit);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const rad = parseFloat(radius);

    if (!zipCode.trim()) {
      setError('Please enter a zip code');
      return;
    }

    if (isNaN(rad) || rad <= 0) {
      setError('Please enter a valid radius greater than 0');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Convert radius to kilometers for the API call
      const radiusInKm = unit === 'mi' ? rad * MI_TO_KM : rad;
      
      // Get coordinates from zip code
      const coordinates = await getCoordinatesFromZipCode(zipCode);
      setSearchParams({ 
        latitude: coordinates.latitude, 
        longitude: coordinates.longitude, 
        radius: radiusInKm 
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to find location');
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { latitude, longitude, radius } = searchParams;
        
        const data = await fetchEarthquakes({
          starttime: '2024-03-01',
          endtime: '2024-03-20',
          minmagnitude: 4.5,
          latitude,
          longitude,
          maxradiuskm: radius,
          limit: 10,
          orderby: 'time'
        });
        setEpicenters(getEpicenters(data));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (searchParams.latitude !== 0 || searchParams.longitude !== 0) {
      fetchData();
    }
  }, [searchParams]);

  return (
    <div>
      <h2>Recent Significant Earthquakes</h2>
      
      <form onSubmit={handleSearch} style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'grid', gap: '1rem', maxWidth: '400px' }}>
          <div>
            <label htmlFor="zipCode">Zip Code:</label>
            <input
              id="zipCode"
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="e.g., 10001"
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>
          
          <div>
            <label htmlFor="radius">Radius:</label>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input
                id="radius"
                type="number"
                min="1"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                placeholder="e.g., 100"
                style={{ width: '100%', padding: '0.5rem' }}
              />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => handleUnitChange('km')}
                  style={{
                    padding: '0.5rem',
                    backgroundColor: unit === 'km' ? '#007bff' : '#e9ecef',
                    color: unit === 'km' ? 'white' : 'black',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  km
                </button>
                <button
                  type="button"
                  onClick={() => handleUnitChange('mi')}
                  style={{
                    padding: '0.5rem',
                    backgroundColor: unit === 'mi' ? '#007bff' : '#e9ecef',
                    color: unit === 'mi' ? 'white' : 'black',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  mi
                </button>
              </div>
            </div>
          </div>
          
          <button 
            type="submit"
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Search
          </button>
        </div>
      </form>

      {error && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {loading ? (
        <div>Loading earthquake data...</div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {epicenters.map((epicenter, index) => (
            <div key={index} style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
              <h3>Location: {epicenter.place}</h3>
              <p>Latitude: {epicenter.latitude.toFixed(4)}°</p>
              <p>Longitude: {epicenter.longitude.toFixed(4)}°</p>
              <p>Depth: {unit === 'mi' 
                ? `${(epicenter.depth * KM_TO_MI).toFixed(1)} mi` 
                : `${epicenter.depth.toFixed(1)} km`}</p>
            </div>
          ))}
          {epicenters.length === 0 && !error && (
            <div>No earthquakes found in the specified area and time range.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default EarthquakeQuery;
