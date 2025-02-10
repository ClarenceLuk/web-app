import React from "react";
import { WeatherPeriod } from "./getWeather";
import { Box, Typography } from "@mui/material";
import styles from "./weatherCard.module.css";
// import moment from 'moment';

interface WeatherCardProps {
  props: WeatherPeriod
}

const WeatherCard: React.FC<WeatherCardProps> = ({props}) => {
//   number,
//   name,
//   startTime,
//   endTime,
//   isDaytime,
//   temperature,
//   temperatureUnit,
//   temperatureTrend,
//   probabilityOfPrecipitation,
//   windSpeed,
//   windDirection,
//   icon,
//   shortForecast,
//   detailedForecast,
// }) => {
//   console.log(startTime)

// const momentDate = moment(startTime);
// const formattedMomentDate = momentDate.format('YYYY-MM-DD');
// const momentDayOfWeek = momentDate.format('dddd');
// const hour = momentDate.hour();

// console.log("Formatted Date (Moment.js):", formattedMomentDate);
// console.log("Day of the Week (Moment.js):", momentDayOfWeek);
// const momentDayOrNight = momentDate.format('A'); // 'AM' or 'PM'

// console.log("Day or Night (Moment.js):", momentDayOrNight);
// const dayOrNight2 = momentDayOrNight === 'AM' ? (hour < 6 ? 'Night' : 'Day') : (hour < 18 ? 'Day' : 'Night')
// console.log(dayOrNight2)

console.log(props)


  return (
    <Box className={styles.weatherCard}>
      {/* <Typography variant="h3">Weather Forecast for {props.momentDayOfWeek} {dayOrNight2}</Typography> */}
      <Box key={props.number}>
        <img src={props.icon} alt={props.detailedForecast}/>
        <Typography variant="h6">
          {props.name}: {props.temperature} {props.temperatureUnit}
        </Typography>
        <Typography>
          Wind {props.windSpeed} {props.windDirection}
        </Typography>
        <Typography variant="h6">
          {props.shortForecast}
        </Typography>
      </Box>
    </Box>
  );
};

export default WeatherCard;