import * as React from 'react';

const Home = () => {
	const [counter, setCounter] = React.useState<string>('');

	return (
		<div className="w-[500px] h-[500px]">
			<h1>{counter}</h1>
			<button
				onClick={() => {
					setCounter(counter + 1);
				}}
			>
				+1
			</button>
		</div>
	);
};

export default Home;
