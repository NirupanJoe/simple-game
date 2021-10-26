import React from 'react';
import context from '../core/context';
import bulletImg from '../images/bullet.png';
import config from '../core/config';

const typeComponents = {
	normal: {
		image: bulletImg,
		left: 0,
	},
};

const style = (bullet) => ({
	height: '2vw',
	width: `${ config.bulletWidth }vw`,
	left: `${ bullet.x - typeComponents[bullet.type].left }%`,
	top: `${ bullet.y }%`,
});

const Bullet = () =>
	context.state.bullets.map((bullet) =>
		<img
			key={ bullet.id }
			src={ typeComponents[bullet.type].image }
			role="bullet"
			className="bullet"
			style={ style(bullet) }
		/>);

export default Bullet;
