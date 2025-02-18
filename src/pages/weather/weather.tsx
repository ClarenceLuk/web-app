import React, { useEffect, useState } from 'react'
import getWeather, { WeatherForecast, WeatherPeriod } from './getWeather'
import { Box, Typography } from '@mui/material'
import WeatherCard from './weatherCard'

interface Coordinates {
  latitude: number
  longitude: number
}

const handleLocation = (): Promise<Coordinates | null> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        (error) => {
          return error
        }
      )
    } else {
      reject(new Error('Geolocation is not supported by this browser.'))
    }
  })
}

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherForecast | null>(null)
  const [loading, setLoading] = useState(false)
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null)

  useEffect(() => {
    const handleLocationWeather = async () => {
      setLoading(true)
      try {
        if (!userLocation) {
          const location = await handleLocation()
          setUserLocation(location)
        }
        if (userLocation) {
          const weather = await getWeather({
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          })
          setWeatherData(weather)
        }
      } catch (error) {
        return error
      } finally {
        setLoading(false)
      }
    }
    
    handleLocationWeather()
  }, [userLocation])


  return (
    <Box>
      {loading && (
        <Typography variant="h6">Loading weather data...</Typography>
      )}
      {weatherData &&
        weatherData.properties.periods.map(
          (period: WeatherPeriod, index: number) => (
            <WeatherCard key={index} weatherData={period} />
          )
        )}
    </Box>
  )
}

export default Weather
