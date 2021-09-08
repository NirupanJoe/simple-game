import { React, useEffect } from 'react';
import './App.scss';
import SampleService from './services/sample';

const App = () => {
	useEffect(SampleService.sayHai, []);

	return (
		<div className="App">
			Simple Game
		</div>
	);
};

export default App;
