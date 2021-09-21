import React from 'react';
import HealthBar from './healthBar';
import Score from './score';

const GameScreen = () =>
	<div
		role="gameScreen"
		className="game-screen"
	>
		{ HealthBar() }
		{ Score() }
	</div>;

export default GameScreen;
