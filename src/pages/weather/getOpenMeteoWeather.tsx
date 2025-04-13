interface LocationKey {
  latitude: number;
  longitude: number;
}

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
  // Helper: formats a Date object to 'YYYY-MM-DD'.
  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const today = new Date();

  // Historical: from 10 days before today to yesterday.
  const pastStartDate = new Date(today);
  pastStartDate.setDate(today.getDate() - 10);
  const pastEndDate = new Date(today);
  pastEndDate.setDate(today.getDate() - 1);

  // Forecast: from today to 15 days after today.
  const futureStartDate = today;
  const futureEndDate = new Date(today);
  futureEndDate.setDate(today.getDate() + 15);

  // Construct URLs for the two endpoints.
  const historicalUrl =
    'https://archive-api.open-meteo.com/v1/archive?' +
    new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      daily: dailyParams,
      hourly: hourlyParams,
      temperature_unit: 'fahrenheit',
      timezone: 'auto',
      start_date: formatDate(pastStartDate),
      end_date: formatDate(pastEndDate),
    });

  const forecastUrl =
    'https://api.open-meteo.com/v1/forecast?' +
    new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      daily: dailyParams,
      hourly: hourlyParams,
      temperature_unit: 'fahrenheit',
      timezone: 'auto',
      start_date: formatDate(futureStartDate),
      end_date: formatDate(futureEndDate),
    });

  try {
    // Fetch historical and forecast data in parallel.
    const [historicalResponse, forecastResponse] = await Promise.all([
      fetch(historicalUrl),
      fetch(forecastUrl),
    ]);

    if (!historicalResponse.ok) {
      throw new Error(
        `Error fetching historical weather data: ${historicalResponse.status} ${historicalResponse.statusText}`
      );
    }
    if (!forecastResponse.ok) {
      throw new Error(
        `Error fetching forecast weather data: ${forecastResponse.status} ${forecastResponse.statusText}`
      );
    }

    const historicalData = await historicalResponse.json();
    const forecastData = await forecastResponse.json();

    // Merge daily data: For each key in daily data, combine arrays.
    const mergedDaily: Record<string, any> = {};
    if (historicalData.daily && forecastData.daily) {
      for (const key in historicalData.daily) {
        mergedDaily[key] = [
          ...historicalData.daily[key],
          ...forecastData.daily[key],
        ];
      }
    }

    // Merge hourly data similarly, if available.
    const mergedHourly: Record<string, any> = {};
    if (historicalData.hourly && forecastData.hourly) {
      for (const key in historicalData.hourly) {
        mergedHourly[key] = [
          ...historicalData.hourly[key],
          ...forecastData.hourly[key],
        ];
      }
    }

    const mergedData = {
      daily: mergedDaily,
      hourly: mergedHourly,
    };

    console.log('Merged Weather Data:', mergedData);
    return mergedData;
  } catch (error) {
    console.error('Failed to retrieve data:', error);
    throw error;
  }
};

export default getOpenMeteoWeather;
