import React from "react";
import { render } from "@testing-library/react";
import WheelPicker, { PickerData } from "@/components/WheelPicker";

describe("WheelPicker", () => {
  test("propsから受け取ったdataを表示すること", () => {
    const data: PickerData[] = [
      { id: 1, value: 1 },
      { id: 2, value: 2 },
      { id: 3, value: 3 },
      { id: 4, value: 4 },
      { id: 5, value: 5 }
    ];
    // 準備
    const { getAllByTestId } = render(<WheelPicker data={data} />);
    // 実行
    const pickerValues = getAllByTestId("picker-item").map(
      elm => elm.textContent
    );
    // 検証
    expect(pickerValues).toHaveLength(5);
  });
  test.todo("スクロールした時に要素の真ん中の位置を取得できること");
  test.todo("真ん中に来た要素を取得できること");
  test.todo("取得した要素にfocusを当てることができること");
  test.todo("onChange Event から値の変更を渡すことができること");
  test.todo("Pickerの大きさを設定できること");
  test.todo("fontSizeをpropsとして渡せること");
  test.todo(
    "scrollが100ms止まっていたら、focusが当たった要素を真ん中に持ってくる"
  );
});
