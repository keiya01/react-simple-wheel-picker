import * as React from "react";
import Component from "../src/components/WheelPickerItem";

export default {
  title: "WheelPickerItem"
};

export const normal: React.FC = () => (
  <Component
    id="0"
    activeID="1"
    value="0"
    height={30}
    color="black"
    activeColor="black"
    fontSize={16}
    forwardRef={React.createRef()}
  />
);

export const active: React.FC = () => (
  <Component
    id="0"
    activeID="0"
    value="0"
    height={30}
    color="black"
    activeColor="black"
    fontSize={16}
    forwardRef={React.createRef()}
  />
);
