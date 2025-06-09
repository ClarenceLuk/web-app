import React from 'react';
import EarthquakeQuery from './earthquakeQuery';

const Earthquake: React.FC = () => {
  return (
    <div>
      <h1>Earthquake Data</h1>
      <EarthquakeQuery />
    </div>
  );
};

export default Earthquake;
