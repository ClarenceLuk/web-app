import { useEffect, useState, useCallback } from 'react';
import { fetchEarthquakes } from './service';
import type { EarthquakeFeature } from './service';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Box,
  Chip,
  Stack,
  Tooltip,
  TextField,
  Button,
  Paper,
  Grid,
  ButtonGroup,
} from '@mui/material';
import {
  AccessTime,
  TrendingUp,
  Height,
  Public,
  Science,
  Verified,
  MyLocation,
  Search,
  CalendarToday,
} from '@mui/icons-material';

interface Coordinates {
  lat: number;
  lon: number;
}

interface ZipcodeResponse {
  'post code': string;
}

interface CoordinatesResponse {
  places: Array<{
    latitude: string;
    longitude: string;
  }>;
}

function getDefaultDates() {
  const now = new Date();
  const end = now.toISOString().slice(0, 10); // yyyy-MM-dd
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const start = sevenDaysAgo.toISOString().slice(0, 10);
  return { start, end };
}

function getDateRange(days: number) {
  const now = new Date();
  const end = now.toISOString().slice(0, 10);
  const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  const start = startDate.toISOString().slice(0, 10);
  return { start, end };
}

const { start: DEFAULT_START, end: DEFAULT_END } = getDefaultDates();
const DEFAULT_ZIPCODE = '';
const DEFAULT_RADIUS = 10;
const DEFAULT_MIN_MAGNITUDE = 0;
const DEFAULT_MAX_MAGNITUDE = 10;

