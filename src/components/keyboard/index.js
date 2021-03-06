import { useEffect } from 'react';
import shortcutManager from '../../services/shortcutManager';

const Keyboard = (context) => {
	useEffect(() => {
		// eslint-disable-next-line no-undef
		window.addEventListener('keydown', ({ key }) => {
			shortcutManager.handleShortcut({ ...context, data: { key }});
		});
	}, []);
};

export default Keyboard;
