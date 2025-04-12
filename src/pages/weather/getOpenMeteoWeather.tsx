interface LocationKey {
  latitude: number
  longitude: number
}

const getOpenMeteoWeather = async ({
  latitude,
  longitude,
}: LocationKey) => {
  // Base URL for the Open-Meteo API
  const baseUrl = 'https://api.open-meteo.com/v1/forecast';

  // Compute the date for today and the date 9 days from now (to have a total of 10 days)
  const today = new Date();
  const startDate = today.toISOString().split('T')[0]; // YYYY-MM-DD format
  const tenDaysLater = new Date();
  tenDaysLater.setDate(today.getDate() + 15);
  const endDate = tenDaysLater.toISOString().split('T')[0];

  const dailyParams = [
    'temperature_2m_max',
    'temperature_2m_min',
    'weathercode',
    'precipitation_sum',
    'windspeed_10m_max',
    'sunrise',
    'sunset',
    'shortwave_radiation_sum',
    'precipitation_probability_max',
  ].join(',');

  const hourlyParams = [
    'temperature_2m',
    'relativehumidity_2m',
    'dewpoint_2m',
    'precipitation',
    'snowfall',
    'windspeed_10m',
    'winddirection_10m',
    'cloudcover',
    'surface_pressure',
    'shortwave_radiation',
    'visibility',
    'windgusts_10m',
  ].join(',');

  // Build the query parameters using URLSearchParams
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    daily: dailyParams,
    hourly: hourlyParams,
    temperature_unit: 'fahrenheit',
    timezone: 'auto',
    start_date: startDate,
    end_date: endDate,
  });

  // Construct the full URL for the API call
  const url = `${baseUrl}?${params.toString()}`;

  try {
    // Fetch the data from Open-Meteo
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.status} ${response.statusText}`);
    }
    
    // Parse the JSON response
    const data = await response.json();
    console.log('Forecast Data:', data);
    return data;
  } catch (error) {
    console.error('Failed to retrieve data:', error);
    throw error;
  }
}

export default getOpenMeteoWeather
