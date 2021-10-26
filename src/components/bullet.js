import React from 'react';
import context from '../core/context';
import bulletImg from '../images/bullet.png';

const typeComponents = {
	normal: {
		image: bulletImg,
		left: 0,
	},
};

const style = (bullet) => ({
	height: `${ bullet.height }vw`,
	width: `${ bullet.width }vw`,
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
