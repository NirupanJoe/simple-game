import React from 'react';
import context from '../core/context';

const Flight = () =>
	<div
		role="flight"
		className="flight"
		style={ { left: `${ context.state.flight.x }%` } }
	/>;

export default Flight;
