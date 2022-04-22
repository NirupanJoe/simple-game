import React from 'react';
import PositionService from '../services/positionService';

const backgroundObject = (data) => {
	const { id, height, width, type } = data;
	const { x, y } = PositionService.project(data);

	const style = {
		top: `${ y }%`,
		left: `${ x }%`,
		height: `${ height }%`,
		width: `${ width }%`,
	};

	return (
		<div
			key={ id }
			role="backgroundObject"
			style={ style }
			className={ type }
		/>) ;
};

export default backgroundObject;
