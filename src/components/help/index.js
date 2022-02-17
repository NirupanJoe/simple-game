import React from 'react';
import Container from '../container';
import ShortcutKey from './shortcutKey';

const Help = (context) => {
	const { state, config, actions } = context;

	return (
		<div className="help">
			<button
				className="helpButton"
				onClick={ () => actions.setHelp(!state.help) }
			>H</button>
			{state.help
				&& <div className="shortcutKeys">
					{ Container(config.shortcutKeys, ShortcutKey) } </div>}
		</div>
	);
};

export default Help;
