import { RefObject, useRef } from "react";
import { PickerItemRef } from "@/types/pickerItemRef";
import { PickerData } from "@/components/WheelPicker";

const useScrollAnimation = (
  root: RefObject<HTMLUListElement>,
  refs: PickerItemRef
) => {
  const timer = useRef<number | null>(null);

  const onScroll = (data: PickerData[], itemID: string) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    const firstID = data[0].id;
    const basicElm = refs[firstID].current;
    const currentElm = refs[itemID || firstID].current;
    const _root = root.current;
    if (_root && basicElm && currentElm) {
      timer.current = setTimeout(() => {
        const basicOffsetTop = basicElm.offsetTop;
        const currentOffsetTop = currentElm.offsetTop - basicOffsetTop;
        const targetTop = (basicOffsetTop * currentOffsetTop) / basicOffsetTop;
        _root.scrollTo(0, targetTop);
      }, 500);
    }
  };

  return { onScroll };
};

export default useScrollAnimation;
