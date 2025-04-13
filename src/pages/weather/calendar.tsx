import { Box, Button, useTheme } from "@mui/material";
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
  const theme = useTheme();

  // Use the first available forecast date to determine the "current" month.
  const firstForecastDate = moment(dailyForecasts[0].time);
  const currentMonth = firstForecastDate.month();
  const currentYear = firstForecastDate.year();

  // Calculate the start of the month and its day of week.
  const startOfMonth = moment({ year: currentYear, month: currentMonth, day: 1 });
  const startDayOfWeek = startOfMonth.day(); // 0 (Sunday) - 6 (Saturday)
  // Calendar grid will start on the Sunday on or before the first day of the month.
  const calendarStartDate = moment(startOfMonth).subtract(startDayOfWeek, "days");

  // Calculate the end of the month.
  const endOfMonth = moment(startOfMonth).endOf("month");
  // We want the grid to end on the Saturday of the week that contains the month's last day.
  const endDayOfWeek = endOfMonth.day();
  const daysToAdd = 6 - endDayOfWeek;
  const calendarEndDate = moment(endOfMonth).add(daysToAdd, "days");

  // Total number of days to display in the grid.
  const totalCells = calendarEndDate.diff(calendarStartDate, "days") + 1;

  const calendarDates: Moment[] = Array.from({ length: totalCells }, (_, i) =>
    moment(calendarStartDate).add(i, "days")
  );

  // Create an array of available forecast dates (formatted as YYYY-MM-DD).
  const availableDates = dailyForecasts.map((f: any) =>
    moment(f.time).format("YYYY-MM-DD")
  );

  return (
    <Box>
      {/* Weekday Headers */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 1,
          mb: 1,
        }}
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => (
          <Box key={dayName} sx={{ textAlign: "center", fontWeight: "bold" }}>
            {dayName}
          </Box>
        ))}
      </Box>

      {/* Calendar Grid */}
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1 }}>
        {calendarDates.map((cellDate, index) => {
          const formattedDate = cellDate.format("YYYY-MM-DD");
          const isAvailable = availableDates.includes(formattedDate);
          const isToday = cellDate.isSame(moment(), "day");
          const isSelected =
            selectedForecastIndex !== null &&
            moment(dailyForecasts[selectedForecastIndex].time).isSame(cellDate, "day");
          const displayText = isToday ? "Today" : cellDate.date().toString();

          return (
            <Button
              key={index}
              variant={isSelected ? "contained" : "outlined"}
              onClick={() => {
                if (isAvailable) {
                  const forecastIdx = dailyForecasts.findIndex((f: any) =>
                    moment(f.time).isSame(cellDate, "day")
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
                borderRadius: theme.shape.borderRadius,
                fontWeight: isToday ? "bold" : "normal",
                backgroundColor: isSelected ? theme.palette.primary.main : "transparent",
                color: isSelected
                  ? theme.palette.primary.contrastText
                  : isAvailable
                  ? theme.palette.text.primary
                  : theme.palette.text.disabled,
                borderColor: isAvailable ? theme.palette.primary.main : theme.palette.divider,
                "&:hover": {
                  backgroundColor: isSelected
                    ? theme.palette.primary.dark
                    : theme.palette.action.hover,
                },
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

export default Calendar;
