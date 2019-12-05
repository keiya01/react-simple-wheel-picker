import { useEffect, useMemo, useRef, createRef } from "react";

import { PickerData } from "@/components/WheelPicker";
import { PickerItemRef } from "@/types/pickerItemRef";
import useScrollAction from "@/hooks/useObserver";

const setRefs = (data: PickerData[]) => {
  return () =>
    data.reduce((result, value) => {
      result[value.id] = createRef<HTMLLIElement>();
      return result;
    }, {} as PickerItemRef);
};

const useWheelPicker = (
  data: PickerData[],
  onChange: (target: Element) => void
) => {
  const root = useRef<HTMLUListElement | null>(null);
  const refs = useMemo(setRefs(data), [data]);
  const observer = useRef<IntersectionObserver | null>(null);
  const { activeID, observerCallback } = useScrollAction(root, refs, onChange);

  useEffect(() => {
    if (!observer.current && root.current) {
      observer.current = new IntersectionObserver(observerCallback, {
        root: root.current,
        rootMargin: "-50% 0px",
        threshold: 0
      });
      data.map(item => {
        const elm = refs[item.id].current;
        if (elm && observer.current) {
          observer.current.observe(elm);
        }
      });
    }
  }, [data, observerCallback, refs, root]);

  return {
    root,
    refs,
    activeID
  };
};

export default useWheelPicker;
