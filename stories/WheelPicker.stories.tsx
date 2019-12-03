import * as React from "react";
import Component from "../src/components/WheelPicker";
import { pickerData } from "../src/constants/mockData/pickerData";

export default {
  title: "components"
};

const onChange = (target: Element): void => {
  console.log(target);
};

export const WheelPicker: React.FC = () => (
  <Component
    data={pickerData}
    onChange={onChange}
    height={500}
    width={100}
    limit={11}
  />
);
