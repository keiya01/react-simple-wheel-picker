import React, { forwardRef } from "react";
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
    ${props.isActive && `transform: scale(1.1);`}
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
}

const WheelPickerItem: React.FC<WheelPickerItemProps> = (
  { id, value, activeID, height, color, activeColor, fontSize },
  ref
) => {
  const selected = id === activeID;
  return (
    <Item
      role="option"
      aria-selected={selected}
      aria-labelledby={value.toString()}
      ref={ref}
      data-itemid={id}
      isActive={selected}
      height={height}
      color={color}
      activeColor={activeColor}
      fontSize={fontSize}
    >
      {value}
    </Item>
  );
};

export default forwardRef<HTMLLIElement, WheelPickerItemProps>(WheelPickerItem);
