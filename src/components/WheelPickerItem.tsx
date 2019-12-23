import React, { forwardRef } from "react";
import styled, { keyframes } from "styled-components";

const Item = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: left;
  transition: transform ease 100ms;
  ${(props: { height: number }): string => `
    min-height: ${props.height}px;
  `}
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ICON_WIDTH = 20;
const Icon = styled.span`
  position: absolute;
  top: 0;
  bottom: 0;
  left: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${ICON_WIDTH}px;
  opacity: 0;
  animation: ${fadeIn} 200ms ease-in;
  animation-fill-mode: forwards;
  animation-delay: 200ms;
  ${(props: { fontSize: number }) => `
    font-size: ${props.fontSize};
  `}
`;

const Text = styled.p`
  margin: 0;
  text-align: left;
  word-wrap: break-word;
  padding-left: 10px;
  ${(props: {
    isActive: boolean;
    color: string;
    fontSize: number;
    activeColor: string;
  }): string => `
    color: ${props.isActive ? props.activeColor : props.color};
    font-size: ${props.fontSize}px;
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
      height={height}
    >
      {selected && <Icon fontSize={fontSize}>&#10003;</Icon>}
      <span style={{ width: ICON_WIDTH }}></span>
      <Text
        isActive={selected}
        color={color}
        activeColor={activeColor}
        fontSize={fontSize}
      >
        {value}
      </Text>
    </Item>
  );
};

export default forwardRef<HTMLLIElement, WheelPickerItemProps>(WheelPickerItem);
