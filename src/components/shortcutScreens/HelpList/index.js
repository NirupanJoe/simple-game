import React from 'react';
import Container from '../../container';
import ShortcutKey from './shortcutKey';

const HelpList = (context) => {
	const { state, config, actions } = context;

	return <div className="help">
		<button
			className="helpButton"
			onClick={ (event) => {
				event.stopPropagation();
				actions.setHelp(!state.help);
			} }
		>H</button>
		{state.help
				&& <div className="shortcutKeys">
					{Container(config.shortcutKeys, ShortcutKey)}
				</div>}
	</div>;
};

export default HelpList;
