import React, { useMemo, useImperativeHandle, forwardRef } from "react";
import styled from "styled-components";
import WheelPickerItem from "../components/WheelPickerItem";
import useObsever from "../hooks/useObserver";

const List = styled.ul`
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
    width: string;
    backgroundColor: string;
    shadowColor: string;
    focusColor: string;
  }): string => `
    height: ${props.height}px;
    width: ${props.width};
    background-color: ${props.backgroundColor};
    box-shadow: 1px 3px 10px ${props.shadowColor} inset;
    &:focus {
      outline: 2px solid ${props.focusColor};
    }
  `}
`;

const calculateSpaceHeight = (height: number, itemHeight: number): number => {
  const limit = height / itemHeight / 2 - 0.5;
  return itemHeight * limit;
};

const setStyles = (styles: {
  width?: number;
  color?: string;
  activeColor?: string;
  fontSize?: number;
  backgroundColor?: string;
  shadowColor?: string;
  focusColor?: string;
}) => {
  const _color = styles.color || "#fff";
  return {
    color: _color,
    activeColor: styles.activeColor || _color,
    fontSize: styles.fontSize || 16,
    backgroundColor: styles.backgroundColor || "#555",
    shadowColor: styles.shadowColor || "#333",
    width: styles.width ? `${styles.width}px` : "100%",
    focusColor: styles.focusColor ? styles.focusColor : "blue"
  };
};

export interface PickerData {
  id: string;
  value: string | number;
}

export interface WheelPickerProps {
  data: PickerData[];
  selectedID: string;
  onChange: (target: Element) => void;
  height: number;
  itemHeight: number;
  idName?: string;
  titleID?: string;
  titleText?: string;
  width?: number;
  color?: string;
  activeColor?: string;
  fontSize?: number;
  backgroundColor?: string;
  shadowColor?: string;
  focusColor?: string;
}

const WheelPicker: React.FC<WheelPickerProps> = (
  {
    data,
    selectedID,
    onChange,
    height,
    itemHeight,
    idName,
    titleID,
    titleText,
    width,
    color,
    activeColor,
    fontSize,
    backgroundColor,
    shadowColor,
    focusColor
  },
  ref
) => {
  const { root, refs, activeID } = useObsever(
    data,
    selectedID,
    itemHeight,
    onChange
  );
  const styles = setStyles({
    width,
    color,
    activeColor,
    fontSize,
    backgroundColor,
    shadowColor,
    focusColor
  });

  const spaceHeight = useMemo(() => calculateSpaceHeight(height, itemHeight), [
    height,
    itemHeight
  ]);

  useImperativeHandle(ref, () => ({
    focus: () => {
      root.current && root.current.focus();
    },
    blur: () => {
      root.current && root.current.blur();
    }
  }));

  return (
    <List
      id={idName}
      tabIndex={0}
      role="menu"
      aria-labelledby={titleID}
      aria-label={titleText}
      ref={root}
      data-testid="picker-list"
      height={height}
      width={styles.width}
      backgroundColor={styles.backgroundColor}
      shadowColor={styles.shadowColor}
      focusColor={styles.focusColor}
    >
      <div style={{ height: spaceHeight }} />
      {data.map(item => (
        <WheelPickerItem
          key={item.id}
          {...item}
          {...styles}
          height={itemHeight}
          activeID={activeID}
          forwardRef={refs[item.id]}
        />
      ))}
      <div style={{ height: spaceHeight }} />
    </List>
  );
};

export interface WheelPickerRef {
  focus: () => void;
  blur: () => void;
}

export default forwardRef<WheelPickerRef, WheelPickerProps>(WheelPicker);
