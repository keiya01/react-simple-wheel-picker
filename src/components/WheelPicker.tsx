import React from "react";
import styled from "styled-components";

const List = styled.ul`
  display: inline-block;
  list-style: none;
  overflow-y: scroll;
  height: 100px;
  border: 1px solid black;
`;

export interface PickerData {
  id: string | number;
  value: string | number;
}

export interface WheelPickerProps {
  data: PickerData[];
}

const WheelPicker: React.FC<WheelPickerProps> = ({ data }) => {
  return (
    <List>
      {data.map(item => {
        return (
          <li key={item.id} data-testid="picker-item">
            {item.value}
          </li>
        );
      })}
    </List>
  );
};

export default WheelPicker;
