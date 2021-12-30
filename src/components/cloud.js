import React from 'react';
import PositionService from '../services/positionService';

const Cloud = (data) => {
	const { id, height, width } = data;
	const { x, y } = PositionService.project(data);

	const style = {
		top: `${ y }%`,
		left: `${ x }%`,
		height: `${ height }%`,
		width: `${ width }%`,
	};

	return <div key={ id }role="cloud" style={ style } className="cloud"/>;
};

export default Cloud;
