// weatherCard.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import moment from 'moment';
import styles from './weatherCard.module.css';
import { weatherCodeMapping } from './weatherCodeMapping';
import { 
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer 
} from 'recharts';

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

interface HourlyData {
  time: string[];
  temperature_2m: number[];
  // Include additional hourly fields if needed.
}

interface WeatherCardProps {
  forecastData: RawDailyForecast;
  hourlyData: HourlyData;
}

// Helper: returns an icon URL based on the weather code.
const getIconForWeatherCode = (code: number): string => {
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
  hourlyData,
}) => {
  const dayName = moment(time).format('dddd');
  const fullDate = moment(time).format('LL');
  const iconUrl = getIconForWeatherCode(weathercode);
  const shortForecast = weatherCodeMapping[weathercode] || 'Unknown weather condition';
  // Use 12-hour time format with AM/PM for sunrise and sunset
  const detailedForecast = `Max: ${temperature_2m_max}°F, Min: ${temperature_2m_min}°F, 
    Sunrise: ${moment(sunrise).format('h:mm A')}, Sunset: ${moment(sunset).format('h:mm A')}`;

  // Filter the hourly data to only include records for the selected day.
  const selectedDate = moment(time).format('YYYY-MM-DD');
  const hourlyForSelected = hourlyData.time.reduce((acc: any[], hourTime: string, index: number) => {
    if (moment(hourTime).format('YYYY-MM-DD') === selectedDate) {
      acc.push({
        time: moment(hourTime).format('h:mm A'), // 12-hour format with AM/PM
        temperature: hourlyData.temperature_2m[index],
      });
    }
    return acc;
  }, []);

  return (
    <Box className={styles.weatherCard}>
      <img src={iconUrl} alt={shortForecast} className={styles.icon} />
      <Typography variant="h6">
        {dayName} — {fullDate}
      </Typography>
      <Typography variant="body1">
        Temperature: {temperature_2m_max}°F (max) / {temperature_2m_min}°F (min)
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

      {hourlyForSelected.length > 0 && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            Hourly Temperature
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyForSelected}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Box>
  );
};

export default WeatherCard;
