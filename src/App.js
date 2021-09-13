import { React } from 'react';
import './App.scss';
import Game from './components/game';
import HealthBar from './component/healthBar';

const App = () =>
	<div className="App">
		{Game()}
		{ HealthBar() }
	</div>;

export default App;
