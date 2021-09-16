import React from 'react';
import blast from '../images/damage.jpg';
import context from '../core/context';

const Score = () =>
	<div role="score-card" className="container">
		<img role="damage-icon" src={ blast } className="flightDamage"/>
		<span role="score" className="score">
			{ context.state.score } </span>
	</div>;

export default Score;
