import "intersection-observer";
import React, {
  useRef,
  useEffect,
  useCallback,
  createRef,
  RefObject,
  useMemo,
  useState
} from "react";
import styled from "styled-components";
import WheelPickerItem from "./WheelPickerItem";

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
  backgroudColor?: string;
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
  backgroudColor,
  shadowColor,
  limit
}) => {
  const [activeID, setActiveID] = useState("0");
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
  const styles = useMemo(() => {
    const _color = color || "#fff";
    return {
      color: _color,
      activeColor: activeColor || _color,
      fontSize: fontSize || 16,
      backgroundColor: backgroudColor || "#555",
      shadowColor: shadowColor || "#333",
      limit: limit || 5
    };
  }, [activeColor, backgroudColor, color, fontSize, limit, shadowColor]);

  const timer = useRef<number | null>(null);
  const handleOnScroll: IntersectionObserverCallback = useCallback(
    (entries: IntersectionObserverEntry[]): void => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (timer.current) {
            clearTimeout(timer.current);
          }

          const itemID = entry.target.getAttribute("data-itemid");
          const firstElm = refs[0].current;
          const currentElm = refs[itemID || 0].current;
          const _root = root.current;
          if (_root && firstElm && currentElm) {
            timer.current = setTimeout(() => {
              const basicOffsetTop = firstElm.offsetTop;
              const currentOffsetTop = currentElm.offsetTop - basicOffsetTop;
              const targetTop =
                (basicOffsetTop * currentOffsetTop) / basicOffsetTop;
              _root.scrollTo(0, targetTop);
            }, 500);
          }

          if (itemID) {
            setActiveID(itemID);
          }
          onChange(entry.target);
        }
      });
    },
    [onChange, refs]
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
      height={height}
      width={width}
      backgroundColor={styles.backgroundColor}
      shadowColor={styles.shadowColor}
    >
      <div style={{ height: calculateSpaceHeight(height, styles.limit) }} />
      {data.map(item => (
        <WheelPickerItem
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
