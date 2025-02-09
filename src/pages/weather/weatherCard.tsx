import React from "react";
import { WeatherPeriod } from "./getWeather";
import { Box, Typography } from "@mui/material";
import styles from "./weatherCard.module.css"

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

  const datetimeString = "2025-02-13T06:00:00-08:00";

// 1. Create a Date object:
const date = new Date(datetimeString);

// 2. Get the date in YYYY-MM-DD format:
const formattedDate = date.toISOString().slice(0, 10); // Extracts the date part

// Or, for more control over formatting:
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
const day = String(date.getDate()).padStart(2, '0');
const formattedDateCustom = `${year}-${month}-${day}`;


// 3. Get the day of the week:
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayOfWeek = daysOfWeek[date.getDay()]; // getDay() returns 0 for Sunday, 1 for Monday, etc.

// Or, for a shorter day name:
const shortDayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' }); // "Thu"

console.log("Formatted Date (ISO):", formattedDate);
console.log("Formatted Date (Custom):", formattedDateCustom);
console.log("Day of the Week:", dayOfWeek);
console.log("Short Day of the Week:", shortDayOfWeek);

//If you want to use moment.js or date-fns you could do the following:

// Using moment.js (install: npm install moment)
// import moment from 'moment';
// const momentDate = moment(datetimeString);
// const formattedMomentDate = momentDate.format('YYYY-MM-DD');
// const momentDayOfWeek = momentDate.format('dddd');

// console.log("Formatted Date (Moment.js):", formattedMomentDate);
// console.log("Day of the Week (Moment.js):", momentDayOfWeek);


// Using date-fns (install: npm install date-fns)
// import { format, parseISO } from 'date-fns';
// const parsedDate = parseISO(datetimeString);
// const formattedDateFns = format(parsedDate, 'yyyy-MM-dd');
// const dayOfWeekFns = format(parsedDate, 'EEEE'); // Full day name

// console.log("Formatted Date (date-fns):", formattedDateFns);
// console.log("Day of the Week (date-fns):", dayOfWeekFns);

  return (
    <Box className={styles.weatherCard}>
      <Typography variant="h3">Weather Forecast</Typography>
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