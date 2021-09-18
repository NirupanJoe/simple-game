import { React, useEffect } from 'react';
import './App.scss';
import Game from './components/game';
import ticker from './services/ticker';
import GameScreen from './components/gameScreen';

const App = () => {
	useEffect(ticker.start, []);

	return (
		<div className="App">
			{Game()}
			{ GameScreen() }
		</div>
	);
};

export default App;
