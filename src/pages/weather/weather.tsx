import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import WeatherCard from './weatherCard';
import getOpenMeteoWeather from './getOpenMeteoWeather';
import { WeatherForecast, WeatherPeriod } from './getWeather';

interface Coordinates {
  latitude: number;
  longitude: number;
}

const handleLocation = (): Promise<Coordinates | null> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
};

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherForecast | null>(null);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Get user's location if not already set
      let location = userLocation;
      if (!location) {
        location = await handleLocation();
        setUserLocation(location);
      }

      // Fetch the weather data using the fetched location
      if (location) {
        const weather = await getOpenMeteoWeather({
          latitude: location.latitude,
          longitude: location.longitude,
        });
        setWeatherData(weather);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  console.log('Weather Data:', weatherData);

  return (
    <Box>
      <Button variant="contained" onClick={fetchWeatherData}>
        Get Weather
      </Button>
      {loading && (
        <Typography variant="h6">Loading weather data...</Typography>
      )}
      {error && <Typography variant="h6" color="error">{error}</Typography>}
      {/* {weatherData &&
        weatherData.properties.periods.map((period: WeatherPeriod, index: number) => (
          <WeatherCard key={index} weatherData={period} />
        ))} */}
    </Box>
  );
};

export default Weather;
