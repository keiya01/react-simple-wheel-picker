import "intersection-observer";
import React, {
  useRef,
  useEffect,
  useCallback,
  createRef,
  RefObject,
  useMemo
} from "react";
import styled from "styled-components";

const List = styled.ul`
  position: relative;
  margin: 0;
  padding: 0;
  display: inline-block;
  list-style: none;
  overflow-y: scroll;
  text-align: center;
  ${(props: {
    height: number;
    width: number;
    backgroundColor?: string;
    shadowColor?: string;
  }): string => `
    height: ${props.height}px;
    width: ${props.width}px;
    background-color: ${props.backgroundColor || "#555"};
    box-shadow: 1px 3px 10px ${props.shadowColor || "#333"} inset;
  `}
`;

const FontSize = 16;
const Item = styled.li`
  padding: 5px 0;
  ${(props: { fontSize?: number; color?: string }): string => `
    font-size: ${props.fontSize || FontSize}px;
    color: ${props.color || "#fff"};
  `}
`;

export interface PickerData {
  id: string;
  value: string | number;
}

export interface WheelPickerProps {
  data: PickerData[];
  onChange: (target: Element) => void;
  height: number;
  width: number;
  fontSize?: number;
  color?: string;
  backgroudColor?: string;
  shadowColor?: string;
}

const WheelPicker: React.FC<WheelPickerProps> = ({
  data,
  onChange,
  height,
  width,
  fontSize,
  color,
  backgroudColor,
  shadowColor
}) => {
  const root = useRef<HTMLUListElement | null>(null);
  const refs = useMemo(
    () =>
      data.reduce((result, value) => {
        result[value.id] = createRef<HTMLLIElement>();
        return result;
      }, {} as { [key: string]: RefObject<HTMLLIElement> }),
    [data]
  );
  const observer = useRef<IntersectionObserver | null>(null);

  const handleOnScroll: IntersectionObserverCallback = useCallback(
    (entries: IntersectionObserverEntry[]): void => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          onChange(entry.target);
        }
      });
    },
    [onChange]
  );

  useEffect(() => {
    if (!observer.current && root.current) {
      const option: IntersectionObserverInit = {
        root: root.current,
        rootMargin: "-50% 0px",
        threshold: 0
      };
      observer.current = new IntersectionObserver(handleOnScroll, option);
      data.map(item => {
        const elm = refs[item.id].current;
        if (elm && observer.current) {
          observer.current.observe(elm);
        }
      });
    }
  }, [data, data.length, handleOnScroll, refs, root]);

  return (
    <List
      ref={root}
      data-testid="picker-list"
      width={width}
      height={height}
      backgroundColor={backgroudColor}
      shadowColor={shadowColor}
    >
      <div style={{ height: Math.floor(height / 3) }} />
      {data.map(item => (
        <Item
          key={item.id}
          ref={refs[item.id]}
          data-testid="picker-item"
          color={color}
          fontSize={fontSize}
        >
          {item.value}
        </Item>
      ))}
      <div style={{ height: Math.floor(height / 3) }} />
    </List>
  );
};

export default WheelPicker;
