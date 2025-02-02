import React, { useEffect, useState } from 'react'
import getWeather, { WeatherForecast } from './getWeather'

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
  const [zipCode, setZipCode] = useState<string>('90210')
  const [weatherData, setWeatherData] = useState<WeatherForecast | null>(null)
  const [loading, setLoading] = useState(true)

  setZipCode('90210')

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true)
      const coords = await getCoordinatesByZip(zipCode)
      if (coords) {
        const weather = await getWeather({
          latitude: coords.latitude,
          longitude: coords.longitude,
        })
        setWeatherData(weather)
      }
      setLoading(false)
    }

    fetchWeatherData()
  }, [zipCode]) // Re-run effect if the zip code changes

  return (
    <div>
      <p>Zip Code: {zipCode}</p>
      {loading && <p>Loading weather data...</p>}
      {weatherData && (
        <div>
          <h3>Weather Forecast</h3>
          {weatherData.properties.periods.map((period, index) => (
            <div key={index}>
              <p>
                {period.name}: {period.temperature} {period.temperatureUnit} -{' '}
                {period.shortForecast}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Weather
