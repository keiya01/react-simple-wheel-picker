import React, {
  useMemo,
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect
} from "react";
import styled from "styled-components";
import WheelPickerItem from "../components/WheelPickerItem";
import useObsever from "../hooks/useObserver";

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
  onChange: (data: PickerData) => void;
  height: number;
  itemHeight: number;
  idName?: string;
  titleID?: string;
  titleText?: string;
  required?: boolean;
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
    focusColor,
    required
  },
  ref
) => {
  const [_itemHeight, setItemHeight] = useState(itemHeight);
  const [pressedKeys, setPressedKeys] = useState<{ [key: number]: boolean }>(
    {}
  );
  const { root, refs, activeID } = useObsever(
    data,
    selectedID,
    _itemHeight,
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

  const spaceHeight = useMemo(() => calculateSpaceHeight(height, _itemHeight), [
    _itemHeight,
    height
  ]);

  const handleOnClick = (e: React.MouseEvent<HTMLLIElement>) => {
    if (root.current) {
      root.current.scrollTo(0, e.currentTarget.offsetTop - spaceHeight);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLUListElement>) => {
    e.persist();
    const code = e.keyCode;
    if (pressedKeys[code]) {
      setPressedKeys(prev => ({
        ...prev,
        [code]: false
      }));
    }
  };

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const target = e.currentTarget;
    const code = e.keyCode;

    if (!pressedKeys[code] && code === 16) {
      e.persist();
      setPressedKeys(prev => ({
        ...prev,
        [e.keyCode]: true
      }));
    }

    if ((!pressedKeys[16] && code === 9) || code === 40) {
      e.preventDefault();
      target.scrollTo(0, target.scrollTop + _itemHeight);
    }

    if ((pressedKeys[16] && code === 9) || code === 38) {
      e.preventDefault();
      target.scrollTo(0, target.scrollTop - _itemHeight);
    }

    if (code === 32 || code === 27) {
      e.preventDefault();
      target.blur();
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        root.current && root.current.focus();
      },
      blur: () => {
        root.current && root.current.blur();
      }
    }),
    [root]
  );

  useEffect(() => {
    let maxHeight = itemHeight;
    Object.keys(refs).map(id => {
      const elm = refs[id].current;
      if (!elm) {
        return;
      }

      const h = elm.clientHeight;
      if (h > maxHeight) {
        maxHeight = h;
      }
    });
    setItemHeight(maxHeight);
  }, [itemHeight, refs]);

  return (
    <List
      id={idName}
      tabIndex={0}
      role="listbox"
      aria-labelledby={titleID}
      aria-label={titleText}
      aria-required={required}
      ref={root}
      data-testid="picker-list"
      height={height}
      width={styles.width}
      backgroundColor={styles.backgroundColor}
      shadowColor={styles.shadowColor}
      focusColor={styles.focusColor}
      onKeyUp={handleKeyUp}
      onKeyPress={handleOnKeyPress}
      onKeyDown={handleOnKeyPress}
    >
      <div style={{ height: spaceHeight }} />
      {data.map(item => (
        <WheelPickerItem
          key={item.id}
          {...item}
          {...styles}
          height={_itemHeight}
          activeID={activeID}
          onClick={handleOnClick}
          ref={refs[item.id]}
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
