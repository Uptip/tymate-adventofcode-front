import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Tinsel from 'components/Tinsel';
import { useWindowSize } from 'the-platform';
import find from 'lodash/find';

const Tinsels = styled.div`
  ${'' /* padding-top: 200px; */};
`;

const daysNumbers = [
  3,
  13,
  24,
  12,
  20,
  9,
  4,
  6,
  21,
  16,
  14,
  18,
  11,
  5,
  10,
  19,
  2,
  22,
  15,
  17,
  7,
  1,
  23,
  8,
];

const CalendarContent = ({ days }) => {
  const { width, height } = useWindowSize();
  const [tinselsLength, setTinselsLength] = useState(1);
  const daysPerTinsel = 24 / tinselsLength;

  useEffect(
    () => {
      if (width > 1000) {
        setTinselsLength(3);
        return;
      }

      if (width > 500) {
        setTinselsLength(4);
        return;
      }

      setTinselsLength(6);
    },
    [width],
  );

  const calendarDays = daysNumbers.map(number => ({
    number,
    ...find(days, day => number === day.number),
  }));

  const tinselsCoordinates = [
    { startY: 5, stopY: 30, lowHangingFruitX: 65, lowHangingFruitY: 70 },
    { startY: 40, stopY: 20, lowHangingFruitX: 40, lowHangingFruitY: 70 },
    { startY: 10, stopY: 40, lowHangingFruitX: 62, lowHangingFruitY: 90 },
    { startY: 30, stopY: 25, lowHangingFruitX: 30, lowHangingFruitY: 60 },
    { startY: 40, stopY: 20, lowHangingFruitX: 50, lowHangingFruitY: 80 },
    { startY: 10, stopY: 30, lowHangingFruitX: 60, lowHangingFruitY: 60 },
  ];

  return (
    <>
      <Tinsels>
        {[...Array(tinselsLength).keys()].map(index => (
          <Tinsel
            key={index}
            startY={tinselsCoordinates[index].startY}
            stopY={tinselsCoordinates[index].stopY}
            lowHangingFruit={{
              x: tinselsCoordinates[index].lowHangingFruitX,
              y: tinselsCoordinates[index].lowHangingFruitY,
            }}
            width={width}
            height={Math.max(height / (tinselsLength + 1), 200)}
            days={calendarDays.slice(
              index * daysPerTinsel,
              daysPerTinsel * index + daysPerTinsel,
            )}
          />
        ))}
      </Tinsels>
    </>
  );
};

export default CalendarContent;
