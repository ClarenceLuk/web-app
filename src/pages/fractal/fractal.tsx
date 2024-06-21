import { Box, Typography } from '@mui/material'
import styles from './fractal.module.css'
import { Rect, Stage, Layer, Circle, Line } from 'react-konva'

const Fractal = () => {
  return (
    <Box className={styles.backgroundContainer}>
      <Stage width={300} height={300}>
        <Layer>
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
  )
}

export default Fractal
