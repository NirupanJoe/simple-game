import React from 'react';
import Restart from './restart';
import PlayerManager from '../services/playerManger';
import context from '../core/context';
import Score from './score';
import GameScreen from './gameScreen';

const Game = () => {
	const Screen = PlayerManager.isAlive(context)
		? GameScreen
		: Restart;

	return (
		<div role="game">
			{ Screen() }
			{Score()}
		</div>
	);
};

export default Game;
