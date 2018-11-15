import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Tinsel from 'components/Tinsel';
import { useWindowSize } from 'the-platform';
import find from 'lodash/find';

const Tinsels = styled.div``;

const daysProps = [
  { number: 3, color: 'yellow' },
  { number: 13, color: 'yellow' },
  { number: 24, color: 'blue' },
  { number: 12, color: 'green' },
  { number: 20, color: 'red' },
  { number: 9, color: 'yellow' },
  { number: 4, color: 'pink' },
  { number: 6, color: 'red' },
  { number: 21, color: 'green' },
  { number: 16, color: 'blue' },
  { number: 14, color: 'red' },
  { number: 18, color: 'green' },
  { number: 11, color: 'pink' },
  { number: 5, color: 'yellow' },
  { number: 10, color: 'blue' },
  { number: 19, color: 'red' },
  { number: 2, color: 'yellow' },
  { number: 22, color: 'blue' },
  { number: 15, color: 'yellow' },
  { number: 17, color: 'green' },
  { number: 7, color: 'red' },
  { number: 1, color: 'yellow' },
  { number: 23, color: 'pink' },
  { number: 8, color: 'red' },
];

const CalendarContent = ({ days, calendarRoute }) => {
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

  const calendarDays = daysProps.map(({ number, color }) => ({
    number,
    color,
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

  console.log(tinselsLength, tinselsLength === 1);
  if (tinselsLength === 1) {
    return null;
  }

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
            calendarRoute={calendarRoute}
          />
        ))}
      </Tinsels>
    </>
  );
};

export default CalendarContent;
