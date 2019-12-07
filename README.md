<div align="center">
  <h1>react-wheel-picker</h1>
</div>

# How To Use
- `npm run react-wheel-picker` or `yarn add react-wheel-picker`

```js
import WheelPicker from "react-wheel-picker";

const data = [
  {
    id: "1",
    value: "test1"
  },
  {
    id: "2",
    value: "test2"
  },
  {
    id: "3",
    value: "test3"
  },
  {
    id: "4",
    value: "test4"
  },
  {
    id: "5",
    value: "test5"
  },
];

const Sample = () => {
  const handleOnChange = (target) => {
    console.log(target);
  }
  return (
    <WheelPicker
      data={data}
      onChange={handleOnChange}
      height={150}
      itemHeight={30}
      selectedID={data[0].id}
      color="#ccc"
      activeColor="#333"
      backgroundColor="#fff"
    />
  )
}
```
