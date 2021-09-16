import { React, useEffect } from 'react';
import './App.scss';
import Game from './components/game';
import HealthBar from './components/healthBar';
import ticker from './services/ticker';

const App = () => {
	useEffect(ticker.start, []);

	return (
		<div className="App">
			{Game()}
			{ HealthBar() }
		</div>
	);
};

export default App;
