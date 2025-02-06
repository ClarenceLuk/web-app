import React, { useEffect, useState } from 'react'
import getWeather, { WeatherForecast } from './getWeather'
import { Box, Button, TextField, Typography } from '@mui/material'

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
    fetchWeatherData()
  }

  return (
    <Box>
      <Button onClick={handleWeatherData}>Search</Button>
      <p>Zip Code: <TextField placeholder='Enter Zipcodde' onChange={(e) => setZipcode(e.target.value)}></TextField></p>
      {zipcode && loading && <p>Loading weather data...</p>}
      {weatherData && (
        <Box>
          <h3>Weather Forecast</h3>
          {weatherData.properties.periods.map((period, index) => (
            <Box key={index}>
              <p>
                {period.name}: {period.temperature} {period.temperatureUnit} -{' '}
                {period.shortForecast}
              </p>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default Weather
