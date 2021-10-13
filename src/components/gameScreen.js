import React from 'react';
import Flight from './flight';
import HealthBar from './healthBar';
import Score from './score';
import context from '../core/context';
import Target from './target';
import Container from './container';
import Cloud from './cloud';
import Bullet from './bullet';

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
		onClick={ (event) => context.actions.generateBullets(event) }
	>
		{ HealthBar() }
		{ context.state.objects.map(Cloud) }
		{ Score() }
		{ Flight() }
		{ Container(context.state.targets, Target) }
		{ Bullet() }
	</div>;

export default GameScreen;
