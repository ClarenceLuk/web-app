interface LocationKey {
  latitude: number
  longitude: number
}

export const weatherCodeMapping: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snowfall',
  73: 'Moderate snowfall',
  75: 'Heavy snowfall',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm (slight or moderate)',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail'
};

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
