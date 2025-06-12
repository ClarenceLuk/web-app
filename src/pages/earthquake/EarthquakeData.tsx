import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import type { EarthquakeFeature } from './types';
import './earthquake.css';

interface EarthquakeDataProps {
  earthquakes: EarthquakeFeature[];
  loading: boolean;
  error: string | null;
}

export default function EarthquakeData({ earthquakes, loading, error }: EarthquakeDataProps) {
  if (error) {
    return (
      <Alert severity="error" className="earthquake-error">
        {error}
      </Alert>
    );
  }

  if (loading) {
    return (
      <Box className="earthquake-loading">
        <CircularProgress />
      </Box>
    );
  }

  if (earthquakes.length === 0) {
    return (
      <Alert severity="info">
        No earthquakes found in the specified area and time range.
      </Alert>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table className="earthquake-table">
        <TableHead>
          <TableRow>
            <TableCell>Magnitude</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Depth (km)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {earthquakes.map((quake) => (
            <TableRow key={quake.id}>
              <TableCell className="earthquake-table-cell">
                {quake.properties.magnitude.toFixed(1)}
              </TableCell>
              <TableCell>{quake.properties.place}</TableCell>
              <TableCell className="earthquake-table-cell">
                {new Date(quake.properties.time).toLocaleString()}
              </TableCell>
              <TableCell className="earthquake-table-cell">
                {quake.properties.depth.toFixed(1)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
} 