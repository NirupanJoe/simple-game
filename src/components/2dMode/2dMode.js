import React from 'react';
import Bullet from '../bullet';
import backgroundObject from '../backgroundObject';
import Container from '../container';
import Flight from '../flight';
import HealthBar from '../healthBar';
import Score from '../score';
import Target from '../target';

const style = (context) => ({
	backgroundPositionY: `${ context.state.bgnScreenY }%`,
});

const TwoDMode = (context) => {
	const { state } = context;

	return (
		<div
			role="twoDMode"
			style={ style(context) }
			className="twoDMode"
		>
			<HealthBar/>
			{ Container(state.objects, backgroundObject) }
			<Score/>
			{ Container(state.bullets, Bullet) }
			{ Container(state.enemyBullets, Bullet) }
			<Flight/>
			{ Container(state.targets, Target) }
		</div>
	);
};

export default TwoDMode;
