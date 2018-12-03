import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
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
  transform: translateX(-50%);
  opacity: 0.5;

  ${props =>
    props.isLit &&
    css`
      opacity: 1;
    `};

  svg {
    display: block;
    max-width: 100%;
  }
`;

const Circle = styled.circle`
  opacity: 1;
  transition: opacity 50ms ease;

  ${props =>
    props.isFlickering &&
    css`
      opacity: 0.4;
    `};
`;

const Path = styled.path`
  opacity: 0.5;
  transition: opacity 50ms ease;

  ${props =>
    props.isLit &&
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
          <stop stopColor="#91CAF7" offset="0%" />
          <stop stopColor="#2C9CF4" offset="100%" />
        </>
      );
    case 'pink':
      return (
        <>
          <stop stopColor="#F551DC" offset="0%" />
          <stop stopColor="#9F0482" offset="100%" />
        </>
      );
    case 'off':
      return (
        <>
          <stop stopColor="#f6f6f6" offset="0%" />
          <stop stopColor="#999999" offset="100%" />
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
          <stop stopColor="#E5EFFF" stopOpacity="1" offset="0%" />
          <stop stopColor="#0074FF" stopOpacity="0.70" offset="15%" />
          <stop stopColor="#358CF6" stopOpacity="0" offset="100%" />
        </>
      );
    case 'red':
      return (
        <>
          <stop stopColor="#CF7482" stopOpacity="1" offset="0%" />
          <stop stopColor="#9F041B" stopOpacity="0" offset="100%" />
        </>
      );
    case 'pink':
      return (
        <>
          <stop stopColor="#ED42B4" stopOpacity="1" offset="0%" />
          <stop stopColor="#ED42B4" stopOpacity="0.25" offset="70%" />
          <stop stopColor="#ED42B4" stopOpacity="0" offset="100%" />
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
  color,
  number,
  textAngle,
  style,
  calendarRoute,
  linkTo,
  isTeapot,
  location,
}) => {
  const viewedDays = JSON.parse(localStorage.getItem('viewedDays')) || [];
  const isViewed = viewedDays.indexOf(dayId) > -1;
  const isLit = Boolean(linkTo);
  const [shouldBeFlickering, setShouldBeFlickering] = useState(
    !isViewed && isLit,
  );
  const [isGlowing, setIsGlowing] = useState(isLit);

  let glowTimeout;

  useEffect(
    () => {
      if (!shouldBeFlickering) {
        return;
      }

      if (isGlowing) {
        glowTimeout = setTimeout(
          () => setIsGlowing(false),
          Math.random() * 2000,
        );
      }

      if (!isGlowing) {
        glowTimeout = setTimeout(() => setIsGlowing(true), 50);
      }

      return () => clearTimeout(glowTimeout);
    },
    [isGlowing, shouldBeFlickering],
  );

  useEffect(
    () => {
      if (location.pathname.indexOf(`/jours/${dayId}`) > -1) {
        setShouldBeFlickering(false);
      }
    },
    [location.pathname],
  );

  return (
    <>
      <Wrapper
        as={Boolean(linkTo) ? Link : undefined}
        style={style}
        to={linkTo}
      >
        <svg width={100} height={100}>
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
            {Boolean(linkTo) && (
              <Circle
                fill={`url(#light-${color})`}
                cx={50}
                cy={73}
                r={27}
                isFlickering={Boolean(linkTo) && !isGlowing}
                style={{
                  animationDelay: `${Math.floor(Math.random() * 2000)}ms`,
                }}
              />
            )}

            {!isTeapot && (
              <>
                <Path
                  d="M54.2 57s16.71 16.012-2.259 37.62a1.087 1.087 0 0 1-1.643.009c-19.216-21.39-2.689-37.592-2.689-37.592l3.295-.018L54.2 57z"
                  fill={`url(#background-${color})`}
                  isLit={isGlowing}
                />
                <path
                  d="M54.2 57s16.71 16.012-2.259 37.62a1.087 1.087 0 0 1-1.643.009 55.782 55.782 0 0 1-3.26-3.965c9.949-11.97 11.237-23.186 3.866-33.645L54.2 57z"
                  fillOpacity={0.05}
                  fill="#000"
                />
                <path
                  d="M48 59l-2.816 21c-2.948-9.44.225-16.916 2.816-21z"
                  fillOpacity={0.4}
                  fill="#FFF"
                />
                <path
                  d="M46.813 50.31l-.018-3.14a1.13 1.13 0 0 1 1.122-1.134L54.042 46c.62-.003 1.13.502 1.134 1.122l.019 3.242h.078c.882.007 1.614.742 1.63 1.634L57 57.387A1.571 1.571 0 0 1 55.427 59l-8.7-.058c-.88-.005-1.615-.74-1.63-1.633L45 51.92a1.57 1.57 0 0 1 1.573-1.612l.24.002z"
                  fill="#000"
                />
              </>
            )}

            {isTeapot && (
              <>
                <g fill="none" fillRule="evenodd">
                  <g transform="rotate(-90 61.5 30.5)">
                    <Path
                      d="M2.435 11.011c-.263-.186-.547-.203-.76.038L.082 12.853c-.068.09-.18.32.089.646l8.922 10.613a12.11 12.11 0 0 1-.801-9.078l-5.857-4.023z"
                      fill="#A61C78"
                      isLit={isGlowing}
                    />
                    <Path
                      d="M7.765 18.316l-6.502-6.03c-.234-.22-.242-.413-.208-.535l-.973 1.102c-.068.09-.18.32.089.646l8.922 10.613a12.016 12.016 0 0 1-1.328-5.796z"
                      fill="#8C1865"
                      isLit={isGlowing}
                    />
                    <Path
                      d="M30.296 12.662c.416.74.757 1.527 1.013 2.352 3.044-1.016 6.126 1.166 6.126 4.27 0 2.488-2.027 4.504-4.527 4.504-.674 0-1.474-.148-2.05-.41a12.1 12.1 0 0 1-1.256 2.23c.948.467 2.176.731 3.306.731 3.917 0 7.092-3.158 7.092-7.055 0-4.95-4.99-8.35-9.704-6.622z"
                      fill="#A61C78"
                      isLit={isGlowing}
                    />
                    <Path
                      d="M15.582 29.984h8.442c8.15-2.988 10.46-13.088 5.052-19.37H10.53c-5.415 6.289-3.09 16.384 5.051 19.37z"
                      fill="#ED42B4"
                      isLit={isGlowing}
                    />
                    <Path
                      d="M17.477 10.615h-6.946c-5.415 6.288-3.09 16.384 5.051 19.37h8.442l.024-.01c-7.142-3.65-9.984-12.265-6.571-19.36z"
                      fill="#C93E9B"
                      isLit={isGlowing}
                    />
                    <Path
                      d="M10.338 8.292h18.93c-5.15-5.982-13.772-5.99-18.93 0z"
                      fill="#ED42B4"
                      isLit={isGlowing}
                    />
                    <Path
                      d="M21.529 3.924c-4.308-.643-8.45 1.183-11.191 4.368h5.876c1.326-2.244 3.197-3.907 5.315-4.368z"
                      fill="#C93E9B"
                      isLit={isGlowing}
                    />
                    <ellipse
                      fill="#A61C78"
                      cx={19.803}
                      cy={1.906}
                      rx={1.899}
                      ry={1.889}
                    />
                    <Path
                      d="M20.753.271c-1.26-.725-2.849.18-2.849 1.636 0 1.457 1.59 2.36 2.849 1.635a1.884 1.884 0 0 1 0-3.27z"
                      fill="#8C1865"
                      isLit={isGlowing}
                    />
                    <path
                      d="M29.534 10.695H10.072c-.62 0-1.236-.454-1.236-1.333 0-.68.553-1.23 1.236-1.23h19.462c.683 0 1.237.55 1.237 1.23 0 .883-.623 1.333-1.237 1.333z"
                      fill="#A61C78"
                    />
                    <path
                      d="M29.534 9.413H10.072c-.468 0-.875-.259-1.085-.64-.42.762.038 1.922 1.085 1.922h19.462c.604 0 1.237-.439 1.237-1.333a1.22 1.22 0 0 0-.151-.59c-.21.382-.617.641-1.086.641z"
                      fill="#8C1865"
                    />
                  </g>
                  <path
                    d="M46.313 46.81l-.018-3.14a1.13 1.13 0 0 1 1.122-1.134l6.125-.036c.62-.003 1.13.502 1.134 1.122l.019 3.242h.078c.882.007 1.613.742 1.63 1.634l.096 5.389a1.571 1.571 0 0 1-1.572 1.613l-8.7-.058c-.88-.005-1.614-.74-1.63-1.633l-.096-5.389a1.57 1.57 0 0 1 1.572-1.612l.24.002z"
                    fill="#000"
                  />
                </g>
              </>
            )}
          </g>
        </svg>
      </Wrapper>

      <NumberContainer
        as={Boolean(linkTo) ? Link : undefined}
        to={linkTo}
        style={{
          ...style,
          top: style.top + 100,
        }}
        isLit={isLit}
      >
        <Number number={number} />
      </NumberContainer>
    </>
  );
};

export default withRouter(Lamp);
