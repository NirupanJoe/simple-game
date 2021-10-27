import React from 'react';
import context from '../core/context';
import PositionService from '../services/positionService';

const style = () => ({
	left: `${ PositionService.project(context.state.flight) }%`,
});

const Flight = () =>
	<div
		role="flight"
		className="flight"
		style={ style() }
	/>;

export default Flight;
