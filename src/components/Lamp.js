import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import One from 'components/numbers/1';
import Two from 'components/numbers/2';
import Three from 'components/numbers/3';
import Four from 'components/numbers/4';
import Five from 'components/numbers/5';
import Six from 'components/numbers/6';
import Seven from 'components/numbers/7';
import Eight from 'components/numbers/8';
import Nine from 'components/numbers/9';
import Ten from 'components/numbers/10';
import Eleven from 'components/numbers/11';
import Twelve from 'components/numbers/12';
import Thirteen from 'components/numbers/13';
import Fourteen from 'components/numbers/14';
import Fiveteen from 'components/numbers/15';
import Sixteen from 'components/numbers/16';
import Seventeen from 'components/numbers/17';
import Eighteen from 'components/numbers/18';
import Nineteen from 'components/numbers/19';
import Twenty from 'components/numbers/20';
import TwentyOne from 'components/numbers/21';
import TwentyTwo from 'components/numbers/22';
import TwentyThree from 'components/numbers/23';
import TwentyFour from 'components/numbers/24';

const Wrapper = styled.div`
  display: block;

  svg {
    display: block;
    max-width: 100%;
  }
`;

const NumberContainer = styled.div`
  position: absolute;
  padding-top: 0.5em;
  max-width: 12vw;

  svg {
    display: block;
    max-width: 100%;
  }
`;

const Circle = styled.circle`
  opacity: 0;
  transition: opacity 150ms ease;

  a:visited &,
  a:active &,
  a:hover & {
    opacity: 1;
  }

  ${props =>
    props.isVisible &&
    css`
      opacity: 1;
    `};
`;

const LampColor = ({ color, clicked }) => {
  switch (color) {
    case 'green':
      return (
        <>
          <stop stopColor="#B4EC51" offset="0%" />
          <stop stopColor="#429321" offset="100%" />
        </>
      );
    case 'red':
      return (
        <>
          <stop stopColor="#F5515F" offset="0%" />
          <stop stopColor="#9F041B" offset="100%" />
        </>
      );
    case 'blue':
      return (
        <>
          <stop stopColor="#B4EC51" offset="0%" />
          <stop stopColor="#3023AE" offset="100%" />
        </>
      );
    case 'pink':
      return (
        <>
          <stop stopColor="#F551DC" offset="0%" />
          <stop stopColor="#9F0482" offset="100%" />
        </>
      );
    case 'yellow':
    default:
      return (
        <>
          <stop stopColor="#FAD961" offset="0%" />
          <stop stopColor="#F76B1C" offset="100%" />
        </>
      );
  }
};

const LampGlow = ({ color }) => {
  switch (color) {
    case 'green':
      return (
        <>
          <stop stopColor="#D7FFE2" stopOpacity="1" offset="0%" />
          <stop stopColor="#07D105" stopOpacity="0.65" offset="15%" />
          <stop stopColor="#56BD1C" stopOpacity="0" offset="100%" />
        </>
      );
    case 'blue':
      return (
        <>
          <stop stopColor="#E5EFFF" stopOpacity="0.8" offset="0%" />
          <stop stopColor="#0074FF" stopOpacity="0.5" offset="15%" />
          <stop stopColor="#358CF6" stopOpacity="0" offset="100%" />
        </>
      );
    case 'red':
      return (
        <>
          <stop stopColor="#ffeaec" stopOpacity="0.8" offset="0%" />
          <stop stopColor="#F3001D" stopOpacity="0.5" offset="15%" />
          <stop stopColor="#9F041B" stopOpacity="0" offset="100%" />
        </>
      );
    case 'yellow':
    default:
      return (
        <>
          <stop stopColor="#FFF4D7" stopOpacity="1" offset="0%" />
          <stop stopColor="#D19405" stopOpacity="0.65" offset="25%" />
          <stop stopColor="#B9BD1C" stopOpacity="0" offset="100%" />
        </>
      );
  }
};

const Number = ({ number }) => {
  switch (number) {
    case 1:
      return <One />;
    case 2:
      return <Two />;
    case 3:
      return <Three />;
    case 4:
      return <Four />;
    case 5:
      return <Five />;
    case 6:
      return <Six />;
    case 7:
      return <Seven />;
    case 8:
      return <Eight />;
    case 9:
      return <Nine />;
    case 10:
      return <Ten />;
    case 11:
      return <Eleven />;
    case 12:
      return <Twelve />;
    case 13:
      return <Thirteen />;
    case 14:
      return <Fourteen />;
    case 15:
      return <Fiveteen />;
    case 16:
      return <Sixteen />;
    case 17:
      return <Seventeen />;
    case 18:
      return <Eighteen />;
    case 19:
      return <Nineteen />;
    case 20:
      return <Twenty />;
    case 21:
      return <TwentyOne />;
    case 22:
      return <TwentyTwo />;
    case 23:
      return <TwentyThree />;
    case 24:
      return <TwentyFour />;
    default:
      return null;
  }
};

const Lamp = ({
  dayId,
  to,
  color,
  number,
  textAngle,
  style,
  calendarRoute,
  linkTo,
}) => {
  const viewedDays = JSON.parse(localStorage.getItem('viewedDays')) || [];
  const isViewed = viewedDays.indexOf(dayId) > -1;

  return (
    <>
      <Wrapper
        as={Boolean(linkTo) ? Link : undefined}
        style={style}
        to={linkTo}
      >
        <svg viewBox="0 0 85 85" width={85} height={85}>
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id={`background-${color}`}
            >
              <LampColor color={color} />
            </linearGradient>

            <radialGradient
              cx="50%"
              cy="50%"
              fx="50%"
              fy="50%"
              r="50%"
              id={`light-${color}`}
            >
              <LampGlow color={color} />
            </radialGradient>
          </defs>
          <g fill="none" fillRule="evenodd">
            <path
              d="M45.2 47s16.71 16.012-2.259 37.62a1.087 1.087 0 0 1-1.643.009c-19.216-21.39-2.689-37.592-2.689-37.592l3.295-.018L45.2 47z"
              fill={`url(#background-${color})`}
            />
            <path
              d="M45.2 47s16.71 16.012-2.259 37.62a1.087 1.087 0 0 1-1.643.009 55.782 55.782 0 0 1-3.26-3.965c9.949-11.97 11.237-23.186 3.866-33.645L45.2 47z"
              fillOpacity={0.05}
              fill="#000"
            />
            <path
              d="M39 49l-2.816 21c-2.948-9.44.225-16.916 2.816-21z"
              fillOpacity={0.4}
              fill="#FFF"
            />
            <path
              d="M37.813 40.31l-.018-3.14a1.13 1.13 0 0 1 1.122-1.134L45.042 36c.62-.003 1.13.502 1.134 1.122l.019 3.242h.078c.882.007 1.614.742 1.63 1.634L48 47.387A1.571 1.571 0 0 1 46.427 49l-8.7-.058c-.88-.005-1.615-.74-1.63-1.633L36 41.92a1.57 1.57 0 0 1 1.573-1.612l.24.002z"
              fill="#000"
            />
            <Circle
              fill={`url(#light-${color})`}
              cx={42}
              cy={63}
              r={22}
              isVisible={Boolean(linkTo) && !isViewed}
            />
          </g>
        </svg>
      </Wrapper>

      <NumberContainer
        as={Boolean(linkTo) ? Link : undefined}
        to={linkTo}
        style={{
          ...style,
          left: style.left,
          top: style.top + 50,
          transform: 'translateX(-50%)',
        }}
      >
        <Number number={number} />
      </NumberContainer>
    </>
  );
};

export default Lamp;
