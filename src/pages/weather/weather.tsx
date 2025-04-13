// Weather.tsx
import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import moment, { Moment } from 'moment';
import WeatherCard from './weatherCard';
import getOpenMeteoWeather from './getOpenMeteoWeather';

interface Coordinates {
  latitude: number;
  longitude: number;
}

const handleLocation = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
};

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedForecastIndex, setSelectedForecastIndex] = useState<number | null>(null);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      let location = userLocation;
      if (!location) {
        location = await handleLocation();
        setUserLocation(location);
      }
      if (location) {
        // getOpenMeteoWeather returns the merged weather data.
        const weather = await getOpenMeteoWeather({
          latitude: location.latitude,
          longitude: location.longitude,
        });
        setWeatherData(weather);
        // Reset selection when new data arrives.
        setSelectedForecastIndex(null);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Build an array of daily forecast objects from the merged API response.
  const dailyForecasts =
    weatherData && weatherData.daily
      ? weatherData.daily.time.map((time: string, index: number) => ({
          index,
          time,
          temperature_2m_max: weatherData.daily.temperature_2m_max[index],
          temperature_2m_min: weatherData.daily.temperature_2m_min[index],
          weathercode: weatherData.daily.weathercode[index],
          precipitation_probability_max: weatherData.daily.precipitation_probability_max
            ? weatherData.daily.precipitation_probability_max[index]
            : 0,
          windspeed_10m_max: weatherData.daily.windspeed_10m_max[index],
          sunrise: weatherData.daily.sunrise[index],
          sunset: weatherData.daily.sunset[index],
        }))
      : [];

  return (
    <Box sx={{ padding: 2 }}>
      <Button variant="contained" onClick={fetchWeatherData}>
        Get Weather
      </Button>
      {loading && <Typography variant="h6">Loading weather data...</Typography>}
      {error && <Typography variant="h6" color="error">{error}</Typography>}

      {/* Display detailed forecast for the selected date */}
      {selectedForecastIndex !== null && (
        <Box sx={{ marginTop: 4 }}>
          <WeatherCard forecastData={dailyForecasts[selectedForecastIndex]} />
        </Box>
      )}

      {/* Render the calendar date selector below the button */}
      {dailyForecasts.length > 0 && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            Select a Date
          </Typography>
          <Calendar
            dailyForecasts={dailyForecasts}
            selectedForecastIndex={selectedForecastIndex}
            setSelectedForecastIndex={setSelectedForecastIndex}
          />
        </Box>
      )}
    </Box>
  );
};

export default Weather;

// ------ Calendar Component ------

interface CalendarProps {
  dailyForecasts: any[];
  selectedForecastIndex: number | null;
  setSelectedForecastIndex: (index: number) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  dailyForecasts,
  selectedForecastIndex,
  setSelectedForecastIndex,
}) => {
  // Use the first available forecast date to determine the "current" month.
  const firstForecastDate = moment(dailyForecasts[0].time);
  const currentMonth = firstForecastDate.month();
  const currentYear = firstForecastDate.year();

  // Calculate the start date for the calendar grid:
  // We want full weeks, so we start from the Sunday on or before the first day of the month.
  const startOfMonth = moment({ year: currentYear, month: currentMonth, day: 1 });
  const startDayOfWeek = startOfMonth.day(); // 0 (Sunday) - 6 (Saturday)
  // Subtract startDayOfWeek days to get the calendar's first date.
  const calendarStartDate = moment(startOfMonth).subtract(startDayOfWeek, 'days');

  // Create an array for a fixed 6-week grid (6 rows × 7 columns = 42 cells).
  const totalCells = 42;
  const calendarDates: Moment[] = Array.from({ length: totalCells }, (_, i) =>
    moment(calendarStartDate).add(i, 'days')
  );

  // Create an array of available forecast dates (formatted as YYYY-MM-DD).
  const availableDates = dailyForecasts.map((f: any) =>
    moment(f.time).format('YYYY-MM-DD')
  );

  return (
    <Box>
      {/* Weekday Headers */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, mb: 1 }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName) => (
          <Box key={dayName} sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            {dayName}
          </Box>
        ))}
      </Box>
      {/* Calendar Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
        {calendarDates.map((cellDate, index) => {
          const formattedDate = cellDate.format('YYYY-MM-DD');
          const isAvailable = availableDates.includes(formattedDate);
          const isToday = cellDate.isSame(moment(), 'day');
          const isSelected =
            selectedForecastIndex !== null &&
            moment(dailyForecasts[selectedForecastIndex].time).isSame(cellDate, 'day');
          // Show 'Today' for today's cell; otherwise, display the day number.
          const displayText = isToday ? 'Today' : cellDate.date().toString();

          return (
            <Button
              key={index}
              variant={isSelected ? 'contained' : 'outlined'}
              onClick={() => {
                if (isAvailable) {
                  // Find the forecast index with a matching date.
                  const forecastIdx = dailyForecasts.findIndex((f: any) =>
                    moment(f.time).isSame(cellDate, 'day')
                  );
                  if (forecastIdx >= 0) {
                    setSelectedForecastIndex(forecastIdx);
                  }
                }
              }}
              disabled={!isAvailable}
              sx={{
                height: 40,
                minWidth: 40,
                borderRadius: 1,
                fontWeight: isToday ? 'bold' : 'normal',
              }}
            >
              {displayText}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};
