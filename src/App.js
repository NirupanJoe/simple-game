import { React, useEffect } from 'react';
import './App.scss';
import Game from './components/game';
import ticker from './services/ticker';

const App = () => {
	useEffect(ticker.start, []);

	return (
		<div className="App">
			{Game()}
		</div>
	);
};

export default App;
