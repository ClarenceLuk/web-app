import { Box, Button } from "@mui/material";
import moment, { Moment } from "moment";

interface CalendarProps {
  dailyForecasts: any[];
  selectedForecastIndex: number | null;
  setSelectedForecastIndex: (index: number) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
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