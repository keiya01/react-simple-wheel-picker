import * as React from "react";
import Component from "../src/components/WheelPicker";
import { pickerData } from "../src/constants/mockData/pickerData";

export default {
  title: "WheelPicker"
};

const onChange = (target: Element): void => {
  console.log(target);
};

export const normal: React.FC = () => {
  return (
    <Component
      data={pickerData}
      selectedID={pickerData[0].id}
      onChange={onChange}
      height={200}
      itemHeight={40}
      width={100}
    />
  );
};
