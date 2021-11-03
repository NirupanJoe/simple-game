import React from 'react';
import PositionService from '../services/positionService';

const style = (bullet) => ({
	height: `${ bullet.height }vw`,
	width: `${ bullet.width }vw`,
	left: `${ PositionService.project(bullet) }%`,
	top: `${ bullet.y }%`,
});

const Bullet = (bullet) => {
	const { image, id } = bullet;

	return (
		<img
			key={ id }
			src={ image }
			role="bullet"
			className="bullet"
			style={ style(bullet) }
		/>);
};

export default Bullet;
