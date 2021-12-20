import React from 'react';
import PositionService from '../services/positionService';

const style = (bullet) => {
	const { width, height, color } = bullet;
	const { x, y } = PositionService.project(bullet);

	return {
		height: `${ height }vw`,
		width: `${ width }vw`,
		left: `${ x }%`,
		top: `${ y }%`,
		filter: `hue-rotate(${ color }deg)`,
	};
};

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
