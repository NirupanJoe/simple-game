import { React } from 'react';
import './App.scss';
import Game from './components/game';

const App = () =>
	<div className="App">
		{Game()}
	</div>;

export default App;
