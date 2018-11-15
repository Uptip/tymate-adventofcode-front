import React from 'react';
import styled, { css } from 'styled-components';
import { Redirect, Link } from 'react-router-dom';
import Spinner from 'react-md-spinner';

export const theme = {
  primaryGradient: 'linear-gradient(to bottom, #e9c450, #ecd17b)',
  primaryGradientDark: 'linear-gradient(to bottom, #ccaa45, #ccb46a)',
};

export const base = 16;
export const spacing = (input = 1) => `${input * base}px`;

export const viewportSizes = {
  desktop: 1200,
  medium: 960,
  tablet: 768,
};

const mediaQuery: Function = (...query) => (...rules) =>
  css`
    @media ${css(...query)} {
      ${css(...rules)};
    }
  `;

export const media = {
  tablet: mediaQuery`(min-width: ${viewportSizes.tablet / 16}em)`,
  medium: mediaQuery`(min-width: ${viewportSizes.medium / 16}em)`,
  desktop: mediaQuery`(min-width: ${viewportSizes.desktop / 16}em)`,
};

export const Modal = styled.dialog`
  background-color: #fff;
  width: 800px;
  max-width: calc(100vw - 32px);
  box-sizing: border-box;
  padding: 32px;
  text-align: center;
  position: absolute;
  z-index: 2;
  border-radius: 20px;
  box-shadow: 0 2px 60px rgba(0, 0, 0, 0.3);
  border: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;

  canvas {
    position: absolute;
    top: 0;
    left: 50%;
    right: 0;
    bottom: 0;
    z-index: 0;
    transform: translateX(-50%);
    border-radius: 20px;
  }
`;

export const ModalCloseButton = styled(Link)`
  position: absolute;
  right: 0.5em;
  top: 0.5em;
  font-size: 24px;
  color: inherit;
`;

export const ModalOverlay = styled(Link)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: block;
  background-color: transparent;
  z-index: 1;
  cursor: auto;
  backdrop-filter: blur(5px);
`;

export const ButtonWrapper = styled.button`
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: center;
  color: inherit;
  text-decoration: none;
  font-weight: 600;
  outline: none;
  border: 0;
  line-height: 1;
  padding: ${spacing(0.5)} ${spacing(2)};
  border-radius: 200px;
  transition: background 150ms ease;
  cursor: pointer;
  white-space: nowrap;
  font-size: 16px;

  > svg {
    margin-right: ${spacing(0.25)};
  }

  ${props =>
    props.variant === 'primary' &&
    css`
      box-shadow: none;
      background: ${({ theme }) => theme.primaryGradient};
      color: #fff;
      transition: opacity 150ms ease;
      font-weight: 600;

      &:hover {
        opacity: 0.9;
      }
    `};

  &:disabled {
    background-color: rgba(0, 0, 0, 0.12);
    color: rgba(0, 0, 0, 0.38);
    cursor: not-allowed;
  }
`;

export const Button = ({ isLoading, children, icon, ...props }) => (
  <ButtonWrapper
    {...props}
    as={Boolean(props.to) ? Link : null}
    disabled={props.disabled || isLoading}
  >
    {isLoading && (
      <Spinner
        size={24}
        style={{ marginRight: spacing(0.25) }}
        singleColor="currentColor"
      />
    )}
    {!isLoading && icon}
    {children}
  </ButtonWrapper>
);
