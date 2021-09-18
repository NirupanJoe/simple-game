import React from 'react';
import HealthBar from './healthBar';

const GameScreen = () =>
	<div
		role="gameScreen"
		className="game-screen"
	>
		{ HealthBar() }
	</div>;

export default GameScreen;
