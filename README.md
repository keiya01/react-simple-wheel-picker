<div align="center">
  <h1>react-simple-wheel-picker</h1>
</div>

# Usage

- `npm run react-simple-wheel-picker` or `yarn add react-simple-wheel-picker`
- Please check [example](https://github.com/keiya01/react-simple-wheel-picker/tree/master/example)

```js
import WheelPicker from 'react-simple-wheel-picker';

const data = [
	{
		id: '1',
		value: 'test1'
	},
	{
		id: '2',
		value: 'test2'
	},
	{
		id: '3',
		value: 'test3'
	},
	{
		id: '4',
		value: 'test4'
	},
	{
		id: '5',
		value: 'test5'
	}
];

const Sample = () => {
	const handleOnChange = target => {
		console.log(target);
	};
	return (
		<WheelPicker
			data={data}
			onChange={handleOnChange}
			height={150}
			width={100}
			itemHeight={30}
			selectedID={data[0].id}
			color="#ccc"
			activeColor="#333"
			backgroundColor="#fff"
		/>
	);
};
```
