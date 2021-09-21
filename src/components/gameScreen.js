import React from 'react';
import HealthBar from './healthBar';
import Score from './score';
import context from '../core/context';

const style = () => ({
	backgroundPositionY: `${ context.state.bgnScreenY }%`,
});

const GameScreen = () =>
	<div
		role="gameScreen"
		className="game-screen"
		style={ style() }
	>
		{ HealthBar() }
		{ Score() }
	</div>;

export default GameScreen;
