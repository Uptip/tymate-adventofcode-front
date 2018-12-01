import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Lamp from './Lamp';
import { useWindowSize } from 'the-platform';

const Wrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const Tinsel = ({
  startY,
  stopY,
  lowHangingFruit,
  width,
  height,
  days,
  calendarRoute,
}) => {
  const [x1] = useState(0);
  const [x2, setX2] = useState(0);
  const [y1, setY1] = useState(50);
  const [y2, setY2] = useState(0);
  const [x, setX] = useState(30);
  const [y, setY] = useState(50);
  const [coordinates, setCoordinates] = useState([]);
  const { width: viewportWidth } = useWindowSize();

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
        days.map((day, index) => {
          const pointPercentage =
            (80 / days.length) * index + (viewportWidth > 500 ? 15 : 20);
          const pointCoordinates = getPointCoordinates(pointPercentage);
          const point1 = getPointCoordinates(pointPercentage - 2);
          const point2 = getPointCoordinates(pointPercentage + 2);

          return {
            ...pointCoordinates,
            angle: Math.floor(
              (Math.atan2(point2.y - point1.y, point2.x - point1.x) * 180) /
                Math.PI,
            ),
          };
        }),
      );
    },
    [x1, x2, y1, y2, x, y],
  );

  return (
    <Wrapper>
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
              isTeapot={calendarRoute === '/teapot' && lamp.color === 'pink'}
              calendarRoute={calendarRoute}
              dayId={lamp.id}
              linkTo={
                Boolean(lamp.id)
                  ? `${calendarRoute}/jours/${lamp.id}`
                  : undefined
              }
              color={lamp.color}
              number={lamp.number}
              key={index}
              textAngle={coordinates[index].angle}
              style={{
                position: 'absolute',
                left: coordinates[index].x,
                top: coordinates[index].y,
                transform: `translate3d(-50%, -50%, 0) rotate(${
                  coordinates[index].angle
                }deg)`,
              }}
            />
          ) : null,
      )}
    </Wrapper>
  );
};

export default Tinsel;
