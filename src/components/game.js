import React from 'react';
import Restart from './restart';
import PlayerManager from '../services/playerManger';
import context from '../core/context';

const Game = () => {
	const Screen = !PlayerManager.isAlive(context) && Restart();

	return (
		<div role="game">
			{Screen}
		</div>
	);
};

export default Game;
