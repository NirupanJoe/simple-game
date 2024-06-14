import { React, useEffect } from 'react';
import './App.scss';
import Game from './components/game';
import ticker from './services/ticker';

const App = (context) => {
	useEffect(ticker.start, []);

	return (
		<div className="App">
			<Game { ...context }/>
		</div>
	);
};

export default App;
