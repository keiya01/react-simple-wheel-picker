import React, { useRef } from "react";
import WheelPicker from "../WheelPicker";
import { render } from "@testing-library/react";

declare global {
  interface Window {
    IntersectionObserver: any;
  }
}

declare const window: Window;

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useRef: () => ({ current: { scrollTop: jest.fn() } })
}));

describe("WheelPicker", () => {
  beforeAll(() => {
    const observe = jest.fn();
    window.IntersectionObserver = jest.fn(function(this: {
      observe: () => void;
    }) {
      this.observe = observe;
    });
  });

  describe("Set padding top to WheelPicker", () => {
    it("should be 0px when height is 100px and itemHeight is 100px", () => {
      const { getByTestId } = render(
        <WheelPicker
          data={[{ id: "1", value: "test" }]}
          selectedID="1"
          onChange={() => {}}
          height={100}
          itemHeight={100}
        />
      );

      const elm = getByTestId("picker-list");
      const spaceItem: any = elm.children[0];

      expect(spaceItem.style.height).toEqual("0px");
    });

    it("should be 75px when height is 200px and itemHeight is 50px", () => {
      const { getByTestId } = render(
        <WheelPicker
          data={[{ id: "1", value: "test" }]}
          selectedID="1"
          onChange={() => {}}
          height={200}
          itemHeight={50}
        />
      );

      const elm = getByTestId("picker-list");
      const spaceItem: any = elm.children[0];

      expect(spaceItem.style.height).toEqual("75px");
    });
  });
});
