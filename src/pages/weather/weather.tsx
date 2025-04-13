// Weather.tsx
import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import WeatherCard from './weatherCard';
import getOpenMeteoWeather from './getOpenMeteoWeather';
import { Calendar } from './calendar';

interface Coordinates {
  latitude: number;
  longitude: number;
}

const handleLocation = (): Promise<Coordinates> => {
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
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedForecastIndex, setSelectedForecastIndex] = useState<number | null>(null);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      let location = userLocation;
      if (!location) {
        location = await handleLocation();
        setUserLocation(location);
      }
      if (location) {
        // getOpenMeteoWeather returns the merged weather data.
        const weather = await getOpenMeteoWeather({
          latitude: location.latitude,
          longitude: location.longitude,
        });
        setWeatherData(weather);
        // Reset selection when new data arrives.
        setSelectedForecastIndex(null);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Build an array of daily forecast objects from the merged API response.
  const dailyForecasts =
    weatherData && weatherData.daily
      ? weatherData.daily.time.map((time: string, index: number) => ({
          index,
          time,
          temperature_2m_max: weatherData.daily.temperature_2m_max[index],
          temperature_2m_min: weatherData.daily.temperature_2m_min[index],
          weathercode: weatherData.daily.weathercode[index],
          precipitation_probability_max: weatherData.daily.precipitation_probability_max
            ? weatherData.daily.precipitation_probability_max[index]
            : 0,
          windspeed_10m_max: weatherData.daily.windspeed_10m_max[index],
          sunrise: weatherData.daily.sunrise[index],
          sunset: weatherData.daily.sunset[index],
        }))
      : [];

  return (
    <Box sx={{ padding: 2 }}>
      <Button variant="contained" onClick={fetchWeatherData}>
        Get Weather
      </Button>
      {loading && <Typography variant="h6">Loading weather data...</Typography>}
      {error && <Typography variant="h6" color="error">{error}</Typography>}

      {dailyForecasts.length > 0 && (
        <Box>
          {/* Display detailed forecast for the selected date (with hourly graph) */}
          {selectedForecastIndex !== null && (
            <Box sx={{ marginTop: 4 }}>
              <WeatherCard 
                forecastData={dailyForecasts[selectedForecastIndex]} 
                hourlyData={weatherData.hourly} 
              />
            </Box>
          )}

          {/* Date selector header and calendar */}
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Select a Date
            </Typography>
            <Calendar
              dailyForecasts={dailyForecasts}
              selectedForecastIndex={selectedForecastIndex}
              setSelectedForecastIndex={setSelectedForecastIndex}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Weather;
