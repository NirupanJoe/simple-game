import React from 'react';
import Restart from './restart';
import PlayerManager from '../services/playerManger';
import context from '../core/context';
import Score from './score';

const Game = () => {
	const Screen = !PlayerManager.isAlive(context) && Restart();

	return (
		<div role="game">
			{Screen}
			{Score()}
		</div>
	);
};

export default Game;
