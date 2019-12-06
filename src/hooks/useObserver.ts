import {
  useEffect,
  useMemo,
  useRef,
  createRef,
  useState,
  useCallback
} from "react";

import { PickerData } from "@/components/WheelPicker";
import { PickerItemRef } from "@/types/pickerItemRef";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const setRefs = (data: PickerData[]) => {
  return () =>
    data.reduce((result, value) => {
      result[value.id] = createRef<HTMLLIElement>();
      return result;
    }, {} as PickerItemRef);
};

const useObsever = (
  data: PickerData[],
  itemHeight: number,
  onChange: (target: Element) => void
) => {
  const root = useRef<HTMLUListElement | null>(null);
  const refs = useMemo(setRefs(data), [data]);
  const observer = useRef<IntersectionObserver | null>(null);
  const [activeID, setActiveID] = useState(data[0].id);
  const { onScroll } = useScrollAnimation(root, refs);

  const observerCallback: IntersectionObserverCallback = useCallback(
    (entries: IntersectionObserverEntry[]): void => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }

        const itemID = entry.target.getAttribute("data-itemid");
        if (!itemID) {
          return;
        }

        onScroll(data, itemID);
        setActiveID(itemID);
        onChange(entry.target);
      });
    },
    [onScroll, data, onChange]
  );

  useEffect(() => {
    if (!observer.current && root.current) {
      const margin =
        (100 - (itemHeight / root.current.clientHeight) * 100) / 2 + 1;
      observer.current = new IntersectionObserver(observerCallback, {
        root: root.current,
        rootMargin: `-${margin}% 0px`,
        threshold: 0
      });
      data.map(item => {
        const elm = refs[item.id].current;
        if (elm && observer.current) {
          observer.current.observe(elm);
        }
      });
    }
  }, [data, itemHeight, observerCallback, refs, root]);

  return {
    root,
    refs,
    activeID
  };
};

export default useObsever;
