import React from 'react';
import context from '../core/context';
import PositionService from '../services/positionService';

const style = () => {
	const { x } = !context.state.playPause
	&& PositionService.project(context.state.flight);

	return { left: `${ x }%` };
};

const Flight = () =>
	<div
		role="flight"
		className="flight"
		style={ style() }
	/>;

export default Flight;
