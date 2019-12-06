import React, { RefObject } from "react";
import styled from "styled-components";

const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform ease 100ms;
  ${(props: {
    isActive: boolean;
    height: number;
    color: string;
    fontSize: number;
    activeColor: string;
  }): string => `
    height: ${props.height}px;
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
  forwardRef
}) => {
  return (
    <Item
      ref={forwardRef}
      data-itemid={id}
      data-testid="picker-item"
      isActive={id === activeID}
      height={height}
      color={color}
      activeColor={activeColor}
      fontSize={fontSize}
    >
      {value}
    </Item>
  );
};

export default WheelPickerItem;
