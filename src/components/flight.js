import React from 'react';
import context from '../core/context';

const style = () => ({
	left: `${ context.state.flight.x }%`,
});

const Flight = () =>
	<div
		role="flight"
		className="flight"
		style={ style() }
	/>;

export default Flight;
