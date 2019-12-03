import "intersection-observer";
import React from "react";
import styled from "styled-components";
import WheelPickerItem from "@/components/WheelPickerItem";
import useWheelPicker from "@/hooks/useWheelPicker";

const List = styled.ul`
  position: relative;
  margin: 0;
  padding: 0;
  display: inline-block;
  list-style: none;
  overflow-y: scroll;
  overflow-x: hidden;
  text-align: center;
  padding: 0 20px;
  ${(props: {
    height: number;
    width: number;
    backgroundColor: string;
    shadowColor: string;
  }): string => `
    height: ${props.height}px;
    width: ${props.width}px;
    background-color: ${props.backgroundColor};
    box-shadow: 1px 3px 10px ${props.shadowColor} inset;
  `}
`;

const calculateSpaceHeight = (height: number, limit: number): number => {
  const itemHeight = height / limit;
  if (limit % 2 === 0) {
    const itemHeightCenter = itemHeight / 2;
    const totalItemSpace = limit / 2 - 1;
    const nextHeight = itemHeight * totalItemSpace;
    return nextHeight + itemHeightCenter;
  }
  const totalItemSpace = Math.floor(limit / 2);
  return itemHeight * totalItemSpace;
};

const setStyles = (styles: {
  color?: string;
  activeColor?: string;
  fontSize?: number;
  backgroundColor?: string;
  shadowColor?: string;
  limit?: number;
}) => {
  const _color = styles.color || "#fff";
  return {
    color: _color,
    activeColor: styles.activeColor || _color,
    fontSize: styles.fontSize || 16,
    backgroundColor: styles.backgroundColor || "#555",
    shadowColor: styles.shadowColor || "#333",
    limit: styles.limit || 5
  };
};

export interface PickerData {
  id: string;
  value: string | number;
}

export interface WheelPickerProps {
  data: PickerData[];
  onChange: (target: Element) => void;
  height: number;
  width: number;
  color?: string;
  activeColor?: string;
  fontSize?: number;
  backgroundColor?: string;
  shadowColor?: string;
  limit?: number;
}

const WheelPicker: React.FC<WheelPickerProps> = ({
  data,
  onChange,
  height,
  width,
  color,
  activeColor,
  fontSize,
  backgroundColor,
  shadowColor,
  limit
}) => {
  const { root, refs, activeID } = useWheelPicker(data, onChange);
  const styles = setStyles({
    color,
    activeColor,
    fontSize,
    backgroundColor,
    shadowColor,
    limit
  });

  return (
    <List
      ref={root}
      data-testid="picker-list"
      height={height}
      width={width}
      backgroundColor={styles.backgroundColor}
      shadowColor={styles.shadowColor}
    >
      <div style={{ height: calculateSpaceHeight(height, styles.limit) }} />
      {data.map(item => (
        <WheelPickerItem
          key={item.id}
          {...item}
          {...styles}
          height={height}
          activeID={activeID}
          forwardRef={refs[item.id]}
        />
      ))}
      <div style={{ height: calculateSpaceHeight(height, styles.limit) }} />
    </List>
  );
};

export default WheelPicker;
