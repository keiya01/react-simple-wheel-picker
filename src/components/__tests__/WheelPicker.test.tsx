import React from "react";
import WheelPicker, { WheelPickerRef } from "../WheelPicker";
import { render, fireEvent } from "@testing-library/react";
import { pickerData } from "../../constants/mockData/pickerData";
import { setScrollAnimation } from "../../hooks/useScrollAnimation";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    IntersectionObserver: any;
  }
}

declare const window: Window;

window.IntersectionObserver = jest.fn();

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useRef: () => ({
    current: {
      observe: jest.fn(),
      disconnect: jest.fn(),
      scrollTop: jest.fn()
    }
  })
}));

jest.mock("../../hooks/useScrollAnimation");

describe("WheelPicker", () => {
  describe("Set padding top to WheelPicker", () => {
    it("should be 0px when height is 100px and itemHeight is 100px", () => {
      const { getByTestId } = render(
        <WheelPicker
          data={[{ id: "1", value: "test" }]}
          selectedID="1"
          // eslint-disable-next-line no-empty-function
          onChange={() => {}}
          height={100}
          itemHeight={100}
        />
      );

      const elm = getByTestId("picker-list");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const spaceItem: any = elm.children[0];

      expect(spaceItem.style.height).toEqual("0px");
    });

    it("should be 75px when height is 200px and itemHeight is 50px", () => {
      const { getByTestId } = render(
        <WheelPicker
          data={[{ id: "1", value: "test" }]}
          selectedID="1"
          // eslint-disable-next-line no-empty-function
          onChange={() => {}}
          height={200}
          itemHeight={50}
        />
      );

      const elm = getByTestId("picker-list");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const spaceItem: any = elm.children[0];

      expect(spaceItem.style.height).toEqual("75px");
    });
  });

  describe("To get ref from WheelPicker", () => {
    it("should be focused to WheelPicker when focus function was executed", () => {
      const ref = React.createRef<WheelPickerRef>();
      const { getByTestId } = render(
        <WheelPicker
          data={[{ id: "1", value: "test" }]}
          selectedID="1"
          ref={ref}
          // eslint-disable-next-line no-empty-function
          onChange={() => {}}
          height={100}
          itemHeight={100}
        />
      );

      const pickerList = getByTestId("picker-list");

      if (ref.current) {
        ref.current.focus();
      }

      expect(document.activeElement).toEqual(pickerList);
    });

    it("should be unfocused to WheelPicker when blur function was executed", () => {
      const ref = React.createRef<WheelPickerRef>();
      const { getByTestId } = render(
        <WheelPicker
          data={[{ id: "1", value: "test" }]}
          selectedID="1"
          ref={ref}
          // eslint-disable-next-line no-empty-function
          onChange={() => {}}
          height={100}
          itemHeight={100}
        />
      );

      const pickerList = getByTestId("picker-list");

      if (ref.current) {
        ref.current.focus();
        ref.current.blur();
      }

      expect(document.activeElement).not.toEqual(pickerList);
    });
  });

  describe("Keyboard Operation", () => {
    let scrollTop = 0;
    beforeEach(() => {
      jest
        .spyOn(window, "requestAnimationFrame")
        .mockImplementation((cb: any) => cb());

      const _setScrollAnimation = setScrollAnimation as any;
      _setScrollAnimation.mockImplementation(
        (_: HTMLElement, __: number, itemHeight: number) => {
          return () => {
            scrollTop += itemHeight;
          };
        }
      );
    });

    afterEach(() => {
      scrollTop = 0;
    });

    it("should be moved to next option position when tab key was pressed", () => {
      const { getByTestId } = render(
        <WheelPicker
          data={pickerData}
          selectedID="1"
          onChange={() => {}} // eslint-disable-line no-empty-function
          height={100}
          itemHeight={100}
        />
      );

      const listbox = getByTestId("picker-list");

      fireEvent.keyDown(listbox, {
        keyCode: 9
      });

      expect(scrollTop).toEqual(100);
    });

    it("should be moved to previous option position when tab + shift key was pressed", () => {
      const { getByTestId } = render(
        <WheelPicker
          data={pickerData}
          selectedID="1"
          onChange={() => {}} // eslint-disable-line no-empty-function
          height={100}
          itemHeight={100}
        />
      );

      const listbox = getByTestId("picker-list");

      fireEvent.keyDown(listbox, {
        keyCode: 16
      });

      fireEvent.keyDown(listbox, {
        keyCode: 9
      });

      expect(scrollTop).toEqual(-100);
    });

    it("should be moved to next option position when tab key was pressed before shift key was pressed", () => {
      const { getByTestId } = render(
        <WheelPicker
          data={pickerData}
          selectedID="1"
          onChange={() => {}} // eslint-disable-line no-empty-function
          height={100}
          itemHeight={100}
        />
      );

      const listbox = getByTestId("picker-list");

      fireEvent.keyDown(listbox, {
        keyCode: 16
      });

      fireEvent.keyUp(listbox, {
        keyCode: 16
      });

      fireEvent.keyDown(listbox, {
        keyCode: 9
      });

      expect(scrollTop).toEqual(100);
    });

    it("should be moved to next option position when shift key was released before tab key was pressed", () => {
      const { getByTestId } = render(
        <WheelPicker
          data={pickerData}
          selectedID="1"
          onChange={() => {}} // eslint-disable-line no-empty-function
          height={100}
          itemHeight={100}
        />
      );

      const listbox = getByTestId("picker-list");

      fireEvent.keyDown(listbox, {
        keyCode: 16
      });

      fireEvent.keyUp(listbox, {
        keyCode: 16
      });

      fireEvent.keyDown(listbox, {
        keyCode: 9
      });

      expect(scrollTop).toEqual(100);
    });

    it("should be moved to next option position when up arrow key was pressed", () => {
      const { getByTestId } = render(
        <WheelPicker
          data={pickerData}
          selectedID="1"
          onChange={() => {}} // eslint-disable-line no-empty-function
          height={100}
          itemHeight={100}
        />
      );

      const listbox = getByTestId("picker-list");

      fireEvent.keyDown(listbox, {
        keyCode: 40
      });

      expect(scrollTop).toEqual(100);
    });

    it("should be moved to next option position when down arrow key was pressed", () => {
      const { getByTestId } = render(
        <WheelPicker
          data={pickerData}
          selectedID="1"
          onChange={() => {}} // eslint-disable-line no-empty-function
          height={100}
          itemHeight={100}
        />
      );

      const listbox = getByTestId("picker-list");

      fireEvent.keyDown(listbox, {
        keyCode: 38
      });

      expect(scrollTop).toEqual(-100);
    });

    it("should be unfocused from WheelPicker when space key was pressed", () => {
      const { getByTestId } = render(
        <WheelPicker
          data={pickerData}
          selectedID="1"
          onChange={() => {}} // eslint-disable-line no-empty-function
          height={100}
          itemHeight={100}
        />
      );

      const listbox = getByTestId("picker-list");

      listbox.focus();
      expect(document.activeElement).toEqual(listbox);

      fireEvent.keyDown(listbox, {
        keyCode: 32
      });

      expect(document.activeElement).not.toEqual(listbox);
    });

    it("should be unfocused from WheelPicker when esc key was pressed", () => {
      const { getByTestId } = render(
        <WheelPicker
          data={pickerData}
          selectedID="1"
          onChange={() => {}} // eslint-disable-line no-empty-function
          height={100}
          itemHeight={100}
        />
      );

      const listbox = getByTestId("picker-list");

      listbox.focus();
      expect(document.activeElement).toEqual(listbox);

      fireEvent.keyDown(listbox, {
        keyCode: 27
      });

      expect(document.activeElement).not.toEqual(listbox);
    });
  });
});
