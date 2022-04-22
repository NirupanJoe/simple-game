import React from 'react';
import Bullet from '../bullet';
import backgroundObject from '../backgroundObject';
import Container from '../container';
import Flight from '../flight';
import HealthBar from '../healthBar';
import Score from '../score';
import Target from '../target';

const TwoDMode = (context) => {
	const { state } = context;

	return (
		<div role="twoDMode" className="twoDMode">
			{ HealthBar() }
			{ Container(state.objects, backgroundObject) }
			{ Score() }
			{ Container(state.bullets, Bullet) }
			{ Flight() }
			{ Container(state.targets, Target) }
		</div>
	);
};

export default TwoDMode;
