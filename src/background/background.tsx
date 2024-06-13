import { Box, Typography } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import {
  Rect,
  Stage,
  Layer,
  Circle,
  Line,
  Text as KonvaText,
} from 'react-konva';

const Background = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    handleResize(); // Set initial dimensions
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Box ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <Typography variant="h1">Home</Typography>
      <Stage width={dimensions.width} height={dimensions.height}>
        <Layer>
          <KonvaText text="Some text on canvas" fontSize={15} />
          <Rect
            x={20}
            y={50}
            width={100}
            height={100}
            fill="red"
            shadowBlur={10}
          />
          <Circle x={200} y={100} radius={50} fill="green" />
          <Line
            x={20}
            y={200}
            points={[0, 0, 100, 0, 100, 100]}
            tension={0.5}
            closed={true}
            stroke="black"
            fillLinearGradientStartPoint={{ x: -50, y: -50 }}
            fillLinearGradientEndPoint={{ x: 50, y: 50 }}
            fillLinearGradientColorStops={[0, 'red', 1, 'yellow']}
          />
        </Layer>
      </Stage>
    </Box>
  );
};

export default Background;
