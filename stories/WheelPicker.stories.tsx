import * as React from "react";
import Component, { PickerData } from "../src/components/WheelPicker";
import { pickerData } from "../src/constants/mockData/pickerData";

export default {
  title: "WheelPicker"
};

const onChange = (data: PickerData): void => {
  console.log(data);
};

export const normal: React.FC = () => {
  return (
    <Component
      data={pickerData}
      selectedID={pickerData[0].id}
      onChange={onChange}
      height={200}
      itemHeight={40}
      titleText="select programming languages"
      width={100}
      color="#bbb"
      activeColor="#fff"
    />
  );
};

export const select: React.FC = () => {
  return (
    <Component
      data={pickerData}
      selectedID={pickerData[3].id}
      onChange={onChange}
      height={200}
      itemHeight={40}
      titleText="select programming languages"
      width={100}
      color="#999"
      activeColor="#333"
      backgroundColor="#fff"
      shadowColor="#eee"
    />
  );
};

export const labeled: React.FC = () => {
  return (
    <form>
      <label htmlFor="select">progarmming languages</label>
      <br />
      <Component
        data={pickerData}
        selectedID={pickerData[3].id}
        onChange={onChange}
        height={200}
        itemHeight={40}
        idName="select"
        titleID="select programming languages"
        required={true}
        width={100}
        color="#999"
        activeColor="#333"
        backgroundColor="#fff"
        shadowColor="#eee"
      />
    </form>
  );
};
