import React from 'react';
import context from '../core/context';
import PositionService from '../services/positionService';

const style = () => {
	const { x, degree } = PositionService.project(context.state.flight);

	return { left: `${ x }%`, transform: `rotate(${ degree }deg)` };
};

const Flight = () =>
	<div
		role="flight"
		className="flight"
		style={ style() }
	/>;

export default Flight;
