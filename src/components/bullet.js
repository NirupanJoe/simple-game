import React from 'react';
import context from '../core/context';
import bulletImg from '../images/bullet.png';

const typeComponents = {
	normal: {
		image: bulletImg,
		left: 0,
	},
};
const Bullet = () =>
	context.state.bullets.map((bullet) =>
		<img
			key={ bullet.id }
			src={ typeComponents[bullet.type].image }
			role="bullet"
			className="bullet"
			style={ { left: `${ bullet.x - typeComponents[bullet.type].left }%`,
				top: `${ bullet.y }%` } }
		/>);

export default Bullet;
