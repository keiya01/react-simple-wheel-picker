import { setScrollAnimation } from "./useScrollAnimation";
import { useState, useCallback } from "react";

const useHandleKeyboard = (itemHeight: number) => {
  const [pressedKeys, setPressedKeys] = useState<{ [key: number]: boolean }>(
    {}
  );

  const onKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLUListElement>) => {
      const code = e.keyCode;
      if (pressedKeys[code]) {
        e.persist();
        setPressedKeys(prev => ({
          ...prev,
          [code]: false
        }));
      }
    },
    [pressedKeys]
  );

  const onKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLUListElement>) => {
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
        const animate = setScrollAnimation(
          target,
          target.scrollTop,
          itemHeight
        );
        requestAnimationFrame(animate);
      }

      if ((pressedKeys[16] && code === 9) || code === 38) {
        e.preventDefault();
        const animate = setScrollAnimation(
          target,
          target.scrollTop,
          itemHeight * -1
        );
        requestAnimationFrame(animate);
      }

      if (code === 32 || code === 27) {
        e.preventDefault();
        target.blur();
      }
    },
    [itemHeight, pressedKeys]
  );

  return {
    onKeyUp,
    onKeyPress
  };
};

export default useHandleKeyboard;
