import React from 'react';
import Flight from './flight';
import HealthBar from './healthBar';
import Score from './score';
import context from '../core/context';
import Target from './target';
import Container from './container';
import Cloud from './cloud';

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
		{ context.state.objects.map(Cloud) }
		{ Score() }
		{ Flight() }
		{ Container(context.state.targets, Target) }
	</div>;

export default GameScreen;
