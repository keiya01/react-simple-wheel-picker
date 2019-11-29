import React from "react";
import { render } from "@testing-library/react";
import App from "@/components/App";

describe("App", () => {
  test("target value in App should be test", () => {
    const { getByText } = render(<App />);
    expect(getByText("test")).not.toBeNull();
  });
});
