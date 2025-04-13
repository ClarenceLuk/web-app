// weatherCard.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from './weatherCard.module.css';
import moment from 'moment';
import { weatherCodeMapping } from './weatherCodeMapping';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

// Define the expected shape of the raw daily forecast data.
interface RawDailyForecast {
  index: number;
  time: string;
  temperature_2m_max: number;
  temperature_2m_min: number;
  weathercode: number;
  precipitation_probability_max: number;
  windspeed_10m_max: number;
  sunrise: string;
  sunset: string;
}

interface WeatherCardProps {
  forecastData: RawDailyForecast;
}

// Helper: returns an icon URL or FontAwesome icon based on the weather code.
const getIconForWeatherCode = (code: number): string => {
  // Example: return an image path based on the code.
  return `/icons/${code}.png`;
};

const WeatherCard: React.FC<WeatherCardProps> = ({
  forecastData: {
    time,
    temperature_2m_max,
    temperature_2m_min,
    weathercode,
    precipitation_probability_max,
    windspeed_10m_max,
    sunrise,
    sunset,
  },
}) => {
  const dayName = moment(time).format('dddd'); // e.g. "Monday"
  const fullDate = moment(time).format('LL');
  const iconUrl = getIconForWeatherCode(weathercode);
  const shortForecast = weatherCodeMapping[weathercode] || 'Unknown weather condition';
  const detailedForecast = `Max: ${temperature_2m_max}°C, Min: ${temperature_2m_min}°C, 
    Sunrise: ${moment(sunrise).format('HH:mm')}, Sunset: ${moment(sunset).format('HH:mm')}`;

  return (
    <Box className={styles.weatherCard}>
      <img src={iconUrl} alt={shortForecast} className={styles.icon} />
      <Typography variant="h6">
        {dayName} — {fullDate}
      </Typography>
      <Typography variant="body1">
        Temperature: {temperature_2m_max}°C (max) / {temperature_2m_min}°C (min)
      </Typography>
      <Typography variant="body1">
        Wind: {windspeed_10m_max} km/h
      </Typography>
      <Typography variant="body1">
        Chance to rain: {precipitation_probability_max || 0}%
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 1 }}>
        {detailedForecast}
      </Typography>
    </Box>
  );
};

export default WeatherCard;
