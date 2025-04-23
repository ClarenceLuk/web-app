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
  console.log(dailyForecasts)
  // Use the first and last forecast dates to determine the calendar range
  const firstForecastDate = moment(dailyForecasts[0].time);
  const lastForecastDate = moment(dailyForecasts[dailyForecasts.length - 1].time);

  // Find the Sunday before (or on) the first forecast date
  const calendarStartDate = moment(firstForecastDate).startOf("week");
  // Find the Saturday after (or on) the last forecast date
  const calendarEndDate = moment(lastForecastDate).endOf("week");

  // Total number of days to display in the grid.
  const totalCells = calendarEndDate.diff(calendarStartDate, "days") + 1;

  const calendarDates: Moment[] = Array.from({ length: totalCells }, (_, i) =>
    moment(calendarStartDate).add(i, "days")
  );

  // Create an array of available forecast dates (formatted as YYYY-MM-DD).
  const availableDates = dailyForecasts.map((f: any) =>
    moment(f.time).format("YYYY-MM-DD")
  );

  // Group calendarDates into weeks (arrays of 7 days)
  const weeks: Moment[][] = [];
  for (let i = 0; i < calendarDates.length; i += 7) {
    weeks.push(calendarDates.slice(i, i + 7));
  }

  return (
    <Box>
      {/* Month and Year Header */}
      <Box sx={{ textAlign: "center", fontWeight: "bold", fontSize: 20, mb: 2 }}>
        {firstForecastDate.format("MMMM YYYY")}
      </Box>

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

      {/* Calendar Grid: Only render weeks with at least one available date */}
      {weeks.map((week, weekIdx) => {
        const weekHasData = week.some((cellDate) =>
          availableDates.includes(cellDate.format("YYYY-MM-DD"))
        );
        if (!weekHasData) return null;
        return (
          <Box
            key={weekIdx}
            sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1, mb: 0.5 }}
          >
            {week.map((cellDate, index) => {
              const formattedDate = cellDate.format("YYYY-MM-DD");
              const isAvailable = availableDates.includes(formattedDate);
              const isToday = cellDate.isSame(moment(), "day");
              const isSelected =
                selectedForecastIndex !== null &&
                moment(dailyForecasts[selectedForecastIndex].time).isSame(cellDate, "day");
              const displayText = isToday ? "Today" : cellDate.date().toString();

              // Find rain percentage for this day if available
              const forecastIdx = dailyForecasts.findIndex((f: any) =>
                moment(f.time).isSame(cellDate, "day")
              );
              const rainPercent =
                forecastIdx >= 0
                  ? dailyForecasts[forecastIdx].precipitation_probability_max ?? 0
                  : null;

              return (
                <Button
                  key={index}
                  variant={isSelected ? "contained" : "outlined"}
                  onClick={() => {
                    if (isAvailable && forecastIdx >= 0) {
                      setSelectedForecastIndex(forecastIdx);
                    }
                  }}
                  disabled={!isAvailable}
                  sx={{
                    height: 80, // Increased height for more space
                    minWidth: 64,
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
                    position: "relative",
                    padding: 0,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 6,
                      left: 0,
                      width: "100%",
                      height: 48,
                      textAlign: "center",
                      zIndex: 1,
                      pointerEvents: "none",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <span style={{ fontWeight: isToday ? "bold" : "normal" }}>{displayText}</span>
                    
                  </Box>
                  {forecastIdx >= 0 && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 21,
                        right: 6,
                        fontSize: 8,
                        color: theme.palette.text.secondary,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        borderRadius: 1,
                        px: 0.5,
                      }}
                    >
                      <span style={{ fontSize: 8, display: "flex", alignItems: "center" }}>
                        <span role="img" aria-label="thermometer" style={{ fontSize: 14, marginRight: 3 }}>🌡️</span>
                        {Math.round(dailyForecasts[forecastIdx].temperature_2m_max)}°F
                      </span>
                    </Box>
                  )}
                  {rainPercent !== null && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 3,
                        right: 6,
                        fontSize: 8,
                        color: theme.palette.text.secondary,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        borderRadius: 1,
                        px: 0.5,
                      }}
                    >
                      <span role="img" aria-label="rain" style={{ fontSize: 13, marginRight: 2 }}>🌧️</span>
                      {rainPercent}%
                    </Box>
                  )}
                </Button>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
};

export default Calendar;
