/* eslint-disable no-console */
import { React, useEffect } from 'react';
import './App.scss';
import Game from './components/game';
import ticker from './services/ticker';

const App = (context) => {
	useEffect(ticker.start, []);

	// eslint-disable-next-line react/destructuring-assignment
	console.log(context.state.objects);

	return (
		<div className="App">
			{Game(context)}
		</div>
	);
};

export default App;
