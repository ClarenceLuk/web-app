import React from "react";
import { WeatherPeriod } from "./getWeather";
import { Box, Typography } from "@mui/material";
import styles from "./weatherCard.module.css";
import moment from 'moment';

interface WeatherCardProps extends WeatherPeriod {}

const WeatherCard: React.FC<WeatherCardProps> = ({
  number,
  name,
  startTime,
  endTime,
  isDaytime,
  temperature,
  temperatureUnit,
  temperatureTrend,
  probabilityOfPrecipitation,
  windSpeed,
  windDirection,
  icon,
  shortForecast,
  detailedForecast,
}) => {
  console.log(startTime)

const momentDate = moment(startTime);
const formattedMomentDate = momentDate.format('YYYY-MM-DD');
const momentDayOfWeek = momentDate.format('dddd');

console.log("Formatted Date (Moment.js):", formattedMomentDate);
console.log("Day of the Week (Moment.js):", momentDayOfWeek);

  return (
    <Box className={styles.weatherCard}>
      <Typography variant="h3">Weather Forecast for {momentDayOfWeek}</Typography>
      <Box key={number}>
        <img src={icon} alt={detailedForecast}/>
        <Typography variant="h6">
          {name}: {temperature} {temperatureUnit} -{' '}
          {shortForecast}
        </Typography>
      </Box>
    </Box>
  );
};

export default WeatherCard;