export interface WeatherForecast {
  properties: {
    periods: Array<{
      name: string
      temperature: number
      temperatureUnit: string
      windSpeed: string
      windDirection: string
      shortForecast: string
    }>
  }
}

interface LocationKey {
  latitude: number
  longitude: number
}

const getWeather = async ({
  latitude,
  longitude,
}: LocationKey): Promise<WeatherForecast | null> => {
  const baseUrl = 'https://api.weather.gov'

  try {
    // Step 1: Fetch grid points based on latitude and longitude
    const gridResponse = await fetch(
      `${baseUrl}/points/${latitude},${longitude}`
    )
    if (!gridResponse.ok) {
      throw new Error(`Failed to fetch grid points: ${gridResponse.statusText}`)
    }
    const gridData = await gridResponse.json()
    const { gridId, gridX, gridY } = gridData.properties

    // Step 2: Fetch forecast data using the grid points
    const forecastUrl = `${baseUrl}/gridpoints/${gridId}/${gridX},${gridY}/forecast`
    const forecastResponse = await fetch(forecastUrl)

    if (!forecastResponse.ok) {
      throw new Error(
        `Failed to fetch weather data: ${forecastResponse.statusText}`
      )
    }

    // Parse the JSON response
    const weatherData: WeatherForecast = await forecastResponse.json()

    // Return the weather forecast data
    return weatherData
  } catch (error) {
    // Handle any errors
    console.error('Error fetching the weather data:', error)
    return null
  }
}

export default getWeather
