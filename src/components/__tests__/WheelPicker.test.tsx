import React from "react";
import WheelPicker, { WheelPickerRef } from "../WheelPicker";
import { render } from "@testing-library/react";

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
});
