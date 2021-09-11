import React from 'react';
import Restart from './restart';
import playerManager from '../services/playerManger';
import context from '../core/context';

const Game = () => {
	const Screen = !playerManager.isAlive(context) && Restart();

	return (
		<div role="game">
			{Screen}
		</div>
	);
};

export default Game;
