import React from 'react';
import GameOverScreen from './gameOverScreen';
import PlayerManager from '../services/playerManager';
import GameScreen from './gameScreen';
import WelcomeScreen from './welcomeScreen';
import Keyboard from './keyboard';

const Game = (context) => {
	const { state } = context;
	const readyScreens = {
		true: PlayerManager.isAlive(context)
			? GameScreen
			: GameOverScreen,
		false: WelcomeScreen,
	};
	const Screen = readyScreens[state.ready];

	return (
		<div className="game" role="game">
			<Screen { ...context }/>
			{Keyboard(context)}
		</div>
	);
};

export default Game;