const Earthquake = () => {
  const [earthquakes, setEarthquakes] = useState<EarthquakeFeature[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>(DEFAULT_START);
  const [endDate, setEndDate] = useState<string>(DEFAULT_END);
  const [zipcode, setZipcode] = useState<string>(DEFAULT_ZIPCODE);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [radius, setRadius] = useState<number>(DEFAULT_RADIUS);
  const [minMagnitude, setMinMagnitude] = useState<number>(DEFAULT_MIN_MAGNITUDE);
  const [maxMagnitude, setMaxMagnitude] = useState<number>(DEFAULT_MAX_MAGNITUDE);

  const getZipcodeFromCoordinates = useCallback(async (lat: number, lon: number): Promise<string | null> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`,
        {
          headers: {
            'Accept-Language': 'en-US,en;q=0.9',
            'User-Agent': 'EarthquakeApp/1.0'
          }
        }
      );
      if (!response.ok) throw new Error('Could not find zipcode for location');
      const data = await response.json() as { address: { postcode?: string } };
      return data.address.postcode || null;
    } catch (err) {
      console.error('Error getting zipcode:', err);
      return null;
    }
  }, []);

  const getCoordinatesFromZipcode = useCallback(async (zip: string): Promise<Coordinates | null> => {
    try {
      const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
      if (!response.ok) throw new Error('Invalid zipcode');
      const data = await response.json() as CoordinatesResponse;
      return {
        lat: parseFloat(data.places[0].latitude),
        lon: parseFloat(data.places[0].longitude)
      };
    } catch (err) {
      setError('Invalid zipcode');
      return null;
    }
  }, []);

  const loadEarthquakes = useCallback(async (
    start: string,
    end: string,
    zip: string,
    rad: number,
    minMag: number,
    maxMag: number
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      let currentCoords = coordinates;
      
      if (zip && !currentCoords) {
        const coords = await getCoordinatesFromZipcode(zip);
        if (!coords) {
          setLoading(false);
          return;
        }
        currentCoords = coords;
        setCoordinates(coords);
      }

      const data = await fetchEarthquakes(
        start,
        end,
        currentCoords?.lat || 0,
        currentCoords?.lon || 0,
        rad,
        minMag,
        maxMag
      );
      setEarthquakes(data.features);
    } catch (err) {
      setError('Failed to fetch earthquake data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [coordinates, getCoordinatesFromZipcode]);

  const handleUseMyLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          };
          setCoordinates(coords);
          
          const zip = await getZipcodeFromCoordinates(coords.lat, coords.lon);
          if (zip) {
            setZipcode(zip);
          } else {
            setError('Could not find zipcode for your location');
          }
        },
        (err) => {
          console.error('Error getting location:', err);
          setError('Failed to get your location');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  }, [getZipcodeFromCoordinates]);

  // Add useEffect to get location on mount
  useEffect(() => {
    handleUseMyLocation();
  }, [handleUseMyLocation]);

  const handleSearch = useCallback(() => {
    loadEarthquakes(startDate, endDate, zipcode, radius, minMagnitude, maxMagnitude);
  }, [startDate, endDate, zipcode, radius, minMagnitude, maxMagnitude, loadEarthquakes]);

  const handleTimeRangeSelect = useCallback((days: number) => {
    const { start, end } = getDateRange(days);
    setStartDate(start);
    setEndDate(end);
  }, []);

  return (
    <Container maxWidth="sm" sx={{ py: 4, px: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Earthquake Data
      </Typography>

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Time Range
            </Typography>
            <ButtonGroup variant="outlined" size="small" fullWidth>
              <Button
                onClick={() => handleTimeRangeSelect(1)}
                startIcon={<CalendarToday />}
              >
                24h
              </Button>
              <Button
                onClick={() => handleTimeRangeSelect(7)}
                startIcon={<CalendarToday />}
              >
                7d
              </Button>
              <Button
                onClick={() => handleTimeRangeSelect(30)}
                startIcon={<CalendarToday />}
              >
                30d
              </Button>
              <Button
                onClick={() => handleTimeRangeSelect(365)}
                startIcon={<CalendarToday />}
              >
                1y
              </Button>
            </ButtonGroup>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Start Date"
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="End Date"
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                size="small"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                label="Zipcode"
                type="text"
                value={zipcode}
                onChange={e => {
                  setZipcode(e.target.value);
                  setCoordinates(null);
                }}
                placeholder="Enter US zipcode"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Radius (km)"
                type="number"
                value={radius}
                onChange={e => setRadius(Number(e.target.value))}
                inputProps={{ step: 1, min: 1, max: 20000 }}
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Min Magnitude"
                type="number"
                value={minMagnitude}
                onChange={e => setMinMagnitude(Number(e.target.value))}
                inputProps={{ step: 0.1, min: 0 }}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Max Magnitude"
                type="number"
                value={maxMagnitude}
                onChange={e => setMaxMagnitude(Number(e.target.value))}
                inputProps={{ step: 0.1, min: 0 }}
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>

          <Box display="flex" gap={2} justifyContent="center">
            <Button
              variant="contained"
              startIcon={<MyLocation />}
              onClick={handleUseMyLocation}
              size="small"
            >
              Use My Location
            </Button>
            <Button
              variant="contained"
              startIcon={<Search />}
              onClick={handleSearch}
              size="small"
            >
              Search
            </Button>
          </Box>
        </Stack>
      </Paper>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
      ) : (
        <Stack spacing={2}>
          {earthquakes.map((earthquake) => (
            <Card 
              key={earthquake.id}
              elevation={2}
              sx={{
                '&:hover': {
                  elevation: 4,
                  transform: 'translateY(-4px)',
                  transition: 'all 0.3s ease-in-out',
                },
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                    {earthquake.properties.magnitude.toFixed(1)}
                  </Typography>
                  <Chip
                    icon={<Verified />}
                    label={earthquake.properties.status}
                    color={earthquake.properties.status === 'reviewed' ? 'success' : 'default'}
                    variant="outlined"
                    size="small"
                  />
                </Box>

                <Typography variant="h6" component="h2" gutterBottom>
                  {earthquake.properties.place}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AccessTime sx={{ mr: 1, color: 'info.main', fontSize: '1.2rem' }} />
                  <Typography variant="body2" color="text.secondary">
                    {new Date(earthquake.properties.time).toLocaleString()}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Height sx={{ mr: 1, color: 'secondary.main', fontSize: '1.2rem' }} />
                  <Typography variant="body2" color="text.secondary">
                    Depth: {earthquake.properties.depth.toFixed(1)} km
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Public sx={{ mr: 1, color: 'primary.main', fontSize: '1.2rem' }} />
                  <Typography variant="body2" color="text.secondary">
                    Coordinates: {earthquake.properties.latitude.toFixed(2)}°N, {earthquake.properties.longitude.toFixed(2)}°E
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Science sx={{ mr: 1, color: 'error.main', fontSize: '1.2rem' }} />
                  <Typography variant="body2" color="text.secondary">
                    Source: {earthquake.properties.source}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
                  <Tooltip title="Horizontal Uncertainty">
                    <Chip
                      size="small"
                      label={`±${earthquake.properties.horizontalUncertainty.toFixed(1)} km`}
                      variant="outlined"
                    />
                  </Tooltip>
                  <Tooltip title="Depth Uncertainty">
                    <Chip
                      size="small"
                      label={`±${earthquake.properties.depthUncertainty.toFixed(1)} km`}
                      variant="outlined"
                    />
                  </Tooltip>
                  <Tooltip title="Magnitude Uncertainty">
                    <Chip
                      size="small"
                      label={`±${earthquake.properties.magnitudeUncertainty.toFixed(2)}`}
                      variant="outlined"
                    />
                  </Tooltip>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default Earthquake;
