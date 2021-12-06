import React from 'react';
import GameOverScreen from './gameOverScreen';
import GameScreen from './gameScreen';
import PlayerManager from '../services/playerManger';

const Game = (context) => {
	const Screen = PlayerManager.isAlive(context)
		? GameScreen
		: GameOverScreen;

	return (
		<div className="game" role="game">
			{Screen()}
		</div>
	);
};

export default Game;
