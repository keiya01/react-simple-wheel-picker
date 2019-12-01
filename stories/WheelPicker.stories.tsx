import * as React from "react";
import Component from "../src/components/WheelPicker";
import { pickerData } from "../src/constants/mockData/pickerDate";

export default {
  title: "components"
};

export const WheelPicker: React.FC = () => <Component data={pickerData} />;
