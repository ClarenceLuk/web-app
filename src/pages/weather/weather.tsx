import React, { useEffect, useState } from 'react'
import getWeather, { WeatherForecast, WeatherPeriod } from './getWeather'
import { Box, Typography } from '@mui/material'
import WeatherCard from './weatherCard'

interface Coordinates {
  latitude: number
  longitude: number
}

const getCoordinatesByZip = async (
  zipCode: string
): Promise<Coordinates | null> => {
  const url = `https://nominatim.openstreetmap.org/search?postalcode=${zipCode}&format=json&countrycodes=US`

  try {
    const response = await fetch(url)
    const data = await response.json()

    if (data.length === 0) {
      throw new Error('No location found for the provided ZIP code.')
    }

    const location = data[0]
    const { lat, lon } = location

    return { latitude: parseFloat(lat), longitude: parseFloat(lon) }
  } catch (error) {
    console.error('Error fetching geolocation data:', error)
    return null
  }
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
