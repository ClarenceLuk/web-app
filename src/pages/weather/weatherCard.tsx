import React from 'react';
import { Box, Typography } from '@mui/material';
import moment from 'moment';
import styles from './weatherCard.module.css';
import { weatherCodeIcons } from './weatherCodeMapping';
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Brush
} from 'recharts';
import { useTheme } from '@mui/material/styles';

interface RawDailyForecast {
    index: number;
    time: string;
    temperature_2m_max: number;
    temperature_2m_min: number;
    weathercode: number;
    precipitation_probability_max: number;
    windspeed_10m_max: number;
    sunrise: string;
    sunset: string;
}

interface HourlyData {
    time: string[];
    temperature_2m: number[];
}

interface WeatherCardProps {
    forecastData: RawDailyForecast;
    hourlyData: HourlyData;
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    const theme = useTheme();
    if (active && payload && payload.length > 0) {
        return (
            <Box
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    padding: theme.spacing(1),
                }}
            >
                <Typography variant="caption" sx={{ color: theme.palette.text.primary }}>
                    {`Time: ${label}`}
                </Typography>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: 'block' }}>
                    {`Temperature: ${payload[0].value}°F`}
                </Typography>
            </Box>
        );
    }
    return null;
};

const WeatherCard: React.FC<WeatherCardProps> = ({
    forecastData: {
        time,
        temperature_2m_max,
        temperature_2m_min,
        weathercode,
        precipitation_probability_max,
        windspeed_10m_max,
        sunrise,
        sunset,
    },
    hourlyData,
}) => {
    const theme = useTheme();
    const dayName = moment(time).format('dddd');
    const fullDate = moment(time).format('LL');
    const iconClass = weatherCodeIcons[weathercode] || 'wi-na';
    const detailedForecast = `Max: ${temperature_2m_max}°F, Min: ${temperature_2m_min}°F, Sunrise: ${moment(sunrise).format('h:mm A')}, Sunset: ${moment(sunset).format('h:mm A')}`;
    const selectedDate = moment(time).format('YYYY-MM-DD');

    // Filter hourly data for the selected date.
    const hourlyForSelected = hourlyData.time.reduce((acc: any[], hourTime: string, index: number) => {
        if (moment(hourTime).format('YYYY-MM-DD') === selectedDate) {
            acc.push({
                time: moment(hourTime).format('h:mm A'),
                temperature: hourlyData.temperature_2m[index],
            });
        }
        return acc;
    }, []);

    return (
        <Box className={styles.weatherCard}>
            {/* Use an <i> element with Weather Icons classes */}
            <i className={`wi ${iconClass}`} style={{ fontSize: '64px', marginBottom: '10px' }}></i>
            <Typography variant="h6">{dayName} — {fullDate}</Typography>
            <Typography variant="body1">
                Temperature: {temperature_2m_max}°F (max) / {temperature_2m_min}°F (min)
            </Typography>
            <Typography variant="body1">Wind: {windspeed_10m_max} km/h</Typography>
            <Typography variant="body1">Chance to rain: {precipitation_probability_max || 0}%</Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>{detailedForecast}</Typography>
            {hourlyForSelected.length > 0 && (
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="h6" sx={{ marginBottom: 1 }}>Hourly Temperature</Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={hourlyForSelected}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis domain={[0, 120]} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line type="monotone" dataKey="temperature" stroke={theme.palette.primary.main} />
                            {/* Brush added for scrolling; tickFormatter converts each tick to a date format */}
                            <Brush 
                                dataKey="time" 
                                height={30} 
                                stroke={theme.palette.primary.main}
                                tickFormatter={(value) => moment(value, 'h:mm A').format('hh:mm A')}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>
            )}
        </Box>
    );
};

export default WeatherCard;
