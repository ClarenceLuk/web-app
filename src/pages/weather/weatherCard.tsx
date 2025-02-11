import React, { useState } from 'react'
import { WeatherPeriod } from './getWeather'
import { Box, Button, Typography } from '@mui/material'
import styles from './weatherCard.module.css'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface WeatherCardProps {
  weatherData: WeatherPeriod
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  weatherData: {
    number,
    name,
    startTime,
    endTime,
    // isDaytime,
    temperature,
    temperatureUnit,
    // temperatureTrend,
    probabilityOfPrecipitation: { value: precipitationPercent },
    windSpeed,
    windDirection,
    icon,
    shortForecast,
    detailedForecast,
  },
}) => {
  const [openDetail, setOpenDetail] = useState<boolean>(false)

  const handleOpenDetail = () => {
    setOpenDetail(!openDetail)
  }

  return (
    <Box className={styles.weatherCard}>
      {/* <Typography variant="h3">Weather Forecast for {props.momentDayOfWeek} {dayOrNight2}</Typography> */}
      <Box key={number}>
        <img src={icon} alt={detailedForecast} />
        <Typography variant="h6">
          {name}: {temperature} {temperatureUnit}
        </Typography>
        <Typography>
          Wind {windSpeed} {windDirection}
        </Typography>
        <Typography>
          Time: {moment(startTime).calendar()} to {moment(endTime).calendar()}
        </Typography>
        <Typography>
          Chance to rain: {precipitationPercent ? precipitationPercent : 0}%
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
  )
}

export default WeatherCard
