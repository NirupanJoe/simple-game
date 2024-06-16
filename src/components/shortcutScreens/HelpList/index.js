import React from 'react';
import Container from '../../container';
import ShortcutKey from './shortcutKey';

const HelpList = (context) => {
	const { state, config } = context;

	return <div className="help">
		{state.help
				&& <div className="shortcutKeys">
					{Container(config.shortcutKeys, ShortcutKey)}
				</div>}
	</div>;
};

export default HelpList;
