import React from 'react';
import GameOverScreen from './gameOverScreen';
import GameScreen from './gameScreen';
import context from '../core/context';
import PlayerManager from '../services/playerManger';

const Game = () => {
	const Screen = PlayerManager.isAlive(context)
		? GameScreen
		: GameOverScreen;

	return (
		<div role="game">
			{Screen()}
		</div>
	);
};

export default Game;
