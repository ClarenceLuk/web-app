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

export const weatherCodeIcons: Record<number, string> = {
  0: 'wi-day-sunny',          // Clear sky
  1: 'wi-day-sunny',          // Mainly clear
  2: 'wi-day-cloudy',         // Partly cloudy
  3: 'wi-cloudy',             // Overcast
  45: 'wi-fog',               // Fog
  48: 'wi-fog',               // Depositing rime fog
  51: 'wi-sprinkle',          // Light drizzle
  53: 'wi-sprinkle',          // Moderate drizzle
  55: 'wi-showers',           // Dense drizzle
  56: 'wi-sleet',             // Light freezing drizzle
  57: 'wi-sleet',             // Dense freezing drizzle
  61: 'wi-rain',              // Slight rain
  63: 'wi-rain',              // Moderate rain
  65: 'wi-rain',              // Heavy rain
  66: 'wi-sleet',             // Light freezing rain
  67: 'wi-sleet',             // Heavy freezing rain
  71: 'wi-snow',              // Slight snowfall
  73: 'wi-snow',              // Moderate snowfall
  75: 'wi-snow',              // Heavy snowfall
  77: 'wi-snowflake-cold',    // Snow grains
  80: 'wi-showers',           // Slight rain showers
  81: 'wi-showers',           // Moderate rain showers
  82: 'wi-storm-showers',     // Violent rain showers
  85: 'wi-snow',              // Slight snow showers
  86: 'wi-snow',              // Heavy snow showers
  95: 'wi-thunderstorm',      // Thunderstorm (slight or moderate)
  96: 'wi-thunderstorm-with-slight-hail', // Thunderstorm with slight hail
  99: 'wi-thunderstorm-with-heavy-hail'   // Thunderstorm with heavy hail
};
