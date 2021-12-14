import React from 'react';
import GameOverScreen from './gameOverScreen';
import PlayerManager from '../services/playerManger';
import getMode from '../services/urlService';
import ThreeDMode from './3dMode/3dMode';
import GameScreen from './gameScreen';

const GameMode = {
	'3d': ThreeDMode,
	'2d': GameScreen,
};

const Game = (context) => {
	const Screen = PlayerManager.isAlive(context)
		? GameMode[getMode(context)]
		: GameOverScreen;

	return (
		<div className="game" role="game">
			{Screen(context)}
		</div>
	);
};

export default Game;
