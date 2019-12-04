import * as React from "react";
import Component from "../src/components/WheelPicker";
import { pickerData } from "../src/constants/mockData/pickerData";

export default {
  title: "WheelPicker"
};

const onChange = (target: Element): void => {
  console.log(target);
};

export const normal: React.FC = () => (
  <Component
    data={pickerData}
    onChange={onChange}
    height={150}
    width={100}
    limit={5}
  />
);
