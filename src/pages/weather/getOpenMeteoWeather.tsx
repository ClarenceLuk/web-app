interface LocationKey {
  latitude: number;
  longitude: number;
}

/**
 * Returns a new Date that is offset (in days) from the base date,
 * with the time set to the specified hours, minutes, seconds, and milliseconds.
 *
 * @param base - The base Date.
 * @param offset - Number of days to add (or subtract if negative).
 * @param hours - The desired hour (0–23 or 23 to simulate the end-of-day).
 * @param minutes - The desired minute.
 * @param seconds - The desired seconds.
 * @param ms - The desired milliseconds.
 * @returns A new Date with the offset and custom time.
 */
const getNormalizedDate = (
  base: Date,
  offset: number,
  hours: number,
  minutes: number = 0,
  seconds: number = 0,
  ms: number = 0
): Date => {
  const result = new Date(base);
  result.setUTCDate(result.getDate() + offset);
  result.setUTCHours(hours, minutes, seconds, ms);

  return result;
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
  // Helper: formats a Date object to 'YYYY-MM-DD'.
  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const today = new Date();

  // Historical: from 10 days before today to yesterday.
  const pastStartDate = getNormalizedDate(today, -10, 0);                   // 10 days ago at 00:00
  const pastEndDate = getNormalizedDate(today, -2, 0);          // Yesterday at 23:59:59.999
  // Forecast: from today to 15 days after today.
  const futureStartDate = getNormalizedDate(today, -1, 0);                     // Today at 00:00
  const futureEndDate = getNormalizedDate(today, 15, 0);         // 15 days after today at 23:59:59.999

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

    return mergedData;
  } catch (error) {
    throw error;
  }
};

export default getOpenMeteoWeather;
