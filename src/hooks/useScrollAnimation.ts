import { RefObject, useRef } from "react";
import { PickerItemRef } from "../types/pickerItemRef";
import { PickerData } from "../components/WheelPicker";

const easeOutCubic = (t: number, b: number, c: number, d: number) => {
  t /= d;
  t--;
  return c * (t * t * t + 1) + b;
};

const setScrollAnimation = (
  root: HTMLUListElement,
  currentPosition: number,
  changingValue: number
) => {
  let start = 1;
  let isStop = false;
  const animation = () => {
    if (isStop) return;
    const offset = easeOutCubic(
      start / 100,
      currentPosition,
      changingValue,
      0.1
    );
    requestAnimationFrame(animation);
    root.scrollTo(0, offset);
    const target = currentPosition + changingValue;
    start += 1;
    isStop = offset === target;
  };

  return animation;
};

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
        const targetOffsetTop = currentElm.offsetTop - basicOffsetTop;
        const animation = setScrollAnimation(
          _root,
          _root.scrollTop,
          targetOffsetTop - _root.scrollTop
        );
        requestAnimationFrame(animation);
      }, 500);
    }
  };

  return onScroll;
};

export default useScrollAnimation;
