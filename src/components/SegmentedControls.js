import React from 'react';
import styled, { css } from 'styled-components';

const Segmented = styled.div`
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  display: inline-block;
  display: flex;
  margin-bottom: 1rem;
`;

const Item = styled.button`
  padding: 0.5rem 1rem;
  border: 0;
  border-right: 1px solid ${({ theme }) => theme.primary};
  display: inline-block;
  background-color: transparent;
  border-radius: 0;
  color: ${({ theme }) => theme.primary};
  outline: none;
  flex: 1;
  min-height: 2rem;
  cursor: pointer;
  background-color: #fff;
  font-weight: 600;
  white-space: nowrap;

  &:hover {
    opacity: 0.8;
  }

  &:last-child {
    border-right: 0;
  }

  ${props =>
    props.isActive &&
    css`
      background-color: ${({ theme }) => theme.primary};
      color: #fff;

      &:hover {
        opacity: 1;
      }
    `};
`;

const SegmentedControls = ({
  values,
  activeValue,
  onSelect,
  onlyDisplaysIcons,
}) => (
  <Segmented>
    {values.map(({ value, label }, key) => (
      <Item
        key={key}
        isActive={value === activeValue}
        onClick={() => onSelect(value)}
        type="button"
      >
        {label}
      </Item>
    ))}
  </Segmented>
);

SegmentedControls.defaultProps = {
  values: [],
  onSelect: () => null,
};

export default SegmentedControls;
