import React from 'react';
import context from '../core/context';
import GameService from '../services/gameService';

const getStyle = () => ({
	backgroundColor: GameService.healthColor(context.state.health),
	width: `${ context.state.health }%`,
	height: '100%',
});

const HealthBar = () =>
	<div role="healthBar" className="health-bar">
		<div style={ getStyle() }/>
	</div>;

export default HealthBar;
