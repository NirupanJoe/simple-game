import React from 'react';
import Flight from './flight';
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
		onMouseMove={ (event) =>
			context.actions.updateMousePosition(event) }
	>
		{ HealthBar() }
		{ Score() }
		{ Flight() }
	</div>;

export default GameScreen;
