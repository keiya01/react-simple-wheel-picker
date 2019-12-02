import { PickerData } from "@/components/WheelPicker";

export const pickerData: PickerData[] = [...Array(30)].map((_, i) => ({
  id: i.toString(),
  value: i
}));
