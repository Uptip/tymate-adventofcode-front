import React, { useState, useEffect } from 'react';
import Lamp from './Lamp';

const Tinsel = ({ startY, stopY, lowHangingFruit, width, height, days }) => {
  const [x1] = useState(0);
  const [x2, setX2] = useState(0);
  const [y1, setY1] = useState(50);
  const [y2, setY2] = useState(0);
  const [x, setX] = useState(30);
  const [y, setY] = useState(50);
  const [coordinates, setCoordinates] = useState([]);

  const pathRef = React.createRef();

  useEffect(
    () => {
      setY1((startY * height) / 100);
      setY2((stopY * height) / 100);
      setX2(width);
      setX((lowHangingFruit.x * width) / 100);
      setY((lowHangingFruit.y * height) / 100);
    },
    [width, startY, stopY, lowHangingFruit, height],
  );

  useEffect(
    () => {
      const pathLength = Math.floor(pathRef.current.getTotalLength());

      const getPointCoordinates = percent => {
        const length = (percent * pathLength) / 100;
        const point = pathRef.current.getPointAtLength(length);

        return {
          x: Math.round(point.x),
          y: Math.round(point.y),
        };
      };

      setCoordinates(
        days.map((day, index) =>
          getPointCoordinates((90 / days.length) * index + 10),
        ),
      );
    },
    [x1, x2, y1, y2, x, y],
  );

  return (
    <div style={{ position: 'relative' }}>
      <svg
        width={x2}
        height={height}
        style={{ fill: 'none', stroke: 'black', strokeWidth: 4 }}
        shapeRendering="geometricPrecision"
      >
        <path
          d={`M ${x1},${y1} Q${x},${y} ${x2},${y2}`}
          id="path"
          ref={pathRef}
        />
      </svg>

      {days.map(
        (lamp, index) =>
          Boolean(coordinates[index]) ? (
            <Lamp
              key={index}
              style={{
                position: 'absolute',
                left: coordinates[index].x,
                top: coordinates[index].y,
                transform: `translate3d(-50%, -50%, 0)`,
              }}
            />
          ) : null,
      )}
    </div>
  );
};

export default Tinsel;
