// weatherCard.tsx
import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import styles from './weatherCard.module.css';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

// Import the mapping from weather code to description.
import { weatherCodeMapping } from './getOpenMeteoWeather';

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

// Helper: returns an icon URL based on the weather code.
const getIconForWeatherCode = (code: number): string => {
  // Adjust the path as needed
  return `/icons/${code}.png`;
};

const WeatherCard: React.FC<WeatherCardProps> = ({
  forecastData: {
    index,
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
  const [openDetail, setOpenDetail] = useState<boolean>(false);

  const handleOpenDetail = () => {
    setOpenDetail(!openDetail);
  };

  const dayName = moment(time).format('dddd'); // e.g. "Monday"
  const icon = getIconForWeatherCode(weathercode);
  const shortForecast = weatherCodeMapping[weathercode] || 'Unknown weather condition';
  const detailedForecast = `Max: ${temperature_2m_max}°C, Min: ${temperature_2m_min}°C, Sunrise: ${moment(sunrise).format('HH:mm')}, Sunset: ${moment(sunset).format('HH:mm')}`;

  return (
    <Box className={styles.weatherCard}>
      <Box key={index}>
        <img src={icon} alt={shortForecast} />
        <Typography variant="h6">
          {dayName}: {temperature_2m_max}°C
        </Typography>
        <Typography>
          Wind: {windspeed_10m_max} km/h
        </Typography>
        <Typography>
          Date: {moment(time).format('LL')}
        </Typography>
        <Typography>
          Chance to rain: {precipitation_probability_max || 0}%
        </Typography>
        <Box className={styles.detailedForecastBox}>
          <Button
            className={styles.detailedForecastButton}
            sx={{ minWidth: 20, maxWidth: 20, height: 20, fontSize: '1rem' }}
            onClick={handleOpenDetail}
          >
            <FontAwesomeIcon
              icon={openDetail ? faAngleDown : (faAngleRight as IconProp)}
            />
          </Button>
          {openDetail ? (
            <Typography className={styles.detailedForecast} variant="h6">
              {detailedForecast}
            </Typography>
          ) : (
            <Typography variant="h6">{shortForecast}</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default WeatherCard;
