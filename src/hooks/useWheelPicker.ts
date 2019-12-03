import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  createRef,
  RefObject
} from "react";
import { PickerData } from "@/components/WheelPicker";

const useWheelPicker = (
  data: PickerData[],
  onChange: (target: Element) => void
) => {
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
  }, [data, handleOnScroll, refs, root]);

  return {
    root,
    refs,
    activeID
  };
};

export default useWheelPicker;
