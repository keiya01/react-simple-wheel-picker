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
    color="black"
    activeColor="black"
    fontSize={16}
    limit={5}
    forwardRef={React.createRef()}
    height={150}
  />
);

export const active: React.FC = () => (
  <Component
    id="0"
    activeID="0"
    value="0"
    color="black"
    activeColor="black"
    fontSize={16}
    limit={5}
    forwardRef={React.createRef()}
    height={150}
  />
);
