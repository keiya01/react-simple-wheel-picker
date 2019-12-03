import React, { RefObject } from "react";
import styled from "styled-components";

const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform ease 100ms;
  font-size: 16px;
  ${(props: {
    isActive: boolean;
    height: number;
    color: string;
    fontSize: number;
    limit: number;
    activeColor: string;
  }): string => `
    height: ${props.height / props.limit}px;
    color: ${props.isActive ? props.activeColor : props.color};
    font-size: ${props.fontSize}px;
    font-weight: ${props.isActive ? "bold" : "linear"};
    ${props.isActive && `transform: scale(1.2);`}
  `}
`;

export interface WheelPickerItemProps {
  id: string;
  value: string | number;
  activeID: string;
  height: number;
  color: string;
  activeColor: string;
  fontSize: number;
  limit: number;
  forwardRef: RefObject<HTMLLIElement>;
}

const WheelPickerItem: React.FC<WheelPickerItemProps> = ({
  id,
  value,
  activeID,
  height,
  color,
  activeColor,
  fontSize,
  limit,
  forwardRef
}) => {
  return (
    <Item
      ref={forwardRef}
      data-itemid={id}
      data-testid="picker-item"
      height={height}
      isActive={id === activeID}
      color={color}
      activeColor={activeColor}
      fontSize={fontSize}
      limit={limit}
    >
      {value}
    </Item>
  );
};

export default WheelPickerItem;
