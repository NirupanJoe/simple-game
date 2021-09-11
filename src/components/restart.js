import React from 'react';
import context from '../core/context';

const Restart = () =>
	<div>
		<button
			role="restartButton"
			onClick={ context.actions.restart }
		>
			Restart
		</button>
	</div>;

export default Restart;
