import { RefObject, useState, useRef, useCallback } from "react";
import { PickerItemRef } from "@/types/pickerItemRef";

const useObserver = (
  root: RefObject<HTMLUListElement>,
  refs: PickerItemRef,
  onChange: (target: Element) => void
) => {
  const [activeID, setActiveID] = useState("0");
  const timer = useRef<number | null>(null);
  const observerCallback: IntersectionObserverCallback = useCallback(
    (entries: IntersectionObserverEntry[]): void => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }

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
      });
    },
    [onChange, refs, root]
  );

  return {
    activeID,
    observerCallback
  };
};

export default useObserver;
