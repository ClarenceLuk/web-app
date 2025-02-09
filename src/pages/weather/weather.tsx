import React, { useState } from 'react'
import getWeather, { WeatherForecast, WeatherPeriod } from './getWeather'
import { Box, Button, TextField, Typography } from '@mui/material'
import styles from './weather.module.css'
import WeatherCard from './weatherCard'

interface Coordinates {
  latitude: number
  longitude: number
}

async function getCoordinatesByZip(
  zipCode: string
): Promise<Coordinates | null> {
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

const Weather: React.FC = () => {
  const [zipcode, setZipcode] = useState('')
  const [weatherData, setWeatherData] = useState<WeatherForecast | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchWeatherData = async () => {
    setLoading(true)
    const coords = await getCoordinatesByZip(zipcode)
    if (coords) {
      const weather = await getWeather({
        latitude: coords.latitude,
        longitude: coords.longitude,
      })
      setWeatherData(weather)
    }
    setLoading(false)
  }

  const handleWeatherData = () => {
    if (zipcode) {
      fetchWeatherData()
    }
  }

  return (
    <Box>
      <Box className={styles.zipCode}>
        <TextField
          label='Zip Code'
          className={styles.zipCodeField}
          placeholder="Enter Zip Code"
          onChange={(e) => setZipcode(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleWeatherData()
            }
          }}
        />
        <Button
          className={styles.zipCodeButton}
          variant="outlined"
          onClick={handleWeatherData}>
          Search
        </Button>
      </Box>

      {zipcode && loading && (
        <Typography variant="h6">Loading weather data...</Typography>
      )}
      {weatherData && weatherData.properties.periods.map((period: WeatherPeriod, index: number) => 
        <WeatherCard
          key={index}
          {...period}
        />
      )}
      
    </Box>
  )
}

export default Weather
