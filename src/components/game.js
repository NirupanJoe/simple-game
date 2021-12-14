import React from 'react';
import GameOverScreen from './gameOverScreen';
import PlayerManager from '../services/playerManger';
import GameScreen from './gameScreen';

const Game = (context) => {
	const Screen = PlayerManager.isAlive(context)
		? GameScreen
		: GameOverScreen;

	return (
		<div className="game" role="game">
			{Screen(context)}
		</div>
	);
};

export default Game;
