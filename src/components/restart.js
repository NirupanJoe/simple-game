import React from 'react';
import context from '../core/context';

const Restart = () =>
	<button
		className="restart-button"
		role="restartButton"
		onClick={ () => context.actions.restart() }
	>
		RESTART
	</button>;

export default Restart;
