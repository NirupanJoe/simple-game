import React from 'react';
import GameOverScreen from './gameOverScreen';
import PlayerManager from '../services/playerManager';
import GameScreen from './gameScreen';
import WelcomeScreen from './welcomeScreen';

const Game = (context) => {
	const { state } = context;
	const Screen = PlayerManager.isAlive(context)
		? GameScreen
		: GameOverScreen;
	const ready = {
		true: Screen,
		false: WelcomeScreen,
	};

	return (
		<div className="game" role="game">
			{ ready[state.ready](context) }
		</div>
	);
};

export default Game;
